import { configureStore } from "@reduxjs/toolkit";
import priceReducer from "../features/priceReducer";
import productsReducer from "../features/productsReducer";

const Store = configureStore({
  reducer: {
    product: productsReducer,
    price: priceReducer,
  },
});

export default Store;
