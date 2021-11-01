import "antd/dist/antd.css";
import React, { useState } from "react";
import "./SidebarDrawer.css";
import { Menu, Drawer, Button } from "antd";
import { useLocation, Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const SidebarDrawer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation().pathname;

  const showDrawer = () => {
    setIsVisible(true);
  };

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
              selectedKeys={location.split("/")[1]}
              mode="inline"
              theme="light"
            >
              <Menu.Item className="drawer-item" key="dashboard">
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item className="drawer-item" key="inventory">
                <Link to="/inventory">Inventory</Link>
              </Menu.Item>
              <Menu.Item className="drawer-item" key="products">
                Products
              </Menu.Item>
              <Menu.Item className="drawer-item" key="reports">
                Reports
              </Menu.Item>
              <Menu.Item className="drawer-item" key="history">
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
