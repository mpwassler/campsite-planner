import { useState } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import LodgingCard from './LodgingCard'

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
            <LodgingCard lodging={lodging} key={cnt} cnt={cnt} />
          )
        })}
      </CSSTransitionGroup>
    </div>
  )
}
