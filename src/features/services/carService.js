import apiClient from "../../app/apiClient";
import axios from "axios";

const baseURL = `http://localhost:8000/api`;

const createCar = async (carData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(baseURL + "/cars", carData, config);
  console.log("response.data", response.data);
  return response.data;
};

// Get cars
const getCars = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(baseURL + "/cars", config);
  console.log("response.data", response.data);
  return response.data;
};

//Update car
const updateCar = async (id, carData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(baseURL + "/cars/" + id, carData, config);

  return response.data;
};

// Delete car
const deleteCar = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("hna than lhag", token);
  const response = await axios.delete(baseURL + "/cars/" + id, config);

  return response.data;
};

const carService = {
  createCar,
  updateCar,
  getCars,
  deleteCar,
};

export default carService;
