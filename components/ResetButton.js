
export default function ResetButton(props) {

  const resetData = async () => {
    let result = await fetch('/api/reset', {
        method: 'post'
    })
  }

  return (
    <button onClick={resetData} class="button is-small">Reset</button>
  )
}
