import * as React from "react";
import { loginStyles } from "./LoginStyles";
import { Divider, Grid, Typography } from "@mui/material";
import Icon from "@mdi/react";
import { mdiFacebook, mdiGoogle } from "@mdi/js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../..";
import { useAuth } from "../../hooks/useAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface ILogin {}

const LoginComponent: React.FunctionComponent<ILogin> = () => {
  const { classes } = loginStyles();
  const { login } = useAuth();
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loading) {
      console.log("loading", user);
    }
    if (user) {
      console.log("ready", user);
      handleUserData();
    }
  }, [user, loading]);

  const handleGoogleSignIn = async () => {
    await signInWithRedirect(auth, googleProvider).catch((e) => {
      console.error(e);
      return;
    });
  };

  const handleFacebookSignIn = async () => {
    navigate("/", { replace: true });
  };

  const handleUserData = async () => {
    if (user) {
      const userData = {
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };
      await getDoc(doc(db, "usernames", user.uid))
        .then(async (data) => {
          if (!data.exists()) {
            await setDoc(doc(db, "users", user.uid), userData);
          }
        })
        .finally(() => {
          login(userData);
        });
    }
  };

  return (
    <div className={classes.loginContainer}>
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.layoutContainer}
      >
        <div className={classes.logoContainer}>
          <img
            src="/assets/LeagueLink_Shield_v1.png"
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
            <img
              src="/assets/LeagueLink_Text_v1.png"
              className={classes.textLogo}
            />
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
              <div
                onClick={handleFacebookSignIn}
                className={classes.providerLoginButton}
              >
                <Icon path={mdiFacebook} className={classes.providerIcon} />
                <Typography className={classes.providerText}>
                  Continue with Facebook
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
