const fs = require("fs/promises");
const getAllEndpoints = (req, res, next) => {
  const path = __dirname + "/../../endpoints.json";
  return fs
    .readFile(path, "utf-8")
    .then((result) => {
      res.status(200).send({ endpoints: JSON.parse(result) });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getAllEndpoints;
