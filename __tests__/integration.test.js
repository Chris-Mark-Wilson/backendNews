const request = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const endpointsFile = require("../endpoints.json");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/topics", () => {
  it("should respond 200 with all topics, eachwith a slug and description property", () => {
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
describe("Bad route", () => {
  it("should respond 404 for bad route", () => {
    return request(app).get("/api/topic").expect(404);
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

describe.skip("/api/articles", () => {
  it("should respond with 200 and an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect("content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("articles");
        body.articles.forEach((article) => {
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id:expect.any(Number),
            topic:expect.any(String),
            created_at:expect.any(String),
            votes:expect.any(Number),
            article_img_url:expect.any(String),
            comment_count:Expect.any(Number)
          });
        });
      });
  });
});
