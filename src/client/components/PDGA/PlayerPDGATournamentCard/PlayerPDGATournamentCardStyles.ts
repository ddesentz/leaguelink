import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const playerPDGATournamentCardStyles = makeStyles()((theme: Theme) => ({
  playerPDGATournamentCardWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: theme.spacing(300),
    alignSelf: "center",
  },
  playerPDGATournamentCardContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    inset: theme.spacing(2),
    borderRadius: theme.spacing(2),
    margin: `${theme.spacing(2)} ${theme.spacing(2)}`,
    cursor: "pointer",
    overflow: "hidden",
    boxShadow: `0 4px 8px 2px ${theme.palette.secondary.contrastText}AA`,
  },
  tournamentDetailContainer: {
    boxSizing: "content-box",
    borderRadius: theme.spacing(2),
    borderBottomRightRadius: 0,
    height: theme.spacing(18),
    backgroundColor: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.contrastText}44, ${theme.palette.primary.main}66)`,
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
  },
  tournamentNameWrapper: {
    display: "flex",
    background: theme.palette.background.paper,
    backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.light}44, ${theme.palette.background.paper}44)`,
    transformOrigin: "100% 0",
    transform: "skew(-45deg)",
    zIndex: 1,
    height: "100%",
    maxWidth: "60%",
    flex: 1,
  },
  tournamentNameText: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    textAlign: "left",
    transform: "skew(45deg)",
    padding: `${theme.spacing(2)} ${theme.spacing(12)}`,
    boxSizing: "border-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    lineHeight: theme.spacing(5),
    WebkitLineClamp: 3,
    zIndex: 1,
    position: "relative",
    WebkitBoxOrient: "vertical",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  rightItemsContainer: {
    flexGrow: 1,
    paddingRight: theme.spacing(2),
    maxWidth: "40%",
    justifyContent: "space-around",
    height: "100%",
    padding: theme.spacing(2),
  },
  dateIcon: {
    width: theme.spacing(4),
    color: theme.palette.primary.light,
    marginRight: theme.spacing(2),
  },
  tournamentDateText: {
    color: theme.palette.info.light,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
    textAlign: "right",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  tierText: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.primary.light,
    padding: `${theme.spacing(0.5)} ${theme.spacing(3)}`,
    boxSizing: "border-box",
    fontWeight: "bold",
    borderRadius: theme.spacing(4),
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  placementWrapper: {
    padding: `${theme.spacing(3)} 0`,
    backgroundColor: theme.palette.background.default,
    backgroundImage: `linear-gradient(225deg, ${theme.palette.background.paper}22, ${theme.palette.info.light}11)`,
    zIndex: 2,
    position: "relative",
  },
  placementDetailContainer: {
    flex: 1,
    height: theme.spacing(20),
  },
  placementDetailValue: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    height: theme.spacing(12),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
  },
  placementDetailLabel: {
    color: theme.palette.primary.light,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  ratingDiffIcon: {
    marginLeft: theme.spacing(2),
  },
}));
