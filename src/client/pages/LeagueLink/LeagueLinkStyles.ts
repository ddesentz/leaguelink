import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const leagueLinkStyles = makeStyles()((theme: Theme) => ({
  leagueLinkContainer: {
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    width: "100vw",
    height: "100svh",
    overflow: "hidden",
    display: "flex",
  },
}));
