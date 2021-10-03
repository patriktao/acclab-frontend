import { Card, Col, Row, Divider } from "antd";
import "./DashboardCards.css";
import {
  SnippetsOutlined,
  FileExclamationOutlined,
  FileSyncOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
const axios = require("axios");

const DashboardCards = () => {
  const [ExpiredMaterials, setExpiredMaterials] = useState([]);
  const [TotalMaterials, setTotalMaterials] = useState([]);

  /* Total Materials */
  useEffect(() => {
    const fetchTotalMaterials = async () => {
      try {
        setTotalMaterials([0]);
        const response = await axios.get("/total_materials");
        setTotalMaterials(response.data.map((data) => data.total));
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    const fetchTotalExpiredMaterials = async () => {
      try {
        setExpiredMaterials([0]);
        const response = await axios.get("/total_expired_materials");
        setExpiredMaterials(response.data.map((data) => data.total));
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchTotalMaterials();
    fetchTotalExpiredMaterials();
  }, []);

  return (
    <div className="site-card-wrapper">
      <Row gutter={(50, 24)}>
        <Col span={6}>
          <Card className="card" bordered={false}>
            <div className="card-container">
              <div>
                <span className="card-header">Total Materials</span>
                <br />
                <span className="card-value">{TotalMaterials}</span>
              </div>
              <div>
                <div className="icon-material-background">
                  <SnippetsOutlined className="icon-material" />
                </div>
              </div>
            </div>
            <Divider className="divider" />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="card" bordered={false}>
            <div className="card-container">
              <div>
                <span className="card-header">Expired Materials</span>
                <br />
                <span className="card-value">{ExpiredMaterials}</span>
              </div>
              <div>
                <div className="icon-expired-background">
                  <FileExclamationOutlined className="icon-expired" />
                </div>
              </div>
            </div>
            <Divider className="divider" />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="card" bordered={false}>
            <div className="card-container">
              <div>
                <span className="card-header">Reports In Progress</span>
                <br />
                <span className="card-value"> 0 </span>
              </div>
              <div>
                <div className="icon-progress-background">
                  <FileSyncOutlined className="icon-progress" />
                </div>
              </div>
            </div>
            <Divider className="divider" />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="card" bordered={false}>
            <div className="card-container">
              <div>
                <span className="card-header">Finished Reports</span>
                <br />
                <span className="card-value">0 </span>
              </div>
              <div>
                <div className="icon-finished-background">
                  <FileDoneOutlined className="icon-finished" />
                </div>
              </div>
            </div>
            <Divider className="divider" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCards;
