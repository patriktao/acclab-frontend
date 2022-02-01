import "./SfpTable.scss";
import React, { useState, useEffect } from "react";
import { sfp_columns } from "./SfpTableColumns";
import { Table, Spin, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TooltipComponent from "../../General/TooltipComponent";
import { AutoComplete } from "antd";
import SfpFilter from "./SfpFilter";
import moment from "moment";
import { checkDate } from "../../../helper/Checker";
import { getPriority } from "../../General/Priority/Priority";
import { API } from "../../../api";
import CreateSfp from "../CreateSfp";

const { Search } = Input;

const SfpTable = () => {
  const [tableLoading, setTableLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [counter, setCounter] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const [itemNames] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [activeFilters, setActiveFilters] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    API.sfp.fetchTable().then((res) => {
      setTable(res);
      setData(res);
      setTableLoading(false);
    });
  }, []);

  const handleClear = () => {
    setTable(data);
    setSearchText("");
    setActiveFilters(0);
    setRowCount(data.length);
  };

  const handleSearch = (input) => {
    setSearchText(input);
    setTable(
      data.filter((item) =>
        item.sfp_name.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const handleFilter = (fields) => {
    const states = fields;
    console.log(states);
    // Tables can only interpret empty strings (not null values), we therefore have to convert it.
    let count = 0;
    for (var key in states) {
      const value = states[key];
      value == null || value === "Invalid date" || value === ""
        ? (states[key] = "")
        : setActiveFilters(count++);
    }
    setActiveFilters(count);

    const filteredTable = data.filter(
      (item) =>
        item.location.includes(states.location) &&
        moment(item.expiration_date)
          .format("YYYYMMDD")
          .includes(
            checkDate(
              item.expiration_date,
              states.expiration_date[0],
              states.expiration_date[1]
            )
          ) &&
        getPriority(item.expiration_date)
          .toLowerCase()
          .includes(states.priority)
    );
    setRowCount(filteredTable.length);
    setTable(filteredTable);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = (e) => {
    e.stopPropagation();
    setShowCreateModal(false);
  };

  const createSfpModal = (
    <CreateSfp
      visible={showCreateModal}
      onClose={closeCreateModal}
      data={data}
    />
  );

  return (
    <div className="SfpTable">
      <div className="table-headers">
        <div className="table-header-position">
          <div className="table-text">
            <div>
              <h2 className="main-header-table">
                Semi-Finished Products ({rowCount})
              </h2>
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
                onClick={() => setFilterVisible(true)}
              >
                <SfpFilter
                  filterVisible={filterVisible}
                  closeFilter={(e) => {
                    e.stopPropagation();
                    setFilterVisible(false);
                  }}
                  handleFilter={handleFilter}
                  handleClear={handleClear}
                />
                Filter ({activeFilters})
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
                  {createSfpModal}
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
          rowKey={"sfp_id"}
          pagination={{ pageSize: 8, position: ["bottomCenter"] }}
          size="small"
        />
      </Spin>
    </div>
  );
};

export default SfpTable;
