import { onCall } from "..";

exports.getPlayerRating = onCall((data: any) => {
  const pdgaNumber = data.data.pdgaNumber;

  return new Promise((resolve, reject) => {
    fetch(
      `https://api.pdga.com/services/json/players?pdga_number=${pdgaNumber}`,
      {
        headers: {
          Cookie:
            "SSESSf1f85588bb869a1781d21eec9fef1bff=_pI21LDH6rSnhTxWA2qnume8D4j63c4Sgp8WdUf9VI8",
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        console.log(data.players[0]);
        resolve(data.players[0]);
      });
    });
  });
});
