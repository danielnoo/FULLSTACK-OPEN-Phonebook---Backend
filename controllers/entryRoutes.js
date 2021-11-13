const entryRouter = require('express').Router()
const Entry = require('../models/entries')

// GET base path

// entryRouter.get('/', (req, res) => {
//   res.send('<h1>HELLO</h1>')
// })

// GET base API route

entryRouter.get('/', async (req, res) => {
  const entries = await Entry.find({}) 

  res.json(entries)
})

// GET phonebook info

entryRouter.get('/info', async (req, res, next) => {
  try {
    const numEntries = await Entry.estimatedDocumentCount()
    const currentTime = new Date()
    const response = `<p>Phonebook has info for ${numEntries} people 
  
  </br>
  </br> ${currentTime}</p>`
    res.send(response)
  } catch (error) {
    next(error)
  }
})

// GET specific entry

entryRouter.get('/:id', (req, res, next) => {
  Entry.findById(req.params.id)
    .then((entry) => {
      if (entry) {
        res.json(entry)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// delete an item (at this point only from local memory)

entryRouter.delete('/:id', (req, res, next) => {
  Entry.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
})

// POST an item and assign it a random id

entryRouter.post('/', (req, res, next) => {
  const body = req.body

  // if request body doesnt not include name or number, send back 400

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'content missing or not valid JSON' })
  }

  const entry = new Entry({
    name: req.body.name,
    number: req.body.number,
    important: body.important || false,
    date: new Date(),
  })

  entry
    .save()
    .then((savedEntry) => savedEntry.toJSON())
    .then((formattedEntry) => res.json(formattedEntry))
    .catch((error) => next(error))
})

/// PUT replace object in persons with updated

entryRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const newEntry = {
    name: body.name,
    number: body.number,
    important: body.important,
  }

  Entry.findByIdAndUpdate(req.params.id, newEntry, { new: true })
    .then((updatedEntry) => res.json(updatedEntry))
    .catch((error) => next(error))
})

module.exports = entryRouter