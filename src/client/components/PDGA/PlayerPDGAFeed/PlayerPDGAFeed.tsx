import * as React from "react";
import { playerPDGAFeedStyles } from "./PlayerPDGAFeedStyles";
import * as cheerio from "cheerio";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../../..";
import { LoadingFull } from "../../../common/rive/LoadingFull";
import { Grid, useMediaQuery } from "@mui/material";
import { PlayerPDGATournamentCard } from "../PlayerPDGATournamentCard/PlayerPDGATournamentCard";
import { VariableSizeList as List } from "react-window";
import { useWindowResize } from "../../../hooks/useWindowResize";
import { AutoSizer } from "react-virtualized";
import { leagueLinkTheme } from "../../../common/Theme";

interface ITournamentSlug {
  tournamentId: string;
  division: string;
  details: {
    name: string;
    tier: string;
    dates: string;
  };
}

interface IPlayerPDGAFeed {
  pdgaNumber: number;
  year: string;
}

const PlayerPDGAFeedComponent: React.FunctionComponent<IPlayerPDGAFeed> = ({
  pdgaNumber,
  year,
}) => {
  const { classes } = playerPDGAFeedStyles();
  const isMobile = useMediaQuery(leagueLinkTheme.breakpoints.down(310 * 4));
  const functions = getFunctions(app);
  const [tournamentList, setTournamentList] = React.useState<
    ITournamentSlug[] | null
  >(null);

  React.useEffect(() => {
    if (pdgaNumber) {
      setTournamentList(null);
      getPDGADetails(pdgaNumber);
    }
  }, [pdgaNumber, year]);

  const getPDGADetails = async (pdgaNumber: number) => {
    const callableReturnMessage = httpsCallable(functions, "getPlayerPage");
    callableReturnMessage({
      pdgaNumber: pdgaNumber,
      year: year.split("-")[1],
    }).then((result: any) => {
      scrapeUserPDGAData(result.data);
    });
  };

  const scrapeUserPDGAData = (html: string) => {
    const $ = cheerio.load(html);
    const $tournament = $("td.tournament");
    let slugList: ITournamentSlug[] = [];
    $tournament.each((i, el) => {
      const tierEl = $(el).next();
      const datesEl = $(tierEl).next();
      const slug = $(el).find("a").attr("href");
      const splitId = slug.split("/");
      const tournamentId = splitId[splitId.length - 1];
      const slugs = tournamentId.split("#");
      slugList.push({
        tournamentId: slugs[0],
        division: slugs[1],
        details: {
          name: $(el).text(),
          tier: tierEl.text(),
          dates: datesEl.text(),
        },
      } as ITournamentSlug);
    });

    setTournamentList(slugList);
  };
  const [windowWidth, windowHeight] = useWindowResize();
  const listRef = React.useRef(null);
  const innerRef = React.useRef(null);
  const sizeMap = React.useRef({});
  const setSize = React.useCallback(
    (index, size) => {
      sizeMap.current = { ...sizeMap.current, [index]: size };
      listRef.current.resetAfterIndex(index);
    },
    [windowHeight]
  );
  const getSize = (index) => sizeMap.current[index] || 50;

  React.useEffect(() => {
    return () => {
      const playerContentWrapper = document.getElementById(
        "playerContentWrapper"
      );
      if (playerContentWrapper) playerContentWrapper.scrollTop = 0;
    };
  });

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      className={classes.playerPDGAFeedContainer}
    >
      {tournamentList === null ? (
        <LoadingFull className={classes.loading} />
      ) : (
        <AutoSizer className={classes.autoSizer}>
          {({ height, width }) => (
            <List
              ref={listRef}
              innerRef={innerRef}
              height={
                tournamentList.length * 192 < windowHeight
                  ? Math.min(windowHeight - 376, height)
                  : height
              }
              width={width}
              overscanCount={3}
              itemCount={tournamentList.length}
              itemSize={getSize}
              itemData={{ list: tournamentList, pdgaNumber: pdgaNumber }}
              onScroll={({ scrollOffset }) => {
                const playerContentWrapper = document.getElementById(
                  "playerContentWrapper"
                );
                if (playerContentWrapper) {
                  playerContentWrapper.scrollTop = scrollOffset;
                }
              }}
            >
              {({ data, index, style }) => (
                <div style={style} className={classes.virtualItemWrapper}>
                  <Row
                    data={data}
                    index={index}
                    setSize={setSize}
                    windowWidth={windowWidth}
                  />
                </div>
              )}
            </List>
          )}
        </AutoSizer>
      )}
    </Grid>
  );
};

const Row = ({ data, index, setSize, windowWidth }) => {
  const rowRef = React.useRef(null);
  const tournament = data.list[index];

  React.useEffect(() => {
    setSize(index, rowRef.current.getBoundingClientRect().height);
  }, [setSize, index, windowWidth]);

  return (
    <div ref={rowRef}>
      <PlayerPDGATournamentCard
        key={index}
        tournamentId={tournament.tournamentId}
        division={tournament.division}
        pdgaNumber={data.pdgaNumber}
        details={tournament.details}
      />
    </div>
  );
};

export const PlayerPDGAFeed = PlayerPDGAFeedComponent;
