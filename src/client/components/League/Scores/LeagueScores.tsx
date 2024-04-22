import * as React from "react";
import { leagueScoresStyles } from "./LeagueScoresStyles";

interface ILeagueScores {}

const LeagueScoresComponent: React.FunctionComponent<ILeagueScores> = () => {
  const { classes } = leagueScoresStyles();

  return <div className={classes.leagueScoresContainer}>SCORES</div>;
};

export const LeagueScores = LeagueScoresComponent;
