import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./Dashboard.css";

/* Importing UI-Components */
import { Layout, Space, Row, Col } from "antd";
import NavBar from "./NavBar/NavBar";
import ExpiringTable from "./ExpiringTable/ExpiringTable";
import ShoppingTable from "./ShoppingTable/ShoppingTable";
import DashboardCards from "./DashboardCards/DashboardCards";
import Sidebar from "./Sidebar/Sidebar";

const { Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="app-layout">
        <Sidebar />
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
              <section className="table-wrapper" style={{ marginTop: "25px" }}>
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
    </Router>
  );
};

export default App;
