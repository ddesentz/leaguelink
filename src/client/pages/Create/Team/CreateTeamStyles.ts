import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const createTeamStyles = makeStyles()((theme: Theme) => ({
  contentWrapper: {
    width: "100%",
    height: "100%",
    marginTop: theme.spacing(16),
    zIndex: 1,
    [theme.breakpoints.up(310 * 4)]: {
      marginLeft: theme.spacing(39),
    },
    [theme.breakpoints.down(310 * 4)]: {
      paddingBottom: theme.spacing(20),
    },
  },
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
    flexWrap: "nowrap",
    maxWidth: theme.spacing(250),
    margin: "0 auto",
    [theme.breakpoints.up(310 * 4)]: {
      padding: `${theme.spacing(4)} ${theme.spacing(16)}`,
      height: `calc(100% - ${theme.spacing(16)})`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
      height: `calc(100% - ${theme.spacing(32)})`,
    },
  },
  propertyContainer: {
    paddingTop: theme.spacing(4),
    gap: theme.spacing(4),
    paddingBottom: theme.spacing(10),
    marginBottom: "auto",
  },
  teamLogo: {
    width: theme.spacing(50),
    height: theme.spacing(50),
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: "auto",
    "& > img": {
      objectFit: "contain",
      boxSizing: "border-box",
      padding: theme.spacing(2),
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
  courseItemNameText: {
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    color: theme.palette.primary.contrastText,
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  courseItemLocationText: {
    fontSize: theme.spacing(4),
    color: theme.palette.primary.contrastText,
    fontWeight: 100,
    fontStyle: "italic",
    width: `calc(100% - ${theme.spacing(5)})`,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  courseItemLocationIcon: {
    height: theme.spacing(4),
    color: theme.palette.primary.light,
    marginRight: theme.spacing(1),
  },
}));
