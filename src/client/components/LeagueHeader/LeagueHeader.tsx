import * as React from "react";
import { leagueHeaderStyles } from "./LeagueHeaderStyles";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { getLocalStorage } from "../../hooks/useLocalStorage";
import {
  faCommentDots,
  faGear,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { leagueLinkTheme } from "../../common/Theme";

interface ILeagueHeader {}

const LeagueHeaderComponent: React.FunctionComponent<ILeagueHeader> = () => {
  const { classes } = leagueHeaderStyles();
  const params = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const leagueData = getLocalStorage("selectedLeague");
  const isMobile = useMediaQuery(leagueLinkTheme.breakpoints.down(310 * 4));

  if (user === null || user === undefined) {
    return null;
  }

  const getActionBadgeCount = () => {
    if (!params.page && !params.userId) return 22;
    return 0;
  };

  const getActionIcon = () => {
    if (!params.page && !params.userId) return faCommentDots;
    if (!params.page) return faGear;
    return faPlus;
  };

  return (
    <AppBar className={classes.leagueHeaderContainer}>
      <Toolbar>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={classes.actionContainer}
        >
          {isMobile && (
            <div className={classes.logoContainer}>
              <img
                src={"/assets/LeagueLink_Shield_v1.svg"}
                alt=""
                onClick={() => navigate(`/`)}
                className={classes.logo}
              />
            </div>
          )}
          <Typography className={classes.leagueText}>
            {isMobile ? leagueData.abbr : leagueData.name}
          </Typography>

          <IconButton disableFocusRipple disableRipple>
            <Badge
              badgeContent={getActionBadgeCount()}
              className={classes.notificaitonBadge}
            >
              <FontAwesomeIcon
                icon={getActionIcon()}
                className={classes.notificationIcon}
              />
            </Badge>
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export const LeagueHeader = LeagueHeaderComponent;
