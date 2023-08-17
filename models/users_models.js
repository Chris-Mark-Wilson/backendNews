const db = require("../db/connection");
const selectAllUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};
module.exports = selectAllUsers;
