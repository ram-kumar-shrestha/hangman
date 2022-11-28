import {useLocalStorage} from '../hooks'

const validate = values => {
  const errors = {}

  const {role} = useLocalStorage()

  if (!values.username) {
    errors.username = '*User name Required'
  }
  if (!values.email) {
    errors.email = '*Email required'
  }

  if (!values.PhoneNumber) {
    errors.PhoneNumber = '*Phone Number Required'
  } else if (
    !/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g.test(
      values.PhoneNumber,
    )
  ) {
    errors.PhoneNumber = '*Enter valid mobile number'
  }

  return errors
}

export default validate
