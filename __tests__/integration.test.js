const request = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const endpointsFile = require("../endpoints.json");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Bad route", () => {
  it("should respond 404 for bad route", () => {
    return request(app)
      .get("/api/topic")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ status: 404, msg: "Path not found" });
      });
  });
});

describe("GET /api/topics", () => {
  it("should respond 200 with all topics, each with a slug and description property", () => {
    return request(app)
      .get("/api/topics")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(Array.isArray(topics)).toBe(true);
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(topic).toHaveProperty("description", expect.any(String));
          expect(topic).toHaveProperty("slug", expect.any(String));
        });
      });
  });
});

describe("/api", () => {
  it("should respond with the endpoints.json file", () => {
    return request(app)
      .get("/api")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsFile);
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  it("should respond 200 with the specified article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect("content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).toBe(1);
        expect(body).toHaveProperty(
          "article",
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
          })
        );
      });
  });
  it("should 404 for non existent article", () => {
    return request(app)
      .get("/api/articles/999")
      .expect("content-Type", /json/)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ status: 404, msg: "not found" });
      });
  });
  it("should 400 for invalid data type", () => {
    return request(app)
      .get("/api/articles/dodgy")
      .expect("content-Type", /json/)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error).toEqual("invalid data type");
      });
  });
});

describe("GET /api/articles", () => {
  it("should respond with 200 and an array of article objects, sorted by date DESC without a body property", () => {
    return request(app)
      .get("/api/articles")
      .expect("content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).toBe(13);
        expect(articles).toBeSortedBy("created_at", { descending: true });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String),
            })
          );
          expect(article).toEqual(
            expect.not.objectContaining({
              body: expect.any(String),
            })
          );
        });
      });
  });
  it("should have the correct number of comment_count per article", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        articles.forEach((article) => {
          if (article.article_id === 1) {
            expect(article.comment_count).toBe("11");
          }
          if (article.article_id === 9) {
            expect(article.comment_count).toBe("2");
          }
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  it("should respond 200 with all comments for a given article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments.length).toBe(11);
        expect(comments).toBeSortedBy("created_at", { descending: true });
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              article_id: expect.any(Number),
            })
          );
        });
      });
  });
  it("should 404 for a non existent article", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ status: 404, msg: "not found" });
      });
  });
  it("should return 200 with an empty array for articles with 0 comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toEqual([]);
      });
  });
  it("should 400 bad request for invalid id", () => {
    return request(app)
      .get("/api/articles/banana/comments")
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error).toEqual("invalid data type");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  it("should 201: accept a comment for a given article responding with the posted comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "lurker", body: "Don't mind me, I'm just lurking..." })
      .expect("Content-type", /json/)
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: 19,
            body: "Don't mind me, I'm just lurking...",
            article_id: 1,
            author: "lurker",
            votes: 0,
            created_at: expect.any(String),
          })
        );
      })
      .then(() => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments[0]).toEqual(
              expect.objectContaining({
                comment_id: 19,
                body: "Don't mind me, I'm just lurking...",
                article_id: 1,
                author: "lurker",
                votes: 0,
                created_at: expect.any(String),
              })
            );
          });
      });
  });
  it("should 404 for a non existent user", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "mickeyMouse",
        body: "Don't mind me, I'm just lurking...",
      })
      .expect("Content-type", /json/)
      .expect(404)
      .then(({ body: { error } }) => {
        expect(error).toEqual(
          'Key (author)=(mickeyMouse) is not present in table "users".'
        );
      });
  });
  it("should 404 for a non existent article", () => {
    return request(app)
      .post("/api/articles/999/comments")
      .send({ username: "lurker", body: "Don't mind me, I'm just lurking..." })
      .expect("Content-type", /json/)
      .expect(404)
      .then(({ body: { error } }) => {
        expect(error).toEqual(
          'Key (article_id)=(999) is not present in table "articles".'
        );
      });
  });
  it("should 400 for a bad datatype", () => {
    return request(app)
      .post("/api/articles/banana/comments")
      .send({ username: "lurker", body: "Don't mind me, I'm just lurking..." })
      .expect("Content-type", /json/)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error).toEqual("invalid data type");
      });
  });
  it("should 400 for no username", () => {
    return request(app)
      .post("/api/articles/banana/comments")
      .send({ body: "Don't mind me, I'm just lurking..." })
      .expect("Content-type", /json/)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("missing argument");
      });
  });
  it("should 400 for no body", () => {
    return request(app)
      .post("/api/articles/banana/comments")
      .send({ username: "lurker" })
      .expect("Content-type", /json/)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("missing argument");
      });
  });
  it("should 400 for bad datatype in body", () => {
    return request(app)
      .post("/api/articles/banana/comments")
      .send({ username: "lurker", body: { body: "object" } })
      .expect("Content-type", /json/)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error).toEqual("invalid data type");
      });
  });
  it("should 400 for bad datatype in body 2", () => {
    return request(app)
      .post("/api/articles/banana/comments")
      .send({ username: { obj: "lurker" }, body: "object" })
      .expect("Content-type", /json/)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error).toEqual("invalid data type");
      });
  });
  it("should still work for extra properties as long as the required are included", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "lurker",
        body: "some stuff",
        anotherKey: "some random stuff",
      })
      .expect("Content-type", /json/)
      .expect(201);
  });
});
describe("PATCH /api/articles/:article_id", () => {
  it("should respond 200 with the updated article accepting a votes property", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1 })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 101,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          })
        );
      });
  });
  it("should decrement the votes and go into minus numbers if need be", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -101 })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: -1,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          })
        );
      });
  });
  it("should 404 if the article doesnt exist", () => {
    return request(app)
      .patch("/api/articles/999")
      .send({ inc_votes: -101 })
      .expect("Content-Type", /json/)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("not found");
      });
  });
  it("should 400 for a bad key on sent object", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_vot: -101 })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error).toEqual(
          "Failing row contains (1, Living in the shadow of a great man, mitch, butter_bridge, I find this existence challenging, 2020-07-09 21:11:00, null, https://images.pexels.com/photos/158651/news-newsletter-newspape...)."
        );
      });
  });
  it("should 400 for a bad datatype on article_id", () => {
    return request(app)
      .patch("/api/articles/banana")
      .send({ inc_votes: -101 })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error).toEqual("invalid data type");
      });
  });
  it("should 400 for a bad datatype on inc_votes", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: { obj: "dodgy" } })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error).toEqual("invalid data type");
      });
  });
});

describe("GET /api/users", () => {
  it(" should respond 200 with all users", () => {
    return request(app)
      .get("/api/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users.length).toBe(4);

        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  it("should respond 204 no content and delete the given comment", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then((body) => {
        return request(app)
          .get("/api/articles/9/comments")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments.length).toBe(1);
            expect(comments[0].body).toEqual(
              "The owls are not what they seem."
            );
          });
      });
  });
  it("should respond 404 for non existent comment", () => {
    return request(app)
      .delete("/api/comments/999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("not found");
      });
  });
  it("should respond 400 for bad datatype", () => {
    return request(app)
      .delete("/api/comments/comment")
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error).toBe("invalid data type");
      });
  });
});

describe(' GET /api/articles/:article_id',()=>{
  it('should now include comment_count in the result',()=>{
    return request(app)
    .get('/api/articles/1')
    .expect('Content-Type',/json/)
    .expect(200)
    .then(({body:{article}})=>{
      expect(article).toEqual(expect.objectContaining({
        comment_count:11
      }))
    })

  })
})
