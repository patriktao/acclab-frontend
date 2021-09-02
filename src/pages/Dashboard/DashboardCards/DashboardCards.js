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
  /* Total Materials */
  const [TotalMaterials, setTotalMaterials] = useState([]);
  useEffect(() => {
    const fetchTotalMaterials = async () => {
      try {
        setTotalMaterials([0])
        const response = await axios.get("/total_materials");
        setTotalMaterials(response.data.map((data) => data.total));
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchTotalMaterials();
  }, []);

  /* Total Expired Materials*/
  const [ExpiredMaterials, setExpiredMaterials] = useState([]);
  useEffect(() => {
    const fetchExpiredMaterials = async () => {
      try {
        setExpiredMaterials([0])
        const response = await axios.get("/total_expired_materials");
        setExpiredMaterials(response.data.map((data) => data.total));
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchExpiredMaterials();
  }, []);

  /* TBD: Total Ongoing Reports*/
  const [OngoingReports, setOngoingReports] = useState([]);
  useEffect(() => {
    const fetchOngoingReports = async () => {
      try {
        const response = await axios.get("/ongoing_reports");
        setOngoingReports(response.data.map((data) => data.total));
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchOngoingReports();
  }, []);

    /* TBD: Finished Reports */
    const [FinishedReports, setFinishedReports] = useState([]);
    useEffect(() => {
      const fetchFinishedReports = async () => {
        try {
          const response = await axios.get("/fnished_reports");
          setOngoingReports(response.data.map((data) => data.total));
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      };
      fetchFinishedReports();
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
