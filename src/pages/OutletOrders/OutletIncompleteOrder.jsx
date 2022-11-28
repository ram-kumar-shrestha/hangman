import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {BiDetail} from 'react-icons/bi'

import {Pagination, Title} from '../../components'
import {useLocalStorage} from '../../hooks/useLocalStorage'
import {getAllOutletIncompleteOrders} from '../../store/action'

const OutletIncompleteOrder = ({order, getAllOutletIncompleteOrders}) => {
  const [refinedOrder, setRefinedOrder] = useState([])

  const {outletId} = useLocalStorage()
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.title = 'Syanko Katti Roll - All Incomplete Orders '

    setMessage(<div>Loading...</div>)

    getAllOutletIncompleteOrders(outletId)
      .then(() => {
        order.length === 0
          ? setMessage(
              <div className="danger">There are no Incomplete Orders</div>,
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
      <Title value="All Incomplete Orders" />

      {message || <Pagination itemsPerPage={5} items={refinedOrder} />}
    </>
  )
}

const mapStateToProps = state => {
  return {
    order: state.order,
  }
}
export default connect(mapStateToProps, {getAllOutletIncompleteOrders})(
  OutletIncompleteOrder,
)
