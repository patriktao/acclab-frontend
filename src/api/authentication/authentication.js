import axios from "axios";
import { message } from "antd";

export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  const response = await axios.post("/login/login", data).catch((err) => {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      message.error("Error in HTTP Request to API");
    }
  });
  return response.data.message;
};
