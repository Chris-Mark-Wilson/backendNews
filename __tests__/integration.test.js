const request = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

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
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(body).toHaveProperty("endpoints");
        expect(typeof body.endpoints).toBe("object");
        expect(body.endpoints).toHaveProperty("GET /api");
        const keys = Object.keys(body.endpoints);
        keys.forEach((key) => {
          if (key != "GET /api") {
            expect(body.endpoints[key]).toHaveProperty("description");
            expect(body.endpoints[key]).toHaveProperty("queries");
            expect(body.endpoints[key]).toHaveProperty("exampleResponse");
          }else{
            expect(body.endpoints[key]).toHaveProperty("description");
          }
        });
      });
  });
});
