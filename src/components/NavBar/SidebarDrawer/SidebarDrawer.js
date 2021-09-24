import "antd/dist/antd.css";
import React, { useState } from "react";
import "./SidebarDrawer.css";
import { Menu, Drawer, Button } from "antd";
import { useLocation, Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const SidebarDrawer = () => {
  /* Which menu item that is selected is decided by which location/route you are in */
  const location = useLocation();

  // The drawer is invisible by default
  const [isVisible, setIsVisible] = useState(false);

  // trigger this function to open the drawer
  const showDrawer = () => {
    setIsVisible(true);
  };

  // close the drawer
  const closeDrawer = () => {
    setIsVisible(false);
  };

  return (
    <>
      <nav className="menu-button">
        <Button
          className="button"
          onClose={() => setIsVisible(false)}
          onClick={showDrawer}
          icon={<MenuOutlined />}
        />
      </nav>
      <div className="drawer">
        <Drawer
          visible={isVisible}
          onClose={closeDrawer}
          placement="left"
          title="Accelerator Lab"
          width={270}
        >
          <div>
            <Menu
              /* selectedKeys={[location.pathname]} */
              defaultSelectedKeys={location.pathname}
              mode="inline"
              theme="light"
            >
              <Menu.Item className="drawer-item" key="/dashboard">
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item className="drawer-item" key="/inventory">
                <Link to="/inventory">Inventory</Link>
              </Menu.Item>
              <Menu.Item className="drawer-item" key="/products">
                Products
              </Menu.Item>
              <Menu.Item className="drawer-item" key="/reports">
                Reports
              </Menu.Item>
              <Menu.Item className="drawer-item" key="/history">
                History
              </Menu.Item>
            </Menu>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default SidebarDrawer;
