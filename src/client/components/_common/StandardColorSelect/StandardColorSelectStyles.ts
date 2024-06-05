import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const standardColorSelectStyles = makeStyles()((theme: Theme) => ({
  standardColorSelectContainer: {
    // backgroundColor: theme.palette.background.paper,
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    cursor: "pointer",
  },
  colorPicker: {
    width: "100% !important",
  },
}));
