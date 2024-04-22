import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const leagueNavStyles = makeStyles()((theme: Theme) => ({
  appBarContainer: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up(310 * 4)]: {
      height: "100%",
      width: theme.spacing(16),
      zIndex: 2,
      left: 0,
      backgroundImage: `linear-gradient(270deg, ${theme.palette.primary.dark}cc, ${theme.palette.secondary.contrastText}11)`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      top: "auto",
      bottom: 0,
      backgroundImage: `linear-gradient(0deg, ${theme.palette.primary.dark}cc, ${theme.palette.secondary.contrastText}11)`,
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
    width: theme.spacing(16),
    [theme.breakpoints.up(310 * 4)]: {
      width: "100%",
    },
    "&[aria-selected=true]": {
      "& > svg": {
        color: theme.palette.primary.light,
      },
    },
  },
  avatarButton: {
    width: theme.spacing(16),
    [theme.breakpoints.up(310 * 4)]: {
      width: "100%",
    },
    "&[aria-selected=true]": {
      "& > div": {
        [theme.breakpoints.up(310 * 4)]: {
          border: `2px solid ${theme.palette.info.light}`,
        },
        [theme.breakpoints.down(310 * 4)]: {
          border: `1px solid ${theme.palette.info.light}`,
        },
      },
    },
  },
  backIcon: {
    width: theme.spacing(8),
    color: theme.palette.info.light,
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
