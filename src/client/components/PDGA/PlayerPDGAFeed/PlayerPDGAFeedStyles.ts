import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const playerPDGAFeedStyles = makeStyles()((theme: Theme) => ({
  playerPDGAFeedContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexWrap: "nowrap",
    overflow: "hidden",
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
  autoSizer: {
    height: "100%",
    width: "100svh",
    "& > div": {
      "& > div": {
        [theme.breakpoints.down(310 * 4)]: {
          paddingBottom: theme.spacing(16),
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
