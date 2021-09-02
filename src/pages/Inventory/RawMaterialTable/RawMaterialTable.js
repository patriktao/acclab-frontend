import "./RawMaterialTable";
import React, { useState, useEffect } from "react";
import { raw_material_columns } from "./RawMaterialColumns";
import { Table, Spin, Input, Button, AutoComplete } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

const axios = require("axios");

const RawMaterialTable = () => {
  /* Fetching all raw materials */
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [value, setValue] = useState("");
  const [tableLoading, setTableLoading] = useState({ tableLoading: true });

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await axios.get("/raw_material_table");
        setData(response.data);
        setTable(response.data);
        setTableLoading(false);
      } catch (err) {
        if (err.response) {
          console.log(`Error: ${err.message}`);
        }
        setTableLoading(true);
      }
    };
    fetchTable();
  }, []);

  const handleSearch = (input) => {
    setValue(input);
    const filtered_table = data.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setTable(filtered_table);
  };

  const handleClear = () => {
    setTable(data);
    setValue("");
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
            <div>
              <Button className="table-filter" type="primary" size="large">
                Filter
              </Button>
              <Button
                className="table-clear"
                size="large"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
            <div>
              <div className="search-add">
                <AutoComplete
                  className="auto-complete"
                  dataSource={table.map((item) => item.name)}
                >
                  <Search
                    id="search-bar"
                    placeholder="search for a raw material..."
                    allowClear
                    className="table-search"
                    size="large"
                    value={value}
                    onSearch={handleSearch}
                  />
                </AutoComplete>
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
          pagination={{pageSize: 8, position: ["bottomCenter"] }}
        />
      </Spin>
    </div>
  );
};

export default RawMaterialTable;
