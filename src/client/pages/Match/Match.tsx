import * as React from "react";
import { matchStyles } from "./MatchStyles";
import { useParams } from "react-router";
import { MatchHeader } from "../../components/League/Scores/Match/MatchHeader";
import { LeagueNav } from "../../components/LeagueNav/LeagueNav";
import { Grid, Tab, Tabs } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../..";
import { getLocalStorage } from "../../hooks/useLocalStorage";
import { useAppSignals } from "../../common/AppContext";
import { ILeagueMatch } from "../../common/types/LeagueMatch";
import { MatchStickyTotal } from "../../components/Match/MatchStickyTotal/MatchStickyTotal";
import { MatchScoreboard } from "../../components/Match/MatchScoreboard/MatchScoreboard";
import { MatchRosters } from "../../components/Match/MatchRosters/MatchRosters";

interface IMatch {}

const MatchComponent: React.FunctionComponent<IMatch> = () => {
  const { classes } = matchStyles();
  const params = useParams();
  const { matchSignals } = useAppSignals();
  const league = getLocalStorage("selectedLeague");
  const [selectedTab, setSelectedTab] = React.useState<string>("Scoreboard");

  React.useEffect(() => {
    if (params.matchId) {
      onSnapshot(
        doc(db, `leagues/${league.id}/matches`, params.matchId),
        (snapshot) => {
          matchSignals.selectedMatch.value = snapshot.data() as ILeagueMatch;
        }
      );
    }
  }, [league.id, params.matchId]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.matchContainer}>
      <LeagueNav />
      <MatchHeader />
      <Grid container direction="column" className={classes.contentContainer}>
        <MatchStickyTotal />
        <div className={classes.matchContent}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            className={classes.tabs}
            TabIndicatorProps={{
              className: classes.tabIndicator,
            }}
          >
            <Tab
              label="Scoreboard"
              value={"Scoreboard"}
              disableRipple
              className={classes.tab}
            />
            <Tab
              label="Rosters"
              value={"Rosters"}
              disableRipple
              className={classes.tab}
            />
          </Tabs>
          {selectedTab === "Scoreboard" ? (
            <MatchScoreboard />
          ) : (
            <MatchRosters />
          )}
        </div>
      </Grid>
    </div>
  );
};

export const Match = MatchComponent;
