import { Layout } from "antd";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import RawMaterialTable from "../../components/RawMaterialTable";
/* import SemiFinishedProductTable from "./SemiFinishedProductTable"
 */

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
{/*               <SemiFinishedProductTable /> */}
            </div>
          </div>
          <Footer className="footer">Accelerator Lab ©2021 Tetra Pak</Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Inventory;