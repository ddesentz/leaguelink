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
      marginLeft: theme.spacing(39),
    },
  },
  matchContent: {
    marginTop: theme.spacing(16),
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
