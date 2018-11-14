require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(
  url,
  { useNewUrlParser: true }
)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const printAllPersons = () => {
  Person.find({}).then(persons => {
    console.log('puhelinluettelo:')
    persons.forEach(person => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
}

const addPerson = (name, number) => {
  const person = new Person({ name, number })
  person.save().then(() => {
    console.log('lisätty!')
    mongoose.connection.close()
  })
}

const name = process.argv[2]
const number = process.argv[3]

if (name === undefined || number === undefined) {
  printAllPersons()
} else {
  addPerson(name, number)
}
