import apiClient from "../../app/apiClient";

// Register user
const register = async (userData) => {
  const response = await apiClient.post("/register", userData);
  console.log("before");
  if (response.data) {
    console.log("response.data");
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data);
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
};

export default authService;
