import React from 'react'
import {Link} from 'react-router-dom'

const LinkButton = ({
  href,
  className,
  id,
  name,
  font = '1rem',
  icon = null,
}) => {
  return (
    <Link
      to={href}
      className={`btn ${className} my-2 mx-md-2`}
      id={id}
      style={{fontSize: font}}>
      {name} <span style={{fontSize: '1.2rem'}}>{icon}</span>
    </Link>
  )
}

export default LinkButton
