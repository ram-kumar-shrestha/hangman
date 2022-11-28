import React, {useEffect} from 'react'
import {Title} from '../components'

const NotFound = () => {
  useEffect(() => {
    document.title = '404 Not Found'
  }, [])
  return (
    <>
      <Title value="Oops! 404 not found" />
    </>
  )
}

export default NotFound
