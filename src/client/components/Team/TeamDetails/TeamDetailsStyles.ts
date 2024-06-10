import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const teamDetailsStyles = makeStyles()((theme: Theme) => ({
  teamDetailsContainer: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    height: "fit-content",
    [theme.breakpoints.up(310 * 4)]: {
      padding: `${theme.spacing(4)} ${theme.spacing(16)}`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
    },
  },
  teamDetailsRow: {
    width: "100%",
  },
  teamLogo: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    "& > img": {
      objectFit: "contain",
      boxSizing: "border-box",
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up(310 * 4)]: {
      width: theme.spacing(40),
      height: theme.spacing(40),
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
  },
  detailsWrapper: {
    [theme.breakpoints.up(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(40)})`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(25)})`,
    },
  },
  rowDetailContainer: {
    width: "50%",
    height: "100%",
  },
  rowDetailLabel: {
    color: theme.palette.primary.light,
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
  rowDetailValue: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(10),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
  },
  teamNameText: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    marginTop: theme.spacing(2),
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
  },
  courseItemLocationIcon: {
    color: theme.palette.primary.light,
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(310 * 4)]: {
      height: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      height: theme.spacing(4),
    },
  },
  teamCourseText: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  teamLocationText: {
    color: theme.palette.primary.light,
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  actionContainer: {
    marginTop: theme.spacing(2),
    gap: theme.spacing(4),
  },
  actionButtonWrapper: {
    display: "flex",
    flex: 1,
    maxWidth: "50%",
    minWidth: "fit-content",
    zIndex: 1,
    justifyContent: "center",
  },
}));
