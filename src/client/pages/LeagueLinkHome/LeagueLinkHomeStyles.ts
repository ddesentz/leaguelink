import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const leagueLinkStyles = makeStyles()((theme: Theme) => ({
  leagueLinkContainer: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    height: "100svh",
    overflow: "hidden",
    display: "flex",
  },
  loadingModal: {
    width: "100%",
    height: "100svh",
    position: "absolute",
    backgroundColor: theme.palette.background.default + "CC",
    zIndex: 1000,
  },
  loading: {
    height: "100%",
    width: "100%",
  },
}));
