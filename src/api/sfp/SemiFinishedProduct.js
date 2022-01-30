import { message } from "antd";
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

export const editInformation = async (id, form) => {
  try {
    const response = await axios.put(`/sfp/${id}/edit_information`, form);
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  }
};

export const editFormulation = async (id, form) => {
  try {
    const response = await axios.put(`/sfp/${id}/edit_formulation`, form);
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  }
};

export const uploadImage = async (image, id) => {
  try {
    const formData = new FormData();
    console.log(image);
    formData.append("image", image);
    let response = null;
    await axios
      .post(`/upload/sfp/${id}`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error", error.message);
        }
      })
      .then((res) => {
        response = res;
      });
    return response.data.Location;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return null;
  }
};

export const deleteImage = async (id) => {
  try {
    const res = await axios.delete(`/upload/sfp/${id}`);
    return res.data.message;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return null;
  }
};

export const updateImage = async (image, id) => {
  const formData = new FormData();
  formData.append("image", image);
  let response = null;
  await axios
    .delete(`/upload/sfp/${id}`)
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
        return null;
      }
    })
    .then(async () => {
      await axios
        .post(`/upload/sfp/${id}`, formData, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .catch((err) => {
          console.log(`Error: ${err.message}`);
          return null;
        })
        .then((res) => {
          response = res;
        });
    });
  return response.data.Location;
};
