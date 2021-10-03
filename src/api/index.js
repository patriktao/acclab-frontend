import axios from "axios";

/* Shared API requests for many components */

/* API requests for components with a Loading Spinner are currently defined in their own components */
/* All API requests are exported as Arrays */

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

export const fetchCountries = async () => {
  try {
    const response = await axios.get("/brands/all_countries");
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

export const fetchMaterial = async (id) => {
  try {
    const response = await axios.get(`/inventory/${id}`);
    return response.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return [];
  }
};

export const fetchMaterialLogistics = async (id) => {
  try {
    const response = await axios.get(`/inventory/${id}/logistics`);
    return response.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return [];
  }
};
