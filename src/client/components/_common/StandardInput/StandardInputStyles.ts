import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const standardInputStyles = makeStyles()((theme: Theme) => ({
  standardInputContainer: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  textField: {
    flex: 1,
    width: "min-content",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    fontSize: "inherit",
  },
}));
