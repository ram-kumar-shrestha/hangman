const validate = values => {
  const errors = {}

  if (!values.Name) {
    errors.Name = "*Name Required"
  } else if (values.Name > 20) {
    errors.Name = "*Name must be 20 characters or less "
  }

  if (!values.Price) {
    errors.Price = "*Price must be filled out "
  }

  if (!values.UnitId) {
    errors.UnitId = "*Unit must be selected"
  }

  return errors
}

export default validate
