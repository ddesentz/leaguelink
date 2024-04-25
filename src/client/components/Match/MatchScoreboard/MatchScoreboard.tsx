import * as React from "react";
import { matchScoreboardStyles } from "./MatchScoreboardStyles";

interface IMatchScoreboard {}

const MatchScoreboardComponent: React.FunctionComponent<
  IMatchScoreboard
> = () => {
  const { classes } = matchScoreboardStyles();

  return <div className={classes.matchScoreboardContainer}>SCOREBOARD</div>;
};

export const MatchScoreboard = MatchScoreboardComponent;
