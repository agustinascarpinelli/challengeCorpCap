import React, { useEffect } from "react";
import "./price.css";
import { getPrice } from "../../features/priceReducer";
import { useDispatch, useSelector } from "react-redux";

export const Price = ({ total, itemName, itemDescription }) => {
  const dispatch = useDispatch();

  let usd = total.toFixed(2);
  const { price } = useSelector((state) => state.price);

  useEffect(() => {
    dispatch(getPrice(usd));

    const interval = setInterval(() => {
      dispatch(getPrice(usd));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="price">
      <p className="itemName">{itemName}</p>
      <p className="itemDescription">{itemDescription}</p>
      <div className="total">
        <h6>Price in BTC</h6>
        <p>₿ {price}</p>
        <h6>Price in USD</h6>
        <p>${usd}</p>
      </div>
    </div>
  );
};
