import { Card, Col, Row } from "antd";
import "./DashboardCards.css";
import { FileOutlined, FileExclamationOutlined, FileSyncOutlined, FileDoneOutlined} from "@ant-design/icons";

const DashboardCards = () => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={(50, 16)}>
        <Col span={6}>
          <Card className="card" bordered={false}>
            <div className="icon-material-background">
              <FileOutlined className="icon-material" />
            </div>
            <span className="card-value">46</span>
            <br />
            <span className="card-header">Total Materials</span>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="card" bordered={false}>
            <div className="icon-expired-background">
              <FileExclamationOutlined className="icon-expired" />
            </div>
            <span className="card-value">2</span>
            <br />
            <span className="card-header">Expired Materials</span>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="card" bordered={false}>
            <div className="icon-progress-background">
              <FileSyncOutlined className="icon-progress" />
            </div>
            <span className="card-value">5</span>
            <br />
            <span className="card-header">Reports In Progress</span>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="card" bordered={false}>
            <div className="icon-finished-background">
              <FileDoneOutlined className="icon-finished" />
            </div>
            <span className="card-value">3</span>
            <br />
            <span className="card-header">Finished Reports</span>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCards;
