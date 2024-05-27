import * as React from "react";
import { createTeamStyles } from "./CreateTeamStyles";

interface ICreateTeam {}

const CreateTeamComponent: React.FunctionComponent<ICreateTeam> = () => {
  const { classes } = createTeamStyles();

  return <div className={classes.createTeamContainer}>Create Team</div>;
};

export const CreateTeam = CreateTeamComponent;
