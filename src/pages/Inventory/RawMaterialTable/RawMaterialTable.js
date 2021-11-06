import "./RawMaterialTable";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Spin,
  Input,
  Button,
  AutoComplete,
  Tooltip,
  Modal,
  Dropdown,
  Menu,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FilterComponent from "./FilterComponent";
import moment from "moment";
import AddRawMaterial from "./AddRawMaterial";
import TooltipComponent from "../../../components/TooltipComponent";
import { getPriority } from "../../../components/Priority/Priority";
import EditRawMaterial from "../../RawMaterial/EditRawMaterial";
import { API } from "../../../api";
import { raw_material_columns } from "./RawMaterialColumns";

const { Search } = Input;

const RawMaterialTable = () => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tableLoading, setTableLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [itemNames, setItemNames] = useState([]);

  /* Fetching Table Data */
  useEffect(() => {
    const fetchAll = async () => {
      const rawMaterialTable = await API.rawMaterial.fetchAll().then((res) => {
        setData(res);
        setTable(res);
        res.forEach((item) => {
          itemNames.push({
            value: item.name,
            name: item.id,
          });
        });
      });
      if (!(rawMaterialTable instanceof Error)) {
        setTableLoading(false);
      }
    };
    fetchAll();
  }, [itemNames]);

  /* 
    Function
   */

  const handleSearch = (input) => {
    setSearchText(input);
    setTable(
      data.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const handleClear = () => {
    setTable(data);
    setSearchText("");
    setCounter(0);
  };

  const openFilter = () => {
    setFilterVisible(true);
  };

  const closeFilter = (e) => {
    e.stopPropagation();
    setFilterVisible(false);
  };

  const openCreateModal = () => {
    setCreateModalVisible(true);
  };

  const closeCreateModal = (e) => {
    e.stopPropagation();
    setCreateModalVisible(false);
  };

  const openEdit = () => {
    setCreateModalVisible(true);
  };

  const closeEdit = (e) => {
    e.stopPropagation();
    setCreateModalVisible(false);
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
  };

  const handleFilter = (e) => {
    const states = e;
    let count = 0;

    /* If state is null, convert to empty string so that table can interpret */
    for (const [key, value] of e.entries()) {
      value == null || value === "Invalid date" || value === ""
        ? states.set(key, "")
        : setCounter(count++);
    }
    setCounter(count);

    /* Filters Table Data */
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
        getPriority(item.expiration_date)
          .toLowerCase()
          .includes(states.get("priority"))
    );
    setTable(filtered_table);
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
              <h2 className="main-header-table">Raw Materials</h2>
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
                    placeholder="Search for a raw material..."
                    allowClear
                    size="large"
                    value={searchText}
                    onSearch={handleSearch}
                  />
                </AutoComplete>
                <Button
                  name="Add Raw Material"
                  className="table-add"
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={openCreateModal}
                >
                  Add Raw Material
                  <AddRawMaterial
                    visible={createModalVisible}
                    close={closeCreateModal}
                    style={{ margin: "0 auto" }}
                  />
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
              col.dataIndex !== "form" &&
              col.dataIndex !== "received_date" &&
              col.dataIndex !== "id"
          )}
          dataSource={table}
          rowKey={"id"}
          pagination={{ pageSize: 8, position: ["bottomCenter"] }}
        />
      </Spin>
    </div>
  );
};

export default RawMaterialTable;
