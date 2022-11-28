import React from 'react'
import Title from '../title'

import './formlayout.css'

const FormLayout = props => {
  return (
    <form onSubmit={props.formik.handleSubmit} className="add-form">
      <div className="mt-4">
        <Title value={props.title} />
      </div>

      <div className="row d-flex justify-content-center form-content">
        <div className="d-flex flex-column col-md-6 input-fields">
          {props.children}

          <div className="row">
            <div className="col-md-3">
              <button className="btn btn-info btn-add" type="submit">
                {props.type}
              </button>
            </div>
          </div>
        </div>
        <div className="illustration float-right col-md-6">{props.svg}</div>
      </div>
    </form>
  )
}

export default FormLayout
