import * as React from "react";
import { leagueExploreStyles } from "./LeagueExploreStyles";

interface ILeagueExplore {}

const LeagueExploreComponent: React.FunctionComponent<ILeagueExplore> = () => {
  const { classes } = leagueExploreStyles();

  return <div className={classes.leagueExploreContainer}>EXPLORE</div>;
};

export const LeagueExplore = LeagueExploreComponent;
