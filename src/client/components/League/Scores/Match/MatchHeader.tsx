import * as React from "react";
import { matchHeaderStyles } from "./MatchHeaderStyles";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router";
import { getLocalStorage } from "../../../../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faBell as faBellOutline } from "@fortawesome/free-regular-svg-icons";
import { useAppSignals } from "../../../../common/AppContext";
import { leagueLinkTheme } from "../../../../common/Theme";

interface IMatchHeader {}

const MatchHeaderComponent: React.FunctionComponent<IMatchHeader> = () => {
  const { classes } = matchHeaderStyles();
  const navigate = useNavigate();
  const { matchSignals } = useAppSignals();
  const league = getLocalStorage("selectedLeague");
  const isMobile = useMediaQuery(leagueLinkTheme.breakpoints.down(310 * 4));
  const [notify, setNotify] = React.useState(false);

  const handleBack = () => {
    navigate(`/${league.id}/scores`);
  };
  return (
    <AppBar className={classes.appBarContainer}>
      <Toolbar className={classes.toolbarContainer}>
        <img
          src={
            isMobile
              ? "/assets/LeagueLink_Shield_v1.svg"
              : "/assets/LeagueLink_Logo_v1.svg"
          }
          alt=""
          onClick={() => navigate(`/`)}
          className={classes.logo}
        />
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={classes.matchContentHeader}
        >
          <Grid item className={classes.leftItems}>
            <IconButton
              disableFocusRipple
              disableRipple
              onClick={handleBack}
              className={classes.iconButton}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={classes.notificationIcon}
              />
            </IconButton>
          </Grid>

          {matchSignals.selectedMatch.value && (
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              className={classes.matchLabel}
            >
              <Typography>
                {matchSignals.selectedMatch.value.awayTeam.abbr}
              </Typography>
              <Typography>@</Typography>
              <Typography>
                {matchSignals.selectedMatch.value.homeTeam.abbr}
              </Typography>
            </Grid>
          )}

          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => setNotify(!notify)}
            className={classes.iconButton}
          >
            <FontAwesomeIcon
              icon={notify ? faBell : faBellOutline}
              className={classes.notificationIcon}
            />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export const MatchHeader = MatchHeaderComponent;
