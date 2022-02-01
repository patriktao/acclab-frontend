import React from "react";
import StockInterface from "../StockInterface";
import { useState, useEffect } from "react";
import moment from "moment";
import { message } from "antd";
import { API } from "../../../api";
import { SuccessNotification } from "../../General/Notifications";
import InputNumber from "../../General/InputNumber";
import EditStockForm from "../../../classes/EditStockForm";
import InputDatePicker from "../../InputFields/InputDatePicker";
import { dateFormChecker } from "../../../helper/Checker";

const ManageRawMaterialStock = ({
  close,
  visible,
  unit,
  logistics,
  id,
  sendAddToParent,
  sendReductionToParent,
  totalAmount,
}) => {
  const [logisticList, setLogisticList] = useState([]);
  const [editForm, setEditForm] = useState();
  const [originalForm, setOriginalForm] = useState();
  const [amount, setAmount] = useState();
  const [orderDate, setOrderDate] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  useEffect(() => {
    if (logistics.length >= 0) {
      setLogisticList(logistics);
      setEditForm(new EditStockForm(logistics));
      setOriginalForm(new EditStockForm(logistics));
    }
  }, [logistics, EditStockForm]);

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
    }
    message.error(
      "Amount, received date and expiration date needs to be filled!"
    );
    return false;
  };

  const addStock = async (e) => {
    if (!isPassingRestrictions()) {
      return;
    }
    const data = {
      raw_material_id: parseInt(id),
      stock_id: "",
      amount: amount,
      order_date: checkEmptyInput(orderDate),
      received_date: checkEmptyInput(receivedDate),
      expiration_date: checkEmptyInput(expirationDate),
    };

    await API.rawMaterial.addStock(id, data).then((res) => {
      data.stock_id = res.stock_id;
      editForm.add(res.stock_id, amount);
    });
    API.rawMaterial.updateTotalAmount(id);

    const mergedList = logistics.concat(data);
    setLogisticList(mergedList);
    sendAddToParent(mergedList);
    SuccessNotification("You have successfully added a new stock");
    close(e);
  };
  
  const reduceStock = (e) => {
    let totalReducedAmount = 0;
    for (let index = 0; index < logisticList.length; index++) {
      totalReducedAmount += editForm.stocks[index].subtracted_amount;
      logisticList[index].amount -= editForm.stocks[index].subtracted_amount;
    }

    logisticList.forEach((e) => {
      if (e.amount === 0) {
        SuccessNotification(
          "You have successfully removed Stock " + e.stock_id
        );
      }
    });
    sendReductionsToAPI();
    API.rawMaterial.updateTotalAmount(id);

    //Update the lists
    editForm.updateForm();
    const filteredList = logisticList.filter((e) => e.amount !== 0);
    setLogisticList(filteredList);
    sendReductionToParent(filteredList, totalReducedAmount);
    close(e);
  };

  const sendReductionsToAPI = () => {
    editForm.stocks.forEach((e) => {
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

  const AddStockComponents = (
    <div className="rows">
      <div className="column-1">
        <div className="header-field-wrapper">
          <span className="sub-header">Amount</span>
          <InputNumber
            onChange={(e) => setAmount(e)}
            value={amount}
            placeholder="e.g. 1000"
            min={0}
          />
        </div>
        <div className="header-field-wrapper">
          <span className="sub-header">Unit</span>
          {unit}
        </div>
      </div>
      <div className="column-2">
        <InputDatePicker
          header="Order Date"
          value={orderDate}
          onChange={setOrderDate}
        />
        <InputDatePicker
          header="Received Date"
          value={receivedDate}
          onChange={setReceivedDate}
        />
        <InputDatePicker
          header="Expiration Date"
          value={expirationDate}
          onChange={setExpirationDate}
        />
      </div>
    </div>
  );

  return (
    <StockInterface
      visible={visible}
      close={close}
      editForm={editForm}
      originalForm={originalForm}
      logistics={logisticList}
      addStock={addStock}
      reduceStock={reduceStock}
      AddStockComponents={AddStockComponents}
    />
  );
};

export default ManageRawMaterialStock;
