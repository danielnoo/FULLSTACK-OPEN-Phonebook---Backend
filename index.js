const PORT = 3001
const express = require('express')

const app = express();

app.use(express.json());

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

/// GET request from base api url
app.get('/', (req, res) => {
  res.send(`<h1>HELLO</h1>`)
})

// GET base API route

app.get('/api/persons', (req, res) => {
  res.json(people)
})


// GET phonebook info

app.get('/info', (req, res) => {
  
  const currentTime = new Date()
  const response = `<p>Phonebook has info for ${people.length} people 
  
  </br>
  </br> ${currentTime}</p>`;
  res.send(response)
})

// GET specific entry

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  
  const response = people.find(person => person.id === id)
    
  if(response) {
    res.json(response);
  } else {
    res.status(404).end()
  }
  
})

// delete an item (at this point only from local memory)

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  people = people.filter(person => person.id !== id)

  res.status(204).end()
})

// POST an item and assign it a random id

app.post('/api/persons/', (req, res) => {
  // create random id for new entry
  const randomID = Math.floor(Math.random() * 999999999999)
  console.log(req)

})



// listen on PORT

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})


