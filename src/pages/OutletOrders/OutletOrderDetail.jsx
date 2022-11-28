import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'

import {LinkButton, Table, Title} from '../../components'
import {
  getSingleOutletOrder,
  getSingleIncompleteOutletOrder,
} from '../../store/action'

const OutletOrderDetail = ({
  singleOrder,
  singleIncompleteOrder,
  getSingleOutletOrder,
  getSingleIncompleteOutletOrder,
}) => {
  const {id} = useParams()
  const [refinedOrder, setRefinedOrder] = useState([])

  const {orderDetails, status} = singleOrder

  const {approvedOrderDetails} = singleIncompleteOrder

  useEffect(() => {
    document.title = 'Syanko Katti Roll - Order Detail'

    getSingleOutletOrder(id)
      .then(() => {
        status === 'Incomplete' ? getSingleIncompleteOutletOrder(id) : ''

        setRefinedOrder(
          orderDetails.map(({name, unitacronym, quantity}) => {
            return {
              name: `${name} (${unitacronym})`,
              ['Quantity']: quantity,
            }
          }),
        )
      })
      .catch(e => console.log(e))

    status === 'Incomplete'
      ? getSingleIncompleteOutletOrder(id)
          .then(() => {})
          .catch(e => console.log(e))
      : ''
  }, [id && refinedOrder.length, id, status])

  return (
    <>
      <Title value="Order Details" />

      <div className="row mt-4">
        <div
          className={`${status === 'Incomplete' ? 'col-md-6' : 'col-md-12'}`}>
          <h6 className="font-weight-bold">Original Order Detail</h6>
          <Table items={refinedOrder} />
        </div>

        {status === 'Incomplete' && approvedOrderDetails ? (
          <div className="col-md-6">
            <h6 className="font-weight-bold">Completed Order Detail</h6>

            <Table
              items={approvedOrderDetails?.map(({name, quantity}) => {
                //state is not used as the setState in async doesnot
                return {
                  name,
                  ['Quantity']: quantity,
                }
              })}
            />
          </div>
        ) : null}
      </div>

      <LinkButton href="../" name="Back" className="btn btn-info float-right" />
    </>
  )
}

const mapStateToProps = state => {
  return {
    singleOrder: state.singleOrder,
    singleIncompleteOrder: state.singleIncompleteOrder,
  }
}
export default connect(mapStateToProps, {
  getSingleOutletOrder,
  getSingleIncompleteOutletOrder,
})(OutletOrderDetail)
