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

export const fetchForms = async () => {
  try {
    const response = await axios.get("/material_forms");
    const formsArray = [];
    response.data.forEach((item) => {
      formsArray.push({
        value: item.form,
        name: item.form,
      });
    });
    return formsArray.sort((a, b) => a.name.localeCompare(b.name));
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
  return res.data;
};

export const updateStock = async (id, data) => {
  await axios.put(`/raw_material_logistics/${id}/update`, data).catch((err) => {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  });
};

export const disableStock = async (id, data) => {
  await axios
    .put(`/raw_material_logistics/${id}/disable`, data)
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
      }
    });
};

export const updateTotalAmount = async (id, amount) => {
  await axios
    .put(`/raw_material_logistics/${id}/total_amount`, { amount: amount })
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
      }
    });
};

export const uploadImage = async (image, id) => {
  const formData = new FormData();
  formData.append("image", image);
  await axios
    .post(`/upload/raw_materials/${id}`, formData, {
      headers: { "Content-type": "multipart/form-data" },
    })
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
        return null;
      }
    })
    .then((res) => {
      console.log(res);
    });
};

export const deleteImage = async (id) => {
  try {
    const res = await axios.delete(`/upload/raw_materials/${id}`);
    return res.data.message;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      return null;
    }
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
          if (err.response) {
            console.log(`Error: ${err.message}`);
            return null;
          }
        })
        .then((res) => {
          response = res;
        });
    });
  return response.data.Location;
};
