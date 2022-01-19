import axios from "axios";

export const fetchTable = async () => {
  try {
    const response = await axios.get("/sfp/table");
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
    return [];
  }
};

export const fetchSfp = async (id) => {
  try {
    const response = await axios.get(`/sfp/${id}`);
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
    return [];
  }
};

export const fetchFormulation = async (id) => {
  try {
    const response = await axios.get(`/sfp/${id}/formulation`);
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
    return [];
  }
};

export const fetchLogistics = async (id) => {
  try {
    const response = await axios.get(`/sfp/${id}/logistics`);
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
    return [];
  }
};
