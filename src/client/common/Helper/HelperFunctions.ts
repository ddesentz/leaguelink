import { doc, setDoc } from "firebase/firestore";
import { db } from "../../..";
import { v4 as uuidv4 } from "uuid";
import { doublesSnapshot, matchPlaySnapshot } from "./HelperData";

export const urlToBlob = (url: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("error", reject);
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    });
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
};

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

export const useDarkContrast = (hex: string) => {
  let r = parseInt(hex.substr(1, 2), 16);
  let g = parseInt(hex.substr(3, 2), 16);
  let b = parseInt(hex.substr(5, 2), 16);
  let yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128;
};
