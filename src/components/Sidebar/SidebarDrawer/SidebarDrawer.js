import "antd/dist/antd.css";
import React, { useState } from "react";
import "./SidebarDrawer.css";
import { Menu, Drawer, Button } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const SidebarDrawer = () => {
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
        >
          <div>
              <Menu defaultSelectedKeys={["1"]} mode="inline" theme="light">
                <Menu.Item className="drawer-item" key="1">
                  <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item className="drawer-item" key="2">
                <Link to="/inventory">Inventory</Link>
                </Menu.Item>
                <Menu.Item className="drawer-item" key="3">
                  Products
                </Menu.Item>
                <Menu.Item className="drawer-item" key="4">
                  Reports
                </Menu.Item>
                <Menu.Item className="drawer-item" key="5">
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
