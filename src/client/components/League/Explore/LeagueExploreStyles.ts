import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const leagueExploreStyles = makeStyles()((theme: Theme) => ({
  leagueExploreContainer: {
    marginTop: theme.spacing(16),
    width: "100%",
    height: "100%",
    overflow: "auto",
    flexWrap: "nowrap",
    maxWidth: theme.spacing(250),
    margin: "0 auto",
    boxSizing: "border-box",
    padding: `${theme.spacing(0)} ${theme.spacing(4)}`,
    paddingTop: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down(310 * 4)]: {
      height: `calc(100% - ${theme.spacing(16)})`,
    },
  },
  keyboardExploreContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 9000,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
  },
  keyboardContentWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: `calc(100svw - ${theme.spacing(8)})`,
    height: `calc(100svh - ${theme.spacing(2)})`,
    zIndex: 9000,
    backgroundColor: theme.palette.background.default,
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  },
  keyboardBackButton: {
    position: "absolute",
    top: 16,
    left: 0,
    zIndex: 9000,
    flex: 1,
    width: theme.spacing(10),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 0,
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`,
  },
  actionIcon: {
    width: theme.spacing(6),
    color: theme.palette.info.light,
  },
  searchBarContainer: {
    width: "100%",
    height: theme.spacing(10),
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    alignItems: "center",
  },
  searchTextField: {
    flex: 1,
    height: theme.spacing(6),
    marginLeft: theme.spacing(3),
  },
  searchIcon: {
    width: theme.spacing(10),
    color: theme.palette.info.light,
  },
  listContainer: {
    width: "100%",
    height: `calc(100% - ${theme.spacing(12)})`,
    display: "flex",
    paddingTop: theme.spacing(2),
  },
  searchItemContainer: {
    width: "100%",
    height: theme.spacing(10),
    color: theme.palette.primary.contrastText,
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxSizing: "border-box",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  teamRenderContainer: {
    flexWrap: "nowrap",
    "& em": {
      color: theme.palette.secondary.main,
    },
  },
  teamTextContainer: {
    flexWrap: "nowrap",
    width: `calc(100% - ${theme.spacing(14)})`,
    "& p": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      width: "100%",
      textAlign: "start",
      "& span": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%",
      },
    },
  },
  teamLogo: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    cursor: "pointer",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    "& > img": {
      objectFit: "contain",
      boxSizing: "border-box",
      padding: theme.spacing(1),
    },
  },
  teamNameText: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
  teamAbbrText: {
    color: theme.palette.primary.light,
    fontWeight: "bold",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
  },
  courseItemLocationIcon: {
    color: theme.palette.primary.light,
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(310 * 4)]: {
      height: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      height: theme.spacing(3),
    },
  },
  teamCourseText: {
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
  teamLocationText: {
    color: theme.palette.primary.light,
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(3),
    },
  },
}));
