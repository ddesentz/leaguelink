import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const matchHeaderStyles = makeStyles()((theme: Theme) => ({
  appBarContainer: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.contrastText,
    backgroundImage: `linear-gradient(${theme.palette.secondary.contrastText}11, ${theme.palette.primary.dark}cc)`,
  },
  leftItems: {
    display: "flex",
    alignItems: "center",
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
    [theme.breakpoints.up(310 * 4)]: {
      width: "100%",
      padding: "0 !important",
    },
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
    width: `calc(100% - ${theme.spacing(32)})`,
    gap: theme.spacing(2),
    [theme.breakpoints.up(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(50)})`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: `calc(100% - ${theme.spacing(32)})`,
    },
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
