export default function LodgingCard({lodging, graph, cnt}) {
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-image">
          {/*<figure className="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
          </figure>*/}
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              {/*<figure className="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
              </figure>*/}
            </div>
            <div className="media-content">
              <p className="title is-6">{lodging.name}</p>
              <p className="">
                {!!graph && !!lodging && lodging.edges(graph).map(e => {
                  return (
                    <p>
                      <b>{e.toNode}</b> <br />{e.weight} minutes<br /><br />
                    </p>
                  )                  
                })}
              </p>
            </div>
          </div>

          <div className="content">      
          </div>
        </div>
      </div>      
    </div>
  )
}