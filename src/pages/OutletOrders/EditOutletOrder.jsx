import {Field, FieldArray, Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {BiSortAlt2} from 'react-icons/bi'
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'

import {Info, Title} from '../../components'
import {useLocalStorage} from '../../hooks/useLocalStorage'
import {getAllItems, getSingleOutletOrder, editOrder} from '../../store/action'

const EditOutletOrder = ({
  item,
  order,
  getAllItems,
  getSingleOutletOrder,
  editOrder,
}) => {
  const {outletId, userId} = useLocalStorage()
  const [refinedOrder, setRefinedOrder] = useState([])
  const [orderInfo, setOrderInfo] = useState({})

  const {id} = useParams()

  const {orderDetails, outletOrderId} = order

  useEffect(() => {
    document.title = 'Syanko Katti Roll - Request Order '

    getSingleOutletOrder(id)
      .then(() => {
        setRefinedOrder(
          orderDetails.map(
            ({orderDetailId, name, unitacronym, byProductItemId, quantity}) => {
              return {
                OutletOrderId: outletOrderId,
                name: `${name} (${unitacronym})`,
                OrderDetailId: orderDetailId,
                ByProductItemId: byProductItemId,
                ['Quantity']: quantity,
              }
            },
          ),
        )
      })
      .catch(e => console.log(e))

    getAllItems()
  }, [order.length, id])

  return (
    <>
      <Title value="Order Details" />
      {/* order message */}
      <Info info={orderInfo} />

      <Formik
        initialValues={{tableOrderDetails: refinedOrder}} //default value of item is first of the refinedItems array
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          // console.log(values.tableOrderDetails)
          // requesting order
          editOrder(
            id,
            JSON.stringify({
              OutletOrderId: outletOrderId,
              OutletId: outletId,
              userId: userId,
              OrderDetails: values.tableOrderDetails.map(
                ({OutletOrderId, OrderDetailId, ByProductItemId, Quantity}) => {
                  return {
                    OutletOrderId,
                    OrderDetailId,
                    ByProductItemId,
                    Quantity,
                  }
                },
              ),
            }),
          )
            .then(() => {
              setOrderInfo({
                desc: 'Order requested successfully',
                type: 'success',
              })
              getAllItems()
            })
            .catch(e => {
              setOrderInfo({
                desc: 'Order edit failed.',
                type: 'danger',
              })
              console.log(e)
            })
        }}>
        {({values}) => (
          <Form>
            <div className="table-responsive">
              <table className="table table-bordered table-center mt-4">
                <thead className="thead-light">
                  <tr>
                    <th>SN</th>
                    <th>Item</th>
                    <th>
                      <div className="sort">
                        Quantity
                        <span className="sort-icon">
                          <BiSortAlt2 />
                        </span>
                      </div>
                    </th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <FieldArray
                  name="orderDetails"
                  render={arrayHelpers => (
                    <tbody>
                      {values.tableOrderDetails.map((name, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td className="p-4">{index + 1}</td>

                            <td>
                              <Field
                                name={`orderDetails.${index}.Name`}
                                as="select"
                                className="form-control"
                                style={{width: 'max-content'}}>
                                <option
                                  value={refinedOrder[index]?.byProductItemId}
                                  key={index}>
                                  {refinedOrder[index]?.name}
                                </option>
                              </Field>
                            </td>

                            <td>
                              <Field
                                type="Number"
                                name={`tableOrderDetails.${index}.Quantity`}
                                className="form-control"
                                style={{width: 'max-content'}}
                                required
                              />
                            </td>
                            {/* <td>
                              <button
                                className="btn btn-outline-primary mr-2 "
                                type="button"
                                onClick={() =>
                                  arrayHelpers.push({Name: '', Quantity: ''})
                                }>
                                &#43;
                              </button>

                              <button
                                className="btn btn-outline-danger "
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // remove a row from the list
                              >
                                &#8722;
                              </button>
                            </td> */}
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  )}
                />
              </table>
              {values.tableOrderDetails.length != 0 ? (
                <>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <button className="btn btn-info btn-add" type="submit">
                        Update
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

const mapStateToProps = state => {
  return {
    item: state.rawItem,
    order: state.singleOrder,
  }
}

export default connect(mapStateToProps, {
  getAllItems,
  getSingleOutletOrder,
  editOrder,
})(EditOutletOrder)
