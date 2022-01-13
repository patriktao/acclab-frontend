import Sidebar from "../components/General/Sidebar";
import NavBar from "../components/General/NavBar";
import { Layout } from "antd";

const { Content, Footer } = Layout;

const Template = ({ content }) => {
  return (
    <Layout className="sidebar-header-layout">
      <Sidebar />
      <Layout>
        <NavBar />
        <Content className="content-layout">
          <div className="content-wrapper">{content}</div>
          <Footer className="footer">Accelerator Lab ©2021 Tetra Pak</Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Template;
