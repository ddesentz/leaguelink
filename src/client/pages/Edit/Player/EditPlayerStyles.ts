import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const editPlayerStyles = makeStyles()((theme: Theme) => ({
  editPlayerContainer: {
    marginTop: theme.spacing(16),
    width: "100%",
    overflow: "auto",
    flexWrap: "nowrap",
    maxWidth: theme.spacing(250),
    margin: "0 auto",
    [theme.breakpoints.up(310 * 4)]: {
      padding: `${theme.spacing(4)} ${theme.spacing(16)}`,
      height: "100%",
    },
    [theme.breakpoints.down(310 * 4)]: {
      padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
      height: `calc(100% - ${theme.spacing(16)})`,
    },
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    zIndex: 200,
    display: "contents",
    [theme.breakpoints.down(310 * 4)]: {
      paddingBottom: theme.spacing(20),
    },
  },
  playerAvatar: {
    width: theme.spacing(50),
    height: theme.spacing(50),
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: "auto",
    "& > img": {
      objectFit: "contain",
      boxSizing: "border-box",
    },
  },
  avatarText: {
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    color: theme.palette.info.light,
    paddingTop: theme.spacing(2),
  },
  propertyContainer: {
    paddingTop: theme.spacing(4),
    gap: theme.spacing(4),
    paddingBottom: theme.spacing(10),
    marginBottom: "auto",
  },
  inputLabelText: {
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    width: theme.spacing(30),
    textAlign: "start",
    marginRight: theme.spacing(2),
    color: theme.palette.info.light,
  },
  locationNameText: {
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    color: theme.palette.primary.contrastText,
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  locationIcon: {
    height: theme.spacing(4),
    color: theme.palette.primary.light,
    marginRight: theme.spacing(1),
  },
  socialMediaLinksContainer: {
    gap: theme.spacing(4),
  },
  socialMediaContainer: {
    flex: 1,
    cursor: "pointer",
  },
  socialMediaContainerActive: {
    display: "flex",
    width: "100%",
  },
  socialMediaIcon: {
    height: theme.spacing(8),
    color: theme.palette.primary.light,
    marginRight: theme.spacing(2),
  },
  socailMediaText: {
    fontSize: theme.spacing(4),
    color: theme.palette.info.light,
    fontWeight: "bold",
  },
  errorCredentialsText: {
    display: "flex",
    alignSelf: "center",
    marginTop: theme.spacing(2),
    fontSize: theme.spacing(4),
    color: theme.palette.error.main + "AA",
    whiteSpace: "pre-wrap",
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
}));
