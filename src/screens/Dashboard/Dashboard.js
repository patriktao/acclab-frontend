import "./Dashboard.scss";
import { Row, Col } from "antd";
import ExpiringTable from "../../components/Dashboard/ExpiringTable";
import ShoppingTable from "../../components/Dashboard/ShoppingTable";
import DashboardCards from "../../components/Dashboard/DashboardCards";
import Template from "../Template";

const Dashboard = () => {
  return (
    <Template
      content={
        <section name="Dashboard">
          <div title="Paragraph-Wrapper">
            <span className="content-sub-header"> DASHBOARD </span>
            <h1 className="blue-text"> Welcome to Accelerator Lab</h1>
            <span className="content-sub-header">
              Here's what's happening with your inventory today
            </span>
          </div>
          <section title="Card-Wrapper">
            <Row gutter={16}>
              <Col span={24} style={{ marginTop: "1.5rem" }}>
                <DashboardCards />
              </Col>
            </Row>
          </section>
          <section className="table-wrapper" style={{ marginTop: "1.5rem" }}>
            <div>
              <ExpiringTable />
            </div>
            <div>
              <ShoppingTable />
            </div>
          </section>
        </section>
      }
    />
  );
};

export default Dashboard;
