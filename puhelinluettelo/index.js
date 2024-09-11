require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.static('dist'))

let persons = [
    {
        id: "1", 
        name: "Arto Hellas", 
        number: "040-123456"
    }, 
    {
        id: "2", 
        name: "Ada Lovelace",
        number: "39-44-4323423"
    }, 
    {
        id: "3", 
        name: "Dan Abramov",
        number: "12-43-234345"
    }, 
    {
        id: "4", 
        name: "Mary Poppendieck",
        number: "39-23-6423123"
    }
]

morgan.token('data', (req, res) => {
    console.log("Request method: ", req.method)
    if(req.method == "POST") {
        const jsonstring = JSON.stringify( req.body )
        console.log("!! json string ", jsonstring)
        return jsonstring
    }
    console.log("!! Not post") 
    return " "
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (request, response) => {
    response.send('Nothing too see here!')
})

app.get('/info', (request, response) => {
    const count = persons.length
    const timestamp = new Date().toString()
    console.log("Request timestamp ", timestamp)
    const txt = `<p>Phonebook has info for ${count} people</p><p>${timestamp}</p>`
    response.send(txt)
})


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id != id)

    response.json(id)
})
  
app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name) {
        return response.status(400).json({
            error: 'Name is missing'
        })
    }
    if(!body.number) {
        return response.status(400).json({
            error: 'Number is missing'
        })
    }
    /* This is not ready for mongoDB yet
    if(persons.find(person => person.name.toLowerCase() == body.name.toLowerCase())) {
        return response.status(400).json({
            error: 'Name must be unique!'
        })
    }*/

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        console.log("Created new person ", savedPerson)
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
  