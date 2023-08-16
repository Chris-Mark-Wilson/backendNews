const customErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ status: err.status, msg: err.msg });
  } else if (err.code) {
 
   if(err.code==="23503" ){
    res.status(404).send({error:err.detail})
   }else
      if (err.detail) {
        res.status(400).send({ error: err.detail });
      } else {
        res.status(400).send({ error: "invalid data type" });
      }
    }else next(err);
 
 
};

const serverErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};

module.exports = { customErrors, serverErrors };
