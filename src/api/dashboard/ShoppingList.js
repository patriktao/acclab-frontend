import axios from "axios";

/* 
    Fetching all items in Inventory with "shoppingList: true"
*/
export const fetchShoppingList = async () => {
  try {
    const response = await axios.get("/shopping_list");
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
    }
  }
};
