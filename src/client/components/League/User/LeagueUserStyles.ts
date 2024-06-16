import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const leagueUserStyles = makeStyles()((theme: Theme) => ({
  noUserContainer: {
    height: "100%",
  },
  noUserIcon: {
    height: "10rem",
    color: theme.palette.primary.light + "33",
  },
  noUserText: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.primary.light + "33",
  },
  leagueUserContainer: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    display: "flex",
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    zIndex: 1,
    position: "relative",
    overflow: "hidden",
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
  feedContent: {
    boxSizing: "border-box",
    height: "100%",
    width: "100%",
  },
  tabs: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.info.light}33`,
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    zIndex: 1,
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
  },
  tabIndicator: {
    backgroundColor: theme.palette.primary.light,
  },
  tab: {
    flex: 1,
    maxWidth: "unset",
    color: theme.palette.primary.contrastText + "AA",
    "&.Mui-selected": {
      color: theme.palette.primary.contrastText,
    },
  },
}));
