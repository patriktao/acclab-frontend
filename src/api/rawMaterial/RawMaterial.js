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
    const response = await axios.get(`/raw_material/${id}/logistics`);
    return response.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return [];
  }
};

export const fetchTotalAmount = async (id) => {
  try {
    const response = await axios.get(`/raw_material/${id}/total_amount`);
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
