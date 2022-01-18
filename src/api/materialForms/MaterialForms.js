import axios from "axios";

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
