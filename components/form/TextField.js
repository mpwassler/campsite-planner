export default function TextField(props) {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label htmlFor={props.name} className="label">{props.label}</label>
      </div>
      <div className="field-body">
        <div className="field">
          <p className="control">
             <input onChange={props.onChange}
                    value={props.value}
                    name={props.name}
                    id={props.name}
                    className="input"
                    type="text"
                    placeholder={props.placeholder} />
          </p>
        </div>
      </div>
    </div>
  )
}


