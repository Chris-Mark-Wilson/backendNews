const customErrors=((err,req,res,next)=>{
    if(err.status){
        res.status(err.status).send({status:err.tatus,msg:err.msg})
    }
    else next(err)
})

const sqlErrors=((err,req,res,next)=>{
    res.status(500).send({msg:"Internal server error"})
})

module.exports={customErrors,sqlErrors}