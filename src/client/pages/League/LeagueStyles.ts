import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const leagueStyles = makeStyles()((theme: Theme) => ({
  leagueContainer: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    height: "100svh",
    overflow: "hidden",
    display: "flex",
  },
}));
