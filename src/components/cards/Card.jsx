import React from 'react'

const Card = ({name, qty}) => {
  return (
    <div className="card ">
      <div className="icon"></div>
      <div className="content">
        <h6 className="font-weight-bold mt-2">{name}</h6>

        <h6 className="text-right mt-5 mb-2">{qty}</h6>
      </div>
    </div>
  )
}

export default Card
