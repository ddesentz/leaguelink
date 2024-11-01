import * as React from "react";
import { leagueNavStyles } from "./LeagueNavStyles";
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getLocalStorage } from "../../hooks/useLocalStorage";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import HomeIcon from "../../assets/navIcons/Home.svg";
import ExploreIcon from "../../assets/navIcons/Explore.svg";
import ScoresIcon from "../../assets/navIcons/Scores.svg";
import StandingsIcon from "../../assets/navIcons/Standings.svg";
import ScheduleIcon from "../../assets/navIcons/Schedule.svg";
import { ReactSVG } from "react-svg";
import { leagueLinkTheme } from "../../common/Theme";

interface ILeagueNav {}

const LeagueNavComponent: React.FunctionComponent<ILeagueNav> = () => {
  const { classes } = leagueNavStyles();
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const league = getLocalStorage("selectedLeague");
  const isMobile = useMediaQuery(leagueLinkTheme.breakpoints.down(310 * 4));

  if (user === null || user === undefined) {
    return null;
  }

  const handleNavigate = (page: string) => {
    navigate(`/${league.id}/${page}`);
  };

  return (
    <AppBar className={classes.appBarContainer}>
      <Toolbar className={classes.toolbarContainer}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={classes.headerContainer}
        >
          {!isMobile && (
            <div className={classes.logoContainer}>
              <img
                src={
                  params.leagueId && isMobile
                    ? "/assets/LeagueLink_Shield_v1.svg"
                    : "/assets/LeagueLink_Logo_v1.svg"
                }
                alt=""
                onClick={() => navigate(`/`)}
                className={classes.logo}
              />
            </div>
          )}
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("")}
            aria-selected={
              params.page !== undefined || params.userId ? false : true
            }
            className={classes.navButton}
          >
            <ReactSVG src={HomeIcon} className={classes.navIcon} />
            <Typography className={classes.navButtonLabel}>Home</Typography>
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("explore")}
            aria-selected={params.page === "explore" ? true : false}
            className={classes.navButton}
          >
            <ReactSVG src={ExploreIcon} className={classes.navIcon} />
            <Typography className={classes.navButtonLabel}>Explore</Typography>
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("scores")}
            aria-selected={params.page === "scores" ? true : false}
            className={classes.navButton}
          >
            <ReactSVG src={ScoresIcon} className={classes.navIcon} />
            <Typography className={classes.navButtonLabel}>Scores</Typography>
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("standings")}
            aria-selected={params.page === "standings" ? true : false}
            className={classes.navButton}
          >
            <ReactSVG src={StandingsIcon} className={classes.navIcon} />
            <Typography className={classes.navButtonLabel}>
              Standings
            </Typography>
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("schedule")}
            aria-selected={params.page === "schedule" ? true : false}
            className={classes.navButton}
          >
            <ReactSVG src={ScheduleIcon} className={classes.navIcon} />
            <Typography className={classes.navButtonLabel}>Schedule</Typography>
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate(`user/${user.uid}`)}
            aria-selected={params.userId ? true : false}
            className={classes.avatarButton}
          >
            <Avatar
              alt={""}
              src={user.photoURL || ""}
              className={classes.userIcon}
            />
            <Typography className={classes.navButtonLabel}>Profile</Typography>
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export const LeagueNav = LeagueNavComponent;
