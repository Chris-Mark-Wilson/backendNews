\c nc_news_test

SELECT
articles.author,title,articles.article_id,topic,articles.created_at,articles.votes,article_img_url,
COUNT (comments.comment_id) AS comment_count
 FROM articles
 LEFT JOIN comments ON articles.article_id=comments.article_id
 WHERE topic='mitch'
 GROUP BY articles.author,articles.title,articles.article_id
 ORDER BY created_at DESC;
