import { Link, useLocation } from "react-router-dom";
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
  /* Which menu item that is selected is decided by which location/route you are in */
  const location = useLocation();
  return (
    <>
      <Sider
        className="sidebar"
        breakpoint="lg"
        collapsedWidth="0"
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
          selectedKeys={location.pathname}
        >
          <Menu.Item
            className="sidebar-item"
            key="/dashboard"
            icon={<PieChartFilled />}
          >
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            className="sidebar-item"
            key="/inventory"
            icon={<SnippetsFilled />}
          >
            <Link to="/inventory">Inventory</Link>
          </Menu.Item>
          <Menu.Item
            className="sidebar-item"
            key="/products"
            icon={<ProfileFilled />}
          >
            Products
          </Menu.Item>
          <Menu.Item
            className="sidebar-item"
            key="/reports"
            icon={<ReconciliationFilled />}
          >
            Reports
          </Menu.Item>
          <Menu.Item
            className="sidebar-item"
            key="/history"
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
