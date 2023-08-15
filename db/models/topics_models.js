const db=require('../connection.js')

const selectAllTopics=()=>{

    return db.query(`
    SELECT * FROM topics;`)
    .then(({rows})=>{
        return rows;
    })
  
    
}
module.exports=selectAllTopics