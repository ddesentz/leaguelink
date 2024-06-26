import { client, functions } from "../index";

const teamsIndex = client.initIndex("leagues/{leagueId}/teams");
const playerIndex = client.initIndex("leagues/{leagueId}/players");

exports.addTeamToIndex = functions.firestore
  .document("leagues/{leagueId}/teams/{teamId}")
  .onCreate((snapshot: any) => {
    const data = snapshot.data();
    const objectID = snapshot.id;
    return teamsIndex.saveObject({ ...data, objectID });
  });

exports.updateTeamIndex = functions.firestore
  .document("leagues/{leagueId}/teams/{teamId}")
  .onUpdate((change: any) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return teamsIndex.saveObject({ ...newData, objectID });
  });

exports.deleteTeamFromIndex = functions.firestore
  .document("leagues/{leagueId}/teams/{teamId}")
  .onDelete((snapshot: any) => teamsIndex.deleteObject(snapshot.id));

exports.addPlayerToIndex = functions.firestore
  .document("leagues/{leagueId}/players/{playerId}")
  .onCreate((snapshot: any) => {
    const data = snapshot.data();
    const objectID = snapshot.id;
    return playerIndex.saveObject({ ...data, objectID });
  });

exports.updatePlayerIndex = functions.firestore
  .document("leagues/{leagueId}/players/{playerId}")
  .onUpdate((change: any) => {
    const newData = change.after.data();
    console.log(newData);
    const objectID = change.after.id;
    return playerIndex.saveObject({ ...newData, objectID });
  });

exports.deletePlayerFromIndex = functions.firestore
  .document("leagues/{leagueId}/players/{playerId}")
  .onDelete((snapshot: any) => playerIndex.deleteObject(snapshot.id));
