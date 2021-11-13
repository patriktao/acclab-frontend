import axios from "axios";
import { message } from "antd";

export const fetchAllCompanies = async () => {
  try {
    const response = await axios.get("/brands/all_companies");
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

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get("/brands/all_countries");
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

export const deleteCompany = async (brand) => {
  await axios
    .delete("/brands/delete_company", { company: brand })
    .then(message.success(brand + " has been succesfully removed."))
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
      }
      message.warning(brand + " could not be removed.");
    });
};

export const addCompany = async (brand) => {
  await axios.post("/brands/add_company", { company: brand }).catch((err) => {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
    message.warning(brand + " could not be added.");
  });
  message.success(brand + " has been added.");
};

export const updateCompany = async (brand, new_brand) => {
  await axios
    .put("/brands/update_company", {
      company: brand,
      new_company: new_brand,
    })
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
      }
      message.warning(brand + " could not be updated.");
    });
  message.success(brand + " has been changed to " + new_brand);
};
