import axios from "axios";

export const fetchTotalMaterials = async () => {
  try {
    const response = await axios.get("/total_materials");
    return response.data.map((data) => data.total);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return 0;
  }
};

export const fetchTotalExpiredMaterials = async () => {
  try {
    const response = await axios.get("/total_expired_materials");
    return response.data.map((data) => data.total);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return 0;
  }
};
