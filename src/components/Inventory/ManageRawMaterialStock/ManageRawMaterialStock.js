import React from "react";
import StockInterface from "../StockInterface";
import { useState, useEffect } from "react";
import moment from "moment";
import { message } from "antd";
import { API } from "../../../api";
import { SuccessNotification } from "../../General/Notifications";
import InputNumber from "../../General/InputNumber";
import { DatePicker } from "antd";

const ManageRawMaterialStock = ({
  close,
  visible,
  unit,
  logistics,
  id,
  sendAddToParent,
  sendReductionToParent,
}) => {
  const [logisticList, setLogisticList] = useState([]);
  const [editForm, setEditForm] = useState([]);
  const [oldForm, setOldForm] = useState([]);
  const [amount, setAmount] = useState();
  const [orderDate, setOrderDate] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (logistics.length > 0 && count === 0) {
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
      setCount(1);
    }
  }, [logisticList, logistics]);

  const checkEmptyInput = (input) => {
    return input === "" || input === "Invalid date" || input === null
      ? null
      : moment(input).format("YYYYMMDD");
  };

  const isPassingRestrictions = () => {
    if (
      amount != null &&
      dateFormChecker(receivedDate) &&
      dateFormChecker(expirationDate)
    ) {
      if (amount <= 0) {
        message.error("The amount needs to be a positive number!");
        return false;
      } else if (dateFormChecker(orderDate)) {
        if (
          orderDate.isSameOrAfter(receivedDate) &&
          orderDate.isSameOrAfter(expirationDate)
        ) {
          message.error(
            "Order date must come before received date and expiration date!"
          );
          return false;
        }
      } else if (expirationDate.isSameOrBefore(receivedDate)) {
        message.error("Received date must come before expiration date!");
        return false;
      }
      return true;
    } else {
      message.error(
        "Amount, received date and expiration date needs to be filled!"
      );
      return false;
    }
  };

  const addStock = (e) => {
    if (!isPassingRestrictions()) {
      return;
    }

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

  /* Return true if date is not empty string or null */
  const dateFormChecker = (date) => {
    return date !== "" && date !== null;
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
  };

  const AddStockComponents = (
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
  );
  return (
    <StockInterface
      visible={visible}
      close={close}
      editForm={editForm}
      oldForm={oldForm}
      logistics={logisticList}
      unit={unit}
      addStock={addStock}
      reduceStock={reduceStock}
      AddStockComponents={AddStockComponents}
    />
  );
};

export default ManageRawMaterialStock;
