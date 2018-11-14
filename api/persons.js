const express = require('express')
const mongoose = require('mongoose')

const app = express()
const Person = require('../models/person')

const validateParamsObjectid = (req, res, next) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'ObjectId invalid' })
  } else {
    next()
  }
}

const validateBodyPerson = (req, res, next) => {
  const body = req.body
  if (body === undefined) {
    res.status(400).json({ err: 'body missing' })
  } else if (body.name === undefined) {
    res.status(400).json({ error: 'name missing' })
  } else if (body.number === undefined) {
    res.status(400).json({ error: 'number missing' })
  } else {
    next()
  }
}

app.get('/', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(Person.format))
  })
})

app.get('/:id', validateParamsObjectid, (req, res) => {
  const id = req.params.id

  Person.findOne({ _id: id }).then(person => {
    if (person) {
      res.send(person.number)
    } else {
      res.status(404).end()
    }
  })
})

app.delete('/:id', validateParamsObjectid, (req, res) => {
  const id = req.params.id
  Person.deleteOne({ _id: id }).then(() => {
    res.status(204).end()
  })
})

app.post('/', validateBodyPerson, async (req, res) => {
  const body = req.body

  if (await Person.findOne({ name: body.name }).exec()) {
    res.status(400).json({ error: 'name must be unique' })
  } else {
    new Person({ name: body.name, number: body.number }).save().then(person => {
      res.json(Person.format(person))
    })
  }
})

app.put('/:id', validateBodyPerson, (req, res) => {
  const id = req.params.id
  Person.updateOne({ _id: id }, { number: req.body.number }).then(() => {
    res.status(204).end()
  })
})

module.exports = app
