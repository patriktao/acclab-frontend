import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import TopicMenu from "../TopicMenu";
import "./Dashboard.less";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const topics = ["Dashboard", "Inventory", "Final Products"];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };
  /* 
  const Menu = (
    <TopicMenu
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  ); */

  return (
    <Router>
      <Layout>
        <Sider
          className="sideBar"
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
            <div className="sidebar-header-text">Accelerator{<br />}Lab</div>
          </div>
          <Menu
            className="menu"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["5"]}
          >
            <Menu.Item style={{ height: 55 }} key="1" icon={<UserOutlined />}>
              <Link to="/dashboard">
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              style={{ height: 55 }}
              key="2"
              icon={<VideoCameraOutlined />}
            >
              <Link to="/inventory">
                <span>Inventory</span>
              </Link>
            </Menu.Item>
            <Menu.Item style={{ height: 55 }} key="3" icon={<UploadOutlined />}>
              <Link to="/products">
                <span>Final Products</span>
              </Link>
            </Menu.Item>
            <Menu.Item style={{ height: 55 }} key="4" icon={<UserOutlined />}>
              <Link to="/reports">
                <span>Reports</span>
              </Link>
            </Menu.Item>
            <Menu.Item style={{ height: 55 }} key="5" icon={<UserOutlined />}>
              <Link to="/history">
                <span>History</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <NavBar menu={Menu} />
          <Content style={{ margin: "24px 16px 0" }}>
            <div className="layout-background">
              This is the content of the page
            </div>
          </Content>
          <Footer className="footer">
            Accelerator Lab ©2021 Tetra Pak
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
