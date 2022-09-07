import React from "react";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Checkout } from "./components/screens/checkout/checkout";
import { Purchase } from "./components/screens/purchase/purchase";
import Store from "./store";
function App() {
  return (
    <Provider store={Store}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Purchase />} />
              <Route path="/checkout" element={<Checkout id={1} />} />
              <Route path="*" element={<h1>NOT FOUND 404</h1>} />
            </Routes>
          </BrowserRouter>
        </div>
    </Provider>
  );
}

export default App;
