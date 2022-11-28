const validate = (values) => {
  const errors = {};

  if (!values.Password) {
    errors.Password = "*Password required";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(
      values.Password
    )
  ) {
    errors.Password =
      "*Password must have minimum eight characters, at least one letter, one number and one special character";
  }

  return errors;
};

export default validate;
