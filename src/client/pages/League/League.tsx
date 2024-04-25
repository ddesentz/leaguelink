import * as React from "react";
import { leagueStyles } from "./LeagueStyles";
import { useParams } from "react-router-dom";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { Grid } from "@mui/material";
import { LeagueNav } from "../../components/LeagueNav/LeagueNav";
import { LeagueHome } from "../../components/League/Home/LeagueHome";
import { LeagueExplore } from "../../components/League/Explore/LeagueExplore";
import { LeagueScores } from "../../components/League/Scores/LeagueScores";
import { LeagueStandings } from "../../components/League/Standings/LeagueStandings";
import { LeagueSchedule } from "../../components/League/Schedule/LeagueSchedule";
import { LeagueUser } from "../../components/League/User/LeagueUser";

const PageSelect: Map<string | undefined, any> = new Map([
  [undefined, <LeagueHome />],
  ["explore", <LeagueExplore />],
  ["scores", <LeagueScores />],
  ["standings", <LeagueStandings />],
  ["schedule", <LeagueSchedule />],
]);

interface ILeague {}
const LeagueComponent: React.FunctionComponent<ILeague> = () => {
  const { classes } = leagueStyles();
  const params = useParams();

  return (
    <div className={classes.leagueContainer}>
      <AppHeader />
      <LeagueNav />
      <Grid container direction="column" className={classes.contentContainer}>
        {params.userId ? <LeagueUser /> : PageSelect.get(params.page)}
      </Grid>
    </div>
  );
};

export const League = LeagueComponent;
