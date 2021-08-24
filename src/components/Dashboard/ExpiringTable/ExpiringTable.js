import React from "react";
import "./ExpiringTable.css";
import { axios } from "../../../Axios.js";
import { useState, useEffect } from "react";

/* UI Components */
import { ArrowsAltOutlined } from "@ant-design/icons";
import { Spin } from 'antd';
import { expiring_columns } from "./ExpiringColumns";
import { Table, Tooltip, Button } from "antd";

const ExpiringTable = () => {
  /* Fetching all ingredients in ascending order */
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get("/expiring_materials");
        setData(response.data);
      } catch (err) {
        if (err.response) {
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
    <div className="table">
      <div className="table-headers">
        <div>
          <span className="sub-header-table">TODAY, JULY 6 2021</span>
          <br />
          <h2 className="main-header-table">Expiring Materials</h2>
        </div>
        <div className="expand-button">
          <Tooltip title="Show inventory">
            <Button shape="circle" icon={<ArrowsAltOutlined />} size="large" />
          </Tooltip>
        </div>
      </div>
      <Table
        className="table-header"
        columns={expiring_columns}
        dataSource={data}
        loading={Spin}
      />
    </div>
  );
};

export default ExpiringTable;
