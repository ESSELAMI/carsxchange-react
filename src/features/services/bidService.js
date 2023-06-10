import apiClient from "../../app/apiClient";
import axios from "axios";

const baseURL = `http://localhost:8000/api`;

const createBid = async (carId, price, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    price: price, // Include the "price" field in the request data
  };
  const response = await axios.post(
    baseURL + "/cars/" + carId + "/bids",
    data,
    config
  );
  console.log(response.request);
  return response.data;
};

// Get cars
const getBids = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(baseURL + "/bids", config);
  return response.data;
};

const bidService = {
  createBid,
  getBids,
};

export default bidService;
