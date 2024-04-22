import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const leagueListStyles = makeStyles()((theme: Theme) => ({
  leagueListContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing(10),
    marginTop: theme.spacing(12),
    overflowY: "auto",
    [theme.breakpoints.up(310 * 4)]: {
      padding: theme.spacing(20),
      paddingTop: theme.spacing(16),
    },
    [theme.breakpoints.down(310 * 4)]: {
      padding: theme.spacing(8),
      paddingTop: theme.spacing(8),
    },
  },
  leagueCardContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(4),
    maxWidth: theme.spacing(320),
    boxShadow: `0 ${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(1)} ${
      theme.palette.secondary.contrastText
    }`,
    cursor: "pointer",
    "&:hover": {
      boxShadow: `0 ${theme.spacing(4)} ${theme.spacing(5)} ${theme.spacing(1)} ${
        theme.palette.secondary.contrastText
      }`,
      "& > div > p": {
        color: theme.palette.primary.light,
      },
    },
  },
  leagueImg: {
    width: "100%",
    aspectRatio: "3/1",
    objectFit: "fill",
    borderRadius: theme.spacing(4),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
    backgroundColor: theme.palette.background.default,
  },
  leagueImgSkeleton: {
    width: "100%",
    objectFit: "fill",
    borderRadius: theme.spacing(4),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up(310 * 4)]: {
      height: `calc((100svw - ${theme.spacing(40)}) / 3)`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      height: `calc((100svw - ${theme.spacing(16)}) / 3)`,
    },
  },
  leagueText: {
    color: theme.palette.info.light,
    fontWeight: "bold",
    padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
    textAlign: "start",
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(6),
      width: `calc(100% - ${theme.spacing(32)})`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(4),
      width: `calc(100% - ${theme.spacing(24)})`,
    },
  },
  sportIcon: {
    padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
    [theme.breakpoints.up(310 * 4)]: {
      width: theme.spacing(20),
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(12),
    },
  },
}));
