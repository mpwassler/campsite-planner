export default function Modal(props) {

  return (
    <div className={`modal ${props.isOpen ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.title}</p>
          <button className="delete" aria-label="close" onClick={props.onCloseRequest}></button>
        </header>
        <section className="modal-card-body">
          {props.children}
        </section>
      </div>
    </div>
  )
}
