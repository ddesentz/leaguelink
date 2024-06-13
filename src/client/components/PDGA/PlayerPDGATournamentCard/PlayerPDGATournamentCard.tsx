import * as React from "react";
import { playerPDGATournamentCardStyles } from "./PlayerPDGATournamentCardStyles";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../../..";

interface IPlayerPDGATournamentCard {
  tournamentId: string;
  division: string;
  pdgaNumber: number;
}

const PlayerPDGATournamentCardComponent: React.FunctionComponent<
  IPlayerPDGATournamentCard
> = ({ tournamentId, division, pdgaNumber }) => {
  const { classes } = playerPDGATournamentCardStyles();
  const functions = getFunctions(app);
  const [playerResults, setPlayerResults] = React.useState<any | null>(null);

  React.useEffect(() => {
    getPDGADetails();
  }, [tournamentId, division]);

  const getPDGADetails = async () => {
    const callableReturnMessage = httpsCallable(
      functions,
      "getPlayerPDGATournamentDetails"
    );
    callableReturnMessage({
      tournamentId: tournamentId,
      division: division,
    }).then((result: any) => {
      const playerData = result.data.scores.find(
        (score: any) => Number(score.PDGANum) === Number(pdgaNumber)
      );
      if (playerData) {
        getPlayerResult(Number(playerData.ResultID));
      }
    });
  };

  const getPlayerResult = async (resultId: number) => {
    const callableReturnMessage = httpsCallable(
      functions,
      "getPlayerPDGATournamentResults"
    );
    callableReturnMessage({
      resultId: resultId,
    }).then((result: any) => {
      console.log(result.data);
    });
  };

  return (
    <div
      className={classes.playerPDGATournamentCardContainer}
      style={{ height: "5000px" }}
    >
      {tournamentId}
    </div>
  );
};

export const PlayerPDGATournamentCard = PlayerPDGATournamentCardComponent;
