import { Table } from "antd";
import { shopping_columns } from "./ShoppingColumns";
import { useState, useEffect } from "react";
import "./ShoppingTable.css";
import { Spin } from "antd";

const axios = require("axios");

const ShoppingTable = () => {
    /* Fetching all items with Shopping_List set to True */
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
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchShoppingList();
  }, []);

  return (
    <div className="table">
      <span className="sub-header-table">RESTOCK</span>
      <br />
      <h2 className="main-header-table">Shopping List</h2>
      <Table
        className="table-content"
        columns={shopping_columns}
        dataSource={ShoppingList}
        loading={Spin}
      />
    </div>
  );
};

export default ShoppingTable;
