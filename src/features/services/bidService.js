import apiClient from "../../app/apiClient";
import axios from "axios";

const baseURL = `http://localhost:8000/api`;

const createBid = async (carId, bidData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    baseURL + "/cars/" + carId + "/bids",
    bidData,
    config
  );
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
