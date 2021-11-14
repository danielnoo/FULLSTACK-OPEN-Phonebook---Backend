const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const entries = require('../models/entries')
const initialEntries = [
  {
    name: 'testface',
    number: '9878678678678678',
    date: new Date(),
    important: false,
  },
  {
    name: 'dingus',
    number: '342534523452345234523452345',
    date: new Date(),
    important: true,
  },
]
beforeEach(async () => {
  await entries.deleteMany({})
  let entriesObject = new entries(initialEntries[0])
  await entriesObject.save()
  entriesObject = new entries(initialEntries[1])
  await entriesObject.save()
})

test('api returns json format', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all entries are returned', async () => {
  const response = await api.get('/api/persons')

  expect(response.body).toHaveLength(initialEntries.length)
})

test('the first entry name is testface', async () => {
  const response = await api.get('/api/persons')

  const contents = response.body.map((r) => r.number)
  expect(contents).toContain('342534523452345234523452345')
  
})

test('a valid entry can be added', async () => {
  const newEntry = {
    name: 'bobbbbbb',
    number: '342534523452',
    important: true,
  }

  await api
    .post('/api/persons')
    .send(newEntry)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/persons')

  const contents = response.body.map((r) => r.name)

  expect(response.body).toHaveLength(initialEntries.length + 1)
  expect(contents).toContain('bobbbbbb')
})


afterAll(() => {
  mongoose.connection.close()
})
