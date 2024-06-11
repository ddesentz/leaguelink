import * as React from "react";
import { leagueScheduleStyles } from "./LeagueScheduleStyles";
import { LeagueHeader } from "../../LeagueHeader/LeagueHeader";

interface ILeagueSchedule {}

const LeagueScheduleComponent: React.FunctionComponent<
  ILeagueSchedule
> = () => {
  const { classes } = leagueScheduleStyles();

  return (
    <>
      <LeagueHeader />
      <div className={classes.leagueScheduleContainer}>SCHEDULE</div>
    </>
  );
};

export const LeagueSchedule = LeagueScheduleComponent;
