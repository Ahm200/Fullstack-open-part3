
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
require('dotenv').config()

const Person = require('./models/person')

const app = express()

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(cors());
app.use(express.json())
app.use(express.static('build'))



morgan.token("data", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " ";
});

app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :data")
);



app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})


app.get("/info", (request, response, next) => {
    Person.find({})
      .then((people) => {
        response.send(
          `<p>Phonebook has info for ${
            people.length
          } people</p><p>${new Date()}</p>`
        );
      })
      .catch((error) => next(error));
  });
  

app.get('/api/persons/:id', (request, response,next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})






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

    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.put('/api/persons/:id',(request,response,next) => {
    const body = request.body;

    const person = {
        name:body.name,
        number:body.number,
    }
    Person.findByIdAndUpdate(request.params.id,person,{new:true})
      .then(updatePerson => {
        response.json(updatePerson)
      }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


