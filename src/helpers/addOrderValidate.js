const validate = values => {
  const errors = {}

  if (!values.Name) {
    errors.Name = '*Name Required'
  }

  if (!values.Quantity) {
    errors.Quantity = '*Quantity cannot be null'
  }

  return errors
}

export default validate
