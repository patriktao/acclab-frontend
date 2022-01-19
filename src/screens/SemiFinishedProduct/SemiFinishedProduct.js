import Template from "../Template";
import { useEffect, useState } from "react";
import { API } from "../../api";
import InventoryInterface from "../InventoryInterface";
import { Avatar, Spin, Table, Input } from "antd";
import {
  general_columns,
  stocks_columns,
  formulation_columns,
} from "./SemiFinishedProductColumns";

const { TextArea } = Input;

const SemiFinishedProduct = (props) => {
  const id = props.match.params.id;

  const [data, setData] = useState([]);
  const [logistic, setLogistic] = useState([]);
  const [formulation, setFormulation] = useState([]);
  const [processSteps, setProcessSteps] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [tableLoading1, setTableLoading1] = useState(true);
  const [tableLoading2, setTableLoading2] = useState(false);
  const [tableLoading3, setTableLoading3] = useState(false);

  useEffect(() => {
    API.sfp.fetchSfp(id).then((res) => {
      console.log(res);
      setData(res);
      setProcessSteps(res[0].process_steps);
      setName(res[0].sfp_name);
      setImage(res[0].image);
      setTableLoading1(false);
    });

    API.sfp.fetchFormulation(id).then((res) => {
      console.log(res);
      setFormulation(res);
    });

    API.sfp.fetchLogistics(id).then((res) => {
      console.log(res);
      setLogistic(res);
    });
  }, []);

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
            />
          </Spin>
        </div>
        <div className="table-section-header">
          <h3> Process Steps </h3>
          <TextArea
            showCount
            rows={8}
            value={processSteps}
            onChange={(e) => setProcessSteps(e.target.value)}
          />
        </div>

        <div className="table-section-header">
          <h3> In Stock </h3>
          <Spin spinning={tableLoading3} tip="Loading..." size="medium">
            <Table
              columns={stocks_columns.filter(
                (col) => col.dataIndex !== "stock_id"
              )}
              dataSource={logistic}
            />
          </Spin>
        </div>
      </section>
    </div>
  );

  return (
    <Template
      content={<InventoryInterface name={name} information={informationTab} />}
    />
  );
};

export default SemiFinishedProduct;
