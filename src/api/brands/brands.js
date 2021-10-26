import axios from "axios";
import { message } from "antd";

export const fetchAllCompanies = async () => {
  try {
    const response = await axios.get("/brands/all_companies");
    return response.data;
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
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      return [];
    }
  }
};

export const deleteCompany = async (company) => {
  await axios
    .delete("/brands/delete_company", { data: { company: company } })
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
