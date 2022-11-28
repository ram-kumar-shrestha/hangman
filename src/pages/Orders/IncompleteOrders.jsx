import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {BiDetail} from 'react-icons/bi'

import {Pagination, Title} from '../../components'
import {getAllIncompleteOrders} from '../../store/action'
import {Link} from 'react-router-dom'

const IncompleteOrder = ({order, getAllIncompleteOrders}) => {
  const [refinedOrder, setRefinedOrder] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.title = 'Syanko Katti Roll - Incomplete Orders'

    setMessage('Loading...')

    getAllIncompleteOrders()
      .then(() => {
        order.length === 0
          ? setMessage(
              <div className="danger">There are no Incomplete Orders</div>,
            )
          : setMessage('') //reseting loading message

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
        setMessage(<div className="text-danger">'Something went wrong!'</div>)
        console.log(e)
      })
  }, [order.length])

  return (
    <>
      <Title value="Incomplete Orders" />

      {message || <Pagination itemsPerPage={5} items={refinedOrder} />}
    </>
  )
}

const mapStateToProps = state => {
  return {
    order: state.order,
  }
}

export default connect(mapStateToProps, {getAllIncompleteOrders})(
  IncompleteOrder,
)
