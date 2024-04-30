import * as React from "react";
import { doublesMatchupStyles } from "./DoublesMatchupStyles";
import { Avatar, Grid, Typography } from "@mui/material";
import { leagueLinkTheme } from "../../../../common/Theme";
import { IDoublesMatchup } from "../../../../common/types/DoublesMatchup";
import { IPlayerData } from "../../../../common/types/PlayerData";

const winningStyle = {
  fontWeight: "bold",
  color: leagueLinkTheme.palette.secondary.main,
};

interface IDoublesMatchupRenderer {
  matchUp: IDoublesMatchup;
}

const DoublesMatchupComponent: React.FunctionComponent<
  IDoublesMatchupRenderer
> = ({ matchUp }) => {
  const { classes } = doublesMatchupStyles();
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
      setAwayWin(false);
      setHomeWin(false);
    }
  }, [matchUp]);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      className={classes.doublesMatchupContainer}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        className={classes.playerContainer}
      >
        {matchUp.away.map((player: IPlayerData, index: number) => (
          <Grid item key={index} className={classes.playerRow}>
            <Avatar
              alt={player.firstName[0]}
              src={player.photoURL}
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
                {player.firstName}
              </Typography>
              <Typography
                className={classes.awayPlayerName}
                style={awayWin ? winningStyle : {}}
              >
                {player.lastName}
              </Typography>
            </Grid>
          </Grid>
        ))}
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
          {awayWin ? "2" : ""}
        </Typography>
        <Typography component="span" className={classes.scoreResult}>
          {matchUp.score.result.away} - {matchUp.score.result.home}
          {matchUp.score.result.playOffHoles > 0 && (
            <Typography component="span" className={classes.playOffText}>
              {`${matchUp.score.result.playOffHoles} HP`}
            </Typography>
          )}
        </Typography>
        <Typography
          className={classes.scoreBox}
          style={homeWin ? winningStyle : {}}
        >
          {homeWin ? "2" : ""}
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        className={classes.playerContainer}
      >
        {matchUp.home.map((player: IPlayerData, index: number) => (
          <Grid item key={index} className={classes.playerRow}>
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
                {player.firstName}
              </Typography>
              <Typography
                className={classes.homePlayerName}
                style={homeWin ? winningStyle : {}}
              >
                {player.lastName}
              </Typography>
            </Grid>
            <Avatar
              alt={player.firstName[0]}
              src={player.photoURL}
              className={classes.playerAvatar}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export const DoublesMatchup = DoublesMatchupComponent;
