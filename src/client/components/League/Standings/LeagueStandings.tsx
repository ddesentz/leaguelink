import * as React from "react";
import { leagueStandingsStyles } from "./LeagueStandingsStyles";
import { LeagueHeader } from "../../LeagueHeader/LeagueHeader";

interface ILeagueStandings {}

const LeagueStandingsComponent: React.FunctionComponent<
  ILeagueStandings
> = () => {
  const { classes } = leagueStandingsStyles();

  return (
    <>
      <LeagueHeader />
      <div className={classes.leagueStandingsContainer}>STANDINGS</div>
    </>
  );
};

export const LeagueStandings = LeagueStandingsComponent;
