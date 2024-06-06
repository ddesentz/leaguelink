import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const teamBannerStyles = makeStyles()((theme: Theme) => ({
  appBarContainer: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.contrastText,
    backgroundImage: `linear-gradient(${theme.palette.secondary.contrastText}11, ${theme.palette.primary.dark}cc)`,
    zIndex: 100,
    [theme.breakpoints.up(310 * 4)]: {
      paddingLeft: theme.spacing(39),
    },
  },
  toolbarContainer: {
    justifyContent: "space-between",
    padding: "0 !important",
  },
  teamBannerContainer: {
    width: "100%",
    height: theme.spacing(16),
    boxSizing: "border-box",
    overflow: "hidden",
  },
  logo: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    top: `calc(-100% - ${theme.spacing(16)})`,
    transform: "scale(1.5)",
    opacity: 0.5,
    zIndex: 1,
    width: theme.spacing(50),
    height: theme.spacing(50),
    objectFit: "contain",
    boxSizing: "border-box",
  },
  lightText: {
    fontSize: theme.spacing(10),
    height: theme.spacing(16),
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.contrastText,
  },
  darkText: {
    fontSize: theme.spacing(10),
    height: theme.spacing(16),
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.secondary.contrastText,
  },
  leftItems: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    height: theme.spacing(16),
    zIndex: 100,
  },
  lightButton: {
    width: theme.spacing(16),
    "& > svg": {
      width: theme.spacing(16),
      color: theme.palette.primary.contrastText,
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(8),
    },
  },
  darkButton: {
    width: theme.spacing(16),
    "& > svg": {
      width: theme.spacing(16),
      color: theme.palette.secondary.contrastText,
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(8),
    },
  },
}));
