import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://localhost:8000/api`,
});

axiosClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const token = user.access_token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("user");
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }

    throw error;
  }
);

export default axiosClient;
