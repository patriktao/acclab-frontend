import "./NavBar.css";
import SidebarDrawer from "../SidebarDrawer/SidebarDrawer.js";
import PropTypes from "prop-types";
import { Layout, Avatar, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const menu = (
  <Menu style={{borderRadius:"12px"}}>
    <Menu.Item  style={{borderRadius:"10px"}}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://localhost:3000/"
      >
        Logout
      </a>
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
        <div class="divider-component">
          <div class="v-divider"/>
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
