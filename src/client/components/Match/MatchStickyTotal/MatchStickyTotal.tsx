import * as React from "react";
import { matchStickyTotalStyles } from "./MatchStickyTotalStyles";
import { Avatar, Grid, Typography } from "@mui/material";
import { useAppSignals } from "../../../common/AppContext";
import { mdiTriangle } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";

interface IMatchStickyTotal {}

const MatchStickyTotalComponent: React.FunctionComponent<
  IMatchStickyTotal
> = () => {
  const { classes } = matchStickyTotalStyles();
  const { matchSignals } = useAppSignals();

  if (
    matchSignals.selectedMatch.value === null ||
    matchSignals.selectedMatch.value === undefined
  )
    return null;

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      className={clsx(
        classes.matchScoreHeader,
        matchSignals.selectedMatch.value.score.away ===
          matchSignals.selectedMatch.value.score.home && classes.tieScore
      )}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={clsx(
          classes.teamScoreTotalContainer,
          matchSignals.selectedMatch.value.score.away >
            matchSignals.selectedMatch.value.score.home &&
            classes.winningTeamScore
        )}
      >
        <Avatar
          alt={matchSignals.selectedMatch.value.awayTeam.abbr}
          src={matchSignals.selectedMatch.value.awayTeam.photoURL}
          className={classes.teamAvatar}
        />
        <Typography className={classes.teamTotalText}>
          {matchSignals.selectedMatch.value.score.away}
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        className={classes.matchStatusContainer}
      >
        <Icon
          path={mdiTriangle}
          className={clsx(
            classes.awayWinnerPointer,
            matchSignals.selectedMatch.value.score.away >
              matchSignals.selectedMatch.value.score.home &&
              classes.winningTeamPointer
          )}
        />
        <Typography className={classes.matchStatusText}>
          {matchSignals.selectedMatch.value.status}
        </Typography>
        <Icon
          path={mdiTriangle}
          className={clsx(
            classes.homeWinnerPointer,
            matchSignals.selectedMatch.value.score.home >
              matchSignals.selectedMatch.value.score.away &&
              classes.winningTeamPointer
          )}
        />
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={clsx(
          classes.teamScoreTotalContainer,
          matchSignals.selectedMatch.value.score.home >
            matchSignals.selectedMatch.value.score.away &&
            classes.winningTeamScore
        )}
      >
        <Typography className={classes.teamTotalText}>
          {matchSignals.selectedMatch.value.score.home}
        </Typography>
        <Avatar
          alt={matchSignals.selectedMatch.value.homeTeam.abbr}
          src={matchSignals.selectedMatch.value.homeTeam.photoURL}
          className={classes.teamAvatar}
        />
      </Grid>
    </Grid>
  );
};

export const MatchStickyTotal = MatchStickyTotalComponent;
