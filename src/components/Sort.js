import React from "react";
import { useSelector } from "react-redux";

const Sort = ({ onChange }) => {
  const datas = useSelector((state) => state.dataSlice.data);

  const checkAndUpdate = (e) => {
    let value = e.target.value;
    let newArr = [...datas];
    if (value === "asc") {
      newArr.sort((a, b) => (Number(a.price) > Number(b.price) ? 1 : -1));
    } else if (value === "desc") {
      newArr.sort((a, b) => (Number(a.price) > Number(b.price) ? -1 : 1));
    } else if (value === "null") {
      newArr = [...datas];
    }
    onChange(newArr);
  };

  return (
    <div>
      <h3>Sort By Price</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          gap: 20,
        }}
      >
        <div>
          <input
            type="radio"
            value="null"
            name="SortBy"
            onChange={checkAndUpdate}
          />
          <label>Default</label>
        </div>
        <div>
          <input
            type="radio"
            value="asc"
            name="SortBy"
            onChange={checkAndUpdate}
          />
          <label>Low To High</label>
        </div>
        <div>
          <input
            type="radio"
            value="desc"
            name="SortBy"
            onChange={checkAndUpdate}
          />
          <label>High To Low</label>
        </div>
      </div>
    </div>
  );
};

export default Sort;
