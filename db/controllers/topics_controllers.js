const selectAllTopics = require("../models/topics_models");

const getAllTopics = (req, res, next) => {
  selectAllTopics()
    .then((result) => {
      if (result.length === 0) res.status(200).send("No topics found");
      res.status(200).send({ topics: result });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = getAllTopics;
