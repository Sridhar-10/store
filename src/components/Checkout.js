import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/dataSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = location.state;
  const [count, setCount] = useState(1);
  const cartData = useSelector((state) => state.dataSlice.cartArr);

  useEffect(() => {
    console.log(data);
  }, [data]);
  const checkIfExits = (id) => {
    let exits = false;
    if (cartData && cartData.length !== 0) {
      let data = cartData.filter((val) => val.id === id);
      if (data.length !== 0) {
        exits = true;
      } else {
        exits = false;
      }
    } else {
      exits = false;
    }
    return exits;
  };
  return (
    <CardWrapper>
      <ImageWrapper>
        <img
          src={data.image}
          alt="..."
          style={{ width: "100%", height: 460, objectFit: "contain" }}
        />
      </ImageWrapper>
      <ContentWrapper>
        <h2>{data.title}</h2>
        <h4>{data.category}</h4>
        <p style={{ lineHeight: 1.5 }}>{data.description}</p>
        <div
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "center",
            margin: "auto",
            gap: 20,
          }}
        >
          <h4>⭐ {data.rating.rate}</h4>
          <h4>
            <FaUserAlt />
            {data.rating.count}
          </h4>
        </div>
        <div
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "center",
            margin: "auto",
            gap: 20,
          }}
        >
          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2 style={{ marginRight: 20 }}>Quantity </h2>
            <button
              style={{
                width: 30,
                height: 30,
                border: "none",
                borderRadius: "5px",
              }}
              onClick={() => {
                if (count > 1) setCount(count - 1);
              }}
            >
              ➖
            </button>
            <h2 style={{ marginRight: 20, marginLeft: 20 }}>{count}</h2>

            <button
              style={{
                width: 30,
                height: 30,
                border: "none",
                borderRadius: "5px",
              }}
              onClick={() => setCount(count + 1)}
            >
              ➕
            </button>
          </div>
          <div>
            <h2>Rs. {(count * data.price).toFixed(2)}</h2>
          </div>
        </div>

        <button
          style={{
            height: "40px",
            width: "90%",
            background: checkIfExits(data.id) ? "grey" : "black",
            color: "white",
            borderRadius: "5px",
            border: "none",
            margin: 20,
            cursor: "pointer",
          }}
          disabled={checkIfExits(data.id)}
          onClick={() => {
            dispatch(
              addToCart({
                ...data,
                count: count,
              })
            );
          }}
        >
          {checkIfExits(data.id) ? "Added to cart" : "Add to Cart"}
        </button>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default Checkout;

const CardWrapper = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  padding: 40px;
`;

const ImageWrapper = styled.div`
  width: 30%;
  height: 90%;
`;

const ContentWrapper = styled.div`
  width: 70%;
  height: 90%;
  text-align: left;
  margin-left: 70px;
`;
