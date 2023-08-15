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

describe("/api/topics", () => {
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

describe("/api/articles/:article_id", () => {
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
      .then(({ body }) => {
        expect(body).toEqual({ status: 400, msg: "invalid data type" });
      });
  });
});

describe("/api/articles", () => {
  it("should respond with 200 and an array of article objects, sorted by date DESC without a body property", () => {
    return request(app)
      .get("/api/articles")
      .expect("content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
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
        console.log(articles)
        articles.forEach((article) => {
          if (article.article_id === 1) {
            expect(article.comment_count).toBe("11");
          }
          if ((article.article_id === 9)) {
            expect(article.comment_count).toBe("2");
          }
        });
      });
  });
});
