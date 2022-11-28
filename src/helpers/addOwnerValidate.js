const validate = values => {
  const errors = {}

  if (!values.Name) {
    errors.Name = '*Name Required'
  } else if (values.Name > 20) {
    errors.Name = '*Name must be 20 characters or less '
  }

  if (!values.MobileNo) {
    errors.MobileNo = '*Mobile Required'
  } else if (
    !/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g.test(
      values.MobileNo,
    )
  ) {
    errors.MobileNo = '*Enter valid contact info'
  }

  if (!values.Address) {
    errors.Address = '*Address required'
  }

  return errors
}

export default validate
