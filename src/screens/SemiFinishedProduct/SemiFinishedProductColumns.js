import moment from "moment";
import InputNumber from "../../components/General/InputNumber";
import { getPriorityIcon } from "../../components/General/Priority";

export const general_columns = [
  {
    title: "sfp_id",
    dataIndex: "sfp_id",
    key: "sfp_id",
  },
  {
    title: "Name",
    dataIndex: "sfp_name",
    key: "sfp_name",
  },
  {
    title: "Total Amount",
    dataIndex: "total_amount",
    key: "total_amount",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "Stored Location",
    dataIndex: "location",
    key: "location",
  },
];

export const stocks_columns = [
  {
    title: "Stock ID",
    dataIndex: "stock_id",
    key: "stock_id",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Production Date",
    dataIndex: "production_date",
    key: "production_date",
    render: (date) => (
      <p style={{ marginBottom: "auto" }}>
        {moment(date).format("MMM D, YYYY")}
      </p>
    ),
  },
  {
    title: "Expiration Date",
    dataIndex: "expiration_date",
    key: "expiration_date",
    render: (date) => (
      <p style={{ marginBottom: "auto" }}>
        {moment(date).format("MMM D, YYYY")}
      </p>
    ),
  },
  {
    title: "Priority of Usage",
    dataIndex: "priority",
    key: "priority",
    render: (priority, record) => getPriorityIcon(record.expiration_date),
  },
];

export const formulation_columns = [
  {
    title: "raw_material_id",
    dataIndex: "raw_material_id",
    key: "raw_material_id",
  },
  {
    title: "Material Name",
    dataIndex: "material_name",
    key: "material_name",
    render: (material_name) => (
      <span style={{ fontWeight: "500" }}>{material_name}</span>
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
    title: "Percentage (%)",
    dataIndex: "percentage",
    key: "percentage",
  },
];
