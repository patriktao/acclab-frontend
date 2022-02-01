import axios from "axios";
import { message } from "antd";

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
    const response = await axios.get(`/sfp_logistics/${id}`);
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

export const updateExpirationDate = async (id) => {
  try {
    await axios.put(`/sfp/${id}/update_expiration_date`);
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  }
};

export const addStock = async (id, data) => {
  const res = await axios
    .post(`/sfp_logistics/${id}/add`, data)
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
      }
    });
  updateExpirationDate(id);
  return res.data;
};

export const updateStock = async (id, data) => {
  await axios.put(`/sfp_logistics/${id}/update`, data).catch((err) => {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  });
  updateExpirationDate(id);
};

export const disableStock = async (id, data) => {
  await axios.put(`/sfp_logistics/${id}/disable`, data).catch((err) => {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  });
  updateExpirationDate(id);
};

export const updateTotalAmount = async (id) => {
  try {
    await axios.put(`/sfp_logistics/${id}/update_total_amount`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    message.error("Failed updating the total amount.");
  }
};

export const createSfp = async (form) => {
  try {
    let response = 0;
    await axios.post(`/sfp`, form).then((res) => {
      response = res.data.sfp_id[0];
    });
    message.success(form.sfp_name + " has been added to inventory.");
    return response;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    message.error("Unable to add new raw material.");
    return "failed";
  }
};

export const createFormulation = async (id, form) => {
  try {
    console.log(form);
    await form.forEach((rawMaterial) => {
      axios.post(`/sfp/${id}/formulation`, rawMaterial);
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};
