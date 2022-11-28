import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {BiDetail} from 'react-icons/bi'

import {Pagination, Title} from '../../components'
import {getAllRejectedOrders} from '../../store/action'
import {Link} from 'react-router-dom'

const RejectedOrders = ({order, getAllRejectedOrders}) => {
  const [refinedOrder, setRefinedOrder] = useState([])
  const [message, setMessage] = useState('')
  useEffect(() => {
    document.title = 'Syanko Katti Roll - Rejected Orders'

    setMessage(<div>Loading...</div>)

    getAllRejectedOrders()
      .then(() => {
        order.length === 0
          ? setMessage(
              <div className="danger">No orders are rejected yet!</div>,
            )
          : setMessage('')
        setRefinedOrder(
          order.map(
            ({
              outletOrderId,
              orderDate,
              orderTargetDate,
              outletName,
              status,
              remarks,
            }) => {
              return {
                ['Order Id']: outletOrderId,
                ['Outlet']: outletName,
                ['Order Date']: new Date(orderDate).toLocaleDateString(),
                ['Target Date']: new Date(orderTargetDate).toLocaleDateString(),
                status,
                remarks,
                ['Detail']: (
                  <Link
                    to={`./${outletOrderId}`}
                    className="btn btn-outline-info my-2">
                    <BiDetail />
                  </Link>
                ),
              }
            },
          ),
        )
      })
      .catch(e => {
        setMessage(<div className="danger">Something Went Wrong</div>)
        console.log(e)
      })
  }, [order.length])

  return (
    <>
      <Title value="Rejected Orders" />
      {message || <Pagination itemsPerPage={5} items={refinedOrder} />}
    </>
  )
}

const mapStateToProps = state => {
  return {
    order: state.order,
  }
}

export default connect(mapStateToProps, {getAllRejectedOrders})(RejectedOrders)
