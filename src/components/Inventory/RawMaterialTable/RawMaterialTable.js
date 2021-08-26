import "./RawMaterialTable";
import React, { useState, useEffect } from "react";
import { raw_material_columns } from "./RawMaterialColumns";
import { Table, Spin, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

const axios = require("axios");

const RawMaterialTable = () => {
  /* Fetching all raw materials */
  const [table, setTable] = useState([]);
  const [tableLoading, setTableLoading] = useState({ tableLoading: true });
  const [searchText, searchedColumn] = useState([])

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
        <div className="table-header-position">
          <div>
            <span className="sub-header-table">TODAY, JULY 6 2021</span>
            <br />
            <h2 className="main-header-table">Raw Materials (6)</h2>
          </div>
          <div className="filter-position">
          <Button className="table-filter-button" type="primary" size="large">
              Filter
            </Button>
          </div>
          <div className="reset-position">
          <Button className="table-filter-button" size="large">
              Clear
            </Button>
          </div>
          <div>
            <Search
              placeholder="search for a raw material..."
              allowClear
              onSearch={() => this.handleSearch()} 
              className="table-search"
              size="large"
            />
          </div>
          <div className="create-button-position">
            <Button className="table-create-button" type="primary" size="large" icon={<PlusOutlined />}>
              Add Raw Material
            </Button>
          </div>
        </div>
      </div>
      <Spin spinning={tableLoading} tip="Loading..." size="large">
        <Table
          className="table-header"
          columns={raw_material_columns}
          dataSource={table}
          pagination={{ pageSize: 8, position: ["bottomCenter"] }}
        />
      </Spin>
    </div>
  );
};

export default RawMaterialTable;