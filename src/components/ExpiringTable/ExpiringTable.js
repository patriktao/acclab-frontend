import { Table } from "antd";
import { expiring_columns } from "./ExpiringColumns";
import { expiring_data } from "./ExpiringData";
import "./ExpiringTable.css";
const axios = require("axios");


const ExpiringTable = () => {

  //Get all expiring ingredients from API-endpoint
  async function ExpiringIngredients(){
    await axios.get('https://localhost:4000/expiring_ingredients')
    .then(res => {
      console.log(res.data)
    });
  };

  ExpiringIngredients();

  return (
    <Table
      className="table-header"
      columns={expiring_columns}
      dataSource={expiring_data}
    />
  );
};

export default ExpiringTable;
