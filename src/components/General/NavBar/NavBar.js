import "./NavBar.scss";
import SidebarDrawer from "../SidebarDrawer/SidebarDrawer";
import PropTypes from "prop-types";
import moment from "moment";
import { Layout, Avatar, Menu, Dropdown, Typography, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/auth-context";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";

const { Header } = Layout;
const { Text } = Typography;

const NavBar = () => {
  const { logout, userSession } = useAuth();
  const history = useHistory();
  const today_date = moment().format("MMMM D, YYYY");
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({
      firstname: sessionStorage.getItem("firstname"),
      lastname: sessionStorage.getItem("lastname"),
    });
  }, [userSession]);

  const handleLogout = async () => {
    message.success("You successfully logged out");
    await logout();
    sessionStorage.clear();
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
                  <span className="account-name">
                    {user.firstname} {user.lastname}
                  </span>
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
