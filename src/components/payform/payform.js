import "./payform.css";
import React, { useEffect, useState } from "react";
import visa from "../../img/visa.svg";
import amex from "../../img/amex.svg";
import diners from "../../img/diners.svg";
import master from "../../img/mastercard.svg";
import creditcard from "../../img/credit-card-solid.svg";
import { useNavigate } from "react-router-dom";
import {
  isValid,
  isExpirationDateValid,
  isSecurityCodeValid,
  getCreditCardNameByNumber,
} from "creditcard.js";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { getPrice } from "../../features/priceReducer";
import { createNew } from "../../services/orders";

export const PayForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [creditLogo, setCreditLogo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [creditNumber, setCreditNumber] = useState(null);
  const [expiration, setExpiration] = useState("");
  const [cvc, setCvc] = useState(null);

 
  useEffect(() => {
    dispatch(getPrice(productSelected.price));
  }, []);

  const history = useNavigate();
  const { productSelected } = useSelector((state) => state.product.value);
  const { price } = useSelector((state) => state.price);
  const createOrder = () => {
    const date = new Date();
    const order = {
      time: date.toLocaleTimeString(),
      date: date.toLocaleDateString(),
      total: productSelected.price,
      totalBtc: price,
      product: {
        name: productSelected.name,
        id: productSelected.id,
      },
      creditCardData: {
        number: creditNumber,
        company: creditCard,
      },
    };
    return order;
  };

  const validateCreditCardNumber = (value) => {
    setErrorMsg("");
    let card = getCreditCardNameByNumber(value);
    setCreditCard(card);
    setCreditNumber(value);
    if (card === "Visa" && isValid(value)) {
      setCreditLogo(visa);
      setCreditNumber(value);
      return true;
    } else if (card === "Mastercard" && isValid(value)) {
      setCreditLogo(master);
      setCreditNumber(value);
      return true;
    } else if (card === "Diners" && isValid(value)) {
      setCreditLogo(diners);
      setCreditNumber(value);
      return true;
    } else if (card === "American Express" && isValid(value)) {
      setCreditLogo(amex);
      setCreditNumber(value);
      return true;
    } else {
      return false;
    }
  };

  const valid = () => {
    let expirationMonth = expiration.slice(0, 2);
    let expirationYear = expiration.slice(3, 5);
    if (
      validateCreditCardNumber(creditNumber) &&
      isSecurityCodeValid(creditNumber, cvc) &&
      isExpirationDateValid(expirationMonth, expirationYear)
    ) {
      setError("");
      createNew(createOrder());

      Swal.fire({
        icon: "success",
        iconColor: "rgba(254, 215, 102, 1)",
        title: "Thanks for your purchase",
        background: "#E5E5E5",
        timer: 3000,
        showConfirmButton: false,
        color: "rgba(54, 53, 55, 1)",
      });
      setTimeout(() => {
        history("/");
      }, 5000);
    } else {
      setError("Please, enter a valid credit card");
      if (!validateCreditCardNumber(creditNumber)) {
        setErrorMsg("Not valid credit card number");
      }
    }
  };

  const cashout = (e) => {
    e.preventDefault();
    valid();
  };
  return (
    <div className="payform">
      {error ? <span className="error">*{error}</span> : <div></div>}
      <form className="form" onSubmit={cashout}>
        <label for="cardNumber">Card Number</label>
        <div className="cardInp">
          <InputMask
            id="cardNumber"
            alwaysShowMask="true"
            mask="9999 9999 9999 9999"
            onChange={(e) => validateCreditCardNumber(e.target.value)}
          />
          {creditLogo ? (
            <img className="logo" src={creditLogo} alt={creditCard} />
          ) : (
            <img className="logo" src={creditcard} alt={creditCard} />
          )}
        </div>
        {errorMsg ? <span className="error">*{errorMsg}</span> : <span></span>}

        <label className="labelInp" for="expirationDate">
          MM/YY
        </label>
        <div className="cardInp">
          <InputMask
            mask="99/99"
            alwaysShowMask="true"
            id="expirationMonth"
            onChange={(e) => setExpiration(e.target.value)}
          />{" "}
        </div>

        <label className="labelInp" for="code">
          CVC Code
        </label>
        <div className="cardInp">
          <InputMask
            alwaysShowMask="true"
            mask="999"
            id="code"
            onChange={(e) => setCvc(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" className="button">
            pay now
          </button>
        </div>
      </form>
    </div>
  );
};
