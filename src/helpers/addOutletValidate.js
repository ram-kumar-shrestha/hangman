const validate = (values) => {
  const errors = {};

  if (!values.Name) {
    errors.Name = "*Name Required";
  } else if (values.Name > 20) {
    errors.Name = "*Name must be 20 characters or less ";
  }

  if (!values.Address) {
    errors.Address = "*Address required";
  }

  if (!values.PhoneNo) {
    errors.PhoneNo = "*Mobile Required";
  } else if (
    !/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g.test(
      values.PhoneNo
    )
  ) {
    errors.PhoneNo = "*Enter valid contact info";
  }

  // if (!values.OwnerDetailId) {
  //   errors.OwnerDetailId = '*Owner required'
  // }

  return errors;
};

export default validate;
