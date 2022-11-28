import {connect} from 'react-redux'
import React, {useState} from 'react'

import {deleteOutlet, deleteItem, deleteByproduct} from '../../store/action'
import Title from '../title'

import './modal.css'
import Info from '../info'

const DeleteModal = ({
  title,
  name,
  id,
  deleteModule,
  deleteOutlet,
  deleteItem,
  deleteByproduct,
}) => {
  const [message, setMessage] = useState({})

  return (
    <>
      <Info info={message} />

      <div className="modal fade" id="deleteModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="d-flex justify-content-between align-items-center ">
              <Title value={title} />
              <span className="close-modal float-right" data-dismiss="modal">
                &#10008;
              </span>
            </div>

            <div className="modal-info my-4 p-4">
              <h6>
                Aye you sure to delete <strong>{name}</strong> outlet?
              </h6>
            </div>

            <div className="modal-actions d-flex ">
              <button
                className="btn btn-outline-danger"
                data-dismiss="modal"
                onClick={() => {
                  switch (deleteModule) {
                    case 'item':
                      deleteItem(id)
                        .then(() => {})
                        .catch(e => {
                          if (e.data.status === 'CD') {
                            setMessage({desc: e.data.message, type: 'danger'})
                          } else {
                            setMessage({
                              desc: 'Something went wrong',
                              type: 'danger',
                            })
                          }
                        })

                      break
                    case 'byproduct':
                      deleteByproduct(id)
                        .then(() => {})
                        .catch(e => {
                          setMessage({
                            desc: 'Something went wrong',
                            type: 'danger',
                          })
                        })
                      break
                    case 'outlet':
                      deleteOutlet(id)
                        .then()
                        .catch(e => {
                          if (e.data.status === 'CD') {
                            setMessage({desc: e.data.message, type: 'danger'})
                          } else {
                            setMessage({
                              desc: 'Something went wrong',
                              type: 'danger',
                            })
                          }
                        })
                      break
                    default:
                      break
                  }
                }}>
                Delete
              </button>
              <button className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default connect(null, {deleteOutlet, deleteItem, deleteByproduct})(
  DeleteModal,
)
