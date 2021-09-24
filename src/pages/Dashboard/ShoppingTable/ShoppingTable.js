import { Table, Popconfirm, message, Button } from "antd";
import { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import "./ShoppingTable.css";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const axios = require("axios");

const ShoppingTable = () => {
  const [tableLoading, setTableLoading] = useState({ tableLoading: true });
  const [shoppingList, setShoppingList] = useState([]);

  /* Fetching all items with Shopping_List set to True */
  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const response = await axios.get("/shopping_list");
        setShoppingList(response.data);
        setTableLoading(false);
      } catch (err) {
        if (err.response) {
          console.log(`Error: ${err.message}`);
        }
        setTableLoading(true);
      }
    };
    fetchShoppingList();
  }, []);

  const handleRemove = async (id) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
    await axios.put(`/inventory/${id}/restock`);
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
        <Link
          to={
            "/inventory/" +
            record.id +
            "/" +
            name.replace(/\s/g, "").toLowerCase()
          }
        >
          {name}
        </Link>
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
        />
      </Spin>
    </div>
  );
};

export default ShoppingTable;
