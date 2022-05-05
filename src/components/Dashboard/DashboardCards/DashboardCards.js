import { Card, Col, Row, Divider } from "antd";
import "./DashboardCards.scss";
import {
  SnippetsOutlined,
  FileExclamationOutlined,
  FileSyncOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { API } from "../../../api";
import lightBlue from "../../../constants/Colors";

const DashboardCards = () => {
  const [ExpiredMaterials, setExpiredMaterials] = useState(0);
  const [TotalMaterials, setTotalMaterials] = useState(0);

  /* Total Materials */
  useEffect(() => {
    const fetchTotalMaterials = async () => {
      setTotalMaterials(0);
      API.statistics
        .fetchTotalMaterials()
        .then((res) => setTotalMaterials(res));
    };

    const fetchTotalExpiredMaterials = async () => {
      setExpiredMaterials(0);
      await API.statistics
        .fetchTotalExpiredMaterials()
        .then((res) => setExpiredMaterials(res));
    };
    fetchTotalMaterials();
    fetchTotalExpiredMaterials();
  }, []);

  return (
    <div className="site-card-wrapper">
      <Row gutter={[24, 24]}>
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
                <span className="card-header" style={lightBlue}>
                  Reports In Progress
                </span>
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
