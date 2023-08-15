
const {selectArticleById,selectAllArticles}=require("../models/articles_models")

const getArticleById=((req,res,next)=>{
    const {article_id}=req.params;
    selectArticleById(article_id)
    .then((result)=>{
        res.status(200).send({article:result})
    })
    .catch((err)=>{
        next(err)
    })
})
const getAllArticles=((req,res,next)=>{
   
    selectAllArticles()
    .then((result)=>{
        res.status(200).send({articles:result})
        
    })
    .catch((err)=>{
        next(err)
    })
})

module.exports={getArticleById,getAllArticles}