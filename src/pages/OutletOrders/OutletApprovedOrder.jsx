import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {BiDetail} from 'react-icons/bi'

import {Pagination, Title} from '../../components'
import {useLocalStorage} from '../../hooks/useLocalStorage'
import {getAllOutletApprovedOrders} from '../../store/action'

const OutletApprovedOrder = ({order, getAllOutletApprovedOrders}) => {
  const [refinedOrder, setRefinedOrder] = useState([])

  const {outletId} = useLocalStorage()
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.title = 'Syanko Katti Roll - All Approved Orders '

    setMessage(<div>Loading...</div>)

    getAllOutletApprovedOrders(outletId)
      .then(() => {
        order.length === 0
          ? setMessage(
              <div className="danger">No orders have been approved yet!</div>,
            )
          : setMessage('') //reset message

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
      <Title value="All Approved Orders" />

      {message || <Pagination itemsPerPage={5} items={refinedOrder} />}
    </>
  )
}

const mapStateToProps = state => {
  return {
    order: state.order,
  }
}
export default connect(mapStateToProps, {getAllOutletApprovedOrders})(
  OutletApprovedOrder,
)
