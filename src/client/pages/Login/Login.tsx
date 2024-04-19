import * as React from "react";
import { loginStyles } from "./LoginStyles";
import { Divider, Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiEmail,
  mdiEye,
  mdiEyeOff,
  mdiGoogle,
  mdiLock,
} from "@mdi/js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../..";
import { useAuth } from "../../hooks/useAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { leagueLinkTheme } from "../../common/Theme";
import { LoadingFull } from "../../common/rive/LoadingFull";

interface ILogin {}

const LoginComponent: React.FunctionComponent<ILogin> = () => {
  const { classes } = loginStyles();
  const { login } = useAuth();
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const [displayName, setDisplayName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [invalidDisplayName, setInvalidDisplayName] =
    React.useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = React.useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = React.useState<boolean>(false);
  const [provider, setProvider] = React.useState<"Google" | "Email">("Email");
  const [hasAttemptedLogin, setHasAttemptedLogin] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (user) {
      handleUserData();
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    setProvider("Google");
    setHasAttemptedLogin(true);
    await signInWithPopup(auth, googleProvider).catch((e) => {
      if (e.code === "auth/account-exists-with-different-credential") {
        setErrorMessage(
          "An account already exists with this email address.\nTry signing in with Facebook."
        );
      }
      return;
    });
  };

  const handleUserData = async () => {
    if (user) {
      const userData = {
        displayName: user.displayName || displayName,
        email: user.email,
        photoUrl: user.photoURL,
        provider: provider,
      };
      await getDoc(doc(db, "usernames", user.uid))
        .then(async () => {
          await setDoc(doc(db, "users", user.uid), userData);
        })
        .finally(() => {
          login({ ...userData, uid: user.uid });
        });
    }
  };

  const handleLoginChange = (
    event: React.SyntheticEvent,
    newValue: boolean
  ) => {
    setIsLogin(newValue);
  };

  const handleDisplayNameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInvalidDisplayName(false);
    setErrorMessage("");
    setDisplayName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidEmail(false);
    setErrorMessage("");
    setEmail(event.target.value as string);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidPassword(false);
    setErrorMessage("");
    setPassword(event.target.value as string);
  };

  const validateUsernameSignIn = () => {
    let valid = true;
    if (email.length === 0) {
      setInvalidEmail(true);
      valid = false;
    }
    if (password.length === 0) {
      setInvalidPassword(true);
      valid = false;
    }
    if (!isLogin && displayName.length === 0) {
      setInvalidDisplayName(true);
      valid = false;
    }
    if (!isLogin && displayName.length < 4) {
      setInvalidDisplayName(true);
      setErrorMessage("Display name must be at least 4 characters long");
      valid = false;
    }

    return valid;
  };

  const checkUserUnderGoogleAuth = async () => {
    const usernameExists = query(
      collection(db, "users"),
      where("email", "==", email.toLowerCase())
    );
    const usernameSnapshot = await getDocs(usernameExists);
    if (!usernameSnapshot.empty) {
      const user = usernameSnapshot.docs[0].data();
      if (user.provider === "Google") {
        setErrorMessage("Please log in with Google Provider");
      } else {
        if (!isLogin) {
          setErrorMessage("Please log in with Google Provider");
        } else {
          setErrorMessage("Invalid Password");
        }
      }
    } else {
      setErrorMessage("No user found with provided credentials");
    }
  };

  const handleUsernameSignIn = async () => {
    if (validateUsernameSignIn()) {
      setErrorMessage("");
      setProvider("Email");
      setHasAttemptedLogin(true);

      const action = isLogin
        ? signInWithEmailAndPassword
        : createUserWithEmailAndPassword;

      await action(auth, email, password)
        .then(async (userCredential) => {
          const currentUser = userCredential.user;
          updateProfile(currentUser, { displayName: displayName });
        })
        .catch(async (error: any) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/invalid-email") {
            setInvalidEmail(true);
            setErrorMessage("Invalid Email");
          }
          if (errorCode === "auth/weak-password") {
            setInvalidPassword(true);
            setErrorMessage(
              "Weak Password provided. \n Please use a stronger password."
            );
          }
          if (errorCode === "auth/email-already-in-use") {
            checkUserUnderGoogleAuth();
          }
          if (errorCode === "auth/invalid-credential") {
            checkUserUnderGoogleAuth();
          }
          console.error(errorCode, ": ", errorMessage);
        });
    }
  };

  return (
    <div className={classes.loginContainer}>
      {hasAttemptedLogin && user && (
        <div className={classes.loadingModal}>
          <LoadingFull className={classes.loading} />
        </div>
      )}
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.layoutContainer}
      >
        <div className={classes.logoContainer}>
          <img
            src="/assets/LeagueLink_Logo_v1.png"
            className={classes.shieldLogo}
          />
        </div>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
          className={classes.formContainer}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            className={classes.loginForm}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Tabs
                value={isLogin}
                onChange={handleLoginChange}
                className={classes.tabs}
                TabIndicatorProps={{
                  style: { display: "none" },
                }}
              >
                <Tab
                  value={true}
                  label="Log In"
                  disableRipple
                  className={classes.tab}
                />
                <Tab
                  value={false}
                  label="Sign Up"
                  disableRipple
                  className={classes.tab}
                />
              </Tabs>
              <div className={classes.inputContainer}>
                {!isLogin && (
                  <TextField
                    id="loginDisplayNameTextField"
                    placeholder="display name"
                    error={invalidDisplayName}
                    InputProps={{
                      startAdornment: (
                        <Icon path={mdiAccount} className={classes.inputIcon} />
                      ),
                    }}
                    onChange={handleDisplayNameChange}
                    type="text"
                    className={classes.input}
                    style={
                      !isLogin && {
                        borderTopLeftRadius: leagueLinkTheme.spacing(4),
                      }
                    }
                  />
                )}
                <TextField
                  placeholder="email"
                  error={invalidEmail}
                  InputProps={{
                    startAdornment: (
                      <Icon path={mdiEmail} className={classes.inputIcon} />
                    ),
                  }}
                  onChange={handleEmailChange}
                  type="email"
                  className={classes.input}
                />
                <TextField
                  placeholder="password"
                  error={invalidPassword}
                  InputProps={{
                    startAdornment: (
                      <Icon path={mdiLock} className={classes.inputIcon} />
                    ),
                    endAdornment: (
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className={classes.showPasswordButton}
                      >
                        <Icon
                          path={showPassword ? mdiEye : mdiEyeOff}
                          className={classes.inputIcon}
                        />
                      </div>
                    ),
                  }}
                  onChange={handlePasswordChange}
                  type={showPassword ? "unset" : "password"}
                  className={classes.input}
                />
              </div>
              <div
                aria-disabled={
                  invalidEmail || invalidPassword || invalidDisplayName
                }
                onClick={handleUsernameSignIn}
                className={classes.actionButton}
              >
                <Typography className={classes.actionText}>
                  {isLogin ? "Log In" : "Sign Up"}
                </Typography>
              </div>
              <Typography className={classes.errorCredentialsText}>
                {errorMessage}
              </Typography>
            </Grid>
            <Divider className={classes.loginDivider} />
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              className={classes.loginOptionsContainer}
            >
              <div
                onClick={handleGoogleSignIn}
                className={classes.providerLoginButton}
              >
                <Icon path={mdiGoogle} className={classes.providerIcon} />
                <Typography className={classes.providerText}>
                  Continue with Google
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export const Login = LoginComponent;
