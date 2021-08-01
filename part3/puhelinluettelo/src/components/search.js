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

export default SearchField
