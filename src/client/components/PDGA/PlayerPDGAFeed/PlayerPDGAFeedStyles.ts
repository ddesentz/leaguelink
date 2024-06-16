import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const playerPDGAFeedStyles = makeStyles()((theme: Theme) => ({
  playerPDGAFeedContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexWrap: "nowrap",
    overflow: "hidden",
    position: "fixed",
    top: 0,
  },
  loading: {
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.3,
    marginTop: theme.spacing(10),
    width: "100%",
    [theme.breakpoints.up(310 * 4)]: {
      height: theme.spacing(40),
      paddingBottom: theme.spacing(20),
    },
    [theme.breakpoints.down(310 * 4)]: {
      height: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
  },
  scrollContainer: {
    width: "100%",
    height: "100svh",
    overflow: "auto",
    zIndex: 2,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
    [theme.breakpoints.up(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(39)})`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      marginBottom: theme.spacing(16),
    },
  },
  autoSizer: {
    height: "100svh",
    width: "100svw",
    "& > div": {
      "& > div": {
        paddingBottom: theme.spacing(4),
        [theme.breakpoints.down(310 * 4)]: {
          paddingBottom: theme.spacing(20),
        },
      },
    },
  },
  virtualItemWrapper: {
    "& > div": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));
