import { Table } from "antd";
import { shopping_columns  } from "./ShoppingColumns";
import { useState, useEffect } from "react";
import "./ShoppingTable.css"
const axios = require("axios");


const ShoppingTable= () => {
  const [ShoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const response = await axios.get("/shopping_list");
        setShoppingList(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range.
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else{
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchShoppingList();
  }, []);


  return (
    <Table
      className="table-content"
      columns={shopping_columns}
      dataSource={ShoppingList}
    />
  );
};

export default ShoppingTable;
