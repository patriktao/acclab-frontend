import { Layout } from "antd";
import NavBar from "../../components/General/NavBar";
import Sidebar from "../../components/General/Sidebar";
import RawMaterialTable from "../../components/Inventory/RawMaterialTable";
import SfpTable from "../../components/Inventory/SfpTable";

const { Content, Footer } = Layout;

const Inventory = () => {
  return (
    <Layout className="sidebar-header-layout">
      <Sidebar />
      <Layout>
        <NavBar />
        <Content className="content-layout">
          <div className="content-wrapper">
            <div>
              <h1 className="blue-text"> Inventory </h1>
              <span className="sub-header">
                Create, edit and retrieve raw materials and semi-finished
                products from the inventory
              </span>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <RawMaterialTable />
            </div>
            <div style={{ marginTop: "3rem" }}>
              <SfpTable />
            </div>
          </div>
          <Footer className="footer">Accelerator Lab ©2021 Tetra Pak</Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Inventory;
