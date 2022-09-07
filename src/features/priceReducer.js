import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  price: 0,
};

export const getPrice = createAsyncThunk("price/getPrice", async (usd) => {
  try {
    const response = await axios.get(
      `https://blockchain.info/tobtc?currency=USD&value=${usd}`
    );
    return response.data.toFixed(10);
  } catch (error) {
    console.log("error in catch");
  }
});
export const priceSlice = createSlice({
  name: "price",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrice.fulfilled, (state, action) => {
      state.price = action.payload;
      state.status = "success";
    });
  },
});

export default priceSlice.reducer;
