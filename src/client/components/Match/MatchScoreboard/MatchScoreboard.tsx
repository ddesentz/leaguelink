import * as React from "react";
import { matchScoreboardStyles } from "./MatchScoreboardStyles";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../..";
import { useParams } from "react-router";
import { MatchPlayMatchup } from "./MatchPlayMatchup/MatchPlayMatchup";
import {
  createNewDoublesMatchup,
  createNewMatchPlayMatchup,
} from "../../../common/Helper/HelperFunctions";
import { IMatchPlayMatchup } from "../../../common/types/MatchPlayMatchup";
import { leagueLinkTheme } from "../../../common/Theme";
import { IDoublesMatchup } from "../../../common/types/DoublesMatchup";
import { DoublesMatchup } from "./DoublesMatchup/DoublesMatchup";

const winningStyle = {
  fontWeight: "bold",
  color: leagueLinkTheme.palette.secondary.main,
};

interface IMatchScoreboard {}
const MatchScoreboardComponent: React.FunctionComponent<
  IMatchScoreboard
> = () => {
  const { classes } = matchScoreboardStyles();
  const params = useParams();
  const [showMatchPlay, setShowMatchPlay] = React.useState<boolean>(true);
  const [showDoubles, setShowDoubles] = React.useState<boolean>(true);
  const [matchPlayData, setMatchPlayData] = React.useState<IMatchPlayMatchup[]>(
    []
  );
  const [doublesData, setDoublesData] = React.useState<IDoublesMatchup[]>([]);

  React.useEffect(() => {
    const matchPlaySnapshot = onSnapshot(
      collection(
        db,
        `leagues/${params.leagueId}/matches/${params.matchId}/matchPlay`
      ),
      (snapshot) => {
        setMatchPlayData((snapshot.docs as any).map((doc: any) => doc.data()));
      }
    );

    const doublesSnapshot = onSnapshot(
      collection(
        db,
        `leagues/${params.leagueId}/matches/${params.matchId}/doubles`
      ),
      (snapshot) => {
        setDoublesData((snapshot.docs as any).map((doc: any) => doc.data()));
      }
    );

    return () => {
      matchPlaySnapshot();
      doublesSnapshot();
    };
  }, [params.leagueId, params.matchId]);

  const addMatchPlayMatchup = () => {
    createNewMatchPlayMatchup(params.leagueId!, params.matchId!);
  };

  const addDoublesMatchup = () => {
    createNewDoublesMatchup(params.leagueId!, params.matchId!);
  };

  const MatchPlayTotals = () => {
    const awayTotal = matchPlayData.reduce(
      (acc, curr) => acc + curr.score.away,
      0
    );
    const homeTotal = matchPlayData.reduce(
      (acc, curr) => acc + curr.score.home,
      0
    );

    return (
      <div className={classes.totalsWrapper}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          className={classes.totalsContainer}
        >
          <Typography
            className={classes.totalsScoreBox}
            style={awayTotal > homeTotal ? winningStyle : {}}
          >
            {awayTotal}
          </Typography>
          <Typography className={classes.totalsResult}>Total</Typography>
          <Typography
            className={classes.totalsScoreBox}
            style={homeTotal > awayTotal ? winningStyle : {}}
          >
            {homeTotal}
          </Typography>
        </Grid>
      </div>
    );
  };

  const DoublesTotals = () => {
    const awayTotal = doublesData.reduce(
      (acc, curr) => acc + curr.score.away,
      0
    );
    const homeTotal = doublesData.reduce(
      (acc, curr) => acc + curr.score.home,
      0
    );

    return (
      <div className={classes.totalsWrapper}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          className={classes.totalsContainer}
        >
          <Typography
            className={classes.totalsScoreBox}
            style={awayTotal > homeTotal ? winningStyle : {}}
          >
            {awayTotal}
          </Typography>
          <Typography className={classes.totalsResult}>Total</Typography>
          <Typography
            className={classes.totalsScoreBox}
            style={homeTotal > awayTotal ? winningStyle : {}}
          >
            {homeTotal}
          </Typography>
        </Grid>
      </div>
    );
  };

  return (
    <div className={classes.matchScoreboardContainer}>
      <div className={classes.matchTypeWrapper}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          onClick={() => setShowMatchPlay(!showMatchPlay)}
          className={classes.toggleViewContainer}
        >
          <Typography className={classes.toggleViewLabel}>
            Match Play
          </Typography>
          <FontAwesomeIcon
            icon={showMatchPlay ? faChevronUp : faChevronDown}
            className={classes.toggleViewIcon}
          />
        </Grid>
        {showMatchPlay && (
          <div className={classes.matchUpList}>
            {/* <Button onClick={addMatchPlayMatchup}>Add Matchup</Button> */}
            {matchPlayData.map((matchUp: IMatchPlayMatchup, index) => (
              <MatchPlayMatchup key={index} matchUp={matchUp} />
            ))}
          </div>
        )}
        <MatchPlayTotals />
      </div>
      <div className={classes.matchTypeWrapper}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          onClick={() => setShowDoubles(!showDoubles)}
          className={classes.toggleViewContainer}
        >
          <Typography className={classes.toggleViewLabel}>Doubles</Typography>
          <FontAwesomeIcon
            icon={showDoubles ? faChevronUp : faChevronDown}
            className={classes.toggleViewIcon}
          />
        </Grid>
        {showDoubles && (
          <div className={classes.matchUpList}>
            {/* <Button onClick={addDoublesMatchup}>Add Matchup</Button> */}
            {doublesData.map((matchUp: IDoublesMatchup, index) => (
              <DoublesMatchup key={index} matchUp={matchUp} />
            ))}
          </div>
        )}
        <DoublesTotals />
      </div>
    </div>
  );
};

export const MatchScoreboard = MatchScoreboardComponent;
