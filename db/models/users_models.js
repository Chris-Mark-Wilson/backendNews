const db=require('../connection')

const selectUserByUsername=(username)=>{

    return db.query(`
    SELECT * FROM users
    WHERE username=$1`,[username])
    .then(({rows})=>{
        if(rows.length===0){
            return Promise.reject({status:404,msg:"not found"})
        }
        return rows[0]
    })
}
module.exports=selectUserByUsername