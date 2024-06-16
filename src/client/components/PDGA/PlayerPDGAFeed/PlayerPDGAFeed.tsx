import * as React from "react";
import { playerPDGAFeedStyles } from "./PlayerPDGAFeedStyles";
import { LoadingFull } from "../../../common/rive/LoadingFull";
import { Grid } from "@mui/material";
import { PlayerPDGATournamentCard } from "../PlayerPDGATournamentCard/PlayerPDGATournamentCard";
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

  React.useEffect(() => {
    return () => {
      const playerContentWrapper = document.getElementById(
        "playerContentWrapper"
      );
      if (playerContentWrapper) playerContentWrapper.scrollTop = 0;
    };
  });

  const getScrollContainerStyle = () => {
    const playerDetailsContainer = document.getElementById(
      "playerDetailsContainer"
    );
    const playerTabOptions = document.getElementById("playerTabOptions");
    if (playerDetailsContainer && playerTabOptions) {
      return {
        paddingTop:
          playerDetailsContainer.getBoundingClientRect().height +
          playerTabOptions.getBoundingClientRect().height +
          64,
      };
    }
    return {
      paddingTop: 0,
    };
  };

  const handleScrollOffset = (e: any) => {
    const { scrollTop } = e.target;
    const playerContentWrapper = document.getElementById(
      "playerContentWrapper"
    );
    if (playerContentWrapper) {
      playerContentWrapper.scrollTop = scrollTop;
    }
  };

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
        <div
          id="feedScrollContainer"
          onScroll={handleScrollOffset}
          style={getScrollContainerStyle()}
          className={classes.scrollContainer}
        >
          {tournamentList.map((tournament, index) => (
            <PlayerPDGATournamentCard
              key={index}
              event={tournament}
              pdgaNumber={pdgaNumber}
              year={year}
            />
          ))}
        </div>
      )}
    </Grid>
  );
};

export const PlayerPDGAFeed = PlayerPDGAFeedComponent;
