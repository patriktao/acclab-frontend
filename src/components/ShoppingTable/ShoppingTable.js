import { Table, Popconfirm, message, Button } from "antd";
import { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import "./ShoppingTable.scss";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { API } from "../../api";

const ShoppingTable = () => {
  const [tableLoading, setTableLoading] = useState({ tableLoading: true });
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const fetchShoppingList = async () => {
      const shoppingData = await API.dashboard
        .fetchShoppingList()
        .then((res) => setShoppingList(res));
      if (!(shoppingData instanceof Error)) {
        setTableLoading(false);
      }
    };
    fetchShoppingList();
  }, []);

  const handleRemove = async (id) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
    API.rawMaterial.handleRestock(id);
    message.success("Item removed from list");
  };

  const ShoppingColumns = [
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
    },
    {
      title: "Brand",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Action",
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
          <Popconfirm
            title="Remove from the list?"
            onConfirm={() => handleRemove(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" className="shopping-button" danger>
              <DeleteOutlined style={{ fontSize: "18px" }} />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="shopping-table">
      <span className="sub-header-table">RESTOCK</span>
      <br />
      <h4 className="main-header-table">Shopping List</h4>
      <Spin spinning={tableLoading} tip="Loading..." size="medium">
        <Table
          className="table-content"
          columns={ShoppingColumns.filter((col) => col.dataIndex !== "id")}
          dataSource={shoppingList}
          pagination={{ pageSize: 8 }}
          rowKey={"id"}
        />
      </Spin>
    </div>
  );
};

export default ShoppingTable;
