import { message } from "antd";
import axios from "axios";

export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post("/authentication/login", data, {
      timeout: 1500,
    });
    if (response.data.message === "success") {
      const user = response.data.user;
      localStorage.setItem("email", user.email);
      localStorage.setItem("firstname", user.firstname);
      localStorage.setItem("lastname", user.lastname);
      console.log(response.data);
    }
    return response.data;
  } catch (err) {
    if (err.response) {
      localStorage.clear();
      message.error("Not connected to server.");
      console.log(`Error: ${err.message}`);
      console.log("Error in HTTP Request to API");
    }
    return null;
  }
};

export const loggedIn = async (user) => {
  try {
    const response = await axios.post("/authentication/loggedIn", {
      email: user,
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      localStorage.clear();
      console.log(`Error: ${err.message}`);
    }
    return null;
  }
};
