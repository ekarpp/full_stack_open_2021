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

export default PersonForm
