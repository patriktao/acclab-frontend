import Template from "../Template";
import { useEffect, useState } from "react";
import { API } from "../../api";
import InventoryInterface from "../InventoryInterface";
import { Avatar, Spin, Table } from "antd";
import {
  general_columns,
  stocks_columns,
  formulation_columns,
} from "./SemiFinishedProductColumns";
import EditSfp from "../../components/Inventory/EditSfp";
import ManageSfpStock from "../../components/Inventory/ManageSfpStock/ManageSfpStock";
import { useEditSfp } from "../../context/edit-sfp";
import { useHistory } from "react-router";
import DOMPurify from "dompurify";
import TextEditorReadOnly from "../../components/General/TextEditorReadOnly";

const SemiFinishedProduct = (props) => {
  const id = props.match.params.id;
  const history = useHistory();
  const { openEdit, closeEdit, editVisible } = useEditSfp();

  /* States */
  const [data, setData] = useState([]);
  const [logistics, setLogistics] = useState([]);
  const [formulation, setFormulation] = useState([]);
  const [processSteps, setProcessSteps] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("g");
  const [image, setImage] = useState("");
  const [totalAmount, setTotalAmount] = useState();
  const [tableLoading1, setTableLoading1] = useState(true);
  const [tableLoading2, setTableLoading2] = useState(true);
  const [tableLoading3, setTableLoading3] = useState(true);
  const [showStockModal, setShowStockModal] = useState(false);

  useEffect(() => {
    API.sfp.fetchSfp(id).then((res) => {
      setData(res);
      setProcessSteps(res[0].process_steps);
      setName(res[0].sfp_name);
      setUnit(res[0].unit);
      setImage(res[0].image);
      setTotalAmount(res[0].total_amount);
      setTableLoading1(false);
    });

    API.sfp.fetchFormulation(id).then((res) => {
      setFormulation(res);
      setTableLoading2(false);
    });

    API.sfp.fetchLogistics(id).then((res) => {
      setLogistics(res);
      setTableLoading3(false);
    });
  }, [id]);

  const editFormulation = (form) => {
    data[0].sfp_name = form.sfp_name;
    data[0].location = form.location;
    data[0].unit = form.unit;
    data[0].process_steps = form.process_steps;
    setImage(form.image);
    setName(form.name);
    setProcessSteps(form.process_steps);
    setFormulation(form.editForm);
  };

  const manageStocks = (newList, newAmount) => {
    data[0].total_amount = newAmount;
    setTotalAmount(newAmount);
    setLogistics(newList);
  };

  const deleteSfp = (e, id) => {
    API.sfp.disableSfp(id).then((res) => {
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
      </section>
      <section className="material-information">
        <div className="table-section-header">
          <h3> General Information </h3>
          <Spin spinning={tableLoading1} tip="Loading..." size="medium">
            <Table
              columns={general_columns.filter(
                (col) => col.dataIndex !== "sfp_id"
              )}
              dataSource={data}
              pagination={false}
              rowKey={"sfp_id"}
            />
          </Spin>
        </div>
        <div className="table-section-header">
          <h3> Formulation </h3>
          <Spin spinning={tableLoading2} tip="Loading..." size="medium">
            <Table
              columns={formulation_columns.filter(
                (col) => col.dataIndex !== "raw_material_id"
              )}
              dataSource={formulation}
              rowKey={"raw_material_id"}
              pagination={false}
            />
          </Spin>
        </div>
        <div className="table-section-header">
          <h3> Process Steps </h3>
          <TextEditorReadOnly originalData={DOMPurify.sanitize(processSteps)} />
          <div className="table-section-header">
            <h3> In Stock ({logistics.length}) </h3>
            <Spin spinning={tableLoading3} tip="Loading..." size="medium">
              <Table
                columns={stocks_columns.filter(
                  (col) => col.dataIndex !== "stock_id"
                )}
                rowKey={"stock_id"}
                dataSource={logistics}
                size="small"
              />
            </Spin>
          </div>
        </div>
      </section>
    </div>
  );

  const editModal = (
    <EditSfp
      visible={editVisible[id]}
      onClose={(e) => closeEdit(e, id)}
      data={data[0]}
      sendChangesToParent={editFormulation}
      deleteSfp={deleteSfp}
    />
  );

  const manageStock = (
    <ManageSfpStock
      visible={showStockModal}
      close={(e) => {
        e.stopPropagation();
        setShowStockModal(false);
      }}
      logistics={logistics}
      unit={unit}
      id={id}
      sendChangesToParent={manageStocks}
      totalAmount={totalAmount}
    />
  );

  return (
    <Template
      content={
        <InventoryInterface
          name={name}
          information={informationTab}
          openEdit={() => openEdit(id)}
          edit={editModal}
          manageStock={manageStock}
          openManageStock={() => setShowStockModal(true)}
        />
      }
    />
  );
};

export default SemiFinishedProduct;
