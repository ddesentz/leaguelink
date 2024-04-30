import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const matchScoreboardStyles = makeStyles()((theme: Theme) => ({
  matchScoreboardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(8),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up(310 * 4)]: {
      paddingBottom: theme.spacing(4),
      marginLeft: theme.spacing(20),
      marginRight: theme.spacing(20),
    },
    [theme.breakpoints.down(310 * 4)]: {
      paddingBottom: theme.spacing(20),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  matchTypeWrapper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    overflow: "hidden",
  },
  toggleViewContainer: {
    padding: theme.spacing(2),
    boxSizing: "border-box",
    cursor: "pointer",
    height: theme.spacing(12),
    backgroundColor: theme.palette.primary.dark,
  },
  toggleViewLabel: {
    color: theme.palette.info.light,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
  toggleViewIcon: {
    color: theme.palette.info.light,
    [theme.breakpoints.up(310 * 4)]: {
      width: theme.spacing(8),
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(6),
    },
  },
  matchUpList: {
    borderTop: `1px solid ${theme.palette.primary.light}33`,
    backgroundColor: theme.palette.background.default,
    "& > div:nth-of-type(odd)": {
      backgroundColor: theme.palette.primary.light + "11",
    },
  },
  totalsWrapper: {
    width: "100%",
    height: theme.spacing(12),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${theme.palette.primary.dark} !important`,
    borderTop: `1px solid ${theme.palette.primary.light}33`,
    boxSizing: "border-box",
  },
  totalsContainer: {
    width: "40%",
    height: "100%",
    boxSizing: "content-box",
    borderLeft: `1px solid ${theme.palette.primary.light}33`,
    borderRight: `1px solid ${theme.palette.primary.light}33`,
  },
  totalsResult: {
    width: "40%",
    height: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
  totalsScoreBox: {
    width: "30%",
    height: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.info.light,
    fontWeight: "bold",
    boxSizing: "border-box",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    "&:first-of-type": {
      borderRight: `1px solid ${theme.palette.primary.light}33`,
    },
    "&:last-of-type": {
      borderLeft: `1px solid ${theme.palette.primary.light}33`,
    },
  },
}));
