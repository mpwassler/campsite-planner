export default function DataTable(props) {

  let columns = props.columns

  let data = props.data

  console.log(data)

  return (
    <table class="table is-fullwidth">
      <thead>
        <tr>
          {columns.map( columnName => {
            return <th key={columnName}>{columnName}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {data.map(row => {
          return (
            <tr>
              {columns.map( columnName => {
                return <th>{row[columnName]}</th>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
