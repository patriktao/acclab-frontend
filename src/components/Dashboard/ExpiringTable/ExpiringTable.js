import React from "react";
import { Table } from "antd";
import { expiring_columns } from "./ExpiringColumns";
import "./ExpiringTable.css";
import { axios } from "../../../Axios.js";
import { useState, useEffect } from "react";

const ExpiringTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get("/expiring_ingredients");
        setData(response.data);
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
    fetchIngredients();
  }, []);

  return (
    <Table
      className="table-header"
      columns={expiring_columns}
      dataSource={data}
    />
  );
};

export default ExpiringTable;
