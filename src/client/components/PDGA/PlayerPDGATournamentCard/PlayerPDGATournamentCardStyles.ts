import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const playerPDGATournamentCardStyles = makeStyles()((theme: Theme) => ({
  playerPDGATournamentCardWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playerPDGATournamentCardContainer: {
    width: `calc(100% - ${theme.spacing(4)})`,
    height: `calc(100% - ${theme.spacing(4)})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    margin: `${theme.spacing(2)} ${theme.spacing(2)}`,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.light + "11",
    },
  },
  tournamentDetailContainer: {
    boxSizing: "border-box",
    borderBottom: `1px solid ${theme.palette.primary.light}66`,
    paddingBottom: theme.spacing(2),
  },
  tournamentNameText: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
  },
  dateIcon: {
    width: theme.spacing(4),
    color: theme.palette.primary.light,
    marginRight: theme.spacing(2),
  },
  tournamentDateText: {
    color: theme.palette.info.light,
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
  tierText: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.primary.light,
    padding: `${theme.spacing(0.75)} ${theme.spacing(3)}`,
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
  placementDetailContainer: {
    flex: 1,
  },
  placementDetailValue: {
    color: theme.palette.info.light,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
  },
  placementDetailLabel: {
    color: theme.palette.info.light,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
}));
