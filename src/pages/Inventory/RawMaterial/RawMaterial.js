import { useState, useEffect } from "react";
import { Layout, Tabs, Table, Spin, Button, Checkbox, message } from "antd";
import NavBar from "../../../components/NavBar";
import Sidebar from "../../../components/Sidebar";
import "./RawMaterial.css";
import {
  general_columns,
  nuitrition_columns,
  stocks_columns,
} from "./RawMaterialColumns";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const { Content, Footer } = Layout;
const { TabPane } = Tabs;

const RawMaterial = (props) => {
  const [materialData, setMaterialData] = useState([]);
  const [materialName, setMaterialName] = useState([]);
  const [reStock, setReStock] = useState();
  const [logistics, setLogistics] = useState([]);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await axios.get(`/inventory/${props.match.params.id}`);
        setMaterialData(response.data);
        setMaterialName(response.data.map((data) => data.material_name));
        console.log(response.data.map((data) => data.shopping_list)[0]);
        setReStock(response.data.map((data) => data.shopping_list)[0]);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchMaterial();

    const fetchLogistics = async () => {
      try {
        const response = await axios.get(
          `/inventory/${props.match.params.id}/logistics`
        );
        setLogistics(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchLogistics();
  }, [props.match.params.id]);

  const handleReStock = async () => {
    setReStock(!reStock);
    await axios.put(`/inventory/${props.match.params.id}/restock`);
    reStock
      ? message.warning("Item removed from Shopping List")
      : message.success("Item added to Shopping List");
  };

  return (
    <Layout className="sidebar-header-layout">
      <Sidebar />
      <Layout>
        <NavBar />
        <Content className="content-layout">
          <div className="content-wrapper">
            <div className="content-header">
              <div>
                <h1 className="blue-text"> Inventory </h1>
                <span className="sub-header">{materialName}</span>
              </div>
              <div>
                <Button
                  className="table-add"
                  type="primary"
                  size="large"
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
                <Button
                  className="table-add"
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                >
                  Add/Reduce
                </Button>
              </div>
            </div>
            <div></div>
            <div className="tabs">
              <Tabs
                defaultActiveKey="1"
                size={"large"}
                style={{ marginBottom: 32 }}
                /* type="card" */
                tabPosition="top"
              >
                <TabPane tab="Information" key="1">
                  <div className="material-header">
                    <div className="item-photo">
                      <div className="photo-frame">Image</div>
                      <div>
                        <Checkbox checked={reStock} onChange={handleReStock}>
                          Add to Shopping List
                        </Checkbox>
                      </div>
                    </div>
                    <div className="material-information">
                      <div className="table-section-header">
                        <h3> General Information </h3>
                        <Table
                          columns={general_columns}
                          dataSource={materialData}
                          pagination={false}
                        />
                      </div>
                      <div className="table-section-header">
                        <h3> Nuitritional Facts (per 100g) </h3>
                        <Table
                          columns={nuitrition_columns}
                          dataSource={materialData}
                          pagination={false}
                        />
                      </div>
                      <div className="table-section-header">
                        <h3> In Stock </h3>
                        <Table
                          className="table-logistics"
                          columns={stocks_columns}
                          dataSource={logistics}
                          pagination={{ pageSize: 5 }}
                        />
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Products" key="2"></TabPane>
                <TabPane tab="History" key="3"></TabPane>
              </Tabs>
            </div>
          </div>
          <Footer className="footer">Accelerator Lab ©2021 Tetra Pak</Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RawMaterial;
