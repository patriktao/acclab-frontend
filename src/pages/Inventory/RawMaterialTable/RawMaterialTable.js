import "./RawMaterialTable";
import { useState, useEffect } from "react";
import { raw_material_columns } from "./RawMaterialColumns";
import { Table, Spin, Input, Button, AutoComplete, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FilterComponent from "./FilterComponent";
import moment from "moment";

const { Search } = Input;

const axios = require("axios");

const RawMaterialTable = () => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tableLoading, setTableLoading] = useState({ tableLoading: true });
  const [filterVisible, setFilterVisible] = useState(false);
  const [counter, setCounter] = useState(0);

  /* Fetch Table Data */
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

  /* Resets table */
  const handleClear = () => {
    setTable(data);
    setSearchText("");
    setCounter(0);
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

  /* Check the item date and if requirements are satisfied, return the date in string format */
  const checkDate = (inputData, startDate, endDate) => {
    const date = moment(inputData);
    if (startDate == null || endDate == null) {
      return "";
    } else if (
      (date.isAfter(startDate) || date.isSame(startDate, "date")) &&
      (date.isBefore(endDate) || date.isSame(endDate, "date"))
    ) {
      return date.format("YYYYMMDD");
    }
    return;
  };

  /* Actions when you press "OK" in the Filter Module */
  const handleFilter = (e) => {
    const states = e;
    /* If state is null, convert it to empty string so table can interpret */
    let count = 0;
    for (const [key, value] of e.entries()) {
      if (value == null || value === "Invalid date" || value === "") {
        states.set(key, "");
      } else {
        count++;
      }
    }
    setCounter(count);

    const filtered_table = data.filter(
      (item) =>
        item.company
          .toLowerCase()
          .includes(states.get("brand").toLowerCase()) &&
        item.country
          .toLowerCase()
          .includes(states.get("country").toLowerCase()) &&
        item.location.includes(states.get("location")) &&
        item.form.includes(states.get("form")) &&
        moment(item.expiration_date)
          .format("YYYYMMDD")
          .includes(
            checkDate(
              item.expiration_date,
              states.get("expirationDate")[0],
              states.get("expirationDate")[1]
            )
          ) &&
        moment(item.received_date)
          .format("YYYYMMDD")
          .includes(
            checkDate(
              item.received_date,
              states.get("receivedDate")[0],
              states.get("receivedDate")[1]
            )
          ) &&
        item.priority.toLowerCase().includes(states.get("priority"))
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
              <Tooltip title="Clear search and filters">
                <Button
                  className="table-clear"
                  size="large"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Tooltip>
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
                  handleClear={handleClear}
                />
                Filter ({counter})
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
          columns={raw_material_columns.filter(
            (col) =>
              col.dataIndex !== "form" && col.dataIndex !== "received_date"
          )}
          dataSource={table}
          pagination={{ pageSize: 8, position: ["bottomCenter"] }}
        />
      </Spin>
    </div>
  );
};

export default RawMaterialTable;