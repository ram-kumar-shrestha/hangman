import React from 'react'
import {Link} from 'react-router-dom'
import Info from '../info'

const Relogin = () => {
  return (
    <>
      <Info info={{desc: 'Token Expired relogin', type: 'danger'}} />
      <Link
        to="/"
        className="btn btn-outline-success float-right mr-1 "
        style={{
          marginTop: '4rem',
          fontWeight: 'bold',
        }}>
        Relogin
      </Link>
    </>
  )
}

export default Relogin
