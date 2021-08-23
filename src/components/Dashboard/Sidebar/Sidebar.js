import { Link, BrowserRouter as Router } from "react-router-dom";
import { Layout, Menu } from "antd";
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
  return (
    <div>
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
            <ExperimentFilled 
            style={{ marginRight: "8px" }} />
            Accelerator<span className="blue-text">LAB</span>
          </div>
        </div>
        <Menu
          className="sidebar-menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["5"]}
        >
          <Menu.Item className="sidebar-item" key="1" icon={<PieChartFilled />}>
            <Link to="/dashboard">
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item className="sidebar-item" key="2" icon={<SnippetsFilled />}>
            <Link to="/inventory">
              <span>Inventory</span>
            </Link>
          </Menu.Item>
          <Menu.Item className="sidebar-item" key="3" icon={<ProfileFilled />}>
            <Link to="/products">
              <span>Products</span>
            </Link>
          </Menu.Item>
          <Menu.Item
            className="sidebar-item"
            key="4"
            icon={<ReconciliationFilled />}
          >
            <Link to="/reports">
              <span>Reports</span>
            </Link>
          </Menu.Item>
          <Menu.Item
            className="sidebar-item"
            key="5"
            icon={<ClockCircleFilled />}
          >
            <Link to="/history">
              <span>History</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
