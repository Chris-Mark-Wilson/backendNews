const readEndpointsFile = require("../models/readEndpointsFile");
const getAllEndpoints = (req, res, next) => {
  readEndpointsFile()
    .then((result) => {
      res.status(200).send({ endpoints: JSON.parse(result) });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getAllEndpoints;
