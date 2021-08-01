const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/puhelinluettelo'

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  Person.find({})
    .then(result => {
      console.log('phonebook:')
      result.forEach(p => console.log(`${p.name} ${p.number}`))
      mongoose.connection.close()
    })
} else if (process.argv.length >= 4) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
    id: Math.round(Math.random() * (1 << 30))
  })

  person.save()
    .then(resp => {
      console.log(`Added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
} else {
  console.log('missing arguments')
  mongoose.connection.close()
}





/*
person.save()
  .then(resp => console.log("saved"))
  .then(() => Person.find({}))
  .then(result => {
    result.forEach(p => console.log(p))
    mongoose.connection.close()
  })
*/
