import * as React from "react";
import { leagueHomeStyles } from "./LeagueHomeStyles";

interface ILeagueHome {}

const LeagueHomeComponent: React.FunctionComponent<ILeagueHome> = () => {
  const { classes } = leagueHomeStyles();

  return <div className={classes.leagueHomeContainer}>HOME</div>;
};

export const LeagueHome = LeagueHomeComponent;
