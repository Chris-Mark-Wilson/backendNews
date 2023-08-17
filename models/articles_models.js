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
const selectAllArticles = (topic, sort_by = "created_at", order = `DESC`) => {
  let queryValues = [];
  sort_by = sort_by.toLowerCase();
  order = order.toUpperCase();
  const sortList = [
    "author",
    "title",
    "article_id",
    "topic",
    "votes",
    "created_at",
  ];
  const orderList = ["ASC", "DESC"];
  if (!orderList.includes(order))
    return Promise.reject({
      status: 400,
      msg: `${order} is not a valid order use [ASC, DESC]`,
    });
  if (!sortList.includes(sort_by))
    return Promise.reject({
      status: 400,
    msg: `${sort_by} is not a valid argument, use ['author','title','article_id','topic','votes','created_at']`,
    });

  let baseQuery = `SELECT
  articles.author,title,articles.article_id,topic,articles.created_at,articles.votes,article_img_url,
  COUNT (comments.comment_id) AS comment_count
   FROM articles
   LEFT JOIN comments ON articles.article_id=comments.article_id `;

  if (topic) {
    baseQuery += `WHERE topic=$1 `;
    queryValues.push(topic);
  }

  baseQuery += `GROUP BY articles.author,articles.title,articles.article_id
   ORDER BY ${sort_by} ${order};`;

  return db.query(baseQuery, queryValues).then(({ rows }) => {
     return rows;
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
