import axios from "axios";
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
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import "./RawMaterial.scss";
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
import TooltipComponent from "../../components/TooltipComponent";
import { fetchMaterial, fetchMaterialLogistics } from "../../api";
import EditRawMaterial from "./EditRawMaterial";
import AddReduceRawMaterial from "./AddReduceRawMaterial";

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
    fetchMaterial(id).then((res) => {
      setMaterialData(res);
      setMaterialName(res[0].material_name);
      setUnit(res[0].unit);
      setImage(res[0].image);
      setReStock(res[0].shopping_list);
      setTableLoading1(false);
    });

    fetchMaterialLogistics(id).then((res) => {
      setLogistics(res);
      setTableLoading2(false);
    });
  }, [id]);

  /* Functions */
  const handleReStock = async () => {
    setReStock(!reStock);
    await axios.put(`/inventory/${id}/restock`);
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

  const handleEdit = (data) => {
    const edited_data = [
      {
        raw_material_id: materialData[0].raw_material_id,
        material_name: data.get("name"),
        total_amount: materialData[0].total_amount,
        content: data.get("content"),
        unit: data.get("unit"),
        fat: data.get("fat"),
        carbohydrate: data.get("carbohydrate"),
        protein: data.get("protein"),
        salt: data.get("salt"),
        fiber: data.get("fiber"),
        sugar: data.get("sugar"),
        priority: materialData[0].priority,
        country: data.get("country"),
        company: data.get("brand"),
        location: data.get("location"),
        form: data.get("form"),
        shopping_list: materialData[0].shopping_list,
        deleted: materialData[0].deleted,
      },
    ];
    setMaterialName(data.get("name"));
    setMaterialData(edited_data);
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
                          src={image}
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
