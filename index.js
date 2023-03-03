const { application } = require('express');
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

const app = express()

app.use(cors());
app.use(express.json())


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token("data", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " ";
  });
  
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :data")
  );

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
                   <p>${Date()}</p>`)


})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end();
    }
})


const generateId = (min = 5, max = 2000) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


app.post('/api/persons', (request, response) => {
    const { name, number } = request.body;
    if (!name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    if (!number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }

    if (persons.find(p => p.name === name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: name,
        number: number,
        id: generateId()
    }

    persons = persons.concat(person);
    response.json(person);




})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(p => p.id !== id)
    response.status(204).end();
})

app.use(unknownEndpoint)

const PORT = process.env.PORT | 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})



