import "./SfpTable.scss";
import React, { useState, useEffect } from "react";
import { sfp_columns } from "./SfpTableColumns";
import { Table, Spin, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TooltipComponent from "../../General/TooltipComponent";
import FilterComponent from "../RawMaterialTable/FilterComponent";
import { AutoComplete } from "antd";
import moment from "moment";

const { Search } = Input;

const axios = require("axios");

const SfpTable = () => {
  /* Fetching all raw materials */
  const [tableLoading, setTableLoading] = useState(true);
  const [searchText, searchedColumn] = useState("");
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [counter, setCounter] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const [itemNames] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await axios.get("/sfp_table") || [];
        setTable(response.data);
        setTableLoading(false);
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(`Error: ${err.message}`);
        }
        setTableLoading(true);
      }
    };
    fetchTable();
  }, []);

  const handleClear = () => {};

  const openFilter = () => {};

  const closeFilter = () => {};

  const handleSearch = () => {};

  const openCreateModal = () => {};

  const handleFilter = () => {};

  const today_date = moment().format("MMMM D YYYY").toUpperCase()
  
  return (
    <div className="SfpTable">
      <div className="table-headers">
        <div className="table-header-position">
          <div className="table-text">
            <div>
              <h2 className="main-header-table">Semi-Finished Products ({rowCount})</h2>
            </div>
          </div>
          <div className="table-buttons">
            <div>
              <TooltipComponent
                text="Clear search and filters"
                component={
                  <Button
                    className="table-clear"
                    size="large"
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                }
              />
              <Button
                name="Filter Table"
                className="table-filter"
                type="primary"
                size="large"
                onClick={openFilter}
              >
                <FilterComponent
                  filterVisible={filterVisible}
                  closeFilter={closeFilter}
                  handleFilter={handleFilter}
                  handleClear={handleClear}
                />
                Filter ({counter})
              </Button>
            </div>
            <div>
              <div className="search-add">
                <AutoComplete className="auto-complete" options={itemNames}>
                  <Search
                    className="table-search"
                    placeholder="Search for a Semi-Finished Product..."
                    allowClear
                    size="large"
                    value={searchText}
                    onSearch={handleSearch}
                  />
                </AutoComplete>
                <Button
                  className="table-add"
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={openCreateModal}
                >
                  Add SFP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spin spinning={tableLoading} tip="Loading..." size="large">
        <Table
          className="table-header"
          columns={sfp_columns.filter(
            (col) =>
              col.dataIndex !== "form" &&
              col.dataIndex !== "received_date" &&
              col.dataIndex !== "sfp_id"
          )}
          dataSource={table}
          rowKey={"id"}
          pagination={{ pageSize: 8, position: ["bottomCenter"] }}
          size="small"
        />
      </Spin>
    </div>
  );
};

export default SfpTable;
