const request=require('supertest')
const db=require('../db/connection')
const app=require('../db/app')
const seed=require('../db/seeds/seed')
const data=require('../db/data/test-data')

beforeEach(()=>seed(data))
afterAll(()=>db.end())

describe('/api/topics',()=>{
    it('should respond 200 with all topics, eachwith a slug and description property',()=>{
        return request(app)
        .get('/api/topics')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({body:{topics}})=>{
            expect(Array.isArray(topics)).toBe(true)
                expect(topics.length).toBe(3)
                topics.forEach(topic=>{
                    expect(topic).toHaveProperty('description',expect.any(String));
                    expect(topic).toHaveProperty('slug',expect.any(String))
                })
        })
    })
    it('should respond 404 for a bad route',()=>{
        return request(app)
        .get("/api/topic")
        .expect(404)
    })
})