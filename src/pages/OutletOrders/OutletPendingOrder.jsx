import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {BiDetail} from 'react-icons/bi'
import {AiFillEdit} from 'react-icons/ai'

import {Pagination, Title} from '../../components'
import {useLocalStorage} from '../../hooks/useLocalStorage'
import {getAllOutletPendingOrders} from '../../store/action'

const OutletPendingOrder = ({order, getAllOutletPendingOrders}) => {
  const [refinedOrder, setRefinedOrder] = useState([])

  const {outletId} = useLocalStorage()
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.title = 'Syanko Katti Roll - All Pending Orders '

    setMessage(<div>Loading...</div>)
    getAllOutletPendingOrders(outletId)
      .then(() => {
        order.length === 0
          ? setMessage(
              <div className="danger">No orders are requested yet!</div>,
            )
          : setMessage('')

        setRefinedOrder(
          order.map(({orderDate, orderTargetDate, status, outletOrderId}) => {
            return {
              ['Order Id']: outletOrderId,
              ['Order Date']: new Date(orderDate).toLocaleDateString(),
              ['Target Date']: new Date(orderTargetDate).toLocaleDateString(),
              status,
              ['Detail']: (
                <Link
                  to={`./${outletOrderId}`}
                  className="btn btn-outline-info">
                  <BiDetail />
                </Link>
              ),
              ['Edit']: (
                <Link
                  to={`../../edit/${outletOrderId}`}
                  className="btn btn-outline-info">
                  <AiFillEdit />
                </Link>
              ),
            }
          }),
        )
      })
      .catch(e => {
        setMessage(<div className="danger">Something Went Wrong</div>)
        console.log(e)
      })
  }, [order.length])

  return (
    <>
      <Title value="All Pending Orders" />

      {message || <Pagination itemsPerPage={5} items={refinedOrder} />}
    </>
  )
}

const mapStateToProps = state => {
  return {
    order: state.order,
  }
}
export default connect(mapStateToProps, {getAllOutletPendingOrders})(
  OutletPendingOrder,
)
