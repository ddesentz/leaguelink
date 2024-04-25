import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const matchStickyTotalStyles = makeStyles()((theme: Theme) => ({
  matchStickyTotalContainer: {},
  matchScoreHeader: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    borderBottom: `1px solid ${theme.palette.info.light}33`,
    position: "fixed",
    zIndex: 2,
    [theme.breakpoints.up(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(39)})`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: "100%",
    },
  },
  teamScoreTotalContainer: {
    display: "flex",
    gap: theme.spacing(4),
    width: "30%",
  },
  winningTeamScore: {
    p: {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
  },
  winningTeamPointer: {
    opacity: `1 !important`,
  },
  matchStatusContainer: {
    display: "flex",
    gap: theme.spacing(2),
    width: "40%",
  },
  tieScore: {
    "& > div > p": {
      color: theme.palette.primary.contrastText,
    },
  },
  matchStatus: {
    width: "fit-content",
  },
  awayWinnerPointer: {
    color: theme.palette.primary.contrastText,
    transform: "rotate(270deg)",
    opacity: 0,
    [theme.breakpoints.up(310 * 4)]: {
      width: theme.spacing(6),
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(4),
    },
  },
  homeWinnerPointer: {
    width: theme.spacing(4),
    color: theme.palette.primary.contrastText,
    transform: "rotate(90deg)",
    opacity: 0,
    [theme.breakpoints.up(310 * 4)]: {
      width: theme.spacing(6),
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(4),
    },
  },
  matchStatusText: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  teamAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),
    "& > img": {
      backgroundColor: theme.palette.info.light,
      objectFit: "contain",
      boxSizing: "border-box",
      padding: theme.spacing(0.5),
    },
  },
  teamTotalText: {
    fontSize: theme.spacing(8),
    fontWeight: "bold",
    color: theme.palette.info.light + "AA",
  },
}));
