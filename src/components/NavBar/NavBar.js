import "./NavBar.css";
import SidebarDrawer from "../Sidebar/SidebarDrawer/SidebarDrawer.js";
import PropTypes from "prop-types";
import { Layout, Avatar, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, BrowserRouter as Router } from "react-router-dom";

const { Header } = Layout;

const menu = (
    <Menu style={{ borderRadius: "12px" }}>
      <Menu.Item style={{ borderRadius: "10px" }}>
        <Link to="/">Logout</Link>
      </Menu.Item>
    </Menu>
);

const NavBar = () => {
  return (
    <Header className="navbar">
      <div className="drawer-layout">
        <SidebarDrawer />
      </div>
      <div className="account-component">
        <div className="divider-component">
          <div className="v-divider" />
        </div>
        <Dropdown className="account-layout" overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar className="avatar" size="medium" icon={<UserOutlined />} />
            <span className="account-name">Patrik Tao</span>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

NavBar.propTypes = {
  header: PropTypes.string,
};

export default NavBar;
