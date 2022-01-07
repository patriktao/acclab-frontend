import "./Dashboard.scss";
import { Layout, Row, Col } from "antd";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import ExpiringTable from "../../components/ExpiringTable";
import ShoppingTable from "../../components/ShoppingTable";
import DashboardCards from "../../components/DashboardCards";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";

const { Content, Footer } = Layout;

const Dashboard = () => {
  const [user, setUser] = useState({});
  const { userSession } = useAuth();

  useEffect(() => {
    setUser(userSession());
  }, [userSession]);

  return (
    <Layout className="sidebar-header-layout">
      <Sidebar />
      <Layout>
        <NavBar />
        <Content className="content-layout">
          <div className="content-wrapper">
            <div title="Paragraph-Wrapper">
              <span className="content-sub-header"> DASHBOARD </span>
              <h1 className="blue-text"> Good Morning, {user.firstname} </h1>
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
          </div>
          <Footer className="footer">Accelerator Lab ©2021 Tetra Pak</Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
