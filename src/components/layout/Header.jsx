import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../store/action";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { RiLockPasswordFill } from "react-icons/ri";
import EditModal from "../modal/EditModal";
import { useState } from "react";

const Header = ({ logout }) => {
  const [editModal, setEditModal] = useState("");
  const { user, role, userId } = useLocalStorage();

  const navigate = useNavigate();

  const handleLogOut = () => {
    logout()
      .then(() => {
        navigate("/login");
        // localStorage.clear()
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleProfile = (e) => {
    const moreInfo = document.querySelector(".profile-more__options");
    moreInfo.classList.toggle("show");
  };

  const handleSideNav = () => {
    const sideNav = document.querySelector(".left-nav");
    sideNav.classList.toggle("show-nav");
  };

  // closing moreInfo on clicking other than profile image
  document.addEventListener("click", (e) => {
    const moreInfo = document.querySelector(".profile-more__options");
    const profileBtn = document.querySelector(".profile-image__container");

    if (profileBtn && e.target != profileBtn.childNodes[0]) {
      moreInfo.classList.remove("show");
    }
  });

  return (
    <>
      {editModal}

      <header className="d-flex no-print justify-content-end">
        <div className="user d-flex align-items-center justify-content-between p-2 w-100">
          <button onClick={handleSideNav} className="btn-hamburger">
            <GiHamburgerMenu />
          </button>

          <div className="d-flex align-items-center justify-content-end">
            <h6 style={{ fontSize: "0.8em" }}>{user}</h6>

            <button
              className="profile-image__container"
              onClick={handleProfile}
            >
              <img src={`/images/user.png`} alt="user" width={35} height={35} />
            </button>
            <div className="profile-more__options  text-left">
              {/* <Link to="#">
              <span className="icon">
                <CgProfile />
              </span>
              Profile
            </Link> */}
              {role === "SystemAdmin" || (
                <button
                  type="button"
                  className="m-0 p-0 change-btn "
                  data-target="#editModal"
                  data-toggle="modal"
                  onClick={() =>
                    setEditModal(<EditModal id={userId} username={user} />)
                  }
                >
                  <span className="icon">
                    <RiLockPasswordFill />
                  </span>
                  Change Password
                </button>
              )}

              <button type="button" className="m-0 p-0" onClick={handleLogOut}>
                <span className="icon">
                  <FiLogOut />
                </span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default connect(null, { logout })(Header);
