import * as React from "react";
import { leagueScoresStyles } from "./LeagueScoresStyles";
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { mdiFilterVariant, mdiMagnify, mdiTriangle } from "@mdi/js";
import Icon from "@mdi/react";
import { AutoSizer, List } from "react-virtualized";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../..";
import { getLocalStorage } from "../../../hooks/useLocalStorage";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { ILeagueMatch } from "../../../common/types/NETC/LeagueMatch";
import { useAppSignals } from "../../../common/AppContext";
import { LeagueHeader } from "../../LeagueHeader/LeagueHeader";

interface ILeagueScores {}
const LeagueScoresComponent: React.FunctionComponent<ILeagueScores> = () => {
  const { classes } = leagueScoresStyles();
  const navigate = useNavigate();
  const league = getLocalStorage("selectedLeague");
  const { matchSignals } = useAppSignals();
  const [matches, setMatches] = React.useState<ILeagueMatch[]>([]);

  const allMatchesRef = query(collection(db, `leagues/${league.id}/matches`));
  onSnapshot(allMatchesRef, (snapshot) => {
    setMatches(
      (snapshot.docs as any).map((doc: any) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      })
    );
  });

  const handleNavigateToMatchDetails = (match: ILeagueMatch) => {
    matchSignals.selectedMatch.value = match;
    navigate(`/${league.id}/scores/${match.id}`);
  };

  const renderMatch = (props: any) => {
    const match = matches[props.index];
    return (
      <div
        key={props.index}
        style={{ ...props.style, display: "flex", justifyContent: "center" }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          onClick={() => handleNavigateToMatchDetails(match)}
          className={classes.matchContainer}
        >
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="space-between"
            className={classes.matchLeftData}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              className={clsx(
                classes.matchLeftRow,
                match.score.away > match.score.home && classes.winningTeam
              )}
            >
              <Grid item className={classes.teamContainer}>
                <Avatar
                  alt={match.awayTeam.abbr}
                  src={match.awayTeam.photoURL}
                  className={classes.teamAvatar}
                />
                <Typography className={classes.teamDataText}>
                  {match.awayTeam.abbr}
                </Typography>
              </Grid>
              <Grid item className={classes.scoreContainer}>
                <Typography className={classes.teamDataText}>
                  {match.score.away}
                </Typography>
                <Icon path={mdiTriangle} />
              </Grid>
            </Grid>
            <Grid
              item
              className={clsx(
                classes.matchLeftRow,
                match.score.home > match.score.away && classes.winningTeam
              )}
            >
              <Grid item className={classes.teamContainer}>
                <Avatar
                  alt={match.homeTeam.abbr}
                  src={match.homeTeam.photoURL}
                  className={classes.teamAvatar}
                />
                <Typography className={classes.teamDataText}>
                  {match.homeTeam.abbr}
                </Typography>
              </Grid>
              <Grid item className={classes.scoreContainer}>
                <Typography className={classes.teamDataText}>
                  {match.score.home}
                </Typography>
                <Icon path={mdiTriangle} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            className={classes.matchRightData}
          >
            <Typography className={classes.statusText}>
              {match.status}
            </Typography>
            <Typography className={classes.dateText}>
              {new Date(match.date).toLocaleDateString().slice(0, -5)}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <>
      <LeagueHeader />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        className={classes.leagueScoresContainer}
      >
        <Paper className={classes.filterContainer}>
          <InputBase
            placeholder="Search Matches"
            className={classes.filterTextField}
          />
          <IconButton disableFocusRipple disableRipple>
            <Icon path={mdiMagnify} className={classes.searchIcon} />
          </IconButton>
          <Divider orientation="vertical" className={classes.filterDivider} />
          <IconButton disableFocusRipple disableRipple>
            <Icon path={mdiFilterVariant} className={classes.filterIcon} />
          </IconButton>
        </Paper>
        <div className={classes.listContainer}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                overscanRowCount={3}
                rowCount={matches.length}
                rowHeight={120}
                rowRenderer={renderMatch}
              />
            )}
          </AutoSizer>
        </div>
      </Grid>
    </>
  );
};

export const LeagueScores = LeagueScoresComponent;
