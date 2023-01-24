import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    isLoading: true,
    isError: false,
    cartArr: [],
  },
  reducers: {
    getDataApi: (state, action) => {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    },
    addToCart: (state, action) => {
      return {
        ...state,
        cartArr: [...state.cartArr, action.payload],
      };
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload.id;
      state.cartArr = state.cartArr.filter((el) => el.id !== itemId);
      alert("Item removed from Cart");
    },
  },
});

export const { getDataApi, addToCart, removeFromCart } = dataSlice.actions;
export default dataSlice.reducer;
