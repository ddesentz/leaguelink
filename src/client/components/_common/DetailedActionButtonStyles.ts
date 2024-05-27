import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const detailedActionButtonStyles = makeStyles()((theme: Theme) => ({
  detailedActionButtonContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    gap: theme.spacing(4),
    flexWrap: "nowrap",
    "&:hover": {
      backgroundColor: theme.palette.background.paper + "CC",
      cursor: "pointer",
    },
  },
  highlightBar: {
    width: theme.spacing(1),
    height: "100%",
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  textContainer: {
    width: "unset",
    marginRight: "auto",
  },
  titleText: {
    fontSize: theme.spacing(8),
    fontWeight: "bold",
    color: theme.palette.info.light,
    width: "100%",
    textAlign: "start",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(8),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
  },
  descriptionText: {
    fontSize: theme.spacing(4),
    color: theme.palette.primary.light,
    width: "100%",
    textAlign: "start",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  actionIcon: {
    width: theme.spacing(8),
    color: theme.palette.primary.contrastText,
  },
}));
