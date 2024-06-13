import * as React from "react";
import { playerPDGAFeedStyles } from "./PlayerPDGAFeedStyles";
import * as cheerio from "cheerio";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../../..";
import { LoadingFull } from "../../../common/rive/LoadingFull";
import { Grid } from "@mui/material";
import { PlayerPDGATournamentCard } from "../PlayerPDGATournamentCard/PlayerPDGATournamentCard";

interface ITournamentSlug {
  tournamentId: string;
  division: string;
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
    const $tournament = $(".tournament > a");
    let slugList: ITournamentSlug[] = [];
    $tournament.each((i, el) => {
      const slug = $(el).attr("href");
      const splitId = slug.split("/");
      const tournamentId = splitId[splitId.length - 1];
      const slugs = tournamentId.split("#");
      slugList.push({
        tournamentId: slugs[0],
        division: slugs[1],
      } as ITournamentSlug);
    });
    setTournamentList(slugList);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      className={classes.playerPDGAFeedContainer}
    >
      {tournamentList === null ? (
        <LoadingFull className={classes.loading} />
      ) : (
        <>
          {tournamentList.map((tournament, idx) => (
            <PlayerPDGATournamentCard
              key={idx}
              tournamentId={tournament.tournamentId}
              division={tournament.division}
              pdgaNumber={pdgaNumber}
            />
          ))}
        </>
      )}
    </Grid>
  );
};

export const PlayerPDGAFeed = PlayerPDGAFeedComponent;
