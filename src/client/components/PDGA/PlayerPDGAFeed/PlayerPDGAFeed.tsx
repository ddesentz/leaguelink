import * as React from "react";
import { playerPDGAFeedStyles } from "./PlayerPDGAFeedStyles";
import { LoadingFull } from "../../../common/rive/LoadingFull";
import { Grid } from "@mui/material";
import { PlayerPDGATournamentCard } from "../PlayerPDGATournamentCard/PlayerPDGATournamentCard";
import { VariableSizeList as List } from "react-window";
import { useWindowResize } from "../../../hooks/useWindowResize";
import { AutoSizer } from "react-virtualized";
import { IPDGATournamentResult } from "../../../common/types/DiscGolf/PDGA/PDGA";

interface IPlayerPDGAFeed {
  pdgaNumber: number;
  year: string;
  tournamentList: IPDGATournamentResult[] | null;
}

const PlayerPDGAFeedComponent: React.FunctionComponent<IPlayerPDGAFeed> = ({
  pdgaNumber,
  year,
  tournamentList,
}) => {
  const { classes } = playerPDGAFeedStyles();

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
              itemData={{
                list: tournamentList,
                pdgaNumber: pdgaNumber,
                year: year,
              }}
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
        event={tournament}
        pdgaNumber={data.pdgaNumber}
        year={data.year}
      />
    </div>
  );
};

export const PlayerPDGAFeed = PlayerPDGAFeedComponent;
