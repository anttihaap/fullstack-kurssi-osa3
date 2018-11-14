if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const logger = require('./logger')
const Person = require('./models/person.js')

app.use(bodyParser.json())
app.use(cors())
app.use(logger())

app.use('/api/persons', require('./api/persons'))

app.get('/info', (req, res) => {
  Person.count({}).then(count => {
    res.send(
      `<p>puhelinluoettelossa on ${count} henkilön tiedot</p><p>${new Date()}</p>`
    )
  })
})

app.use(express.static('build'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
