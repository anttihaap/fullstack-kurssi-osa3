const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(
  url,
  { useNewUrlParser: true }
)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  number: String
})
personSchema.statics.format = person => {
  return { id: person._id, name: person.name, number: person.number }
}
personSchema.statics.containsPersonWithName = name => {
  this.findOne({ name })
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
