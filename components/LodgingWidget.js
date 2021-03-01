import { useState } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'


export default function LodgingWidget(props) {

  let lodgings = props.lodgings

  return (
    <div className="lodgings">
      <CSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        {!!lodgings && lodgings.map((lodging, cnt) => {
          return (
            <div className="card block">
              <div className="card-content">
                <div className="content">
                  <div className="tags are-large">
                    <span style ={{ backgroundColor: lodging.color }} className="tag">
                      <span className="tag-inner">{cnt + 1}</span>
                    </span>
                  </div>

                  <h4>{lodging.name}</h4>
                </div>
              </div>
            </div>
          )
        })}
      </CSSTransitionGroup>
    </div>
  )
}
