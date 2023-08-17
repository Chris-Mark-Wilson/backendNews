const db = require("../db/connection.js");

const selectAllTopics = () => {
  return db
    .query(
      `
    SELECT * FROM topics;`
    )
    .then(({ rows }) => {
      return rows;
    });
};
const selectTopicByTopicName = (topic) => {
  if (!topic) return "[]";
  return db
    .query(
      `SELECT * FROM topics
    WHERE slug=$1`,
      [topic]
    )
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "topic not found" });
      else return rows;
    });
};
module.exports = { selectAllTopics, selectTopicByTopicName };
