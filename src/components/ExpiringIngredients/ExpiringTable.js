import { Table } from "antd";
import { expiring_data } from "./ExpiringData";
import { expiring_columns } from "./ExpiringColumns";
import "./ExpiringTable";

const ExpiringTable = () => {
  return (
    <Table
      bordered
      className="table-header"
      title={() => "Expiring Ingredients"}
      columns={expiring_columns}
      dataSource={expiring_data}
    />
  );
};

export default ExpiringTable;
