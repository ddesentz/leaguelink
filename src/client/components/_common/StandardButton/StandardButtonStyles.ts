import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const standardButtonStyles = makeStyles()((theme: Theme) => ({
  primaryButtonContainer: {
    width: "100%",
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
    borderRadius: theme.spacing(10),
    display: "flex",
    "&:hover": {
      "&:before": {
        animation: "hoverButton 5s linear infinite",
      },
      "&:after": {
        background: theme.palette.background.paper,
      },
    },
    "&:before": {
      content: '""',
      position: "absolute",
      background: `conic-gradient( 
        ${theme.palette.primary.main}, 
        ${theme.palette.primary.light},
        ${theme.palette.primary.main} 
        )`,
      top: "50%",
      left: "50%",
      width: "100%",
      aspectRatio: 1,
      transform: "translate(-50%, -50%)",
      zIndex: -2,
    },
    "&:after": {
      content: '""',
      position: "absolute",
      inset: theme.spacing(0.5),
      background: theme.palette.background.paper,
      zIndex: -1,
      borderRadius: theme.spacing(10),
    },
  },
}));
