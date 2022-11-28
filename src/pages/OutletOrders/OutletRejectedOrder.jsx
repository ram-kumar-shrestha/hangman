import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {BiDetail} from 'react-icons/bi'

import {Pagination, Title} from '../../components'
import {useLocalStorage} from '../../hooks/useLocalStorage'
import {getAllOutletRejectedOrders} from '../../store/action'

const OutletRejectedOrder = ({order, getAllOutletRejectedOrders}) => {
  const [refinedOrder, setRefinedOrder] = useState([])

  const {outletId} = useLocalStorage(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.title = 'Syanko Katti Roll - All Rejected Orders '

    setMessage(<div>Loading...</div>)
    getAllOutletRejectedOrders(outletId)
      .then(() => {
        order.length === 0
          ? setMessage(
              <div className="danger">No orders have been rejected yet!</div>,
            )
          : setMessage('')

        setRefinedOrder(
          order.map(
            ({orderDate, orderTargetDate, status, remarks, outletOrderId}) => {
              return {
                ['Order Id']: outletOrderId,
                ['Order Date']: new Date(orderDate).toLocaleDateString(),
                ['Target Date']: new Date(orderTargetDate).toLocaleDateString(),
                status,
                remarks,
                ['Detail']: (
                  <Link
                    to={`./${outletOrderId}`}
                    className="btn btn-outline-info">
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
      <Title value="All Rejected Orders" />

      {message || <Pagination itemsPerPage={5} items={refinedOrder} />}
    </>
  )
}

const mapStateToProps = state => {
  return {
    order: state.order,
  }
}
export default connect(mapStateToProps, {getAllOutletRejectedOrders})(
  OutletRejectedOrder,
)
