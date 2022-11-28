import { Link, Navigate, Outlet } from "react-router-dom";
import { Info } from "../components";
import { useLocalStorage } from "../hooks";
import { useTokenExpire } from "../hooks";

const ProtectedRoute = () => {
  const { isAuth } = useLocalStorage();
  const { isTokenExpired } = useTokenExpire();

  if (isTokenExpired) {
    // localStorage.clear()
    return (
      <>
        <Info info={{ desc: "Token Expired relogin", type: "danger" }} />
        <div
          style={{
            display: "grid",
            placeContent: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Link
            to="/login"
            className="btn btn-outline-success float-right mr-1 "
          >
            Relogin
          </Link>
        </div>
      </>
    );
  }

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
