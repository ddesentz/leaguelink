import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const leagueHomeStyles = makeStyles()((theme: Theme) => ({
  leagueActionsContainer: {
    width: "100%",
    gap: theme.spacing(4),
    color: theme.palette.primary.contrastText,
    background: `linear-gradient(0deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
    borderBottomLeftRadius: theme.spacing(6),
    borderBottomRightRadius: theme.spacing(6),
    [theme.breakpoints.up(310 * 4)]: {
      padding: `${theme.spacing(6)} ${theme.spacing(16)}`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      padding: `${theme.spacing(6)} ${theme.spacing(2)}`,
    },
  },
  headerContainer: {
    gap: theme.spacing(3),
  },
  logo: {
    [theme.breakpoints.up(310 * 4)]: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  headerTextContainer: {
    width: "unset",
    marginRight: "auto",
  },
  minorText: {
    fontSize: theme.spacing(6),
    color: theme.palette.info.light,
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
  majorText: {
    fontSize: theme.spacing(8),
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(8),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
  },
}));
