import * as React from "react";
import { leagueStyles } from "./LeagueStyles";
import { useParams } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { Grid } from "@mui/material";
import { getLocalStorage } from "../../hooks/useLocalStorage";
import { LeagueNav } from "../../components/LeagueNav/LeagueNav";
import { LeagueHome } from "../../components/League/Home/LeagueHome";
import { LeagueExplore } from "../../components/League/Explore/LeagueExplore";
import { LeagueScores } from "../../components/League/Scores/LeagueScores";
import { LeagueSchedule } from "../../components/League/Schedule/LeagueSchedule";
import { LeagueUser } from "../../components/League/User/LeagueUser";

const PageSelect: Map<string | undefined, any> = new Map([
  [undefined, <LeagueHome />],
  ["explore", <LeagueExplore />],
  ["scores", <LeagueScores />],
  ["schedule", <LeagueSchedule />],
]);

interface ILeague {}
const LeagueComponent: React.FunctionComponent<ILeague> = () => {
  const { classes } = leagueStyles();
  const params = useParams();
  const league = getLocalStorage("selectedLeague");

  return (
    <div className={classes.leagueContainer}>
      <NavBar />
      <LeagueNav />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        className={classes.contentContainer}
      >
        {params.userId ? <LeagueUser /> : PageSelect.get(params.page)}
      </Grid>
    </div>
  );
};

export const League = LeagueComponent;
