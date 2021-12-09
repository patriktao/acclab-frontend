import axios from "axios";
import { message } from "antd";

export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post("/login/login", data);
    return response.data.message;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      console.log("Error in HTTP Request to API");
    }
    return null;
  }
};
