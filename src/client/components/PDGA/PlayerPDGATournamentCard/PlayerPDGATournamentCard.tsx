import * as React from "react";
import { playerPDGATournamentCardStyles } from "./PlayerPDGATournamentCardStyles";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app, db } from "../../../..";
import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCaretDown,
  faCaretUp,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { leagueLinkTheme } from "../../../common/Theme";
import {
  IPDGAPlayerResult,
  IPDGATournamentResult,
} from "../../../common/types/DiscGolf/PDGA/PDGA";
import { doc, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

interface IPlayerPDGATournamentCard {
  event: IPDGATournamentResult;
  pdgaNumber: number;
  year: string;
}

const PlayerPDGATournamentCardComponent: React.FunctionComponent<
  IPlayerPDGATournamentCard
> = ({ event, pdgaNumber, year }) => {
  const { classes } = playerPDGATournamentCardStyles();
  const functions = getFunctions(app);
  const params = useParams();
  const [isLeague, setIsLeague] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!event.playerResults) {
      getPDGADetails();
    }
  }, [event]);

  const getPDGADetails = async () => {
    const callableReturnMessage = httpsCallable(
      functions,
      "getPlayerPDGATournamentDetails"
    );
    callableReturnMessage({
      tournamentId: event.tournamentId,
      division: event.division,
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
      const playerResult: IPDGAPlayerResult = {
        ResultID: result.data.ResultID,
        Place: result.data.Place,
        Rating: result.data.Rating,
        TierLetter: result.data.TierLetter,
        ToParString: result.data.ToParString,
        RatingDiff: result.data.RatingDiff,
        AverageRoundRating: result.data.AverageRoundRating,
        Division: result.data.Division,
        DNF: result.data.DNF,
        Scores: result.data.Scores,
      };
      setDoc(
        doc(
          db,
          `leagues/${params.leagueId}/players/${params.userId}/pdgaEvents/year/${year}`,
          event.tournamentId
        ),
        { ...event, isLeague: isLeague, playerResults: playerResult }
      );
    });
  };

  const handleExpand = () => {
    window.open(
      `https://www.pdga.com/apps/tournament/live/event?eventId=${event.tournamentId}&division=${event.division}`,
      "_blank"
    );
  };

  const renderTier = () => {
    let tierString = "";

    if (event.isLeague)
      return (
        <Typography component={"span"} className={classes.tierText}>
          League
        </Typography>
      );
    if (!event.playerResults) return <></>;

    if (event.playerResults.TierLetter.length === 1) {
      tierString = event.playerResults.TierLetter + " Tier";
    } else tierString = event.playerResults.TierLetter;

    return (
      <Typography component={"span"} className={classes.tierText}>
        {tierString}
      </Typography>
    );
  };

  const renderDates = () => {
    const startDate = new Date(event.details.startDate);
    const endDate = new Date(event.details.endDate);
    return (
      <Typography component={"span"} className={classes.tournamentDateText}>
        <FontAwesomeIcon icon={faCalendarDay} className={classes.dateIcon} />
        {startDate.getMonth() + 1}/{startDate.getDate()}
        {startDate.valueOf() === endDate.valueOf()
          ? `/${startDate.getFullYear()}`
          : ` - ${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`}
      </Typography>
    );
  };

  const renderPlacement = () => {
    let color = "";
    switch (event.playerResults?.Place) {
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
        {event.playerResults ? event.playerResults.Place : ""}{" "}
        {event.playerResults && event.playerResults.Place <= 3 && (
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
        {event.playerResults?.ToParString}
      </Typography>
    );
  };

  const renderEventAvg = () => {
    let style = {};
    let rating = "";
    let ratingDiff = "";

    if (event.playerResults?.ToParString === "DNF") {
      style = {
        color: leagueLinkTheme.palette.primary.contrastText,
      };
      rating = "DNF";
    } else if (event.playerResults?.RatingDiff > 0) {
      style = {
        color: "#008E6F",
      };
      rating = event.playerResults?.AverageRoundRating.toString();
      ratingDiff = event.playerResults?.RatingDiff.toString();
    } else {
      style = {
        color: "#DC2736",
      };
      rating = event.playerResults?.AverageRoundRating.toString();
      ratingDiff = event.playerResults?.RatingDiff.toString();
    }

    return (
      <Typography className={classes.placementDetailValue} component="span">
        {rating}
        {ratingDiff && (
          <Typography style={style}>
            <FontAwesomeIcon
              icon={
                event.playerResults.RatingDiff < 0 ? faCaretDown : faCaretUp
              }
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
              {event.details.name}
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
        {!event.isLeague && (
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
                {event.playerResults ? event.playerResults.Division : ""}
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
