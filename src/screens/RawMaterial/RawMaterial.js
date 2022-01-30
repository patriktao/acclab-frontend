import { useState, useEffect } from "react";
import { Table, Spin, Checkbox, message, Avatar } from "antd";
import * as Columns from "./RawMaterialColumns";
import EditRawMaterial from "../../components/Inventory/EditRawMaterial";
import HandleStock from "../../components/Inventory/HandleStock";
import { API } from "../../api";
import "./RawMaterial.scss";
import { useEditRawMaterial } from "../../context/edit-raw-material";
import Template from "../Template";
import { useHistory } from "react-router";
import InventoryInterface from "../InventoryInterface";
import ManageRawMaterialStock from "../../components/Inventory/ManageRawMaterialStock";

const RawMaterial = (props) => {
  const { openEdit, closeEdit, editVisible } = useEditRawMaterial();
  const [materialData, setMaterialData] = useState([]);
  const [materialName, setMaterialName] = useState("");
  const [reStock, setReStock] = useState();
  const [logistics, setLogistics] = useState([]);
  const [tableLoading1, setTableLoading1] = useState(true);
  const [tableLoading2, setTableLoading2] = useState(true);
  const [showAddReduce, setShowAddReduce] = useState(false);
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState("");

  const id = props.match.params.id;
  const history = useHistory();

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

  const handleRestock = async () => {
    setReStock(!reStock);
    API.rawMaterial.handleRestock(id);
    reStock
      ? message.warning("Item removed from Shopping List")
      : message.success("Item added to Shopping List");
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
    if (typeof form.image === "string") {
      setImage(form.image);
    }
    setMaterialName(form.name);
  };

  const addStocks = (list) => {
    const new_amount = list[list.length - 1].amount;
    materialData[0].total_amount += new_amount;
    setLogistics(list);
  };

  const reduceStocks = (list, reductionAmount) => {
    materialData[0].total_amount -= reductionAmount;
    setLogistics(list);
  };

  const deleteRawMaterial = (e, id) => {
    API.rawMaterial.deleteRawMaterial(id).then((res) => {
      if (res === "success") {
        return history.push("/inventory");
      }
    });
  };

  const informationTab = (
    <div className="material-header">
      <section className="item-image">
        <div name="image">
          <Avatar
            size={275}
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
          <Spin spinning={tableLoading1} tip="Loading..." size="medium">
            <Table
              columns={Columns.general_columns.filter(
                (col) => col.dataIndex !== "raw_material_id"
              )}
              dataSource={materialData}
              pagination={false}
              scroll={{ x: "400px" }}
              rowKey={"material_name"}
            />
          </Spin>
        </div>
        <div className="table-section-header">
          <h3> Nuitritional Facts (per 100g) </h3>
          <Spin spinning={tableLoading1} tip="Loading..." size="medium">
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
          <Spin spinning={tableLoading2} tip="Loading..." size="medium">
            <Table
              className="table-logistics"
              columns={Columns.stocks_columns.filter(
                (col) => col.dataIndex !== "stock_id"
              )}
              dataSource={logistics}
              pagination={{ pageSize: 7 }}
              rowKey={"stock_id"}
            />
          </Spin>
        </div>
      </section>
    </div>
  );

  const manageStock = (
    <ManageRawMaterialStock
      close={(e) => {
        e.stopPropagation();
        setShowAddReduce(false);
      }}
      visible={showAddReduce}
      id={id}
      unit={unit}
      logistics={logistics}
      sendAddToParent={addStocks}
      sendReductionToParent={reduceStocks}
    />
  );

  const edit = (
    <EditRawMaterial
      visible={editVisible[id]}
      close={(e) => closeEdit(e, id)}
      data={materialData[0]}
      sendChangesToParent={handleEdit}
      deleteRawMaterial={deleteRawMaterial}
    />
  );

  return (
    <Template
      content={
        <InventoryInterface
          name={materialName}
          openHandleStock={() => setShowAddReduce(true)}
          manageStock={manageStock}
          openEdit={() => openEdit(id)}
          edit={edit}
          information={informationTab}
        />
      }
    />
  );
};

export default RawMaterial;
