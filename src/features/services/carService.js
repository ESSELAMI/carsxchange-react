import apiClient from "../../app/apiClient";
import axios from "axios";

const baseURL = `http://localhost:8000/api`;

// Create new carr
const createCar = async (carData) => {
  const response = await apiClient.post(baseURL+"/cars", carData);

  return response.data;
};

// Get cars
const getCars = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get( baseURL+"/cars", config);
  console.log("response.data", response.data);
  return response.data;
};

//Update car
const updateCar = async (carData) => {
  const response = await apiClient.put(baseURL+"/cars", carData);

  return response.data;
};

const carService = {
  createCar,
  updateCar,
  getCars,
};

export default carService;
