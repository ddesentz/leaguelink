import * as React from "react";
import { leagueStyles } from "./LeagueStyles";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { LeagueNav } from "../../components/LeagueNav/LeagueNav";
import { LeagueHome } from "../../components/League/Home/LeagueHome";
import { LeagueExplore } from "../../components/League/Explore/LeagueExplore";
import { LeagueScores } from "../../components/League/Scores/LeagueScores";
import { LeagueStandings } from "../../components/League/Standings/LeagueStandings";
import { LeagueSchedule } from "../../components/League/Schedule/LeagueSchedule";
import { LeagueUser } from "../../components/League/User/LeagueUser";
import { LeagueHeader } from "../../components/LeagueHeader/LeagueHeader";

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
  const renderContent = () => {
    if (params.userId) {
      return <LeagueUser />;
    }

    return PageSelect.get(params.page);
  };

  return (
    <div className={classes.leagueContainer}>
      <LeagueNav />
      <Grid container direction="column" className={classes.contentContainer}>
        {renderContent()}
      </Grid>
    </div>
  );
};

export const League = LeagueComponent;
