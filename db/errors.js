const customErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ status: err.status, msg: err.msg });
  } else if (err.code) {
    if (err.code === "22P02")
      res.status(400).send({ status: 400, msg: "invalid data type" });
  } else next(err);
};

const serverErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
};

module.exports = { customErrors, serverErrors };
