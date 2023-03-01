const express = require('express')
const app = express()

app.use(express.json())

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


const generateId = (min=5,max=2000) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

    
app.post('/api/persons', (req, res) => {
    const {name,number} = req.body;
    if (!name) {
        return res.status(400).json({
            error: 'name is missing'
        })
    }

    if (!number) {
        return res.status(400).json({
            error: 'number is missing'
        })
    }

    if (persons.find(p => p.name === name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: name,
        number: number,
        id: generateId()
    }

    persons = persons.concat(person);
    res.json(person);




})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(p => p.id !== id)
    response.status(204).end();
})

const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})



