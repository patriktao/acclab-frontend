import { DatePicker, InputNumber, Modal, Tabs, Table, Select } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import "./AddReduceRawMaterial.scss";
import reduction_reasons from "./ReductionReasons";
import logistic_columns from "./LogisticColumns";

const { TabPane } = Tabs;

const AddReduceRawMaterial = ({ close, visible, unit, logistics }) => {
  AddReduceRawMaterial.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    unit: PropTypes.string,
  };

  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState("Spill");

  return (
    <Modal
      centered
      maskClosable={false}
      width={950}
      visible={visible}
      onCancel={close}
    >
      <section className="AddReduceRawMaterial">
        <Tabs tabPosition={"left"}>
          <TabPane tab="Add" key="1">
            <section className="add">
              <h1>Add Amount</h1>
              <div className="rows">
                <div className="column-1">
                  <div className="header-field-wrapper">
                    <span className="sub-header">Amount</span>
                    <InputNumber
                      className="input-number"
                      onChange={(e) => setAmount(e)}
                      value={amount}
                      placeholder="e.g. 1000"
                      required
                      min={0}
                    />
                  </div>
                  <div className="header-field-wrapper">
                    <span className="sub-header">Unit</span>
                    {unit}
                  </div>
                </div>
                <div className="column-2">
                  <div className="header-field-wrapper">
                    <span className="sub-header">Order Date</span>
                    <DatePicker className="input-date" />
                  </div>
                  <div className="header-field-wrapper">
                    <span className="sub-header">Received Date</span>
                    <DatePicker className="input-date" />
                  </div>
                  <div className="header-field-wrapper">
                    <span className="sub-header">Expiration Date</span>
                    <DatePicker className="input-date" />
                  </div>
                </div>
              </div>
            </section>
          </TabPane>
          <TabPane tab="Reduce" key="2">
            <section className="reduce">
              <h1>Reduce Amount</h1>
              <Table
                columns={logistic_columns}
                dataSource={logistics}
                size={"large"}
                pagination={{ pageSize: 5, position: ["bottomRight"] }}
              />
              <div className="header-field-wrapper">
                <span className="sub-header">Reason:</span>
                <Select
                  className="input-select"
                  options={reduction_reasons}
                  defaultValue={reason}
                  style={{ width: "450px" }}
                  onSelect={(e) => setReason(e)}
                />
              </div>
            </section>
          </TabPane>
        </Tabs>
      </section>
    </Modal>
  );
};

export default AddReduceRawMaterial;
