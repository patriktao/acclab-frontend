import { useState, useEffect } from "react";
import {
  Layout,
  Tabs,
  Table,
  Spin,
  Button,
  Checkbox,
  message,
  Avatar,
  Tooltip,
} from "antd";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import "./RawMaterial.css";
import {
  general_columns,
  nuitrition_columns,
  stocks_columns,
} from "./RawMaterialColumns";
import {
  PlusOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import TooltipComponent from "../../components/TooltipComponent";

const { Content, Footer } = Layout;
const { TabPane } = Tabs;

const RawMaterial = (props) => {
  const [materialData, setMaterialData] = useState([]);
  const [materialName, setMaterialName] = useState([]);
  const [reStock, setReStock] = useState();
  const [logistics, setLogistics] = useState([]);
  const [tableLoading1, setTableLoading1] = useState(true);
  const [tableLoading2, setTableLoading2] = useState(true);

  /* Fetch Data from API */
  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await axios.get(`/inventory/${props.match.params.id}`);
        setMaterialData(response.data);
        setMaterialName(response.data.map((data) => data.material_name));
        setReStock(response.data.map((data) => data.shopping_list)[0]);
        setTableLoading1(false);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    const fetchLogistics = async () => {
      try {
        const response = await axios.get(
          `/inventory/${props.match.params.id}/logistics`
        );
        setLogistics(response.data);
        setTableLoading2(false);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchMaterial();
    fetchLogistics();
  }, [props.match.params.id]);

  /* Functions */
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
                <div className="header-information">
                  <h1 className="blue-text"> Inventory </h1>
                  <TooltipComponent
                    text={
                      "Create, edit and retrieve information of a raw material"
                    }
                    component={<InfoCircleOutlined />}
                  />
                </div>
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
                tabPosition="top"
              >
                <TabPane tab="Information" key="1">
                  <div className="material-header">
                    <section className="item-image">
                      <div name="image">
                        <Avatar
                          size={325}
                          shape="square"
                          alt="Company Logotype"
                        />
                      </div>
                      <div className="shopping-list">
                        <Checkbox checked={reStock} onChange={handleReStock}>
                          Add to Shopping List
                        </Checkbox>
                      </div>
                    </section>
                    <section className="material-information">
                      <div className="table-section-header">
                        <h3> General Information </h3>
                        <Spin
                          spinning={tableLoading1}
                          tip="Loading..."
                          size="medium"
                        >
                          <Table
                            columns={general_columns}
                            dataSource={materialData}
                            pagination={false}
                            scroll={{ x: "400px" }}
                          />
                        </Spin>
                      </div>
                      <div className="table-section-header">
                        <h3> Nuitritional Facts (per 100g) </h3>
                        <Spin
                          spinning={tableLoading1}
                          tip="Loading..."
                          size="medium"
                        >
                          <Table
                            columns={nuitrition_columns}
                            dataSource={materialData}
                            pagination={false}
                          />
                        </Spin>
                      </div>
                      <div className="table-section-header">
                        <h3> In Stock </h3>
                        <Spin
                          spinning={tableLoading2}
                          tip="Loading..."
                          size="medium"
                        >
                          <Table
                            className="table-logistics"
                            columns={stocks_columns}
                            dataSource={logistics}
                            pagination={{ pageSize: 5 }}
                          />
                        </Spin>
                      </div>
                    </section>
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
