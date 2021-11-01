import axios from "axios";

export const fetchExpiringMaterials = async () => {
  try {
    const response = await axios.get("/expiring_materials");
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  }
};
