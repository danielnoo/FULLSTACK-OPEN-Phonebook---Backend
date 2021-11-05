const PORT = 3001
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()



const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json())
app.use(cors())
app.use(requestLogger)
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
)


let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
    important: true,
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
    important: true,
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
    important: true,
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    important: true,
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
  
  // if request body doesnt not include name or number, send back 400
  // if name is already used in database send back 400

  if(!req.body.name || !req.body.number) {
    return res.status(400).json({ error: "content missing", })
  } else if(people.filter(person => person.name === req.body.name).length > 0) {
    return res.status(400).json({ error: "name already in use",})
  }

  const newEntry = {
    "id": randomID,
    "name": req.body.name,
    "number": req.body.number
  }

  people = people.concat(newEntry)
  
  res.json(newEntry)

})


/// PUT replace object in persons with updated

app.put('/api/persons/:id', (req, res) => {
  const newEntry = req.body
  people = people.map(person => person.id !== newEntry.id ? person : newEntry)

  res.json(newEntry)

})



/// handling for unknown endpoint

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);


// listen on PORT

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})


