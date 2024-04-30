import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const doublesMatchupStyles = makeStyles()((theme: Theme) => ({
  doublesMatchupContainer: {
    height: theme.spacing(32),
  },
  playerContainer: {
    width: "30%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "&:first-of-type": {
      borderRight: `1px solid ${theme.palette.primary.light}33`,
      paddingLeft: theme.spacing(3),
    },
    "&:last-of-type": {
      borderLeft: `1px solid ${theme.palette.primary.light}33`,
      paddingRight: theme.spacing(3),
    },
  },
  playerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
    width: "100%",
    height: theme.spacing(16),
  },
  playerAvatar: {
    "& > img": {
      backgroundColor: theme.palette.info.light,
      objectFit: "contain",
      boxSizing: "border-box",
      padding: theme.spacing(0.5),
    },
    [theme.breakpoints.up(310 * 4)]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  },
  playerNameContainer: {
    [theme.breakpoints.up(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(12)})`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(8)})`,
    },
  },
  awayPlayerName: {
    width: "100%",
    color: theme.palette.info.light,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "left",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  homePlayerName: {
    width: "100%",
    color: theme.palette.info.light,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "right",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  scoreContainer: {
    width: "40%",
    height: "100%",
  },
  scoreResult: {
    width: "40%",
    height: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.info.light,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  playOffText: {
    width: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.info.light + "AA",
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  scoreBox: {
    width: "30%",
    height: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.contrastText,
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
