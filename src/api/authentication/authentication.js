import axios from "axios";

export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post("/authentication/login", data);
    return response.data;
  } catch (err) {
    if (err.response) {
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
      console.log(`Error: ${err.message}`);
    }
    return null;
  }
};
