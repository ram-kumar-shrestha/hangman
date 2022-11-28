import {useFormik} from 'formik'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'

import {LinkButton, Title} from '../../components'
import {getSingleOutletOrder} from '../../store/action'

import './track.css'

const TrackOrder = ({singleOrder, getSingleOutletOrder}) => {
  const [errorInfo, setErrorInfo] = useState('')

  const {id} = useParams()
  // const {status, orderDate} = singleOrder
  const formik = useFormik({
    initialValues: {
      OrderID: '',
    },

    onSubmit: values => {
      getSingleOutletOrder(values.OrderID)
        .then(() => {
          setErrorInfo(null) //resetting error info
        })
        .catch(e => {
          e === 404
            ? setErrorInfo(
                <p className="text-center text-danger">Order is not found.</p>,
              )
            : console.log(e)
        })
    },
  })

  useEffect(() => {
    document.title = 'Syanko Katti Roll - Track Order'

    id &&
      getSingleOutletOrder(id)
        .then(() => {})
        .catch(e => {
          console.log(e)
        })
  }, [id, singleOrder.orderDate, singleOrder.status])

  return (
    <>
      <Title value="Track Order" />

      {/* only show form if order id is not present in URL */}
      {!id && (
        <form onSubmit={formik.handleSubmit}>
          <div className=" my-4 track-input d-flex justify-content-center align-items-center">
            <input
              name="OrderID"
              type="text"
              className="form-control"
              placeholder="Enter Order ID"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.OrderID}
            />
            <button className="btn btn-info  " type="submit">
              Track
            </button>
          </div>
        </form>
      )}

      {/* only show track order info if order is found */}
      {errorInfo ||
        //its better to use direct redux store rather than normal state in async func
        (singleOrder.status && singleOrder.orderDate && (
          <>
            <p className="text-center text-secondary mt-2">
              {' '}
              Your order ({formik.values.OrderID || id}) is now :{' '}
              {singleOrder.status}
            </p>

            <div className="row">
              <div className="col-md-12 track-line d-flex justify-content-center align-items-center w-100">
                <div className={`track-item completed`}>Ordered</div>
                <div className={`track-item completed pending-status`}>
                  Pending
                </div>

                {singleOrder.status === 'Pending' ? (
                  <>
                    <div className={`track-item preparing-status `}>
                      Preparing
                    </div>
                    <div className={`track-item approved-status`}>
                      Dispatched
                    </div>
                  </>
                ) : null}

                {singleOrder.status === 'Preparing' ? (
                  <>
                    <div className={`track-item preparing-status completed`}>
                      Preparing
                    </div>
                    <div className={`track-item approved-status `}>
                      Dispatched
                    </div>
                  </>
                ) : null}

                {singleOrder.status === 'Rejected' ? (
                  <>
                    <div className={`track-item preparing-status completed`}>
                      Preparing
                    </div>
                    <div className={`track-item rejected-status completed`}>
                      Rejected
                    </div>
                  </>
                ) : null}

                {singleOrder.status === 'Incomplete' ? (
                  <>
                    <div className={`track-item preparing-status completed`}>
                      Preparing
                    </div>
                    <div className={`track-item rejected-status completed`}>
                      Incomplete
                    </div>
                  </>
                ) : null}

                {singleOrder.status === 'Approved' ? (
                  <>
                    <div className={`track-item preparing-status completed`}>
                      Preparing
                    </div>
                    <div className={`track-item approved-status completed`}>
                      Dispatched
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <p className="text-center text-secondary mt-4">
              This order was orderd at{' '}
              {new Date(singleOrder.orderDate).toUTCString()}
            </p>

            <LinkButton
              href="/outlet/orders/all-orders/"
              name="Back"
              className="btn btn-info float-right"
            />
          </>
        ))}
    </>
  )
}

const mapStateToProps = state => {
  return {
    singleOrder: state.singleOrder,
  }
}
export default connect(mapStateToProps, {getSingleOutletOrder})(TrackOrder)
