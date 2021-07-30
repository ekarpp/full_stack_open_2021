import React, { useState, useEffect } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ shownPersons, setShownPersons ] = useState(persons)
  const [ searchFilter, setSearchFilter ] = useState('')

  useEffect(() => {
    setShownPersons(persons.filter(
      (person) => person.name.includes(searchFilter)
    ))
  }, [searchFilter, persons])

  const DEFAULT_NAME = ''
  const DEFAULT_NUMBER = ''

  const [ newName, setNewName ] = useState(DEFAULT_NAME)
  const [ newNumber, setNewNumber ] = useState(DEFAULT_NUMBER)

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber
    }

    if (persons.every((p) => p.name !== person.name))
      setPersons(persons.concat(person))
    else
      alert(`${newName} is already added to phonebook`)

    setNewName(DEFAULT_NAME)
    setNewNumber(DEFAULT_NUMBER)
  }

  const formData = {
    submit: addPerson,
    name: newName,
    setName: setNewName,
    number: newNumber,
    setNumber: setNewNumber
  }

  const searchData = {
    filter: searchFilter,
    setFilter: setSearchFilter
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchField data={searchData}/>
      <PersonForm data={formData}/>
      <Persons persons={shownPersons}/>
    </div>
  )

}

const SearchField = ({ data }) => {
  return (
    <>
      filter names with
      <input
        value={data.filter}
        onChange={(e) => data.setFilter(e.target.value)}
      />
    </>
  )
}

const PersonForm = ({ data }) => {

  return (
    <>
    <h2>Add new</h2>
    <form onSubmit={data.submit}>
      <div>
        name: <input
                value={data.name}
                onChange={(e) => data.setName(e.target.value)}
              />
      </div>
      <div>
        number: <input
                  value={data.number}
                  onChange={(e) => data.setNumber(e.target.value)}
                />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}

const Persons = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} person={person}/>)}
    </>
  )
}

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

export default App
