export default function DataTable(props) {

  let columns = props.columns

  let data = props.data

  const deleteItem = (data) => {
    return () => {
      props.onDelete(data)
    }
  }

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          {columns.map( columnName => {
            return <th key={columnName}><p>{columnName}</p></th>
          })}
          <th width="10"><p>Delete</p></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, cnt) => {
          return (
            <tr key={cnt}>
              {columns.map( columnName => {
                return <td key={row[columnName]}><p>{row[columnName]}</p></td>
              })}
              <td width="10">
                <button onClick={deleteItem(row)} className="button is-small">X</button>
              </td>
            </tr>
          )
        })}

      </tbody>
    </table>
  )
}
