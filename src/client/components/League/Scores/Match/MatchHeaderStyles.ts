import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const matchHeaderStyles = makeStyles()((theme: Theme) => ({
  appBarContainer: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.contrastText,
    backgroundImage: `linear-gradient(${theme.palette.secondary.contrastText}11, ${theme.palette.primary.dark}cc)`,
    zIndex: 100,
    [theme.breakpoints.up(310 * 4)]: {
      paddingLeft: theme.spacing(39),
    },
  },
  leftItems: {
    display: "flex",
    alignItems: "center",
    height: theme.spacing(16),
  },
  logo: {
    height: theme.spacing(12),
    objectFit: "scale-down",
    filter: `drop-shadow(0 0 4px ${theme.palette.secondary.contrastText})`,
    cursor: "pointer",
    padding: `0 ${theme.spacing(3)}`,
    "&:hover": {
      filter: `drop-shadow(0 0 4px ${theme.palette.primary.light})`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      display: "none",
    },
  },
  toolbarContainer: {
    justifyContent: "space-between",
    [theme.breakpoints.up(310 * 4)]: {
      width: "100%",
      padding: "0 !important",
    },
  },
  matchContentHeader: {
    width: "100%",
  },
  iconButton: {
    width: theme.spacing(16),
    "&:hover": {
      "& > svg": {
        color: theme.palette.primary.light,
      },
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(8),
    },
  },
  backIcon: {
    width: theme.spacing(16),
    color: theme.palette.info.light,
  },
  matchLabel: {
    width: "fit-content",
    gap: theme.spacing(2),

    p: {
      fontWeight: "bold",
      color: theme.palette.primary.contrastText,
      [theme.breakpoints.up(310 * 4)]: {
        fontSize: theme.spacing(5),
      },
      [theme.breakpoints.down(310 * 4)]: {
        fontSize: theme.spacing(4),
      },
    },
  },
  notificationIcon: {
    width: theme.spacing(16),
    color: theme.palette.info.light,
  },
}));
