import moment from "moment";
import { Button, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "./RawMaterialTable.css"

export const raw_material_columns = [
  {
    title: "Item name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  {
    title: "Brand",
    dataIndex: "company",
    key: "company",
    sorter: (a, b) => a.company.localeCompare(b.company)
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    sorter: true
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
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
    sorter: (a, b) => a.location.localeCompare(b.location)
  },
  {
    title: "Expiration Date",
    dataIndex: "expiration_date",
    key: "expiration_date",
    render: (expiration_date) => (
      <p style={{ marginBottom: "auto" }}>
        {moment(expiration_date).format("MMM D, YYYY")}
      </p>
    ),
    sorter: (a, b) => a.expiration_date - b.expiration_date,
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    sorter: (a, b) => a.priority.localeCompare(b.priority)
  },
  {
    title: "Edit",
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
       <Tooltip title="Edit Item">
          <Button className="edit-button">
            <EllipsisOutlined style={{ fontSize: "22px" }} />{" "}
          </Button>
        </Tooltip>
      </div>
    ),
  },
];
