import * as React from "react";
import { leagueUserStyles } from "./LeagueUserStyles";

interface ILeagueUser {}

const LeagueUserComponent: React.FunctionComponent<ILeagueUser> = () => {
  const { classes } = leagueUserStyles();

  return <div className={classes.leagueUserContainer}>USER</div>;
};

export const LeagueUser = LeagueUserComponent;
