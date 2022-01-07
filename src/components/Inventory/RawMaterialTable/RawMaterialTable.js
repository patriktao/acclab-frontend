import "./RawMaterialTable.scss";
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
  Typography,
  Dropdown,
  Menu,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FilterComponent from "./FilterComponent";
import moment from "moment";
import TooltipComponent from "../../General/TooltipComponent";
import { getPriority } from "../../General/Priority/Priority";
import { API } from "../../../api";
import { checkDate } from "../../../helper/Checker";
import { getPriorityIcon } from "../../General/Priority/Priority";
import EditRawMaterial from "../EditRawMaterial";
import { useEditRawMaterial } from "../../../context/edit-raw-material";
import { EllipsisOutlined } from "@ant-design/icons";
import CreateRawMaterial from "../CreateRawMaterial";

const { Text } = Typography;

const RawMaterialTable = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tableLoading, setTableLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [itemNames] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      const rawMaterialTable = await API.rawMaterial.fetchAll().then((res) => {
        setData(res);
        setTable(res);
        setRowCount(res.length);
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
    setActiveFilters(0);
    setRowCount(data.length);
  };

  const openFilter = () => {
    setFilterVisible(true);
  };

  const closeFilter = (e) => {
    e.stopPropagation();
    setFilterVisible(false);
  };

  const openCreateModal = () => {
    console.log("open");
    setCreateModalVisible(true);
  };

  const closeCreateModal = (e) => {
    e.stopPropagation();
    setCreateModalVisible(false);
  };

  const handleFilter = (e) => {
    const states = e;
    console.log(e);

    // Tables can only interpret empty strings and not null values, we therefore have to convert it.
    let count = 0;
    for (const [key, value] of e.entries()) {
      value == null || value === "Invalid date" || value === ""
        ? states.set(key, "")
        : setActiveFilters(count++);
    }
    setActiveFilters(count);

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
    setRowCount(filtered_table.length);
    setTable(filtered_table);
  };

  /* Raw Material Column Logics */
  const { openEdit, editVisible } = useEditRawMaterial();
  const [itemData, setItemData] = useState(null);

  const fetchItemData = async (record) => {
    if (record !== null) {
      await API.rawMaterial.fetchMaterial(record.id).then((res) => {
        setItemData(res[0]);
      });
    }
  };

  const handleRawMaterialEdit = (form) => {
    let itemIndex = table.findIndex(
      (item) => item.id === form.data.raw_material_id
    );
    table[itemIndex].name = form.name;
    table[itemIndex].country = form.country;
    table[itemIndex].company = form.brand;
    table[itemIndex].location = form.location;
    table[itemIndex].form = form.form;
  };

  const menuItems = (
    <Menu style={{ borderRadius: "4px" }}>
      <Menu.Item key="1" onClick={openEdit} style={{ borderRadius: "4px" }}>
        <Text> Edit item </Text>
        <EditRawMaterial
          visible={editVisible}
          data={itemData}
          sendChangesToParent={handleRawMaterialEdit}
        />
      </Menu.Item>
    </Menu>
  );
  const RawMaterialTableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Item name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <Link to={"/inventory/rawmaterial/" + record.id}>{name}</Link>
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
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: "Form",
      dataIndex: "form",
      key: "form",
      sorter: (a, b) => a.form.localeCompare(b.form),
    },
    {
      title: "Amount (g/unit)",
      dataIndex: "total_amount",
      key: "total_amount",
      sorter: (a, b) => a.total_amount - b.total_amount,
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
            overlay={menuItems}
            placement="bottomCenter"
            trigger={"hover"}
          >
            <Button
              className="edit-button"
              onClick={() => {
                fetchItemData(record);
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
    <div className="raw-material-table">
      <div className="table-headers">
        <div className="table-header-position">
          <div className="table-text">
            <div>
              <h2 className="main-header-table">Raw Materials ({rowCount})</h2>
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
                Filter ({activeFilters})
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
                  <CreateRawMaterial
                    visible={createModalVisible}
                    close={closeCreateModal}
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
          columns={RawMaterialTableColumns.filter(
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
