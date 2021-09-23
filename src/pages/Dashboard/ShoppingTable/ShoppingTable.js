import { Table } from "antd";
import shopping_columns from "./ShoppingColumns";
import { useState, useEffect } from "react";
import "./ShoppingTable.css";
import { Spin, Popconfirm, message } from "antd";

const axios = require("axios");

const ShoppingTable = () => {
  const [tableLoading, setTableLoading] = useState({ tableLoading: true });
  const [ShoppingList, setShoppingList] = useState([]);

  /* Fetching all items with Shopping_List set to True */
  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const response = await axios.get("/shopping_list");
        setShoppingList(response.data);
        setTableLoading(false);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
        setTableLoading(true);
      }
    };
    fetchShoppingList();
  }, []);

  return (
    <div className="shopping-table">
      <span className="sub-header-table">RESTOCK</span>
      <br />
      <h4 className="main-header-table">Shopping List</h4>
      <Spin spinning={tableLoading} tip="Loading..." size="medium">
        <Table
          className="table-content"
          columns={shopping_columns}
          dataSource={ShoppingList}
          pagination={{ pageSize: 8 }}
        />
      </Spin>
    </div>
  );
};

export default ShoppingTable;
