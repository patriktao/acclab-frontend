import axios from "axios";

export const fetchCompanies = async () => {
  try {
    const response = await axios.get("/brands/raw_material_companies");
    return response.data;
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
    const response = await axios.get(`/inventory/${id}`);
    return response.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return [];
  }
};

export const fetchLogistics = async (id) => {
  try {
    const response = await axios.get(`/inventory/${id}/logistics`);
    return response.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return [];
  }
};

export const fetchCountries = async () => {
  try {
    const response = await axios.get("/brands/raw_material_countries");
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      return [];
    }
  }
};

export const fetchLocations = async () => {
  try {
    const response = await axios.get("/stored_locations");
    const locationArray = [];
    response.data.forEach((item) => {
      locationArray.push({
        value: item.location,
        name: item.location,
      });
    });
    return locationArray.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      return [];
    }
  }
};

export const fetchAll = async () => {
  try {
    const response = await axios.get("/raw_material_table").catch();
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
    return [];
  }
};

export const editMaterial = async (id, data) => {
  await axios.put(`/inventory/${id}/edit`, data).catch((err) => {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  });
};

export const handleRestock = async (id) => {
  await axios.put(`/inventory/${id}/restock`).catch((err) => {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  });
};
