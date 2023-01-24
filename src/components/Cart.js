import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { removeFromCart } from "../redux/dataSlice";

const Cart = () => {
  const cartData = useSelector((state) => state.dataSlice.cartArr);
  console.log(cartData);
  const dispatch = useDispatch();

  return (
    <GridWrapper>
      {cartData?.map((el) => {
        return (
          <CardWrapper key={el.id}>
            <div style={{ height: "60%" }}>
              <img
                src={el.image}
                style={{ width: 160, height: 160, objectFit: "contain" }}
              />
              <div
                style={{
                  width: "90%",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                {el.title}
              </div>
            </div>
            <div style={{ fontWeight: "bold", margin: 15 }}>Rs.{el.price}</div>

            <div style={{ height: "20%" }}>
              <button
                style={{
                  height: "40px",
                  width: "80%",
                  background: "red",
                  color: "black",
                  borderRadius: "5px",
                  border: "none",
                  margin: 20,
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => dispatch(removeFromCart(el))}
              >
                Remove from Cart
              </button>
            </div>
          </CardWrapper>
        );
      })}
    </GridWrapper>
  );
};

export default Cart;

const CardWrapper = styled.div`
  height: auto;
  width: 250px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  text-align: center;
`;
const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  justify-content: center;
  grid-gap: 20px;
`;
