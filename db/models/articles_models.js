const db=require('../connection')

const selectArticleById=(id)=>{

    return db.query(`SELECT * FROM articles
    WHERE article_id=$1;`,[id])
    .then(({rows})=>{
        if(rows.length===0){
            return Promise.reject({status:404,msg:"not found"})
        }
        return rows[0];
    })
    .catch((err)=>{
      if(err.code==="22P02"){
        return Promise.reject({status:400,msg:"invalid data type"})
      }else return Promise.reject(err)
    })


}

module.exports=selectArticleById;