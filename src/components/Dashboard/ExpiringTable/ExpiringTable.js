import React from "react";
import "./ExpiringTable.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowsAltOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ExpiringColumns from "./ExpiringColumns";
import { Table, Button } from "antd";
import TooltipComponent from "../../General/TooltipComponent";
import { API } from "../../../api";
import moment from "moment";

const ExpiringTable = () => {
  const [tableLoading, setTableLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExpiringMaterials = async () => {
      const expiringMaterials = await API.dashboard
        .fetchExpiringMaterials()
        .then((res) => {
          setData(res);
        })
      if (!(expiringMaterials instanceof Error)) {
        setTableLoading(false);
      }
    };
    fetchExpiringMaterials();
  }, []);

  const today_date = moment().format("MMMM D YYYY").toUpperCase()

  return (
    <div className="ExpiringTable">
      <div className="table-headers">
        <div>
          <span className="sub-header-table">TODAY, {today_date}</span>
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
          pagination={{ pageSize: 7 }}
          rowKey={'name'}
          size="small"
        />
      </Spin>
    </div>
  );
};

export default ExpiringTable;
