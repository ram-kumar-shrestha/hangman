import React, {useEffect, useRef} from 'react'

import './info.css'

const Info = ({info = {}}) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current?.classList.contains('hide-info')) {
      ref.current?.classList.remove('hide-info')
    }
  }, [info])

  const closeInfo = () => {
    ref.current?.classList.add('hide-info')
  }
  return (
    <>
      {info.desc && (
        <section className="info" ref={ref}>
          <div
            className="info-content d-flex justify-content-center align-items-center"
            id={info.type}>
            <p className="info-desc"> {info.desc}</p>

            <span className="close-info" onClick={closeInfo}>
              &#215;
            </span>

            <button
              type="button"
              className="btn btn-info font-weight-bold btn-close"
              onClick={closeInfo}>
              Close
            </button>
          </div>
        </section>
      )}
    </>
  )
}
export default Info
