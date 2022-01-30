import {
  DatePicker,
  InputNumber,
  Modal,
  Tabs,
  Table,
  Select,
  Popconfirm,
  Button,
  message,
} from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./HandleStock.scss";
import reduction_reasons from "./ReductionReasons";
import moment from "moment";
import { API } from "../../../api";
import { getPriorityIcon } from "../../General/Priority";
import { SuccessNotification } from "../../General/Notifications";
import { isEqual } from "lodash/fp";

const { TabPane } = Tabs;

const HandleStock = ({
  close,
  visible,
  unit,
  logistics,
  id,
  sendAddToParent,
  sendReductionToParent,
}) => {
  HandleStock.propTypes = {
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
  const [receivedDate, setReceivedDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [tabPane, setTabPane] = useState("add");
  const [editForm, setEditForm] = useState([]);
  const [oldForm, setOldForm] = useState([]);
  const [logisticList, setLogisticList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  /* tabPane 1 is add, tabPane 2 is reduce */

  useEffect(() => {
    if (logistics.length > 0) {
      setLogisticList(logistics);
      logistics.forEach((e) => {
        editForm.push({
          stock_id: e.stock_id,
          old_amount: e.amount,
          subtracted_amount: 0,
          new_amount: e.amount,
          total_amount: e.total_amount,
        });
        setTotalAmount(e.total_amount);
      });
      setOldForm(editForm);
    }
  }, [logisticList, logistics, editForm]);

  const handleOk = (e) => {
    switch (tabPane) {
      case "add":
        addFormRestrictions(e);
        break;
      case "reduce":
        if (!isEqual(editForm, oldForm)) {
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

  const changeTabPane = (key) => {
    key === "1" ? setTabPane("add") : setTabPane("reduce");
  };

  /* Return true if date is not empty string or null */
  const dateFormChecker = (date) => {
    return date !== "" && date !== null;
  };

  const addFormRestrictions = (e) => {
    if (
      amount != null &&
      dateFormChecker(receivedDate) &&
      dateFormChecker(expirationDate)
    ) {
      if (amount <= 0) {
        message.error("The amount needs to be a positive number!");
        return;
      } else if (dateFormChecker(orderDate)) {
        if (
          orderDate.isSameOrAfter(receivedDate) &&
          orderDate.isSameOrAfter(expirationDate)
        ) {
          message.error(
            "Order date must come before received date and expiration date!"
          );
          return;
        }
      } else if (expirationDate.isSameOrBefore(receivedDate)) {
        message.error("Received date must come before expiration date!");
        return;
      }
      addStock();
      close(e);
    } else {
      message.error(
        "Amount, received date and expiration date needs to be filled!"
      );
    }
  };

  const checkEmptyInput = (input) => {
    return input === "" || input === "Invalid date" || input === null
      ? null
      : moment(input).format("YYYYMMDD");
  };

  const addStock = () => {
    const newTotalAmount = totalAmount + amount;
    const data = {
      raw_material_id: parseInt(id),
      stock_id: "",
      amount: amount,
      order_date: checkEmptyInput(orderDate),
      received_date: checkEmptyInput(receivedDate),
      expiration_date: checkEmptyInput(expirationDate),
    };

    // API call and get the new generated stock_id
    API.rawMaterial.addStock(id, data).then((res) => {
      data.stock_id = res.stock_id;
      console.log(data);

      // Update total amount
      API.rawMaterial.updateTotalAmount(id, newTotalAmount);
      setTotalAmount(newTotalAmount);

      /* Edit the total amount in the Edit Form */
      editForm.forEach((e) => {
        e.total_amount += amount;
      });

      /* Push new stock to form with new stock_id*/
      editForm.push({
        stock_id: res.stock_id,
        old_amount: data.amount,
        subtracted_amount: 0,
        new_amount: data.amount,
        total_amount: newTotalAmount,
      });
    });

    //Add the stock by merging the list
    const mergedList = logistics.concat(data);
    console.log(mergedList);

    /* Update the lists */
    setLogisticList(mergedList);
    sendAddToParent(mergedList);
    SuccessNotification("You have successfully added a new stock");
  };

  const reduceStock = (e) => {
    let reductionAmount = 0;
    for (let index = 0; index < logisticList.length; index++) {
      reductionAmount += editForm[index].subtracted_amount;
      // Setting the stock in the list after reduction
      logisticList[index].amount -= editForm[index].subtracted_amount;
    }

    logisticList.forEach((e) => {
      if (e.amount === 0) {
        SuccessNotification(
          "You have successfully removed Stock " + e.stock_id
        );
      }
    });

    //send changes to API
    console.log("Form before reduction: " + editForm);
    sendReductionToAPI();

    // Update total amount of the raw material
    const newTotalAmount = totalAmount - reductionAmount;
    API.rawMaterial.updateTotalAmount(id, newTotalAmount);
    setTotalAmount(newTotalAmount);

    // Update total amount in the edit forms
    editForm.forEach((e) => {
      e.total_amount = newTotalAmount;
    });

    //if amount = 0: remove the item from the array and update both EditForm and Logistic List
    const filtered_list = logisticList.filter((e) => e.amount !== 0);
    const newEditForm = editForm.filter((e) => e.new_amount !== 0);
    setEditForm(newEditForm);
    setLogisticList(filtered_list);
    console.log("New Form: " + newEditForm);

    sendReductionToParent(filtered_list, reductionAmount);
    close(e);
  };

  const sendReductionToAPI = () => {
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
          console.log(item);
        }
      });
    }
  };

  const popconfirmMessage = () => {
    return tabPane === "add" ? (
      <span> Are you sure to add this stock? </span>
    ) : (
      <span> Are you sure to reduce these quantities? </span>
    );
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
      <section className="AddReduceRawMaterial">
        <Tabs tabPosition={"right"} onTabClick={(key) => changeTabPane(key)}>
          <TabPane tab="Add" key="1">
            <section className="add">
              <h1>Add Stock</h1>
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
                  dataSource={logisticList}
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

export default HandleStock;
