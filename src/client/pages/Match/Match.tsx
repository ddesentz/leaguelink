import * as React from "react";
import { matchStyles } from "./MatchStyles";
import { useParams } from "react-router";
import { MatchHeader } from "../../components/League/Scores/Match/MatchHeader";
import { LeagueNav } from "../../components/LeagueNav/LeagueNav";
import { Grid } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../..";
import { getLocalStorage } from "../../hooks/useLocalStorage";
import { useAppSignals } from "../../common/AppContext";
import { ILeagueMatch } from "../../common/types/LeagueMatch";

interface IMatch {}

const MatchComponent: React.FunctionComponent<IMatch> = () => {
  const { classes } = matchStyles();
  const params = useParams();
  const { matchSignals } = useAppSignals();
  const league = getLocalStorage("selectedLeague");

  if (params.matchId) {
    onSnapshot(
      doc(db, `leagues/${league.id}/matches`, params.matchId),
      (snapshot) => {
        matchSignals.selectedMatch.value = snapshot.data() as ILeagueMatch;
      }
    );
  }

  return (
    <div className={classes.matchContainer}>
      <MatchHeader />
      <LeagueNav />
      <Grid container direction="column" className={classes.contentContainer}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        ></Grid>
      </Grid>
    </div>
  );
};

export const Match = MatchComponent;
