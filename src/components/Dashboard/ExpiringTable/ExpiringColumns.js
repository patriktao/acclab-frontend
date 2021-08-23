import moment from "moment";
import { Button } from "antd";


export const expiring_columns = [
  {
    title: "Item name",
    dataIndex: "name",
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
    title: "Expiration Date",
    dataIndex: "expiration_date",
    key: "expiration_date",
    render: (expiration_date) => (
      <p style={{ marginBottom: "auto" }}>
        {moment(expiration_date).format("MMM D, YYYY")}
      </p>
    ),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    render: (priority) => (
      <div
        style={{
          display: "grid",
          justifyContent: "left",
          alignContent: "center",
        }}
      >
      </div>
    ),
  },
];
