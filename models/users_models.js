const db = require("../db/connection");
const selectAllUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};

const selectUserByUsername = (username) => {
  if (!username) return [];
  if (typeof username != "string")
    return Promise.reject({
      status: 400,
      error: `invalid data type username [${typeof username}]`,
    });
  else
    return db
      .query(
        `SELECT * FROM users
WHERE username=$1`,
        [username]
      )
      .then((result) => {
        if (result.rows.length === 0)
          return Promise.reject({ status: 404, msg: "user not found" });
        return result.rows[0];
      });
};
module.exports = { selectAllUsers, selectUserByUsername };
