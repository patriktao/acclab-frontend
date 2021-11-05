import "./NavBar.css";
import SidebarDrawer from "../SidebarDrawer/SidebarDrawer";
import PropTypes from "prop-types";
import { Layout, Avatar, Menu, Dropdown, Typography} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header } = Layout;

const { Text } = Typography;

const menu = (
  <Menu style={{ borderRadius: "4px" }}>
    <Menu.Item style={{ borderRadius: "4px" }}>
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
        <div>
          <Dropdown className="dropdown-layout" overlay={menu}>
            <Text onClick={(e) => e.preventDefault()}>
              <Avatar
                className="avatar"
                size="medium"
                icon={<UserOutlined />}
              />
              <span className="account-name">Patrik Tao</span>
            </Text>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

NavBar.propTypes = {
  header: PropTypes.string,
};

export default NavBar;
