import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const teamBannerStyles = makeStyles()((theme: Theme) => ({
  teamBannerContainer: {
    width: "100%",
    height: theme.spacing(16),
    boxSizing: "border-box",
    overflow: "hidden",
  },
  logo: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    top: `calc(-100% - ${theme.spacing(16)})`,
    transform: "scale(1.5)",
    opacity: 0.3,
    zIndex: 1,
  },
  abbrText: {
    fontSize: theme.spacing(10),
    height: theme.spacing(16),
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
