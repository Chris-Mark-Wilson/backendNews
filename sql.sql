\c nc_news_test

SELECT articles.article_id,articles.title,articles.topic,articles.author,articles.body
,articles.created_at,articles.votes,articles.article_img_url, COUNT(comment_id) AS comment_count 
FROM articles
 LEFT JOIN comments ON articles.article_id=comments.article_id
WHERE articles.article_id=2
GROUP BY articles.article_id;
