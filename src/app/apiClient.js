import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://localhost:8000/api`,
});

axiosClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const token = user ? user.user.access_token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const response = error.response; // Assign error.response to a variable

    if (response && response.status === 401) {
      localStorage.removeItem("user");
      // window.location.reload();
    } else if (response && response.status === 404) {
      // Check if response is defined before accessing its properties
      // Show not found
    }

    throw error;
  }
);
export default axiosClient;
