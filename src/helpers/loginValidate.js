const validate = values => {
  const errors = {}

  if (!values.username) {
    errors.username = '*Name Required'
  } else if (values.username > 30) {
    errors.name = '*Name must be 30 characters or less '
  }

  if (!values.password) {
    errors.password = '*Password can not be empty'
  }

  return errors
}

export default validate
