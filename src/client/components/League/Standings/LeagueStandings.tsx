import * as React from "react";
import { leagueStandingsStyles } from "./LeagueStandingsStyles";

interface ILeagueStandings {}

const LeagueStandingsComponent: React.FunctionComponent<
  ILeagueStandings
> = () => {
  const { classes } = leagueStandingsStyles();

  return <div className={classes.leagueStandingsContainer}>STANDINGS</div>;
};

export const LeagueStandings = LeagueStandingsComponent;
