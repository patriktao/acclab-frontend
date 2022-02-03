import { message } from "antd";
import axios from "axios";

export const fetchCompanies = async () => {
  try {
    const response = await axios.get("/brands/raw_material_companies");
    const array = [];
    response.data.forEach((item) => {
      array.push({
        value: item.company,
        name: item.company,
      });
    });
    return array.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      return [];
    }
  }
};

export const fetchMaterial = async (id) => {
  try {
    const response = await axios.get(`/raw_material/${id}`);
    return response.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return [];
  }
};

export const fetchLogistics = async (id) => {
  try {
    const response = await axios.get(`/raw_material_logistics/${id}`);
    return response.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return [];
  }
};

export const fetchTotalAmount = async (id) => {
  try {
    const response = await axios.get(
      `/raw_material_logistics/${id}/total_amount`
    );
    return response.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return [];
  }
};

export const fetchCountries = async () => {
  try {
    const response = await axios.get("/brands/raw_material_countries");
    const array = [];
    response.data.forEach((item) => {
      array.push({
        value: item.country,
        name: item.country,
      });
    });
    return array.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      return [];
    }
  }
};

export const fetchAll = async () => {
  try {
    const response = await axios.get("/raw_material_table");
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
    return [];
  }
};

export const editMaterial = async (id, data) => {
  await axios.put(`/raw_material/${id}/edit`, data).catch((err) => {
    if (err.response) {
      console.log(err.response);
    }
  });
};

export const handleRestock = async (id) => {
  await axios.put(`/raw_material/${id}/restock`).catch((err) => {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  });
};

export const addStock = async (id, data) => {
  const res = await axios
    .post(`/raw_material_logistics/${id}/add`, data)
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
      }
    });
  updateExpirationDate(id);
  return res.data;
};

export const updateStock = async (id, data) => {
  await axios.put(`/raw_material_logistics/${id}/update`, data).catch((err) => {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  });
  updateExpirationDate(id);
};

export const disableStock = async (id, data) => {
  await axios
    .put(`/raw_material_logistics/${id}/disable`, data)
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
      }
    });
  updateExpirationDate(id);
};

export const updateTotalAmount = async (id) => {
  try {
    await axios.put(`/raw_material_logistics/${id}/update_total_amount`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    message.error("Failed updating the total amount.");
  }
};

export const uploadImage = async (image, id) => {
  try {
    const formData = new FormData();
    console.log(image);
    formData.append("image", image);
    let response = null;
    await axios
      .post(`/upload/raw_materials/${id}`, formData, {
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
    const res = await axios.delete(`/upload/raw_materials/${id}`);
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
    .delete(`/upload/raw_materials/${id}`)
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
        return null;
      }
    })
    .then(async () => {
      await axios
        .post(`/upload/raw_materials/${id}`, formData, {
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
    await axios.put(`/raw_material/${id}/update_expiration_date`);
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  }
};

export const createRawMaterial = async (form) => {
  try {
    let response = 0;
    await axios.post(`/raw_material/create`, form).then((res) => {
      response = res.data.raw_material_id[0];
    });
    message.success(form.name + " has been added to inventory.");
    return response;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    message.error("Unable to add new raw material.");
    return "failed";
  }
};

export const deleteAllLogistics = async (id) => {
  try {
    await axios.delete(`/raw_material_logistics/${id}/all`);
    return;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    message.error("Unable to delete all");
  }
};

export const deleteRawMaterial = async (id) => {
  let response = "failed";
  try {
    deleteImage(id);
    deleteAllLogistics(id);
    await axios.delete(`/raw_material/${id}`).then(() => {
      message.success("Successfully deleted the raw material.");
      response = "success";
    });
    return response;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      message.error("Unable to delete the raw material.");
      return response;
    }
  }
};

export const disableRawMaterial = async (id) => {
  let response = "failed";
  try {
    deleteImage(id);
    deleteAllLogistics(id);
    await axios.put(`/raw_material/${id}/disable`).then(() => {
      message.success("Successfully deleted the raw material.");
      response = "success";
    });
    return response;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      message.error("Unable to delete the raw material.");
      return response;
    }
  }
};

export const disableAllLogistics = async (id) => {
  try {
    await axios.put(`/raw_material_logistics/${id}/disable_all`);
    return;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    message.error("Unable to delete all");
  }
};
