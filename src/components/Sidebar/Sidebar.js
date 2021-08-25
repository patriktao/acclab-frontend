import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
  PieChartFilled,
  SnippetsFilled,
  ProfileFilled,
  ReconciliationFilled,
  ClockCircleFilled,
  ExperimentFilled,
} from "@ant-design/icons";
import "./Sidebar.css";

const { Sider } = Layout;

const Sidebar = () => {
  const [SelectedKey, setSelectedKey] = useState([]);

  function handleClick(e) {
    setSelectedKey(e.key);
  }

  return (
    <>
      <Sider
        className="sidebar"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
      >
        <div className="sidebar-wrapper">
          <div className="sidebar-header">
            <ExperimentFilled style={{ marginRight: "8px" }} />
            Accelerator<span className="blue-text">LAB</span>
          </div>
        </div>
        <Menu
          className="sidebar-menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            className="sidebar-item"
            key="1"
            onClick={(e) => handleClick(e)}
            icon={<PieChartFilled />}
          >
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            className="sidebar-item"
            key="2"
            onClick={(e) => handleClick(e)}
            icon={<SnippetsFilled />}
          >
            <Link to="/inventory">Inventory</Link>
          </Menu.Item>
          <Menu.Item
            className="sidebar-item"
            key="3"
            onClick={(e) => handleClick(e)}
            icon={<ProfileFilled />}
          >
            Products
          </Menu.Item>
          <Menu.Item
            className="sidebar-item"
            key="4"
            onClick={(e) => handleClick(e)}
            icon={<ReconciliationFilled />}
          >
            Reports
          </Menu.Item>
          <Menu.Item
            className="sidebar-item"
            key="5"
            onClick={(e) => handleClick(e)}
            icon={<ClockCircleFilled />}
          >
            History
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Sidebar;
