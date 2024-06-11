import * as React from "react";
import { leagueUserStyles } from "./LeagueUserStyles";
import { LeagueHeader } from "../../LeagueHeader/LeagueHeader";

interface ILeagueUser {}

const LeagueUserComponent: React.FunctionComponent<ILeagueUser> = () => {
  const { classes } = leagueUserStyles();

  return (
    <>
      <LeagueHeader />
      <div className={classes.leagueUserContainer}>USER</div>
    </>
  );
};

export const LeagueUser = LeagueUserComponent;
