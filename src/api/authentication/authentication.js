import axios from "axios";

export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post("/login", data);
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      console.log("Error in HTTP Request to API");
    }
    return null;
  }
};

export const loggedIn = async (email) => {
  try {
    const res = await axios.get("/login", { email: email });
    return res.data.loggedIn;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
    return null;
  }
};
