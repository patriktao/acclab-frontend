import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { Button } from "antd";
import About from "./About.js";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Inventory
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Products
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              Reports
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="Content">
          <Header
            className="site-layout-sub-header-background"
            style={{ paddingLeft: 24 }}
          > Header </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            Content
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Accelerator Lab @2021
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
