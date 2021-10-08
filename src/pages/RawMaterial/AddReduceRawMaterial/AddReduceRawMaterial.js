import { DatePicker, InputNumber, Modal, Tabs, Table, Select } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import "./AddReduceRawMaterial.scss";
import moment from "moment";
import Priority from "../../../helper/Priority";

const { TabPane } = Tabs;

const AddReduceRawMaterial = ({ close, visible, unit, logistics }) => {
  AddReduceRawMaterial.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    unit: PropTypes.string,
  };

  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState("Spill");

  const reasons = [
    {
      value: "Spill",
      name: "1",
    },
    {
      value: "Consumed",
      name: "2",
    },
    {
      value: "Used in Formulation",
      name: "3",
    },
  ];

  const logistic_columns = [
    {
      title: "Amount",
      key: "amount",
      render: (record) => (
        <InputNumber
          className="input-number"
          size={"small"}
          style={{ width: "8rem" }}
          placeholder={"0"}
          min={0}
          max={record.amount}
        />
      ),
    },
    {
      title: "In Stock",
      dataIndex: "amount",
      key: "in_stock",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
      render: (date) => () => {
        if (date == null) {
          <p />;
        } else {
          <p style={{ marginBottom: "auto" }}>
            {moment(date).format("MMM D, YYYY")}
          </p>;
        }
      },
    },
    {
      title: "Received Date",
      dataIndex: "received_date",
      key: "received_date",
      render: (date) => (
        <p style={{ marginBottom: "auto" }}>
          {moment(date).format("MMM D, YYYY")}
        </p>
      ),
    },
    {
      title: "Expiration Date",
      dataIndex: "expiration_date",
      key: "expiration_date",
      render: (date) => (
        <p style={{ marginBottom: "auto" }}>
          {moment(date).format("MMM D, YYYY")}
        </p>
      ),
    },
    {
      title: "Priority of Usage",
      dataIndex: "priority",
      key: "priority",
      render: (priority, record) => Priority.getPriorityIcon(record),
    },
  ];

  return (
    <Modal width={950} visible={visible} onCancel={close}>
      <section className="AddReduceRawMaterial">
        <Tabs>
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
                  options={reasons}
                  defaultValue={reason}
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
