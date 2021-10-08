import moment from "moment";
import { Link } from "react-router-dom";
import { getPriorityIcon } from "../../../components/Priority/Priority";

const ExpiringColumns = [
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
    render: (priority, record) => getPriorityIcon(record.expiration_date),
  },
];

export default ExpiringColumns;
