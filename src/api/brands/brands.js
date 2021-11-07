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

export const deleteCompany = async (company) => {
  await axios
    .delete("/brands/delete_company", { company: company })
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
      }
    });
  message.success(company + " has been succesfully removed.");
};

export const addCompany = async (company) => {
  await axios.post("/brands/add_company", { company: company }).catch((err) => {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  });
  message.success(company + " has been added.");
};

export const updateCompany = async (company, new_company) => {
  await axios
    .put("/brands/update_company", {
      company: company,
      new_company: new_company,
    })
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
      }
    });
  message.success(company + " has been changed to " + new_company);
};
