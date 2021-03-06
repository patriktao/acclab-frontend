import { useState, useEffect } from "react";
import { Table, Spin, Checkbox, message, Avatar } from "antd";
import * as Columns from "./RawMaterialColumns";
import EditRawMaterial from "../../components/Inventory/EditRawMaterial";
import { API } from "../../api";
import "./RawMaterial.scss";
import { useEditRawMaterial } from "../../context/edit-raw-material";
import Template from "../Template";
import { useHistory } from "react-router";
import InventoryInterface from "../InventoryInterface";
import ManageRawMaterialStock from "../../components/Inventory/ManageRawMaterialStock";

const RawMaterial = (props) => {
  const { openEdit, closeEdit, editVisible } = useEditRawMaterial();
  const [data, setData] = useState([]);
  const [materialName, setMaterialName] = useState("");
  const [reStock, setReStock] = useState();
  const [logistics, setLogistics] = useState([]);
  const [tableLoading1, setTableLoading1] = useState(true);
  const [tableLoading2, setTableLoading2] = useState(true);
  const [showAddReduce, setShowAddReduce] = useState(false);
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const id = props.match.params.id;
  const history = useHistory();

  useEffect(() => {
    API.rawMaterial.fetchMaterial(id).then((res) => {
      setData(res);
      setMaterialName(res[0].material_name);
      setUnit(res[0].unit);
      setImage(res[0].image);
      setReStock(res[0].shopping_list);
      setTotalAmount(res[0].total_amount);
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
    data[0].material_name = form.name;
    data[0].content = form.content;
    data[0].unit = form.unit;
    data[0].fat = form.fat;
    data[0].carbohydrate = form.carb;
    data[0].protein = form.protein;
    data[0].salt = form.salt;
    data[0].fiber = form.fiber;
    data[0].sugar = form.sugar;
    data[0].country = form.country;
    data[0].company = form.brand;
    data[0].location = form.location;
    data[0].form = form.form;
    data[0].image = form.image;
    if (typeof form.image === "string") {
      setImage(form.image);
    }
    setMaterialName(form.name);
  };

  const manageStocks = (newList, newAmount) => {
    data[0].total_amount = newAmount;
    setTotalAmount(newAmount);
    setLogistics(newList);
  };

  const deleteRawMaterial = (e, id) => {
    API.rawMaterial.disableRawMaterial(id).then((res) => {
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
              dataSource={data}
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
              dataSource={data}
              pagination={false}
              rowKey={"fat"}
            />
          </Spin>
        </div>
        <div className="table-section-header">
          <h3> In Stock ({logistics.length}) </h3>
          <Spin spinning={tableLoading2} tip="Loading..." size="medium">
            <Table
              className="table-logistics"
              columns={Columns.stocks_columns.filter(
                (col) => col.dataIndex !== "stock_id"
              )}
              dataSource={logistics}
              pagination={{ pageSize: 7 }}
              rowKey={"stock_id"}
              size={"small"}
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
      sendChangesToParent={manageStocks}
      totalAmount={totalAmount}
    />
  );

  const edit = (
    <EditRawMaterial
      visible={editVisible[id]}
      close={(e) => closeEdit(e, id)}
      data={data[0]}
      sendChangesToParent={handleEdit}
      deleteRawMaterial={deleteRawMaterial}
    />
  );

  return (
    <Template
      content={
        <InventoryInterface
          name={materialName}
          openManageStock={() => setShowAddReduce(true)}
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
