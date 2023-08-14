const db=require('../connection.js')

const selectAllTopics=()=>{

    return db.query(`
    SELECT * FROM topics;`)
    .then(({rows})=>{
        if(rows.length===0){
            return Promise.reject({status:404,msg:"not found"})
        }
        return rows;
    })
    .catch((err)=>{
        return Promise.reject(err)
    })
    
}
module.exports=selectAllTopics