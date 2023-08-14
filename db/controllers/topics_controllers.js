const selectAllTopics=require('../models/topics_models')

const getAllTopics=((req,res,next)=>{
selectAllTopics()
.then((result)=>{
    
res.status(200).send({topics:result})
})
.catch((err)=>{
    next(err)
})

 
})
module.exports=getAllTopics;