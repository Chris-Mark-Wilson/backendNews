const selectAllUsers = require("../models/users_models");

const getUsers = (req, res, next) => {
  selectAllUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = getUsers;
