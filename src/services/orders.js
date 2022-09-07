import axios from "axios";
const URL = "http://localhost:3002/orders";

export const createNew = (order) => {
  axios
    .post(URL, order)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
