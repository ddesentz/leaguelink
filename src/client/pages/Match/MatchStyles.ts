import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const matchStyles = makeStyles()((theme: Theme) => ({
  matchContainer: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    height: "100svh",
    overflow: "hidden",
    display: "flex",
  },
  contentContainer: {
    marginTop: theme.spacing(16),
    width: "100%",
    overflow: "auto",
    [theme.breakpoints.up(310 * 4)]: {
      marginLeft: theme.spacing(16),
    },
  },
  defaultHeaderText: {
    color: theme.palette.primary.light,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(8),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
  },
  defaultDescriptionText: {
    color: theme.palette.info.light,
    marginTop: theme.spacing(4),
    display: "flex",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
  actionText: {
    color: theme.palette.info.light,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
  menuIcon: {
    width: theme.spacing(8),
    color: theme.palette.info.light,
    marginLeft: theme.spacing(2),
  },
}));
