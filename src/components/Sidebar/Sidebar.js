import React from "react";
import { Link } from "react-router-dom";
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

class Sidebar extends React.Component {
  state = {
    current: '1',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };


  render() {
    const { current } = this.state;

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
            onClick={this.handleClick}
            theme="dark"
            mode="inline"
            selectedKeys={[current]}
          >
            <Menu.Item
              className="sidebar-item"
              key="1"
              icon={<PieChartFilled />}
            >
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item
              className="sidebar-item"
              key="2"
              icon={<SnippetsFilled />}
            >
              <Link to="/inventory">Inventory</Link>
            </Menu.Item>
            <Menu.Item
              className="sidebar-item"
              key="3"
              icon={<ProfileFilled />}
            >
              <Link to="/dashboard">Products</Link>
            </Menu.Item>
            <Menu.Item
              className="sidebar-item"
              key="4"
              icon={<ReconciliationFilled />}
            >
              <Link to="/dashboard">Reports</Link>
            </Menu.Item>
            <Menu.Item
              className="sidebar-item"
              key="5"
              icon={<ClockCircleFilled />}
            >
              <Link to="/dashboard">History</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </>
    );
  }
}

export default Sidebar;
