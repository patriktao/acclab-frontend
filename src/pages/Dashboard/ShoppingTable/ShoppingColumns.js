import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./ShoppingTable";
import { Link } from "react-router-dom";
import axios from "axios";

const confirm = async () => {
  /* await axios.put(`/inventory/${props.match.params.id}/restock`); */
  message.success("Item removed from list");
};

const shopping_columns = [
  {
    title: "Item name",
    dataIndex: "material_name",
    key: "name",
    render: (text) => <Link to="/inventory">{text}</Link>,
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
    render: () => (
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Popconfirm
          title="Remove from the list?"
          onConfirm={confirm}
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

export default shopping_columns;
