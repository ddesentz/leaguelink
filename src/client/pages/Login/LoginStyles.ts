import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const loginStyles = makeStyles()((theme: Theme) => ({
  loginContainer: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    width: "100svw",
    height: "100svh",
    overflow: "hidden",
  },
  layoutContainer: {
    width: "100%",
    height: "100%",
    [theme.breakpoints.down(310 * 4)]: {
      flexDirection: "column",
    },
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.light + "22",
    backgroundImage: "url(/assets/LeagueLink_Pattern_v1.png)",
    backgroundRepeat: "repeat",
    backgroundBlendMode: "overlay",
    backgroundSize: "25%",
    willChange: "background-position",
    backgroundPosition: "0% 100%",
    [theme.breakpoints.up(310 * 4)]: {
      width: `calc(50% - ${theme.spacing(0.25)})`,
      height: "100%",
      borderRight: `1px solid ${theme.palette.info.light}`,
      animation: "panWeb 180s linear infinite",
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(10)})`,
      height: `calc(20svh - ${theme.spacing(0.25)})`,
      padding: `0 ${theme.spacing(5)}`,
      borderBottom: `1px solid ${theme.palette.info.light}`,
      animation: "panMobile 180s linear infinite",
    },
  },
  formContainer: {
    width: "50%",
    height: `calc(100% - ${theme.spacing(20)})`,
    padding: `0 ${theme.spacing(5)}`,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(10)})`,
      height: "80svh",
    },
  },
  shieldLogo: {
    width: `calc(100% - ${theme.spacing(10)})`,
    height: `calc(100% - ${theme.spacing(10)})`,
    padding: theme.spacing(5),
    objectFit: "scale-down",
    filter: "drop-shadow(0 0 20px #000000)",
  },
  textLogo: {
    width: "50%",
    filter: "drop-shadow(0 0 5px #000000)",
  },
  topLogoContainer: {
    [theme.breakpoints.up(310 * 4)]: {
      display: "none",
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: "100%",
    },
  },
  loginForm: {
    width: "100%",
    gap: theme.spacing(3),
    border: `1px solid ${theme.palette.info.light}33`,
    borderRadius: theme.spacing(4),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    boxShadow: `0 ${theme.spacing(4)} ${theme.spacing(5)} ${theme.spacing(1)} ${
      theme.palette.secondary.contrastText
    }`,
  },
  loginOptionsContainer: {
    gap: theme.spacing(4),
  },
  loginHeaderText: {
    fontWeight: "bold",
    fontSize: theme.spacing(6),
    color: theme.palette.primary.light,
    marginTop: theme.spacing(4),
  },
  loginDivider: {
    width: "100%",
    borderColor: theme.palette.info.light + "33",
    borderBottomWidth: "1px",
    marginBottom: theme.spacing(5),
    overflow: "visible",
    "&::after": {
      content: "'OR'",
      position: "relative",
      top: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      padding: `0 ${theme.spacing(10)}`,
      color: theme.palette.primary.light,
    },
  },
  providerLoginButton: {
    width: `calc(100% - ${theme.spacing(24)})`,
    height: theme.spacing(10),
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${theme.palette.primary.light}33`,
    borderRadius: theme.spacing(4),
    padding: `${theme.spacing(2)} ${theme.spacing(12)}`,
    cursor: "pointer",
    backgroundColor: theme.palette.primary.light + "11",
    "&:hover": {
      border: `1px solid ${theme.palette.primary.light}66`,
      backgroundColor: theme.palette.primary.light + "33",
    },
  },
  providerIcon: {
    width: theme.spacing(8),
    color: theme.palette.primary.light,
    marginRight: theme.spacing(4),
  },
  providerText: {
    maxWidth: `calc(100% - ${theme.spacing(8)})`,
    textAlign: "center",
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(4),
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  tabs: {
    width: "100%",
    "& > div > div": {
      overflow: "visible",
    },
  },
  tab: {
    color: theme.palette.primary.contrastText + "AA",
    "&:hover": {
      color: theme.palette.primary.contrastText,
    },
    "&.Mui-selected": {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark,
      borderTopLeftRadius: theme.spacing(4),
      borderTopRightRadius: theme.spacing(4),
      overflow: "visible",
      "&::before": {
        content: "''",
        position: "absolute",
        borderRadius: `0 0  ${theme.spacing(4)} 0`,
        width: theme.spacing(4),
        height: theme.spacing(4),
        top: theme.spacing(8),
        left: theme.spacing(-4),
        boxShadow: `${theme.spacing(2)} ${theme.spacing(2)} 0 ${theme.spacing(2)} ${theme.palette.primary.dark}`,
      },
      "&::after": {
        content: "''",
        position: "absolute",
        borderRadius: `0 0 0 ${theme.spacing(4)}`,
        width: theme.spacing(4),
        height: theme.spacing(4),
        top: theme.spacing(8),
        right: theme.spacing(-4),
        boxShadow: `${theme.spacing(-2)} ${theme.spacing(2)} 0 ${theme.spacing(2)} ${theme.palette.primary.dark}`,
      },
    },
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    width: "100%",

    "& > div > fieldset": {
      border: "none",
    },
    "& > div:hover > input": {
      color: theme.palette.primary.light,
    },
    "& > div > input:focus": {
      color: `${theme.palette.primary.contrastText} !important`,
    },
    "& > div": {
      backgroundColor: theme.palette.primary.dark,
      borderRadius: 0,
      "& > input": {
        [theme.breakpoints.down(310 * 4)]: {
          fontSize: theme.spacing(3),
        },
      },
    },
    "&:first-of-type > div": {
      borderRadius: 0,
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: theme.spacing(4),
      backgroundColor: theme.palette.primary.dark,
    },
    "&:last-of-type > div": {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.dark,
    },
    "&:only-of-type > div": {
      borderRadius: 0,
      borderTopLeftRadius: theme.spacing(4),
      borderTopRightRadius: theme.spacing(4),
      backgroundColor: theme.palette.primary.dark,
    },
    "& > .Mui-error .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.palette.error.main}aa !important`,
    },
    "& > div > input:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 100px ${theme.palette.primary.dark} inset !important`,
      WebkitBackgroundClip: "content-box",
      [theme.breakpoints.down(310 * 4)]: {
        fontSize: theme.spacing(3),
      },
    },
  },
  inputIcon: {
    width: theme.spacing(6),
    color: theme.palette.primary.light,
    paddingRight: theme.spacing(2),
  },
  showPasswordButton: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  actionButton: {
    width: "100%",
    backgroundColor: theme.palette.primary.light,
    borderBottomLeftRadius: theme.spacing(4),
    borderBottomRightRadius: theme.spacing(4),
    height: theme.spacing(14),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.light + "CC",
    },
    "&[aria-disabled=true]": {
      cursor: "default",
      backgroundColor: theme.palette.primary.light + "33",
      color: theme.palette.secondary.contrastText + "AA",
    },
  },
  actionText: {
    fontSize: theme.spacing(5),
    fontWeight: "bold",
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
  errorCredentialsText: {
    display: "flex",
    alignSelf: "center",
    marginTop: theme.spacing(2),
    fontSize: theme.spacing(4),
    color: theme.palette.error.main + "AA",
    whiteSpace: "pre-wrap",
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  loadingModal: {
    width: "100%",
    height: "100svh",
    position: "absolute",
    backgroundColor: theme.palette.background.default + "CC",
    zIndex: 1000,
  },
  loading: {
    height: "100%",
    width: "100%",
  },
}));
