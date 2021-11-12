const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('api returns json format', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
  const response = await api.get('/api/persons')

  expect(response.body).toHaveLength(2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/persons')

  expect(response.body[0].content).toBe('HTML is easy')
})

afterAll(() => {
  mongoose.connection.close()
})
