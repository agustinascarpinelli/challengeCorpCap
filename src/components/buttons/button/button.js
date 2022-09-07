import React from "react";
import "./button.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProductSelected } from "../../../features/productsReducer";

export const Button = ({ id }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(setProductSelected(id));
    history("/checkout");
  };

  return (
    <button
      onClick={() => {
        handleAdd();
      }}
      className="button buttonPurchase"
    >
      Buy it
    </button>
  );
};
