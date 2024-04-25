import * as React from "react";
import { matchRostersStyles } from "./MatchRostersStyles";

interface IMatchRosters {}

const MatchRostersComponent: React.FunctionComponent<IMatchRosters> = () => {
  const { classes } = matchRostersStyles();

  return <div className={classes.matchRostersContainer}>ROSTERS</div>;
};

export const MatchRosters = MatchRostersComponent;
