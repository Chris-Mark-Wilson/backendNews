const db = require("../db/connection");

const selectArticleById = (id) => {
  return db
    .query(
      `SELECT * FROM articles
    WHERE article_id=$1;`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return rows[0];
    });
};
const selectAllArticles = () => {
  return db
    .query(
      `SELECT
articles.author,title,articles.article_id,topic,articles.created_at,articles.votes,article_img_url,
COUNT (comments.comment_id) AS comment_count
 FROM articles
 LEFT JOIN comments ON articles.article_id=comments.article_id
 GROUP BY articles.author,articles.title,articles.article_id
 ORDER BY created_at DESC;`
    )
    .then((result) => {
     
      return result.rows;
    });
};

module.exports = { selectArticleById, selectAllArticles };
