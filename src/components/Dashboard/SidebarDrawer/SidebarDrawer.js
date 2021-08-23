import "antd/dist/antd.css";
import React, { useState } from "react";
import "./SidebarDrawer.css";
import { Menu, Drawer, Button, Divider, Layout } from "antd";
import { Link } from "react-router-dom";
import {
  MenuOutlined,
  PieChartFilled,
  SnippetsOutlined,
  BarsOutlined,
  BarChartOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

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
          <p>Dashboard</p>
          <Divider />
          <p>Inventory</p>
          <Divider />
          <p>Products</p>
          <Divider />
          <p>Reports</p>
          <Divider />
          <p>History</p>
        </Drawer>
      </div>
    </>
  );
};

export default SidebarDrawer;
