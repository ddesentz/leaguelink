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
    [theme.breakpoints.up(310 * 4)]: {
      width: `calc(50% - ${theme.spacing(0.25)})`,
      height: "100%",
      borderRight: `1px solid ${theme.palette.primary.light}`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(10)})`,
      height: `calc(50svh - ${theme.spacing(0.25)})`,
      padding: `0 ${theme.spacing(5)}`,
      borderBottom: `1px solid ${theme.palette.primary.light}`,
    },
  },
  formContainer: {
    width: "50%",
    height: `calc(100% - ${theme.spacing(20)})`,
    padding: `0 ${theme.spacing(5)}`,
    [theme.breakpoints.down(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(10)})`,
      height: "50svh",
    },
  },
  shieldLogo: {
    width: "100%",
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
    border: `1px solid ${theme.palette.background.paper}`,
    borderRadius: theme.spacing(4),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper + "66",
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
    borderColor: theme.palette.primary.light + "66",
    borderBottomWidth: "1px",
    margin: `${theme.spacing(5)} 0`,
    overflow: "visible",
  },
  providerLoginButton: {
    width: "50%",
    margin: "auto",
    gap: theme.spacing(4),
    height: theme.spacing(10),
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: `1px solid ${theme.palette.primary.light}33`,
    borderRadius: theme.spacing(4),
    padding: `${theme.spacing(2)} ${theme.spacing(12)}`,
    cursor: "pointer",
    backgroundColor: theme.palette.background.paper + "66",
    "&:hover": {
      border: `1px solid ${theme.palette.primary.light}66`,
      backgroundColor: theme.palette.background.paper + "AA",
    },
  },
  providerIcon: {
    width: theme.spacing(8),
    color: theme.palette.primary.light,
  },
  providerText: {
    width: `calc(100% - ${theme.spacing(8)})`,
    textAlign: "center",
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(4),
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
}));
