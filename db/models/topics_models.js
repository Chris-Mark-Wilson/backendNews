const db=require('../connection.js')

const selectAllTopics=()=>{

    return db.query(`
    SELECT * FROM topics;`)
    .then(({rows})=>{
      
        return rows;
    })
    .catch((err)=>{
        return Promise.reject(err)
    })
    
}
module.exports=selectAllTopics