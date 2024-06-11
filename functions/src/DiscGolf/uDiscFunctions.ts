const { onCall } = require("firebase-functions/v2/https");

exports.searchCourses = onCall((data: any) => {
  const searchTerm = data.data.searchTerm;

  return new Promise((resolve, reject) => {
    fetch(
      `https://udisc.com/courses?courseTerm=${searchTerm}&_data=routes%2Fcourses%2Findex`
    ).then((res) => {
      res.json().then((data) => {
        resolve(data);
      });
    });
  });
});
