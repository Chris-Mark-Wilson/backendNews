const customErrors = ((err, req, res, next) => {
  if (err.status) res.status(err.status).send({ status: err.status, msg: err.msg })
  else next(err)
  })
  
  const sqlErrors=((err,req,res,next)=> {
    if (err.code === "22P02") {
      if (err.detail) {
        res.status(400).send({ error: err.detail });
      } else {
        res.status(400).send({ error: "invalid data type" });
      }
    } else if (err.code === "23503") {
      res.status(404).send({ error: err.detail });
    }
   else next(err);
});


const serverErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};

module.exports = { customErrors, sqlErrors,serverErrors };
