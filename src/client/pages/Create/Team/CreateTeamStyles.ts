import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const createTeamStyles = makeStyles()((theme: Theme) => ({
  createTeamContainer: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    height: "100svh",
    overflow: "hidden",
    display: "flex",
  },
  createTeamContentContainer: {
    marginTop: theme.spacing(16),
    width: "100%",
    overflow: "auto",
    [theme.breakpoints.up(310 * 4)]: {
      marginLeft: theme.spacing(39),
      padding: `${theme.spacing(4)} ${theme.spacing(16)}`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
      paddingBottom: theme.spacing(20),
    },
  },
  propertyContainer: {
    paddingTop: theme.spacing(4),
    gap: theme.spacing(4),
  },
  logo: {
    width: theme.spacing(50),
    height: theme.spacing(50),
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.light,
    marginLeft: "auto",
    marginRight: "auto",
    border: `${theme.spacing(1)} solid ${theme.palette.primary.contrastText}`,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.light + "AA",
      border: `${theme.spacing(1)} solid ${theme.palette.primary.contrastText}AA`,
    },
  },
  logoText: {
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    color: theme.palette.info.light,
    paddingTop: theme.spacing(2),
  },
  inputLabelText: {
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    width: theme.spacing(30),
    textAlign: "start",
    marginRight: theme.spacing(2),
    color: theme.palette.info.light,
  },
  inputLabelDivider: {
    height: theme.spacing(7),
  },
  colorPickerContainer: {
    width: "auto",
  },
  colorPreview: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: theme.spacing(4),
  },
  createTeamButton: {
    marginTop: "auto",
    width: "100%",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.contrastText,
    fontWeight: "bold",
    fontSize: theme.spacing(5),
    "&:hover": {
      backgroundColor: theme.palette.primary.light + "AA",
    },
  },
}));
