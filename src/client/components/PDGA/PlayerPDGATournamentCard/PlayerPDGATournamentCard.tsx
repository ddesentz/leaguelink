import * as React from "react";
import { playerPDGATournamentCardStyles } from "./PlayerPDGATournamentCardStyles";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../../..";
import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCaretDown,
  faCaretUp,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
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
  const [isLeague, setIsLeague] = React.useState<boolean>(false);

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
      if (Array.isArray(result.data)) {
        result.data.forEach((pool: any, index: number) => {
          const playerData = result.data[index].scores.find(
            (score: any) => Number(score.PDGANum) === Number(pdgaNumber)
          );
          if (playerData) {
            getPlayerResult(Number(playerData.ResultID));
            return;
          }
        });
      } else {
        const playerData = result.data.scores.find(
          (score: any) => Number(score.PDGANum) === Number(pdgaNumber)
        );
        if (playerData) {
          getPlayerResult(Number(playerData.ResultID));
        } else {
          // Handle League data
          // TODO: Get round of League Played
          setIsLeague(true);
        }
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

  const renderTier = () => {
    let tierString = "";

    if (isLeague)
      return (
        <Typography component={"span"} className={classes.tierText}>
          League
        </Typography>
      );
    if (!playerResults) return <></>;

    if (playerResults.TierLetter.length === 1) {
      tierString = playerResults.TierLetter + " Tier";
    } else tierString = playerResults.TierLetter;

    return (
      <Typography component={"span"} className={classes.tierText}>
        {tierString}
      </Typography>
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
        color = leagueLinkTheme.palette.primary.contrastText;
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
    return (
      <Typography
        style={{ color: leagueLinkTheme.palette.primary.contrastText }}
        className={classes.placementDetailValue}
      >
        {playerResults?.ToParString}
      </Typography>
    );
  };

  const renderEventAvg = () => {
    let style = {};
    let rating = "";
    let ratingDiff = "";

    if (playerResults?.ToParString === "DNF") {
      style = {
        color: leagueLinkTheme.palette.primary.contrastText,
      };
      rating = "DNF";
    } else if (playerResults?.RatingDiff > 0) {
      style = {
        color: "#008E6F",
      };
      rating = playerResults?.AverageRoundRating;
      ratingDiff = playerResults?.RatingDiff;
    } else {
      style = {
        color: "#DC2736",
      };
      rating = playerResults?.AverageRoundRating;
      ratingDiff = playerResults?.RatingDiff;
    }

    return (
      <Typography className={classes.placementDetailValue} component="span">
        {rating}
        {ratingDiff && (
          <Typography style={style}>
            <FontAwesomeIcon
              icon={playerResults.RatingDiff < 0 ? faCaretDown : faCaretUp}
              style={style}
              className={classes.ratingDiffIcon}
            />
            {ratingDiff}
          </Typography>
        )}
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
            {renderTier()}
            {renderDates()}
          </Grid>
        </Grid>
        {!isLeague && (
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
              {renderEventAvg()}
              <Typography className={classes.placementDetailLabel}>
                Event
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export const PlayerPDGATournamentCard = PlayerPDGATournamentCardComponent;
