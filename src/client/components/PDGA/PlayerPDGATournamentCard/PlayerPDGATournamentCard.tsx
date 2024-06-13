import * as React from "react";
import { playerPDGATournamentCardStyles } from "./PlayerPDGATournamentCardStyles";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../../..";
import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";

interface IPlayerPDGATournamentCard {
  tournamentId: string;
  division: string;
  details: {
    name: string;
    tier: string;
    dates: string;
  };
  pdgaNumber: number;
}

const PlayerPDGATournamentCardComponent: React.FunctionComponent<
  IPlayerPDGATournamentCard
> = ({ tournamentId, division, details, pdgaNumber }) => {
  const { classes } = playerPDGATournamentCardStyles();
  const functions = getFunctions(app);
  const [playerResults, setPlayerResults] = React.useState<any | null>(null);

  React.useEffect(() => {
    getPDGADetails();
  }, [tournamentId, division, pdgaNumber]);

  const getPDGADetails = async () => {
    const callableReturnMessage = httpsCallable(
      functions,
      "getPlayerPDGATournamentDetails"
    );
    callableReturnMessage({
      tournamentId: tournamentId,
      division: division,
    }).then((result: any) => {
      const playerData = result.data.scores.find(
        (score: any) => Number(score.PDGANum) === Number(pdgaNumber)
      );
      if (playerData) {
        getPlayerResult(Number(playerData.ResultID));
      }
    });
  };

  const getPlayerResult = async (resultId: number) => {
    const callableReturnMessage = httpsCallable(
      functions,
      "getPlayerPDGATournamentResults"
    );
    callableReturnMessage({
      resultId: resultId,
    }).then((result: any) => {
      setPlayerResults(result.data);
    });
  };

  const handleExpand = () => {
    window.open(
      `https://www.pdga.com/apps/tournament/live/event?eventId=${tournamentId}&division=${division}`,
      "_blank"
    );
  };

  return (
    <div
      className={classes.playerPDGATournamentCardWrapper}
      onClick={handleExpand}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.playerPDGATournamentCardContainer}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.tournamentDetailContainer}
        >
          <Typography className={classes.tournamentNameText}>
            {details.name}
          </Typography>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              component={"span"}
              className={classes.tournamentDateText}
            >
              <FontAwesomeIcon
                icon={faCalendarDay}
                className={classes.dateIcon}
              />
              {details.dates}
            </Typography>
            <Typography component={"span"} className={classes.tierText}>
              {details.tier} Tier
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={classes.placementDetailContainer}
          >
            <Typography className={classes.placementDetailValue}>
              {playerResults ? playerResults.Place : ""}
            </Typography>
            <Typography className={classes.placementDetailLabel}>
              {playerResults ? playerResults.Division : ""}
            </Typography>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={classes.placementDetailContainer}
          >
            <Typography className={classes.placementDetailValue}>
              -14
            </Typography>
            <Typography className={classes.placementDetailLabel}>
              Total
            </Typography>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={classes.placementDetailContainer}
          >
            <Typography className={classes.placementDetailValue}>
              1050
            </Typography>
            <Typography className={classes.placementDetailLabel}>
              Event
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export const PlayerPDGATournamentCard = PlayerPDGATournamentCardComponent;
