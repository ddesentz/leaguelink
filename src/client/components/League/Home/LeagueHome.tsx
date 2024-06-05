import * as React from "react";
import { leagueHomeStyles } from "./LeagueHomeStyles";
import { Grid, Typography } from "@mui/material";
import { DetailedActionButton } from "../../_common/DetailedActionButton/DetailedActionButton";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../../hooks/useLocalStorage";

interface ILeagueHome {}

const LeagueHomeComponent: React.FunctionComponent<ILeagueHome> = () => {
  const { classes } = leagueHomeStyles();
  const navigate = useNavigate();
  const league = getLocalStorage("selectedLeague");

  const handleImportTeam = () => {
    navigate(`/${league.id}/team/create`);
  };

  const handleImportMatch = () => {
    // navigate(`/${league.id}/new/match`);
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
              Link the League.
            </Typography>
          </Grid>
        </Grid>
        <DetailedActionButton
          title="Link a Team"
          description="Add an existing team to NETC"
          handleClick={handleImportTeam}
        />
        <DetailedActionButton
          title="Link a Match"
          description="Add a historical match to NETC"
          handleClick={handleImportMatch}
        />
      </Grid>
    </>
  );
};

export const LeagueHome = LeagueHomeComponent;
