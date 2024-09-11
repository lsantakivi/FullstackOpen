const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://laurasantakivi:${password}@cluster0.8hwd5.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

// just password, print persons
if(process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
      result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
      });
      mongoose.connection.close()
  })
}
// not just print, but not enough parameters
else if(process.argv.length<5) {
    console.log('Should have both name and number as parameters after password')
    process.exit(1);
}
// add person (just ignore if there are too many params)
else {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name, 
        number: number,
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}