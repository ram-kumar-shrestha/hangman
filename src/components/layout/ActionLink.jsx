import React from 'react'
import {useRef} from 'react'
import {Link} from 'react-router-dom'

const ActionLink = ({href, name, icon}) => {
  const ref = useRef()

  return (
    <Link to={href}>
      <div className="action-content d-flex justify-content-between align-items-center">
        <div className="icon-info" ref={ref}>
          {name}
        </div>
        <div
          className="action-icon"
          onMouseOver={e => ref.current.classList.add('show-icon__info')}
          onMouseOut={e => ref.current.classList.remove('show-icon__info')}>
          {icon}
        </div>
      </div>
    </Link>
  )
}

export default ActionLink
