import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS } from "../data/products";
const initialState = {
  value: {
    products: PRODUCTS,
    productSelected: {},
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProductSelected: (state, action) => {
      const productSelected = state.value.products.find(
        (product) => product.id === action.payload
      );
      state.value.productSelected = productSelected;
    },
  },
});

export const { setProductSelected } = productSlice.actions;

export default productSlice.reducer;
