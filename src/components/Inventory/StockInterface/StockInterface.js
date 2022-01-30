import React from "react";
import { getPriorityIcon } from "../../General/Priority";
import "./StockInterface.scss";
import reduction_reasons from "../HandleStock/ReductionReasons";
import moment from "moment";
import { useState } from "react";
import { Tabs, message, Modal, Button, Popconfirm, Select, Table } from "antd";
import { isEqual } from "lodash/fp";
import InputNumber from "../../General/InputNumber";
import PropTypes from "prop-types";

const { TabPane } = Tabs;

const StockInterface = ({
  visible,
  close,
  addStock,
  reduceStock,
  editForm,
  originalForm,
  AddStockComponents,
  logistics,
}) => {
  StockInterface.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    addStock: PropTypes.func,
    reduceStock: PropTypes.func,
    editForm: PropTypes.object,
    originalForm: PropTypes.object,
    AddStockComponents: PropTypes.object,
    logistics: PropTypes.array,
  };

  const [reason, setReason] = useState("Spill");
  const [tabPane, setTabPane] = useState("add");

  /* tabPane 1 is add, tabPane 2 is reduce */

  const handleOk = (e) => {
    switch (tabPane) {
      case "add":
        addStock(e);
        break;
      case "reduce":
        if (!isEqual(editForm.stocks, originalForm.stocks)) {
          reduceStock(e);
          message.success("You have succesfully reduced stocks.");
        } else {
          message.success("No changes made.");
          close(e);
        }
        break;
      default:
        console.log("reached default");
    }
  };

  const popconfirmMessage = () => {
    return tabPane === "add" ? (
      <span> Are you sure to add this stock? </span>
    ) : (
      <span> Are you sure to reduce these quantities? </span>
    );
  };

  /* Edits the stock based on what you input */
  const editStock = (e, record) => {
    editForm.edit(record.stock_id, e, record.amount);
  };

  const logistic_columns = [
    {
      title: "Stock ID",
      dataIndex: "stock_id",
      key: "stock_id",
    },
    {
      title: "Amount",
      key: "amount",
      render: (record) => (
        <InputNumber
          style={{ width: "8rem" }}
          placeholder={`0 - ${record.amount}`}
          max={record.amount}
          defaultValue={0}
          onChange={(e) => editStock(e, record)}
        />
      ),
    },
    {
      title: "In Stock",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
      render: (date) =>
        date === null ? (
          <p />
        ) : (
          <p style={{ marginBottom: "auto" }}>
            {moment(date).format("MMM D, YYYY")}
          </p>
        ),
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
      render: (priority, record) => getPriorityIcon(record.expiration_date),
    },
  ];

  const changeTabPane = (key) => {
    key === "1" ? setTabPane("add") : setTabPane("reduce");
  };

  return (
    <Modal
      centered
      maskClosable={false}
      width={1050}
      visible={visible}
      onCancel={close}
      footer={[
        <Button key="submit" onClick={close}>
          Cancel
        </Button>,
        <Popconfirm
          title={popconfirmMessage}
          onConfirm={handleOk}
          okText="Yes"
          cancelText="No"
        >
          <Button key="submit" type="primary">
            OK
          </Button>
        </Popconfirm>,
      ]}
    >
      <section className="StockInterface">
        <Tabs tabPosition={"right"} onTabClick={(key) => changeTabPane(key)}>
          <TabPane tab="Add" key="1">
            <section className="add">
              <h1>Add Stock</h1>
              <div className="rows">{AddStockComponents}</div>
            </section>
          </TabPane>
          <TabPane tab="Reduce" key="2">
            <section className="reduce">
              <h1>Reduce Stocks</h1>
              <div className="header-field-wrapper">
                <span className="sub-header">Reason:</span>
                <Select
                  className="input-select"
                  options={reduction_reasons}
                  defaultValue={reason}
                  style={{ width: "450px" }}
                  onSelect={(e) => setReason(e)}
                />
                <Table
                  columns={logistic_columns}
                  dataSource={logistics}
                  size={"middle"}
                  pagination={{ pageSize: 6, position: ["bottomRight"] }}
                  rowKey={"stock_id"}
                />
              </div>
            </section>
          </TabPane>
        </Tabs>
      </section>
    </Modal>
  );
};

export default StockInterface;
