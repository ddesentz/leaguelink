import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const createTeamStyles = makeStyles()((theme: Theme) => ({
  createTeamContainer: {
    width: "100%",
    height: "100%",
  },
  createTeamContentContainer: {
    width: "100%",
    height: `calc(100% - ${theme.spacing(16)})`,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up(310 * 4)]: {
      padding: `${theme.spacing(4)} ${theme.spacing(32)}`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
      height: `calc(100% - ${theme.spacing(32)})`,
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
  inputLabelText: {
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    width: theme.spacing(30),
    textAlign: "start",
    marginRight: theme.spacing(2),
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
