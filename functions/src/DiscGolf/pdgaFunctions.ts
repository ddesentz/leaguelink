import { onCall } from "..";

exports.getPlayerPage = onCall((data: any) => {
  const pdgaNumber = data.data.pdgaNumber;
  const year = data.data.year;

  return new Promise((resolve, reject) => {
    fetch(`https://www.pdga.com/player/${pdgaNumber}/stats/${year}`).then(
      (res) => {
        res.text().then((html) => {
          resolve(html);
        });
      }
    );
  });
});

exports.getPlayerPDGATournamentDetails = onCall((data: any) => {
  const tournamentId = data.data.tournamentId;
  const division = data.data.division;

  return new Promise((resolve, reject) => {
    fetch(
      `https://www.pdga.com/apps/tournament/live-api/live_results_fetch_round?TournID=${tournamentId}&Division=${division}`
    ).then((res) => {
      res.json().then((data) => {
        resolve(data.data);
      });
    });
  });
});

exports.getPlayerPDGATournamentResults = onCall((data: any) => {
  const resultId = data.data.resultId;

  return new Promise((resolve, reject) => {
    fetch(
      `https://www.pdga.com/apps/tournament/live-api/live_results_fetch_player?ResultID=${resultId}`
    ).then((res) => {
      res.json().then((data) => {
        resolve(data.data);
      });
    });
  });
});
