import { Table } from "antd";
import { shopping_columns  } from "./ShoppingColumns";
import { shopping_data } from "./ShoppingData";
const axios = require("axios");


const ShoppingTable= () => {

  //Get all expiring ingredients from API-endpoint
  async function ShoppingList(){
    await axios.get('https://localhost:4000/shoppinglist')
    .then(res => {
      console.log(res.data)
    });
  };

  ShoppingList();

  return (
    <Table
      className="table-header"
      columns={shopping_columns}
      dataSource={shopping_data}
    />
  );
};

export default ShoppingTable;
