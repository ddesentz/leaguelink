import * as React from "react";
import { matchPlayMatchupStyles } from "./MatchPlayMatchupStyles";
import { Avatar, Grid, Typography } from "@mui/material";
import { IMatchPlayMatchup } from "../../../../common/types/NETC/MatchPlayMatchup";
import { leagueLinkTheme } from "../../../../common/Theme";

const winningStyle = {
  fontWeight: "bold",
  color: leagueLinkTheme.palette.secondary.main,
};

interface IMatchPlayMatchupRenderer {
  matchUp: IMatchPlayMatchup;
}

const MatchPlayMatchupComponent: React.FunctionComponent<
  IMatchPlayMatchupRenderer
> = ({ matchUp }) => {
  const { classes } = matchPlayMatchupStyles();
  const [awayWin, setAwayWin] = React.useState<boolean>(false);
  const [homeWin, setHomeWin] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (matchUp.score.away > matchUp.score.home) {
      setAwayWin(true);
      setHomeWin(false);
    } else if (matchUp.score.away < matchUp.score.home) {
      setHomeWin(true);
      setAwayWin(false);
    } else {
      setAwayWin(true);
      setHomeWin(true);
    }
  }, [matchUp]);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      className={classes.matchPlayMatchupContainer}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        className={classes.playerContainer}
      >
        <Avatar
          alt={matchUp.awayPlayer.firstName[0]}
          src={matchUp.awayPlayer.photoURL}
          className={classes.playerAvatar}
        />
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
          className={classes.playerNameContainer}
        >
          <Typography
            className={classes.awayPlayerName}
            style={awayWin ? winningStyle : {}}
          >
            {matchUp.awayPlayer.firstName}
          </Typography>
          <Typography
            className={classes.awayPlayerName}
            style={awayWin ? winningStyle : {}}
          >
            {matchUp.awayPlayer.lastName}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className={classes.scoreContainer}
      >
        <Typography
          className={classes.scoreBox}
          style={awayWin ? winningStyle : {}}
        >
          {matchUp.score.away > 0 ? matchUp.score.away : ""}
        </Typography>
        <Typography className={classes.scoreResult}>
          {matchUp.score.result}
        </Typography>
        <Typography
          className={classes.scoreBox}
          style={homeWin ? winningStyle : {}}
        >
          {matchUp.score.home > 0 ? matchUp.score.home : ""}
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        className={classes.playerContainer}
      >
        <Grid
          container
          direction="column"
          alignItems="flex-end"
          justifyContent="center"
          className={classes.playerNameContainer}
        >
          <Typography
            className={classes.homePlayerName}
            style={homeWin ? winningStyle : {}}
          >
            {matchUp.homePlayer.firstName}
          </Typography>
          <Typography
            className={classes.homePlayerName}
            style={homeWin ? winningStyle : {}}
          >
            {matchUp.homePlayer.lastName}
          </Typography>
        </Grid>
        <Avatar
          alt={matchUp.homePlayer.firstName[0]}
          src={matchUp.homePlayer.photoURL}
          className={classes.playerAvatar}
        />
      </Grid>
    </Grid>
  );
};

export const MatchPlayMatchup = MatchPlayMatchupComponent;
