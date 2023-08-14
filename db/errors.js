const customErrors=((err,req,res,next)=>{
    if(err.status){
        res.status(err.status).send(err.msg)
    }
    else next(err)
})

const sqlErrors=((err,req,res,next)=>{
    console.log(err)
    res.status(500).send({msg:"Internal server error"})
})

module.exports={customErrors,sqlErrors}