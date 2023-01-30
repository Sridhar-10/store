import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const cartData = useSelector((state) => state.dataSlice.cartArr);

  return (
    <div>
      <br />
      <div
        style={{
          display: "flex",
          width: "80%",
          background: "lightyellow",
          justifyContent: "space-around",
          margin: "auto",
          borderRadius: 10,
          boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
        }}
      >
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            cursor: "pointer",
            color: "ThreeDLightShadow",
          }}
        >
          <h3>HOME</h3>
        </NavLink>

        <NavLink
          to="/cart"
          style={{
            textDecoration: "none",
            cursor: "pointer",
            color: "ThreeDLightShadow",
          }}
        >
          <h3>CART -{cartData.length} </h3>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
