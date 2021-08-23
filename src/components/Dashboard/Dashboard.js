import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./Dashboard.css";

/* Importing UI-Components */
import {
  PieChartFilled,
  SnippetsFilled,
  ProfileFilled,
  ReconciliationFilled,
  ClockCircleFilled,
  ExperimentFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Row, Col } from "antd";
import NavBar from "../NavBar/NavBar";
import ExpiringTable from "./ExpiringTable/ExpiringTable";
import ShoppingTable from "./ShoppingTable/ShoppingTable";
import DashboardCards from "./DashboardCards/DashboardCards";

const { Content, Footer, Sider } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="app-layout">
        <Sider
          title="Sidebar"
          className="sidebar"
          width="270"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          trigger={null}
        >
          <div className="sidebar-wrapper">
            <div className="sidebar-header">
              <ExperimentFilled style={{marginRight:"8px"}}/>
                Accelerator<span className="blue-text">LAB</span>
            </div>
          </div>
          <Menu
            className="sidebar-menu"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["5"]}
          >
            <Menu.Item
              className="sidebar-item"
              key="1"
              icon={<PieChartFilled />}
            >
              <Link to="/dashboard">
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              className="sidebar-item"
              key="2"
              icon={<SnippetsFilled />}
            >
              <Link to="/inventory">
                <span>Inventory</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              className="sidebar-item"
              key="3"
              icon={<ProfileFilled />}
            >
              <Link to="/products">
                <span>Products</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              className="sidebar-item"
              key="4"
              icon={<ReconciliationFilled />}
            >
              <Link to="/reports">
                <span>Reports</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              className="sidebar-item"
              key="5"
              icon={<ClockCircleFilled />}
            >
              <Link to="/history">
                <span>History</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout">
          <NavBar />
          <Content className="content-layout">
            <div className="content-wrapper">
              <div title="Paragraph-Wrapper">
                <span className="content-sub-header"> DASHBOARD </span>
                <h1 className="blue-text"> Good Morning, Patrik </h1>
                <span className="content-sub-header">
                  Here's what's happening with your inventory today
                </span>
              </div>
              <section title="Card-Wrapper">
                <Row gutter={16}>
                  <Col span={24} style={{ marginTop: "25px" }}>
                    <DashboardCards />
                  </Col>
                </Row>
              </section>
              <section title="Table-Wrapper">
                <Row gutter={[30, 100]}>
                  <Col span={14} style={{ marginTop: "25px" }}>
                    <div className="table">
                      <span className="sub-header-table">
                        TODAY, JULY 6 2021
                      </span>
                      <br />
                      <h2 className="main-header-table">Expiring Materials</h2>
                      <ExpiringTable />
                    </div>
                  </Col>
                  <Col span={10} style={{ marginTop: "25px" }}>
                    <div className="table">
                      <span className="sub-header-table">RESTOCK</span>
                      <br />
                      <h2 className="main-header-table">Shopping List</h2>
                      <ShoppingTable />
                    </div>
                  </Col>
                </Row>
              </section>
            </div>
            <Footer className="footer">Accelerator Lab ©2021 Tetra Pak</Footer>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
