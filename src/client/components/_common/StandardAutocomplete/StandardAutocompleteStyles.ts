import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const standardAutocompleteStyles = makeStyles()((theme: Theme) => ({
  standardAutocompleteContainer: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  autocomplete: {
    width: "100%",
  },
  textField: {
    flex: 1,
    width: `calc(100% - ${theme.spacing(6)})`,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    fontSize: "inherit",
    "& .MuiInputLabel-shrink": {
      display: "none",
    },
    "& > div": {
      "&:before": {
        display: "none",
      },
      "&:after": {
        display: "none",
      },
    },
  },
  virtualPopper: {
    marginTop: `${theme.spacing(2)} !important`,
    "*::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.spacing(0),
    },
  },
  defaultItemRenderer: {
    boxSizing: "border-box",

    "& > li": {
      height: "100%",
      borderBottom: `1px solid ${theme.palette.info.light}11`,
      lineHeight: theme.spacing(7),
      padding: 0,
      display: "-webkit-box !important",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "pre-wrap",
      paddingLeft: `${theme.spacing(7)} !important`,
      textIndent: theme.spacing(-4),

      "&.Mui-focused": {
        backgroundColor: `${theme.palette.primary.light}AA !important`,
      },
      "&[aria-selected=true]": {
        backgroundColor: `${theme.palette.primary.light}AA !important`,
        color: theme.palette.background.default,
        fontWeight: "bold",
      },
    },
  },
}));
