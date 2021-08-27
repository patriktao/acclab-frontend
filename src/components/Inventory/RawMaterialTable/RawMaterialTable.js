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
  const [searchText, searchedColumn] = useState([]);

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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  return (
    <div className="raw-material-table">
      <div className="table-headers">
        <div className="table-header-position">
          <div className="table-text">
            <div>
              <span className="sub-header-table">TODAY, JULY 6 2021</span>
            </div>
            <div>
              <h2 className="main-header-table">Raw Materials (6)</h2>
            </div>
          </div>
          <div className="table-buttons">
            {/* Button Layouts */}
            <div>
              <Button className="table-filter" type="primary" size="large">
                Filter
              </Button>
              <Button
                onClick={() => this.handleReset()}
                className="table-clear"
                size="large"
              >
                Clear
              </Button>
            </div>
            <div>
              <div className="search-add">
                <Search
                  placeholder="search for a raw material..."
                  allowClear
                  onSearch={() => this.handleSearch()}
                  className="table-search"
                  size="large"
                />
                <Button
                  className="table-add"
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                >
                  Add Raw Material
                </Button>
              </div>
            </div>
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
