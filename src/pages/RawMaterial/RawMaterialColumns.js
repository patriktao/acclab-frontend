import moment from "moment";

export const general_columns = [
  {
    title: "Material Name",
    dataIndex: "material_name",
    key: "material_name",
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
    title: "Form",
    dataIndex: "form",
    key: "form",
  },
  {
    title: "Stored Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Priority of Usage",
    dataIndex: "priority",
    key: "priority",
  },
];

export const nuitrition_columns = [
  {
    title: "Fat",
    dataIndex: "fat",
    key: "fat",
  },
  {
    title: "Carbohydrate",
    dataIndex: "carbohydrate",
    key: "carbohydrate",
  },
  {
    title: "Protein",
    dataIndex: "protein",
    key: "protein",
  },
  {
    title: "Salt",
    dataIndex: "salt",
    key: "salt",
  },
  {
    title: "Fiber",
    dataIndex: "fiber",
    key: "fiber",
  },
  {
    title: "Sugar",
    dataIndex: "sugar",
    key: "sugar",
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
  },
];

export const stocks_columns = [
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Order Date",
    dataIndex: "order_date",
    key: "order_date",
    render: (date) => () => {
      if (date == null) {
        <p />;
      } else {
        <p style={{ marginBottom: "auto" }}>
          {moment(date).format("MMM D, YYYY")}
        </p>;
      }
    },
  },
  {
    title: "Received Date",
    dataIndex: "received_date",
    key: "received_date",
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
  },
];
