import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getDataApi, addToCart } from "../redux/dataSlice";

const Home = () => {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.dataSlice.data);
  const cartData = useSelector((state) => state.dataSlice.cartArr);
  const { isLoading } = useSelector((state) => state.dataSlice);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get("https://fakestoreapi.com/products");
        console.log(data.data.category);
        dispatch(getDataApi(data.data));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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
    <>
      <input
        type="text"
        placeholder="Search Here..."
        onChange={(event) => setQuery(event.target.value)}
        style={{
          height: 50,
          width: "50%",
          padding: "12px 20px",
          margin: "8px 0",
          display: "inline-block",
          border: "1px solid #ccc",
          borderRadius: 4,
          boxSizing: "border-box",
          marginBottom: 25,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {!isLoading ? (
          <GridWrapper>
            {datas
              ?.filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
              )
              .map((el) => {
                return (
                  <CardWrapper key={el.id}>
                    <div style={{ minHeight: "60%" }}>
                      <img
                        src={el.image}
                        alt="..."
                        style={{
                          width: 160,
                          height: 160,
                          objectFit: "contain",
                        }}
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
                    <div
                      style={{ fontWeight: "bold", margin: 15, height: "20%" }}
                    >
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
            <img
              src="http://northerntechmap.com/assets/img/loading-dog-final.gif"
              alt="..."
              style={{ width: "15%", height: "15%" }}
            />
            <h3>Loading...</h3>
          </LoadingWrapper>
        )}
      </div>
    </>
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

const LoadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  height: 100vh;
`;
