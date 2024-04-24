import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const leagueScoresStyles = makeStyles()((theme: Theme) => ({
  leagueScoresContainer: {
    width: "100%",
    height: "100%",
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up(310 * 4)]: {
      padding: `${theme.spacing(2)} ${theme.spacing(16)}`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
    },
  },
  filterContainer: {
    width: "100%",
    height: theme.spacing(10),
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    alignItems: "center",
  },
  filterTextField: {
    flex: 1,
    height: theme.spacing(6),
    marginLeft: theme.spacing(3),
  },
  filterDivider: {
    height: theme.spacing(7),
  },
  filterBadge: {
    color: theme.palette.primary.contrastText,
    "& > .MuiBadge-badge": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  searchIcon: {
    width: theme.spacing(8),
    color: theme.palette.info.light,
  },
  filterIcon: {
    width: theme.spacing(8),
    color: theme.palette.primary.light,
  },
  listContainer: {
    width: "100%",
    height: `calc(100% - ${theme.spacing(10)})`,
    display: "flex",
    [theme.breakpoints.up(310 * 4)]: {
      height: `calc(100% - ${theme.spacing(10)})`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      height: `calc(100% - ${theme.spacing(24)})`,
    },
  },
  matchContainer: {
    width: "100%",
    maxWidth: theme.spacing(300),
    height: `calc(100% - ${theme.spacing(4)})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: `${theme.spacing(2)} 0`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.light + "11",
    },
  },
  matchLeftData: {
    gap: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.info.light}`,
    [theme.breakpoints.up(310 * 4)]: {
      paddingLeft: theme.spacing(6),
      width: `calc(100% - ${theme.spacing(100)})`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      paddingLeft: theme.spacing(2),
      width: `calc(100% - ${theme.spacing(20)})`,
    },
  },
  matchLeftRow: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > svg": {
      width: theme.spacing(4),
      transform: "rotate(270deg)",
      position: "relative",
      right: "-3px",
      color: theme.palette.info.light,
      opacity: 0,
    },
  },
  winningTeam: {
    p: {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
    svg: {
      opacity: 1,
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
  teamDataText: {
    fontSize: theme.spacing(5),
    color: theme.palette.info.light,
  },
  matchRightData: {
    height: "100%",
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up(310 * 4)]: {
      width: theme.spacing(100),
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(20),
    },
  },
  statusText: {
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    lineHeight: theme.spacing(10),
    color: theme.palette.primary.light,
  },
  dateText: {
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    lineHeight: theme.spacing(10),
    color: theme.palette.info.light,
  },
}));
