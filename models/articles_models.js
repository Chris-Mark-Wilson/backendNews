const db = require("../db/connection");

const selectArticleById = (id) => {
  return db
    .query(
      `SELECT articles.article_id,articles.title,articles.topic,articles.author,articles.body
      ,articles.created_at,articles.votes,articles.article_img_url, COUNT(comment_id) ::INTEGER AS comment_count 
      FROM articles
      LEFT JOIN comments ON articles.article_id=comments.article_id
      WHERE articles.article_id=$1
      GROUP BY articles.article_id;`,
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

const updateArticle = (article_id, body) => {
  const { inc_votes } = body;

  return db
    .query(
      `
  UPDATE articles
  SET votes=articles.votes+$1
  WHERE article_id=$2
  RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { selectArticleById, selectAllArticles, updateArticle };
