import { client, functions } from "../index";

const teamsIndex = client.initIndex("leagues/{leagueId}/teams");

exports.addToIndex = functions.firestore
  .document("leagues/{leagueId}/teams/{teamId}")
  .onCreate((snapshot: any) => {
    const data = snapshot.data();
    const objectID = snapshot.id;
    return teamsIndex.saveObject({ ...data, objectID });
  });

exports.updateIndex = functions.firestore
  .document("leagues/{leagueId}/teams/{teamId}")
  .onUpdate((change: any) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return teamsIndex.saveObject({ ...newData, objectID });
  });

exports.deleteFromIndex = functions.firestore
  .document("leagues/{leagueId}/teams/{teamId}")
  .onDelete((snapshot: any) => teamsIndex.deleteObject(snapshot.id));
