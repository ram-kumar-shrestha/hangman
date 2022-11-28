import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ position }) => {
  return (
    <section className={`logo-container text-${position}`}>
      <Link to={`/dashboard`}>
        <img src={`/logo/logo.png`} alt="logo" height={50} width={100} />
      </Link>
    </section>
  );
};

export default Logo;
