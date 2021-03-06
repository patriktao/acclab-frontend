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
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("firstname", user.firstname);
      sessionStorage.setItem("lastname", user.lastname);
      console.log(response.data);
    }
    return response.data;
  } catch (err) {
    if (err.response) {
      sessionStorage.clear();
      message.error("Error in HTTP request to API.");
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
      sessionStorage.clear();
      console.log(`Error: ${err.message}`);
    }
    return null;
  }
};
