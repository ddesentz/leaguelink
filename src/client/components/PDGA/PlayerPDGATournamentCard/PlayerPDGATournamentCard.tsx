import * as React from "react";
import { playerPDGATournamentCardStyles } from "./PlayerPDGATournamentCardStyles";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../../..";
import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { leagueLinkTheme } from "../../../common/Theme";

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
      //   console.log(result.data);
      setPlayerResults(result.data);
    });
  };

  const handleExpand = () => {
    window.open(
      `https://www.pdga.com/apps/tournament/live/event?eventId=${tournamentId}&division=${division}`,
      "_blank"
    );
  };

  const renderDates = () => {
    let dateString = "";
    const splitDates = details.dates.split("-");
    if (splitDates.length === 3) {
      const monthNum = new Date(Date.parse(details.dates)).getMonth() + 1;
      dateString = `${monthNum}/${splitDates[0]}/${splitDates[2]}`;
    } else {
      const dates = details.dates.split(" to ");
      const dateList = dates.map((date) => {
        return new Date(Date.parse(date));
      });
      dateString = `${dateList[0].getMonth() + 1}/${dateList[0].getDate()} - ${dateList[1].getMonth() + 1}/${dateList[1].getDate()}/${dateList[1].getFullYear()}`;
    }
    return (
      <Typography component={"span"} className={classes.tournamentDateText}>
        <FontAwesomeIcon icon={faCalendarDay} className={classes.dateIcon} />
        {dateString}
      </Typography>
    );
  };

  const renderPlacement = () => {
    let color = "";
    switch (playerResults?.Place) {
      case 1:
        color = "#FFD700";
        break;
      case 2:
        color = "#C0C0C0";
        break;
      case 3:
        color = "#CD7F32";
        break;
      default:
        color = leagueLinkTheme.palette.info.light;
        break;
    }
    return (
      <Typography
        style={{ color: color }}
        className={classes.placementDetailValue}
      >
        {playerResults ? playerResults.Place : ""}{" "}
        {playerResults && playerResults.Place <= 3 && (
          <FontAwesomeIcon
            icon={faTrophy}
            style={{ color: color, marginLeft: leagueLinkTheme.spacing(2) }}
          />
        )}
      </Typography>
    );
  };

  const renderTotal = () => {
    let style = {};
    if (playerResults?.ToPar < 0)
      style = {
        borderRadius: "50%",
        backgroundColor: "#008E6F",
        width: leagueLinkTheme.spacing(10),
        height: leagueLinkTheme.spacing(10),
        fontSize: leagueLinkTheme.spacing(5),
      };
    if (playerResults?.ToPar > 0)
      style = {
        borderRadius: "4px",
        backgroundColor: "#DC2736",
        width: leagueLinkTheme.spacing(10),
        height: leagueLinkTheme.spacing(10),
        fontSize: leagueLinkTheme.spacing(5),
      };

    return (
      <Typography style={style} className={classes.placementDetailValue}>
        {playerResults ? playerResults.ToPar : ""}
      </Typography>
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
          direction="row"
          alignItems="center"
          justifyContent="center"
          className={classes.tournamentDetailContainer}
        >
          <div className={classes.tournamentNameWrapper}>
            <Typography className={classes.tournamentNameText}>
              {details.name}
            </Typography>
          </div>
          <Grid
            container
            direction="column"
            alignItems="flex-end"
            justifyContent="space-between"
            className={classes.rightItemsContainer}
          >
            <Typography component={"span"} className={classes.tierText}>
              {details.tier} Tier
            </Typography>
            {renderDates()}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          className={classes.placementWrapper}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-around"
            className={classes.placementDetailContainer}
          >
            {renderPlacement()}
            <Typography className={classes.placementDetailLabel}>
              {playerResults ? playerResults.Division : ""}
            </Typography>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-around"
            className={classes.placementDetailContainer}
          >
            {renderTotal()}
            <Typography className={classes.placementDetailLabel}>
              Total
            </Typography>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-around"
            className={classes.placementDetailContainer}
          >
            <Typography className={classes.placementDetailValue}>
              {playerResults ? playerResults.AverageRoundRating : ""}
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
