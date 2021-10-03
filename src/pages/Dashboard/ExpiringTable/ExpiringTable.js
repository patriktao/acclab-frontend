import React from "react";
import "./ExpiringTable.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowsAltOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ExpiringColumns from "./ExpiringColumns";
import { Table, Button } from "antd";
import TooltipComponent from "../../../components/TooltipComponent";
import axios from "axios";

const ExpiringTable = () => {
  const [tableLoading, setTableLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExpiringMaterials = async () => {
      try {
        const response = await axios.get("/expiring_materials");
        setData(response.data);
        setTableLoading(false);
      } catch (err) {
        if (err.response) {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchExpiringMaterials();
  }, []);

  return (
    <div className="expiring-table">
      <div className="table-headers">
        <div>
          <span className="sub-header-table">TODAY, JULY 6 2021</span>
          <br />
          <h4 className="main-header-table">Expiring Materials</h4>
        </div>
        <div className="expand-button">
          <TooltipComponent
            text="Show inventory"
            component={
              <Button shape="circle" size="large">
                <Link to="/inventory">
                  <ArrowsAltOutlined />
                </Link>
              </Button>
            }
          />
        </div>
      </div>
      <Spin spinning={tableLoading} tip="Loading..." size="medium">
        <Table
          className="table-header"
          columns={ExpiringColumns.filter((col) => col.dataIndex !== "id")}
          dataSource={data}
          pagination={{ pageSize: 8 }}
        />
      </Spin>
    </div>
  );
};

export default ExpiringTable;
