export default function TextField(props) {
  return (
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">{props.label}</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
             <input onChange={props.onChange}
                    value={props.title}
                    name={props.name}
                    class="input"
                    type="text"
                    placeholder={props.placeholder} />
          </p>
        </div>
      </div>
    </div>
  )
}


