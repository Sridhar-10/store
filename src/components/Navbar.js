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
          justifyContent: "space-around",
          margin: "auto",
          boxShadow:
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
        }}
      >
        <NavLink to="/">
          <h3>HOME</h3>
        </NavLink>

        <NavLink to="/cart">
          <h3>CART -{cartData.length} </h3>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
