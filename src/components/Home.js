import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getDataApi, addToCart } from "../redux/dataSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Home = () => {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.dataSlice.data);
  const cartData = useSelector((state) => state.dataSlice.cartArr);

  const { data, isLoading } = useSelector((state) => state.dataSlice);
  console.log({ data, isLoading });

  const getData = async () => {
    try {
      const data = await axios.get("https://fakestoreapi.com/products");
      console.log(data);
      dispatch(getDataApi(data.data));
    } catch (error) {}
  };

  const checkIfExits = (id) => {
    let exits = false;
    if (cartData && cartData.length !== 0) {
      let data = cartData.filter((val) => val.id === id);
      console.log(data, "data");
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

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log(datas, "datas");
  }, [datas]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {!isLoading ? (
        <GridWrapper>
          {datas?.map((el) => {
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
                <div style={{ fontWeight: "bold", margin: 15 }}>
                  Rs.{el.price}
                </div>

                <div
                  style={{
                    height: "20%",
                    marginBottom: 20,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    style={{
                      height: "40px",
                      width: "80%",
                      background: checkIfExits(el.id) ? "grey" : "black",
                      color: "white",
                      borderRadius: "5px",
                      border: "none",
                      margin: 20,
                      cursor: "pointer",
                    }}
                    disabled={checkIfExits(el.id)}
                    onClick={() => {
                      if (checkIfExits(el.id)) {
                        alert("already exits");
                      } else {
                        dispatch(addToCart(el));
                        // alert("Added to cart");
                      }
                    }}
                  >
                    {checkIfExits(el.id) ? "Added to cart" : "Add to Cart"}
                  </button>
                </div>
              </CardWrapper>
            );
          })}
        </GridWrapper>
      ) : (
        <LoadingWrapper>
          <h1>Loading...</h1>
          <AiOutlineLoading3Quarters size={50} />
        </LoadingWrapper>
      )}
    </div>
  );
};

export default Home;

const CardWrapper = styled.div`
  height: auto;
  width: 250px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
  text-align: center;
  line-height: 20px;
`;
const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  justify-content: center;
  grid-gap: 20px;
  width: 80%;
  margin: auto;
  align-items: center;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  height: 100vh;
`;
