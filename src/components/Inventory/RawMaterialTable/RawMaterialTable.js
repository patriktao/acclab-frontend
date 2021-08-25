import "./RawMaterialTable";
import React, { useState, useEffect } from "react";
import { raw_material_columns } from "./RawMaterialColumns";
import { Table, Spin } from "antd";

const axios = require("axios");

const RawMaterialTable = () => {
  /* Fetching all raw materials */
  const [table, setTable] = useState([]);
  const [tableLoading, setTableLoading] = useState({tableLoading: true});

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await axios.get("/raw_material_table");
        setTable(response.data);
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
    fetchTable();
  }, []);

  return (
    <div className="raw-material-table">
      <div className="table-headers">
        <div>
          <span className="sub-header-table">TODAY, JULY 6 2021</span>
          <br />
          <h2 className="main-header-table">Raw Materials (8)</h2>
        </div>
      </div>
      <Spin spinning={tableLoading} tip="Loading..." size="large">
        <Table
          className="table-header"
          columns={raw_material_columns}
          dataSource={table}
        />
      </Spin>
    </div>
  );
};

export default RawMaterialTable;
