export default function LodgingCard({lodging, cnt}) {
  return (
    <div className="card block">
      <div className="card-content">
        <div className="content">
          <div className="columns">
            <div className="column is-one-third">
              <div className="tags are-large">
                <span style ={{ backgroundColor: lodging.color }} className="tag">
                  <span className="tag-inner">{cnt + 1}</span>
                </span>
              </div>
            </div>
            <div className="column">
              <h4>{lodging.name}</h4>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
