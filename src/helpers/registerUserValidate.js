import { useLocalStorage } from "../hooks";

const validate = (values) => {
  const errors = {};

  const { role } = useLocalStorage();

  if (!values.username) {
    errors.username = "*User name Required";
  }
  if (!values.email) {
    errors.email = "*Email required";
  }

  if (!values.PhoneNumber) {
    errors.PhoneNumber = "*Phone Number Required";
  } else if (
    !/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g.test(
      values.PhoneNumber
    )
  ) {
    errors.PhoneNumber = "*Enter valid mobile number";
  }

  if (!values.password) {
    errors.password = "*Password required";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(
      values.password
    )
  ) {
    errors.password =
      "*Password must have minimum eight characters, at least one letter, one number and one special character";
  }

  /* only show these options to system admin and central kitchen admin */

  // if (!values.OutletId && role != "OutletOwner") {
  //   errors.OutletId = "*Outlet required";
  // }

  // if (!values.UserRole && role != "OutletOwner") {
  //   errors.UserRole = "*User Role required";
  // }

  return errors;
};

export default validate;
