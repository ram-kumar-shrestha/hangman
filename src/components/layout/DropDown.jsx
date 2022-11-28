import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect } from "react";

const DropDown = ({
  linkId,
  title,
  links,
  icon,
  showDropDown = false,
  handleSideNav,
}) => {
  const toggleDropDown = () => {
    const lists = document.querySelectorAll(".dropdown-container");
    lists.forEach((item, index) => {
      index == linkId
        ? item.classList.toggle("show")
        : item.classList.remove("show"); //show only the clicked nav
    });
  };
  useEffect(() => {
    const links = document.querySelectorAll(".dropdown-link");

    links.forEach((link) => {
      link.classList.contains("active") &&
        link.parentElement.classList.add("show");
    });
  }, []);

  return (
    <li>
      <button className="drop-down__btn my-2" onClick={toggleDropDown}>
        <span className="icon">{icon}</span>
        {title}
        <span className="float-right ">
          <RiArrowDropDownLine />
        </span>
      </button>
      <div
        className={`dropdown-container  ${showDropDown ? "show" : ""}`}
        onClick={handleSideNav}
      >
        {links.map((link, index) => {
          return (
            <NavLink
              to={`${link.href}`}
              key={index}
              className={(navData) =>
                "dropdown-link" + (navData.isActive ? " active" : "")
              }
            >
              {link.DropDownTitle}
            </NavLink>
          );
        })}
      </div>
    </li>
  );
};

export default DropDown;
