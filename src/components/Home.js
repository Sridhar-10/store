import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getDataApi } from "../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import Sort from "./Sort";

const Home = () => {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.dataSlice.data);
  const { isLoading } = useSelector((state) => state.dataSlice);
  const [prod, setProd] = useState([]);
  const [empty, setEmpty] = useState(false);
  const navigation = useNavigate();

  const getData = async () => {
    try {
      const data = await axios.get("https://fakestoreapi.com/products");
      console.log(data);
      dispatch(getDataApi(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
  const productSearch = debounce((query) => {
    if (query) {
      let filterdata = datas.filter((el) =>
        el.title.toLowerCase().includes(query.toLowerCase())
      );
      if (filterdata.length === 0) {
        setProd([]);
        setEmpty(true);
      } else {
        setProd(filterdata);
        setEmpty(false);
      }
    } else {
      setProd(datas);
      setEmpty(false);
    }
  }, 1000);

  useEffect(() => {
    setProd(datas);
  }, [datas]);

  return (
    <>
      <input
        type="text"
        placeholder="Search Here..."
        onChange={(event) => productSearch(event.target.value)}
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
      <SortWrapper>
        <Sort
          onChange={(data) => {
            setProd(data);
          }}
        />
      </SortWrapper>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {!isLoading ? (
          <GridWrapper>
            {empty ? (
              <EmptyWrapper>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThowCjSGmO8NTV4BaQTByJC0ZIzt0KfvG9J75tYT0-nkUtCz7oHrdBSfY_LofMo4JEYGY&usqp=CAU"
                  alt="..."
                  style={{ width: "100%", height: "30%" }}
                />
                <h3>Not Found!</h3>
              </EmptyWrapper>
            ) : (
              prod.map((el) => {
                return (
                  <CardWrapper
                    key={el.id}
                    onClick={() => {
                      navigation(`/products/${el.id}`, {
                        state: {
                          data: el,
                        },
                      });
                    }}
                  >
                    <div style={{ minHeight: "65%", cursor: "pointer" }}>
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
                          width: "100%",
                          justifyContent: "center",
                          margin: "auto",
                          minHeight: "20%",
                          lineHeight: 1.5,
                        }}
                      >
                        {el.title}
                      </div>
                    </div>
                    <div style={{ minHeight: "35%" }}>
                      <h4>{el.category}</h4>
                      <h4>Rs.{el.price}</h4>
                    </div>
                  </CardWrapper>
                );
              })
            )}
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
  height: 45vh;
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

const LoadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  height: 100vh;
`;

const EmptyWrapper = styled.div`
  width: 100%;
  text-align: center;
  height: 100vh;
`;

const SortWrapper = styled.div`
  width: 80%;
  height: 100px;
  margin: 30px;
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 20px;
`;
