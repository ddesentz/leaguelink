import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const userBannerStyles = makeStyles()((theme: Theme) => ({
  appBarContainer: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.contrastText,
    backgroundImage: `linear-gradient(${theme.palette.secondary.contrastText}11, ${theme.palette.primary.dark}cc)`,
    zIndex: 1,
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
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
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
    height: theme.spacing(16),
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.contrastText,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: `calc(100% - ${theme.spacing(32)})`,
    margin: `0 ${theme.spacing(16)}`,
    fontSize: "2em",
    lineHeight: "2em",
  },
  darkText: {
    height: theme.spacing(16),
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.secondary.contrastText,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: `calc(100% - ${theme.spacing(32)})`,
    margin: `0 ${theme.spacing(16)}`,
    fontSize: "2em",
    lineHeight: "2em",
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
