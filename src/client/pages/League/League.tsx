import * as React from "react";
import { leagueStyles } from "./LeagueStyles";
import { useParams } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";

interface ILeague {}

const LeagueComponent: React.FunctionComponent<ILeague> = () => {
  const { classes } = leagueStyles();
  const params = useParams();

  return (
    <div className={classes.leagueContainer}>
      <NavBar />
    </div>
  );
};

export const League = LeagueComponent;
