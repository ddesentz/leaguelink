import * as React from "react";
import { leagueHomeStyles } from "./LeagueHomeStyles";
import { Grid, Typography } from "@mui/material";
import { DetailedActionButton } from "../../_common/DetailedActionButton";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../../hooks/useLocalStorage";

interface ILeagueHome {}

const LeagueHomeComponent: React.FunctionComponent<ILeagueHome> = () => {
  const { classes } = leagueHomeStyles();
  const navigate = useNavigate();
  const league = getLocalStorage("selectedLeague");

  const handleImportTeam = () => {
    navigate(`/${league.id}/create/team`);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.leagueActionsContainer}
      >
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justifyContent=" flex-start"
          className={classes.headerContainer}
        >
          <img
            src={"/assets/LeagueLink_Shield_v1.svg"}
            alt=""
            className={classes.logo}
          />
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            className={classes.headerTextContainer}
          >
            <Typography className={classes.minorText}>
              Grow the Sport.
            </Typography>
            <Typography className={classes.majorText}>
              Grow the League.
            </Typography>
          </Grid>
        </Grid>
        <DetailedActionButton
          title="Import a Team"
          description="Add an existing team to NETC"
          handleClick={handleImportTeam}
        />
        <DetailedActionButton
          title="Record a Match"
          description="Add a historical match to NETC"
          handleClick={() => {}}
        />
      </Grid>
    </>
  );
};

export const LeagueHome = LeagueHomeComponent;
