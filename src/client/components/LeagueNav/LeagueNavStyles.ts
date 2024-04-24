import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const leagueNavStyles = makeStyles()((theme: Theme) => ({
  appBarContainer: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up(310 * 4)]: {
      height: "100%",
      width: theme.spacing(16),
      zIndex: 100,
      left: 0,
      backgroundImage: `linear-gradient(270deg, ${theme.palette.primary.dark}cc, ${theme.palette.secondary.contrastText}11)`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      top: "auto",
      bottom: 0,
      backgroundImage: `linear-gradient(180deg, ${theme.palette.primary.dark}cc, ${theme.palette.secondary.contrastText}11)`,
    },
  },
  toolbarContainer: {
    [theme.breakpoints.up(310 * 4)]: {
      width: "100%",
      padding: "0 !important",
    },
  },
  headerContainer: {
    [theme.breakpoints.up(310 * 4)]: {
      height: "100%",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      zIndex: 2,
      left: 0,
      paddingTop: theme.spacing(20),
      gap: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      height: theme.spacing(16),
    },
  },
  navButton: {
    [theme.breakpoints.up(310 * 4)]: {
      width: "100%",
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(12),
    },
    "&[aria-selected=true]": {
      "& > div > div > svg": {
        fill: `${theme.palette.primary.light} !important`,
      },
    },
  },
  avatarButton: {
    [theme.breakpoints.up(310 * 4)]: {
      width: "100%",
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(12),
    },
    "&[aria-selected=true]": {
      "& > div ": {
        border: `2px solid ${theme.palette.primary.light}`,
      },
    },
  },
  navIcon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    fill: theme.palette.info.light,
  },
  headerText: {
    fontSize: theme.spacing(6),
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
  },
  contentContainer: {
    marginTop: theme.spacing(16),
    [theme.breakpoints.up(310 * 4)]: {
      padding: theme.spacing(20),
      paddingTop: theme.spacing(16),
    },
    [theme.breakpoints.down(310 * 4)]: {
      padding: theme.spacing(6),
      paddingTop: theme.spacing(8),
    },
  },
  userIcon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  userDisplayName: {
    fontSize: theme.spacing(6),
    color: theme.palette.primary.contrastText,
    width: `calc(100% - ${theme.spacing(10)})`,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "start",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
  },
}));
