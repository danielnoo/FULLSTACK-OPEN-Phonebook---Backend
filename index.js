require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Entry = require("./models/entries");




morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(express.static("build"));
app.use(cors());
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
);



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
app.get("/", (req, res) => {
  res.send(`<h1>HELLO</h1>`);
});

// GET base API route

app.get("/api/persons", (req, res) => {
  Entry.find({}).then(entries => res.json(entries));
});

// GET phonebook info

app.get("/info", (req, res) => {
  const currentTime = new Date();
  const response = `<p>Phonebook has info for ${people.length} people 
  
  </br>
  </br> ${currentTime}</p>`;
  res.send(response);
});

// GET specific entry

app.get("/api/persons/:id", (req, res) => {
  Entry.findById(req.params.id)
  .then(entry => {
    if(entry){
      res.json(entry)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => {
    if(error) {
      console.log(error)
      res.status(500).end()
    }
  })
});

// delete an item (at this point only from local memory)

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  people = people.filter((person) => person.id !== id);

  res.status(204).end();
});

// POST an item and assign it a random id

app.post("/api/persons/", (req, res) => {
  const body = req.body
  

  // if request body doesnt not include name or number, send back 400
  // if name is already used in database send back 400
  
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "content missing" });
  } 
    

  const entry = new Entry({
    name: req.body.name,
    number: req.body.number,
    important: body.important || false,
    date: new Date(),
  })
    
  entry.save().then(savedEntry => res.json(savedEntry))  
  

  
});

/// PUT replace object in persons with updated

app.put("/api/persons/:id", (req, res) => {
  const newEntry = req.body;
  people = people.map((person) =>
    person.id !== newEntry.id ? person : newEntry
  );

  res.json(newEntry);
});

/// handling for unknown endpoint

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// listen on PORT

const PORT = process.env.PORT || 3001;



app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
