import * as React from "react";
import { leagueScheduleStyles } from "./LeagueScheduleStyles";

interface ILeagueSchedule {}

const LeagueScheduleComponent: React.FunctionComponent<
  ILeagueSchedule
> = () => {
  const { classes } = leagueScheduleStyles();

  return <div className={classes.leagueScheduleContainer}>SCHEDULE</div>;
};

export const LeagueSchedule = LeagueScheduleComponent;
