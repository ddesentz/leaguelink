import { doc, setDoc } from "firebase/firestore";
import { db } from "../../..";
import { v4 as uuidv4 } from "uuid";
import { doublesSnapshot, matchPlaySnapshot } from "./HelperData";
import * as cheerio from "cheerio";
import { IPDGATournamentResult } from "../types/DiscGolf/PDGA/PDGA";

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

export const scrapeUserPDGAData = (html: string, year: string) => {
  const $ = cheerio.load(html);
  const $tournament = $("td.tournament");
  let slugList: IPDGATournamentResult[] = [];
  $tournament.each((i, el) => {
    const tierEl = $(el).next();
    const datesEl = $(tierEl).next();
    const slug = $(el).find("a").attr("href");
    const splitId = slug.split("/");
    const tournamentId = splitId[splitId.length - 1];
    const slugs = tournamentId.split("#");
    if (datesEl.text().includes(year)) {
      const splitDates = datesEl.text().split("-");
      let startDate = 0;
      let endDate = 0;
      if (splitDates.length === 3) {
        const date = new Date(Date.parse(datesEl.text())).valueOf();
        startDate = date;
        endDate = date;
      } else {
        const dates = datesEl.text().split(" to ");
        const dateList = dates.map((date) => {
          return new Date(Date.parse(date)).valueOf();
        });
        startDate = dateList[0];
        endDate = dateList[1];
      }
      slugList.push({
        tournamentId: slugs[0],
        division: slugs[1],
        details: {
          name: $(el).text(),
          tier: tierEl.text(),
          startDate: startDate,
          endDate: endDate,
        },
      } as IPDGATournamentResult);
    }
  });

  return slugList;
};
