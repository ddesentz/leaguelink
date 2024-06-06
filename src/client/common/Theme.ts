import { createTheme } from "@mui/material/styles";

export const leagueLinkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#7F9FBA",
      main: "#2c3e50",
      dark: "#27303E",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#FFDBBB",
      main: "#FFC501",
      dark: "#ffab00",
      contrastText: "#000000",
    },
    info: {
      light: "#cfd0d2",
      main: "#bdc3c7",
      dark: "#2b2c2e",
      contrastText: "#191919",
    },
    error: {
      light: "#EF9A9A",
      main: "#EF5350",
      dark: "#E53935",
      contrastText: "#FFEBEE",
    },
    background: {
      default: "#1D1E25",
      paper: "#252A31",
    },
  },
  spacing: 4,
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Montserrat"].join(","),
  },
});
