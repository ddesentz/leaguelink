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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.3,
    paddingTop: theme.spacing(10),
    [theme.breakpoints.up(310 * 4)]: {
      width: theme.spacing(40),
      height: theme.spacing(40),
      paddingBottom: theme.spacing(20),
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
  },
}));
