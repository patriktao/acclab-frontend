import "./RawMaterialTable";
import { useState, useEffect } from "react";
import { raw_material_columns } from "./RawMaterialColumns";
import { Table, Spin, Input, Button, AutoComplete, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FilterComponent from "./FilterComponent";

const { Search } = Input;

const axios = require("axios");

const RawMaterialTable = () => {
  /* States */
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [searchText, setSearchText] = useState();
  const [tableLoading, setTableLoading] = useState({ tableLoading: true });
  const [filterVisible, setFilterVisible] = useState(false);

  /* Fetch Data into Table */
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

  /* Search Bar */
  const handleSearch = (input) => {
    setSearchText(input);
    const filtered_table = data.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setTable(filtered_table);
  };

  const handleClear = () => {
    setTable(data);
    setSearchText();
  };

  /* Opens Filter Modal */
  const openFilter = () => {
    setFilterVisible(true);
  };

  /* Closes Filter Modal */
  const closeFilter = (e) => {
    e.stopPropagation();
    setFilterVisible(false);
  };

  /* When OK is pressed in Filter Modal, retrieve all input fields */
  const handleFilter = (e) => {
    const filterStates = e;
    const filtered_table = data.filter(
      (item) =>
        item.company
          .toLowerCase()
          .includes(filterStates.get("brand").toLowerCase()) &&
        item.country
          .toLowerCase()
          .includes(filterStates.get("country").toLowerCase())
    );
    setTable(filtered_table);
  };

  /* Render */
  return (
    <div className="raw-material-table">
      <div className="table-headers">
        <div className="table-header-position">
          <div className="table-text">
            <div>
              <span className="sub-header-table">TODAY, JULY 6 2021</span>
            </div>
            <div>
              <h2 className="main-header-table">Raw Materials</h2>
            </div>
          </div>
          <div className="table-buttons">
            <div>
              <Button
                className="table-filter"
                type="primary"
                size="large"
                onClick={openFilter}
              >
                <FilterComponent
                  filterVisible={filterVisible}
                  closeFilter={closeFilter}
                  handleFilter={handleFilter}
                />
                Filter
              </Button>
              <Tooltip title="Clear search and filters">
                <Button
                  className="table-clear"
                  size="large"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Tooltip>
            </div>
            <div>
              <div className="search-add">
                <AutoComplete
                  className="auto-complete"
                  dataSource={table.map((item) => item.name)}
                >
                  <Search
                    id="search-bar"
                    placeholder="Search for a raw material..."
                    allowClear
                    className="table-search"
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
