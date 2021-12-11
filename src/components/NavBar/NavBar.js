import "./NavBar.scss";
import SidebarDrawer from "../SidebarDrawer/SidebarDrawer";
import PropTypes from "prop-types";
import { Layout, Avatar, Menu, Dropdown, Typography, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import { useAuth } from "../../auth-context";
import { useHistory } from "react-router";

const { Header } = Layout;
const { Text } = Typography;

const NavBar = () => {
  const { logout } = useAuth();
  const history = useHistory();
  const today_date = moment().format("MMMM D, YYYY");

  const handleLogout = () => {
    message.success("You successfully logged out");
    logout();
    sessionStorage.removeItem("userData");
    return history.push("/");
  };

  const menu = (
    <Menu style={{ borderRadius: "4px" }}>
      <Menu.Item style={{ borderRadius: "4px" }}>
        <Text onClick={handleLogout}>Logout</Text>
      </Menu.Item>
    </Menu>
  );

  return (
    <section className="navbar-layout">
      <Header className="navbar">
        <div className="drawer-layout">
          <SidebarDrawer />
        </div>
        <section className="right-side">
          <div style={{ fontSize: "14px" }}>{today_date}</div>
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
        </section>
      </Header>
    </section>
  );
};

NavBar.propTypes = {
  header: PropTypes.string,
};

export default NavBar;
