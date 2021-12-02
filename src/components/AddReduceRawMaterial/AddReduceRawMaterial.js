import { DatePicker, InputNumber, Modal, Tabs, Table, Select } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import "./AddReduceRawMaterial.scss";
import reduction_reasons from "./ReductionReasons";
import logistic_columns from "./LogisticColumns";
import moment from "moment";
import { API } from "../../api";

const { TabPane } = Tabs;

const AddReduceRawMaterial = ({
  close,
  visible,
  unit,
  logistics,
  id,
  handleLogisticList,
}) => {
  AddReduceRawMaterial.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    unit: PropTypes.string,
    logistics: PropTypes.array,
    id: PropTypes.string,
    handleLogisticList: PropTypes.func,
  };

  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState("Spill");
  const [orderDate, setOrderDate] = useState("");
  const [receivedDate, setReceivedDate] = useState();
  const [expirationDate, setExpirationDate] = useState("");
  const [tabPane, setTabPane] = useState(1);

  const handleOk = (e) => {
    try {
      const data = [
        {
          amount: amount,
          order_date: emptyInputChecker(orderDate),
          received_date: emptyInputChecker(receivedDate),
          expiration_date: emptyInputChecker(expirationDate),
        },
      ];
      sendDataToParent(data);
     /*  sendDataToAPI(data); */
      close(e);
    } catch (err) {
      console.log(err);
    }
  };

  const sendDataToParent = (data) => {
    const mergedList = logistics.concat(data);
    handleLogisticList(mergedList);
  };

  /* 
    @sendDataToAPI: tabPane === 1 is add stock, tabPane === 2 is reduce stock
  */
  const sendDataToAPI = (data) => {
    if (tabPane === 1) {
      API.rawMaterial.addStock(id, data[0]);
    } else if (tabPane === 2) {
    }
  };

  const emptyInputChecker = (input) => {
    if (input === "") {
      return "";
    } else {
      return moment(input).format("YYYYMMDD");
    }
  };

  const changeTabPane = (key) => {
    if (key === "2") {
      setTabPane(2);
    } else if (key === "1") {
      setTabPane(1);
    }
  };

  return (
    <Modal
      centered
      maskClosable={false}
      width={950}
      visible={visible}
      onCancel={close}
      onOk={handleOk}
    >
      <section className="AddReduceRawMaterial">
        <Tabs tabPosition={"left"} onTabClick={(key) => changeTabPane(key)}>
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
                    <DatePicker
                      className="input-date"
                      allowClear
                      value={orderDate}
                      onChange={setOrderDate}
                    />
                  </div>
                  <div className="header-field-wrapper">
                    <span className="sub-header">Received Date</span>
                    <DatePicker
                      className="input-date"
                      allowClear
                      value={receivedDate}
                      onChange={setReceivedDate}
                    />
                  </div>
                  <div className="header-field-wrapper">
                    <span className="sub-header">Expiration Date</span>
                    <DatePicker
                      className="input-date"
                      allowClear
                      value={expirationDate}
                      onChange={setExpirationDate}
                    />
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
