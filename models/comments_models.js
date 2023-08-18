const db = require("../db/connection");
const format = require("pg-format");

const selectComments = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments
        WHERE article_id=$1
        ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

const insertComment = (article_id, username, body) => {
  const formattedQuery = format(
    `
  INSERT INTO comments
  (article_id,author,body)
  VALUES
  %L RETURNING *;`,
    [[article_id, username, body]]
  );
  return db.query(formattedQuery).then(({ rows }) => {
    return rows[0];
  });
};

const deleteComment = (comment_id) => {
  return db.query(
    `DELETE from comments
  WHERE comment_id = $1
  RETURNING *;
  `,
    [comment_id.toString()]
  )
  .then(({rows})=>{
if(!rows.length) return Promise.reject({status:404,msg:"not found"})
  });
};

const updateCommentVotes=(comment_id,inc_votes)=>{
  
 return db.query(`
 UPDATE comments
 SET votes=comments.votes+$2
 WHERE comment_id=$1
 RETURNING *;`,[comment_id,inc_votes])
 .then(({rows})=>{
  return rows[0]
 })
}

const selectCommentByCommentId=(comment_id)=>{
return db.query(`
SELECT * FROM comments
WHERE comment_id=$1`,[comment_id])
.then(({rows})=>{
  if(rows.length===0) return Promise.reject({status:404,msg:"comment not found"})
  else return rows[0]
})
}
module.exports = { selectComments, insertComment, deleteComment , updateCommentVotes,selectCommentByCommentId};
