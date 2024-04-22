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
import Icon from "@mdi/react";
import {
  mdiCalendar,
  mdiChevronLeft,
  mdiHome,
  mdiMagnify,
  mdiScoreboard,
} from "@mdi/js";
import { getLocalStorage } from "../../hooks/useLocalStorage";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { leagueLinkTheme } from "../../common/Theme";

interface ILeagueNav {}

const LeagueNavComponent: React.FunctionComponent<ILeagueNav> = () => {
  const { classes } = leagueNavStyles();
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const league = getLocalStorage("selectedLeague");

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
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("")}
            aria-selected={
              params.page !== undefined || params.userId ? false : true
            }
            className={classes.navButton}
          >
            <Icon path={mdiHome} className={classes.backIcon} />
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("explore")}
            aria-selected={params.page === "explore" ? true : false}
            className={classes.navButton}
          >
            <Icon path={mdiMagnify} className={classes.backIcon} />
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("scores")}
            aria-selected={params.page === "scores" ? true : false}
            className={classes.navButton}
          >
            <Icon path={mdiScoreboard} className={classes.backIcon} />
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("schedule")}
            aria-selected={params.page === "schedule" ? true : false}
            className={classes.navButton}
          >
            <Icon path={mdiCalendar} className={classes.backIcon} />
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
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export const LeagueNav = LeagueNavComponent;
