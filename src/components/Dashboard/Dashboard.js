import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./Dashboard.css";

/* Importing UI-Components */
import {
  PieChartFilled,
  SnippetsOutlined,
  BarsOutlined,
  BarChartOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Row, Col } from "antd";
import NavBar from "../NavBar/NavBar";
import ExpiringTable from "./ExpiringTable/ExpiringTable";
import ShoppingTable from "./ShoppingTable/ShoppingTable";
import DashboardCards from "./DashboardCards/DashboardCards";
import EmptyComponent from "./EmptyComponent/EmptyComponent";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Sider
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
          <div className="sidebar-header">
            <div className="sidebar-header-text">
              Accelerator<span className="blue-text">Lab</span>
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
              icon={<SnippetsOutlined />}
            >
              <Link to="/inventory">
                <span>Inventory</span>
              </Link>
            </Menu.Item>
            <Menu.Item className="sidebar-item" key="3" icon={<BarsOutlined />}>
              <Link to="/products">
                <span>Final Products</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              className="sidebar-item"
              key="4"
              icon={<BarChartOutlined />}
            >
              <Link to="/reports">
                <span>Reports</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              className="sidebar-item"
              key="5"
              icon={<HistoryOutlined />}
            >
              <Link to="/history">
                <span>History</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <NavBar header={" "} />
          <Content className="content">
            <div className="content-header">
              <div>
                <h1> Dashboard </h1>
                <span> Get an overview of the lab here </span>
              </div>
              <div className="introduction-header">
                <span> Welcome to Accelerator<span className="blue-text">LAB</span>,</span> <br />
                <h2>Patrik Tao</h2>
              </div>
            </div>
            <Row gutter={[30, 100]}>
              <Col span={14} style={{ marginTop: "25px" }}>
                <DashboardCards />
              </Col>
              <Col span={10} style={{ marginTop: "25px" }}>
                <EmptyComponent />
              </Col>
            </Row>
            <div>
              <Row gutter={[30, 100]}>
                <Col span={14} style={{ marginTop: "25px" }}>
                  <div className="expiration-table">
                    <span className="sub-header-table">TODAY, JULY 6 2021</span>
                    <br />
                    <h2 className="main-header-table">Expiring Products</h2>
                    <ExpiringTable />
                  </div>
                </Col>
                <Col span={10} style={{ marginTop: "25px" }}>
                  <div className="expiration-table">
                    <span className="sub-header-table">RESTOCK</span>
                    <br />
                    <h2 className="main-header-table">Shopping List</h2>
                    <ShoppingTable />
                  </div>
                </Col>
              </Row>
            </div>
          </Content>
          <Footer className="footer">Accelerator Lab ©2021 Tetra Pak</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
