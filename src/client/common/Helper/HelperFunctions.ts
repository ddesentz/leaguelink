import { doc, setDoc } from "firebase/firestore";
import { db } from "../../..";
import { v4 as uuidv4 } from "uuid";
import { doublesSnapshot, matchPlaySnapshot } from "./HelperData";

export const createNewMatchPlayMatchup = (
  leagueId: string,
  matchId: string,
  matchUp?: any
) => {
  setDoc(
    doc(db, `leagues/${leagueId}/matches/${matchId}/matchPlay`, uuidv4()),
    matchUp ? matchUp : matchPlaySnapshot
  );
};

export const createNewDoublesMatchup = (
  leagueId: string,
  matchId: string,
  matchUp?: any
) => {
  setDoc(
    doc(db, `leagues/${leagueId}/matches/${matchId}/doubles`, uuidv4()),
    matchUp ? matchUp : doublesSnapshot
  );
};
