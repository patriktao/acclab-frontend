import "./RawMaterialTable";
import { axios } from "../../../Axios";
import { useState, useEffect } from "react";
import { raw_material_columns } from "./RawMaterialColumns";
import { Table, Spin } from "antd";

const RawMaterialTable = () => {
  /* Fetching all raw materials */
  const [table, setTable] = useState([]);
  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await axios.get("/raw_material_table");
        setTable(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchTable();
  }, []);

  return (
    <div className="raw-material-table">
      <div className="table-headers">
        <div>
          <span className="sub-header-table">TODAY, JULY 6 2021</span>
          <br />
          <h2 className="main-header-table">Raw Materials (8)</h2>
        </div>
      </div>
      <Table
        className="table-header"
        columns={raw_material_columns}
        dataSource={table}
        loading={Spin}
      />
    </div>
  );
};

export default RawMaterialTable;
