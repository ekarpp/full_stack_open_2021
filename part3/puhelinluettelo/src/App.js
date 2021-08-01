import React, { useState, useEffect } from 'react'
import personService from './services/person.js'
import PersonForm from './components/form.js'
import Persons from './components/person.js'
import SearchField from './components/search.js'
import Notification from './components/notification.js'

import './index.css'

const App = () => {
  const DEFAULT_NAME = ''
  const DEFAULT_NUMBER = ''

  const [ newName, setNewName ] = useState(DEFAULT_NAME)
  const [ newNumber, setNewNumber ] = useState(DEFAULT_NUMBER)
  const [ msg, setMsg ] = useState(null)
  const [ errMsg, setErrMsg ] = useState(null)

  const [ persons, setPersons] = useState([])
  const [ shownPersons, setShownPersons ] = useState(persons)
  const [ searchFilter, setSearchFilter ] = useState('')

  useEffect(() => {
    setShownPersons(persons.filter(
      (person) => person.name.includes(searchFilter)
    ))
  }, [searchFilter, persons])

  useEffect(() => {
    personService
      .get()
      .then(persons => setPersons(persons))
  }, [])

  const addNotif = (msg, setter) => {
    setter(msg)
    setTimeout(() => {
        setter(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber
    }

    const duplicate = persons.find(e => e.name === person.name)

    if (duplicate !== undefined) {
      person.id = duplicate.id
      const confirmation = `${person.name} already in phonebook, replace number?`
      if (window.confirm(confirmation)) {
        personService
          .put(person)
          .then(newPerson => {
            addNotif(`Updated number of ${newPerson.name}`, setMsg)
            setPersons(
              persons
                .filter(p => p.name !== person.name)
                .concat(newPerson)
            )
            setNewName(DEFAULT_NAME)
            setNewNumber(DEFAULT_NUMBER)
          })
          .catch(err => {
            addNotif(`${person.name} has been already deleted`, setErrMsg)
          })
      } else {
        setNewName(DEFAULT_NAME)
        setNewNumber(DEFAULT_NUMBER)
      }
    } else {
      personService
        .post(person)
        .then(newPerson => {
          addNotif(`Added ${newPerson.name}`, setMsg)
          setPersons(persons.concat(newPerson))
          setNewName(DEFAULT_NAME)
          setNewNumber(DEFAULT_NUMBER)
        })
        .catch(err => addNotif(err.response.data.error, setErrMsg))
    }
  }

  const deletePerson = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .del(person.id)
        .then(resp => {
          addNotif(`Deleted ${person.name}`, setMsg)
          setPersons(persons.filter(other => other.id !== person.id))
        })
        .catch(err => {
          addNotif(`${person.name} has been already deleted`, setErrMsg)
        })
    }
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
      <Notification msg={msg} error={errMsg}/>
      <SearchField data={searchData} />
      <PersonForm data={formData} />
      <Persons persons={shownPersons} del={deletePerson} />
    </div>
  )

}

export default App
