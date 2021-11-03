const PORT = 3001
const express = require('express')

const app = express();

const people = [
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
  
  const response = people.filter(person => person.id === id)
  console.log(response);
  
  if(response) {
    res.json(response);
  } else {
    res.status(404).end()
  }
  
})






// app.get()

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})


const bakedGoodOrders = [
  {
    cupcakes: 10,
    cakes: 0,
    tarts: 0,
  },
  {
    cupcakes: 0,
    cakes: 1,
    tarts: 12,
  },
  {
    cupcakes: 6,
    cakes: 0,
    tarts: 12,
  },
  {
    cupcakes: 2,
    cakes: 1,
    tarts: 0,
  },
];

// const addCupcakesTwo =
//   ((initial, iterating) => {
//     return initial.cupcakes + iterating.cupcakes;
//   },
//   {});

const cupcakes = bakedGoodOrders.reduce((acc, cur) => {
  return acc + cur.cupcakes;
});
console.log(JSON.stringify(cupcakes));