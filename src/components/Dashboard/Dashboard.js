import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./Dashboard.css";
import { Layout, Menu } from "antd";
import { Row, Col } from "antd";
import {
  PieChartFilled,
  SnippetsOutlined,
  BarsOutlined,
  BarChartOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

/* Importing Components */
import NavBar from "../NavBar/NavBar";
import ExpiringTable from "../ExpiringIngredients/ExpiringTable";

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
          <NavBar header={"Dashboard"} />
          <Content className="content">
            <div>
              <Row gutter={[ ]}> Here will be some small components </Row>
              <Row gutter={[150, 100]}>
                <Col span={14} style={{marginTop: "55px"}}>
                  <ExpiringTable />
                </Col>
                <Col span={10} style={{marginTop: "55px"}}>
                  <ExpiringTable />
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
