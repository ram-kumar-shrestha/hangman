import { useFormik } from "formik";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, Spinner } from "../../components";
import { LoginValidate } from "../../helpers";
import { login } from "../../store/action";
import "./login.css";

const Login = ({ auth, login }) => {
  const [message, setMessage] = useState("");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    document.title = "Syanko Katti Roll - Login";
  }, []);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: LoginValidate,
    onSubmit: (values) => {
      setSpinning(true); //spinner stop

      login(JSON.stringify(values))
        .then(() => {
          setSpinning(false); //spinner stop
          navigate("/dashboard");
        })
        .catch((e) => {
          // console.log(e)

          setSpinning(false); //spinner stop
          if (!navigator.onLine) {
            return setMessage(
              <div className="error text-center mb-2">
                Your are offline, Try to login after reconnecting to internet
              </div>
            );
          }
          if (e === 401) {
            setMessage(
              <div className="error text-center mb-2">
                User not authorized, contact admin
              </div>
            );
          } else if (e === 502) {
            setMessage(
              <div className="error text-center mb-2">
                Sorry!, There is Internet Connection Problem
              </div>
            );
          } else if (e === 500) {
            setMessage(
              <div className="error text-center mb-2">
                Sorry!, Internal Server Error
              </div>
            );
          } else {
            setMessage(
              <div className="error text-center mb-2">
                Sorry!, Something went wrong
              </div>
            );
          }
        });
    },
  });
  return (
    <section className="login">
      <form className="form" onSubmit={formik.handleSubmit}>
        <section className={`logo-container text-center`}>
          <img src={`/logo/logo.png`} alt="logo" height="70" />
        </section>
        <div className="form-wrapper">
          <FormGroup
            inputMethod="input"
            id="username"
            label="User Name:"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            error={formik.errors.username}
            touched={formik.touched.username}
          />

          <FormGroup
            inputMethod="input"
            id="password"
            label="Password:"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          {message}
          <div className="login-actions d-flex flex-column justify-content-between align-items-center">
            <button
              className="btn btn-info btn-login d-flex align-items-center"
              type="submit"
            >
              Login
              {spinning && <Spinner />}
            </button>
            {/* <a href="#" className="forgot">Forgot password?</a> */}
          </div>
        </div>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { login })(Login);
