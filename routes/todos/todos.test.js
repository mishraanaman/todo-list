const request = require('supertest');
const { response } = require('../../app');
const app = require('../../app')

describe('Test GET /v1/todos', ()=>{
    test('It should respond with 200 success', async()=>{
        const response = await request(app).get('/v1/todos').expect('Content-Type', /json/).expect(200);
    })
})

describe('Test POST /v1/todos', ()=>{
    test('It should respond with 201 created', async()=>{
        const response = await request(app).post('/v1/todos').send(
            {
                todoNumber:105,
                date: 'January 4, 2028',
                description: 'Drink tea',
                completed: true
            }
        ).expect('Content-Type', /json/)
        .expect(201);
    });

    test("It should catch missing required properties", () => {});
    test("It should catch invalid dates", () => {});

})