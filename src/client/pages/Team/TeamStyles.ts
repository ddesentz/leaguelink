import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const teamStyles = makeStyles()((theme: Theme) => ({
  teamContainer: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    height: "100svh",
    overflow: "hidden",
    display: "flex",
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    marginTop: theme.spacing(16),
    zIndex: 1,
    [theme.breakpoints.up(310 * 4)]: {
      marginLeft: theme.spacing(39),
    },
    [theme.breakpoints.down(310 * 4)]: {
      paddingBottom: theme.spacing(20),
    },
  },
  loadingModal: {
    position: "absolute",
    backgroundColor: theme.palette.background.default + "CC",
    zIndex: 1000,
    [theme.breakpoints.up(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(39)})`,
      height: `calc(100svh - ${theme.spacing(16)})`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: "100%",
      height: `calc(100svh - ${theme.spacing(36)})`,
    },
  },
  loading: {
    height: "100%",
    width: "100%",
  },
  matchContent: {
    borderTop: `1px solid ${theme.palette.info.light}33`,
    boxSizing: "border-box",
  },
  tabs: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tabIndicator: {
    backgroundColor: theme.palette.primary.light,
  },
  tab: {
    width: "50%",
    maxWidth: "unset",
    color: theme.palette.primary.contrastText + "AA",
    "&.Mui-selected": {
      color: theme.palette.primary.contrastText,
    },
  },
}));
