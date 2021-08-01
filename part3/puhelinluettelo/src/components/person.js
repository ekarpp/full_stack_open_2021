const Persons = ({ persons, del }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.id} person={person} del={del}/>)}
    </>
  )
}

const Person = ({ person, del }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={del(person)}>delete</button>
    </p>
  )
}

export default Persons
