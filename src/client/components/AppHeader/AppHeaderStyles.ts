import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const appHeaderStyles = makeStyles()((theme: Theme) => ({
  appHeaderContainer: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.contrastText,
    backgroundImage: `linear-gradient(${theme.palette.secondary.contrastText}11, ${theme.palette.primary.dark}cc)`,
  },
  logoContainer: {
    height: theme.spacing(16),
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: theme.spacing(12),
    objectFit: "scale-down",
    filter: `drop-shadow(0 0 4px ${theme.palette.secondary.contrastText})`,
    cursor: "pointer",
    "&:hover": {
      filter: `drop-shadow(0 0 4px ${theme.palette.primary.light})`,
    },
  },
  actionContainer: {
    height: theme.spacing(16),
    display: "flex",
    alignItems: "center",
  },
  notificaitonBadge: {
    color: theme.palette.primary.contrastText,
    "& > .MuiBadge-badge": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  notificationIcon: {
    width: theme.spacing(6),
    color: theme.palette.info.light,
  },
  userIcon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  menuIcon: {
    width: theme.spacing(8),
    color: theme.palette.info.light,
  },
  userMenu: {
    "& > .MuiPaper-elevation": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      border: `1px solid ${theme.palette.info.light}33`,
      borderRadius: theme.spacing(3),
      padding: `${theme.spacing(2)} ${theme.spacing(0)}`,
      "& > .MuiList-root": {
        padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
        "& > .MuiMenuItem-root": {
          padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
          borderRadius: theme.spacing(1),
          border: `1px solid ${theme.palette.info.light}33`,
          backgroundColor: theme.palette.primary.light + "33 !important",
          "&:hover": {
            backgroundColor: theme.palette.background.paper + "66 !important",
          },
        },
      },
    },
  },
  userDisplayName: {
    fontSize: theme.spacing(5),
    fontWeight: "bold",
    color: theme.palette.info.light,
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
  userEmail: {
    fontSize: theme.spacing(4),
    color: theme.palette.primary.light,
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  userMenuDivider: {
    width: "100%",
    borderColor: theme.palette.info.light + "33",
    borderBottomWidth: "1px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  userMenuItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  userMenuItemText: {
    fontSize: theme.spacing(4),
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  userMenuItemIcon: {
    width: theme.spacing(4),
    marginLeft: theme.spacing(4),
    color: theme.palette.primary.light,
  },
  breadCrumbIcon: {
    width: theme.spacing(8),
    color: theme.palette.info.light + "AA",
  },
  leagueText: {
    fontSize: theme.spacing(6),
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
  },
}));
