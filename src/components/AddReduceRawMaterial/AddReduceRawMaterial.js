import { DatePicker, InputNumber, Modal, Tabs, Table, Select } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./AddReduceRawMaterial.scss";
import reduction_reasons from "./ReductionReasons";
/* import logistic_columns from "./LogisticColumns"; */
import moment from "moment";
import { API } from "../../api";
import { getPriorityIcon } from "../Priority/Priority";
import openNotificationWithIcon from "../openNotificationWithIcon";

const { TabPane } = Tabs;

const AddReduceRawMaterial = ({
  close,
  visible,
  unit,
  logistics,
  id,
  sendAddToParent,
  sendReductionToParent,
}) => {
  AddReduceRawMaterial.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    unit: PropTypes.string,
    logistics: PropTypes.array,
    id: PropTypes.string,
    sendAddToParent: PropTypes.func,
    sendReductionToParent: PropTypes.func,
  };

  const [amount, setAmount] = useState();
  const [reason, setReason] = useState("Spill");
  const [orderDate, setOrderDate] = useState("");
  const [receivedDate, setReceivedDate] = useState();
  const [expirationDate, setExpirationDate] = useState("");
  const [tabPane, setTabPane] = useState(1); //important for handleOK, are we adding or subtracting?
  const [editForm, setEditForm] = useState([]); //states for different amount changesß
  const [counter, setCounter] = useState(0); //makes sure that useEffect only runs once
  const [logisticList, setLogisticList] = useState([]); //the list of logistics
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    API.rawMaterial.fetchLogistics(id).then((res) => {
      setLogisticList(res);
      if (counter === 0) {
        res.forEach((e) => {
          editForm.push({
            stock_id: e.stock_id,
            old_amount: e.amount,
            subtracted_amount: 0,
            new_amount: e.amount,
            total_amount: e.total_amount
          });
          setTotalAmount(e.total_amount)
        });
        setCounter(1);
      }
    });
    
  }, []);

  /* Functions */
  const changeTabPane = (key) => {
    if (key === "2") {
      setTabPane(2);
    } else if (key === "1") {
      setTabPane(1);
    }
  };

  const handleOk = (e) => {
    try {
      if (tabPane === 1) {
        const data = [
          {
            amount: amount,
            order_date: emptyInputChecker(orderDate),
            received_date: emptyInputChecker(receivedDate),
            expiration_date: emptyInputChecker(expirationDate),
            total_amount: totalAmount,
          },
        ];
        addNewStock(data);
      } else if (tabPane === 2) {
        reduceStock();
      }
      close(e);
    } catch (err) {
      console.log(err);
    }
  };

  const emptyInputChecker = (input) => {
    if (input === "") {
      return "";
    } else {
      return moment(input).format("YYYYMMDD");
    }
  };

  const addNewStock = (data) => {
    const mergedList = logistics.concat(data);
    openNotificationWithIcon(
      "success",
      "You have successfully added a new stock"
    );
    sendAddToParent(mergedList);
    API.rawMaterial.addStock(id, data[0]);
  };

  const reduceStock = () => {
    let totalAmountToReduce = 0;
    for (let index = 0; index < logisticList.length; index++) {
      //counting the total amount to be reduced
      totalAmountToReduce += editForm[index].subtracted_amount;
      //setting the stock after after reduction
      logisticList[index].amount -= editForm[index].subtracted_amount;
    }

    /* Send a message when you have added */
    logisticList.forEach((e) => {
      if (e.subtracted_amount === 0) {
        openNotificationWithIcon(
          "success",
          "You have successfully removed Stock " + e.stock_id
        );
      }
    });

    //send edit to API
    console.log(editForm);
    editForm.forEach((e) => {
      if (e.new_amount === 0) {
        API.rawMaterial.disableStock(id, e);
      } else if (
        e.new_amount !== e.old_amount &&
        e.new_amount > 0 &&
        e.new_amount < e.old_amount
      ) {
        API.rawMaterial.updateStock(id, e);
      }
    });

    //if amount = zero, remove the item from the array
    const filtered_list = logisticList.filter((e) => e.amount !== 0);
    const newEditForm = editForm.filter((e) => e.new_amount !== 0);
    setEditForm(newEditForm);
    setLogisticList(filtered_list);
    console.log(newEditForm);

    //send changes to parent
    sendReductionToParent(filtered_list, totalAmountToReduce);
  };

  /* Edits the stock based on what you input */
  const editStock = (e, record) => {
    const stock_id = record.stock_id;
    if (e === 0) {
      editForm.some((item) => {
        if (item.stock_id === stock_id) {
          item.subtracted_amount = 0;
          item.new_amount = item.old_amount;
        }
      });
    } else if (e !== null && e <= record.amount && e >= 0) {
      editForm.some((item) => {
        if (item.stock_id === stock_id) {
          item.subtracted_amount = e;
          item.new_amount = item.old_amount - e;
        }
      });
    }
  };

  /* Table columns */
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
          className="input-number"
          size={"small"}
          style={{ width: "8rem" }}
          placeholder={0}
          min={0}
          max={record.amount}
          defaultValue={0}
          onChange={(e) => editStock(e, record)}
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
      render: (priority, record) => getPriorityIcon(record.expiration_date),
    },
  ];

  return (
    <Modal
      centered
      maskClosable={false}
      width={1050}
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
                      min={1}
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
                  dataSource={logisticList || []}
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

export default AddReduceRawMaterial;
