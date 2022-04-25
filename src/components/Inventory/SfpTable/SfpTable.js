import "./SfpTable.scss";
import React, { useState, useEffect } from "react";
import {
  Table,
  Spin,
  Input,
  Button,
  Dropdown,
  Menu,
  Typography,
} from "antd";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import TooltipComponent from "../../General/TooltipComponent";
import { AutoComplete } from "antd";
import SfpFilter from "./SfpFilter";
import moment from "moment";
import { Link } from "react-router-dom";
import { checkDate } from "../../../helper/Checker";
import { getPriority } from "../../General/Priority/Priority";
import { API } from "../../../api";
import CreateSfp from "../CreateSfp";
import { getPriorityIcon } from "../../General/Priority/Priority";
import { useEditSfp } from "../../../context/edit-sfp";
import EditSfp from "../EditSfp";

const { Text } = Typography;
const { Search } = Input;

const SfpTable = () => {
  const [tableLoading, setTableLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [itemNames] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [activeFilters, setActiveFilters] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [itemForm, setItemForm] = useState([]);
  const { openEdit, editVisible, closeEdit } = useEditSfp();

  useEffect(() => {
    API.sfp.fetchTable().then((res) => {
      setTable(res);
      setData(res);
      setRowCount(res.length);
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
    let count = 0;
    data.forEach((item) => {
      if (item.sfp_name.toLowerCase().includes(input.toLowerCase())) {
        count++;
      }
    });
    setRowCount(count);
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

  const createSfp = (form) => {
    const newMaterial = table.concat({
      sfp_id: form.sfp_id,
      sfp_name: form.sfp_name,
      total_amount: 0,
      location: form.location,
      expiration_date: null,
      unit: form.unit,
      image: "",
      country: "Sweden",
      company: "Accelerator Lab",
    });
    setTable(newMaterial);
    setData(newMaterial);
  };

  const createSfpModal = (
    <CreateSfp
      visible={showCreateModal}
      onClose={closeCreateModal}
      sendChangesToParent={createSfp}
    />
  );

  const fetchItemData = (record) => {
    console.log(record)
    setItemData(record);
  };

  const fetchItemFormulation = async (record) => {
    await API.sfp.fetchFormulation(record.sfp_id).then((res) => {
      setItemForm(res);
    });
  };

  const deleteSfp = (e, id) => {
    closeEdit(e);
    let newTable = table.filter((item) => item.sfp_id !== id);
    setTable(newTable);
    setData(newTable);
    API.sfp.disableSfp(id).then((res) => {
      console.log(res);
    });
  };

  const handleSfpEdit = (form) => {
    let itemIndex = table.findIndex((item) => item.sfp_id === form.sfp_id);
    table[itemIndex].sfp_name = form.sfp_name;
    table[itemIndex].location = form.location;
    table[itemIndex].unit = form.unit;
  };

  const menuItems = (record) => {
    return (
      <Menu style={{ borderRadius: "4px" }}>
        <Menu.Item
          key="1"
          onClick={() => openEdit(record.sfp_id)}
          style={{ borderRadius: "4px" }}
        >
          <Text> Edit item </Text>
          <EditSfp
            visible={editVisible[record.sfp_id]}
            data={itemData}
            sendChangesToParent={handleSfpEdit}
            deleteSfp={deleteSfp}
          />
        </Menu.Item>
      </Menu>
    );
  };

  const sfp_columns = [
    {
      title: "sfp_id",
      dataIndex: "sfp_id",
      key: "sfp_id",
    },
    {
      title: "Item name",
      dataIndex: "sfp_name",
      key: "sfp_name",
      render: (sfp_name, record) => (
        <Link to={"/inventory/sfp/" + record.sfp_id}>{sfp_name}</Link>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Brand",
      dataIndex: "company",
      key: "company",
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      sorter: true,
    },
    {
      title: "Amount (g/unit)",
      dataIndex: "total_amount",
      key: "total_amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Expiration Date",
      dataIndex: "expiration_date",
      key: "expiration_date",
      render: (expiration_date) =>
        expiration_date === null ? (
          <p> </p>
        ) : (
          <p style={{ marginBottom: "auto" }}>
            {moment(expiration_date).format("MMM D, YYYY")}
          </p>
        ),
      sorter: (a, b) =>
        moment(a.expiration_date).format("YYYYMMDD") -
        moment(b.expiration_date).format("YYYYMMDD"),
    },
    {
      title: "Priority",
      sorter: (a, b) =>
        moment(a.expiration_date).format("YYYYMMDD") -
        moment(b.expiration_date).format("YYYYMMDD"),
      render: (priority, record) => getPriorityIcon(record.expiration_date),
    },
    {
      title: "Edit",
      dataIndex: "",
      key: "",
      render: (record) => (
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Dropdown
            overlay={() => menuItems(record)}
            placement="bottomCenter"
            trigger="hover"
          >
            <Button
              className="edit-button"
              onClick={() => {
                fetchItemData(record);
                fetchItemFormulation(record);
              }}
            >
              <EllipsisOutlined style={{ fontSize: "22px" }} />{" "}
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ];

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
