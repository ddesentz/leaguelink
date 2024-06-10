import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const standardOptionButtonStyles = makeStyles()((theme: Theme) => ({
  standardOptionButtonContainer: {
    width: "100%",
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
    borderRadius: theme.spacing(100),
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
      borderRadius: theme.spacing(100),
    },
    "& .MuiButton-endIcon": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  optionButtonText: {
    width: `calc(100% - ${theme.spacing(12)})`,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: theme.palette.primary.contrastText,
    fontSize: "0.875rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  optionsPopover: {
    "& .MuiPopover-paper": {
      backgroundColor: "#566e85",
      backgroundImage: "unset",
      borderRadius: theme.spacing(1),
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      "& > div": {
        paddingBottom: theme.spacing(1),
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: "#566e85",
        borderRadius: theme.spacing(0),
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(2),
        border: `0.3em solid #566e85`,
      },
      "*::-webkit-scrollbar-corner": {
        backgroundColor: "#566e85",
      },
    },
  },
  optionText: {
    width: `calc(100% - ${theme.spacing(2)}) !important`,
    margin: `0 ${theme.spacing(1)}`,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.background.paper + "EE",
    },
  },
  selectedOptionText: {
    width: `calc(100% - ${theme.spacing(2)}) !important`,
    margin: `0 ${theme.spacing(1)}`,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper + "AA",
    color: theme.palette.primary.light,
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: theme.palette.background.paper + "AA",
    },
  },
}));
