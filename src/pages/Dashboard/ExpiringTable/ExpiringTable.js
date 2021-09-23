import React from "react";
import "./ExpiringTable.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* UI Components */
import { ArrowsAltOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { expiring_columns } from "./ExpiringColumns";
import { Table, Tooltip, Button } from "antd";

const axios = require("axios");

const ExpiringTable = () => {
  const [tableLoading, setTableLoading] = useState({ tableLoading: true });

  /* Fetching all ingredients in ascending order */
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get("/expiring_materials");
        setData(response.data);
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
    fetchIngredients();
  }, []);

  return (
    <div className="expiring-table">
      <div className="table-headers">
        <div>
          <span className="sub-header-table">TODAY, JULY 6 2021</span>
          <br />
          <h4 className="main-header-table">Expiring Materials</h4>
        </div>
        <div className="expand-button">
          <Tooltip title="Show inventory" color="#2db7f5">
            <Button shape="circle" size="large">
              <Link to="/inventory">
                <ArrowsAltOutlined />
              </Link>
            </Button>
          </Tooltip>
        </div>
      </div>
      <Spin spinning={tableLoading} tip="Loading..." size="medium">
        <Table
          className="table-header"
          columns={expiring_columns}
          dataSource={data}
          pagination={{ pageSize: 8 }}
        />
      </Spin>
    </div>
  );
};

export default ExpiringTable;
