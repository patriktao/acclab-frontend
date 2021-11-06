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
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import * as Columns from "./RawMaterialColumns";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import TooltipComponent from "../../components/TooltipComponent";
import EditRawMaterial from "./EditRawMaterial";
import AddReduceRawMaterial from "./AddReduceRawMaterial";
import { API } from "../../api";
import "./RawMaterial.scss";

const { Content, Footer } = Layout;
const { TabPane } = Tabs;

const RawMaterial = (props) => {
  const [materialData, setMaterialData] = useState([]);
  const [materialName, setMaterialName] = useState([]);
  const [reStock, setReStock] = useState();
  const [logistics, setLogistics] = useState([]);
  const [tableLoading1, setTableLoading1] = useState(true);
  const [tableLoading2, setTableLoading2] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showAddReduce, setShowAddReduce] = useState(false);
  const [image, setImage] = useState("");
  const [unit, setUnit] = useState("");

  const id = props.match.params.id;

  /* Fetch Data from API */
  useEffect(() => {
    API.rawMaterial.fetchMaterial(id).then((res) => {
      setMaterialData(res);
      setMaterialName(res[0].material_name);
      setUnit(res[0].unit);
      setImage(res[0].image);
      setReStock(res[0].shopping_list);
      setTableLoading1(false);
    });

    API.rawMaterial.fetchLogistics(id).then((res) => {
      setLogistics(res);
      setTableLoading2(false);
    });
  }, [id]);

  /* Functions */
  const handleRestock = async () => {
    setReStock(!reStock);
    API.rawMaterial.handleRestock(id);
    reStock
      ? message.warning("Item removed from Shopping List")
      : message.success("Item added to Shopping List");
  };

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = (e) => {
    e.stopPropagation();
    setShowEdit(false);
  };

  const handleEdit = (form) => {
    materialData[0].material_name = form.name;
    materialData[0].content = form.content;
    materialData[0].unit = form.unit;
    materialData[0].fat = form.fat;
    materialData[0].carbohydrate = form.carb;
    materialData[0].protein = form.protein;
    materialData[0].salt = form.salt;
    materialData[0].fiber = form.fiber;
    materialData[0].sugar = form.sugar;
    materialData[0].country = form.country;
    materialData[0].company = form.brand;
    materialData[0].location = form.location;
    materialData[0].form = form.form;
    materialData[0].image = form.image;
    setMaterialName(form.name);
  };

  const handleImage = (img) => {
    setImage(img);
  };

  const openAddReduce = () => {
    setShowAddReduce(true);
  };

  const closeAddReduce = (e) => {
    e.stopPropagation();
    setShowAddReduce(false);
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
                  onClick={openEdit}
                >
                  Edit
                  <EditRawMaterial
                    visible={showEdit}
                    close={closeEdit}
                    data={materialData[0]}
                    handleEdit={handleEdit}
                    handleImage={handleImage}
                  />
                </Button>
                <Button
                  className="table-add"
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={openAddReduce}
                >
                  Add/Reduce
                  <AddReduceRawMaterial
                    close={closeAddReduce}
                    visible={showAddReduce}
                    unit={unit}
                    logistics={logistics}
                  />
                </Button>
              </div>
            </div>
            <div />
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
                          src={image}
                        />
                      </div>
                      <div className="shopping-list">
                        <Checkbox checked={reStock} onChange={handleRestock}>
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
                            columns={Columns.general_columns}
                            dataSource={materialData}
                            pagination={false}
                            scroll={{ x: "400px" }}
                            rowKey={"material_name"}
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
                            columns={Columns.nuitrition_columns}
                            dataSource={materialData}
                            pagination={false}
                            rowKey={"fat"}
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
                            columns={Columns.stocks_columns}
                            dataSource={logistics}
                            pagination={{ pageSize: 5 }}
                            rowKey={"expiration_date"}
                          />
                        </Spin>
                      </div>
                    </section>
                  </div>
                </TabPane>
                <TabPane tab="Products" key="2" disabled></TabPane>
                <TabPane tab="History" key="3" disabled></TabPane>
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
