import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./ShoppingTable";

export const shopping_columns = [
  {
    title: "Item name",
    dataIndex: "material_name",
    key: "name",
    render: (text) => <a>{text}</a>,
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
        <Tooltip title="Remove from list">
          <Button type="primary" className="shopping-button" danger>
            <DeleteOutlined style={{ fontSize: "18px" }} />
          </Button>
        </Tooltip>
      </div>
    ),
  },
];
