import {connect} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {rejectOrder} from '../../store/action'

import './modal.css'
import {useFormik} from 'formik'
import ModalLayout from './ModalLayout'

const RejectModal = ({id, rejectOrder}) => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      Remarks: '',
    },
    onSubmit: values => {
      // console.log(id, JSON.stringify(values))

      rejectOrder(id, JSON.stringify(values))
        .then(() => {
          navigate('../')
          document.querySelector('.modal-backdrop').remove()
        })
        .catch(e => console.log(e))

      // reset form
      formik.resetForm()
    },
  })

  return (
    <ModalLayout
      id="rejectModal"
      modalType="Reject"
      title="Reject Order"
      formik={formik}>
      <div className="modal-info my-4 p-4">
        <h6>Are you sure to reject order?</h6>

        <input
          type="text"
          name="Remarks"
          value={formik.values.Remarks}
          onChange={formik.handleChange}
          className="mt-4 form-control"
          required
        />
      </div>
    </ModalLayout>
  )
}

export default connect(null, {rejectOrder})(RejectModal)
