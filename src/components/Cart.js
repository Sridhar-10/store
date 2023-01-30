import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { removeFromCart } from "../redux/dataSlice";

const Cart = () => {
  const cartData = useSelector((state) => state.dataSlice.cartArr);
  const dispatch = useDispatch();
  let sum = cartData.reduce((acc, el) => {
    return acc + Number(el.price) * Number(el.count);
  }, 0);

  return (
    <>
      <h3 style={{ padding: 10, color: "brown" }}>
        Total Price: Rs.{sum?.toFixed(2)}
      </h3>
      <GridWrapper>
        {cartData?.map((el) => {
          return (
            <CardWrapper key={el.id}>
              <div style={{ minHeight: "50%" }}>
                <img
                  src={el.image}
                  style={{ width: 160, height: 160, objectFit: "contain" }}
                  alt="..."
                />
                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  {el.title}
                </div>
              </div>
              <div style={{ minHeight: "15%", margin: 10 }}>
                <div style={{ fontWeight: "bold", margin: 10 }}>
                  Rs.{Number(el.price) * Number(el.count)}
                </div>
                <div style={{ fontWeight: "bold" }}>
                  Quantity: {el.count} Pcs
                </div>
              </div>

              <div style={{ minHeight: "20%" }}>
                <button
                  style={{
                    height: "40px",
                    width: "80%",
                    background: "red",
                    borderRadius: "5px",
                    border: "none",
                    margin: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(removeFromCart(el))}
                >
                  Remove From Cart
                </button>
                <button
                  style={{
                    height: "40px",
                    width: "80%",
                    background: "lightgreen",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    margin: 10,
                  }}
                >
                  Buy Now
                </button>
              </div>
            </CardWrapper>
          );
        })}
      </GridWrapper>
    </>
  );
};

export default Cart;

const CardWrapper = styled.div`
  height: 500px;
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
  text-align: center;
  line-height: 20px;
  border-radius: 10px;
`;
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  justify-content: center;
  grid-gap: 20px;
  width: 80%;
  margin: auto;
  align-items: center;
`;
