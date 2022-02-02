import React from "react";
import { useEffect, useState } from "react";
import StockInterface from "../StockInterface";
import EditStockForm from "../../../classes/EditStockForm";
import { InputDatePicker } from "../../InputFields";
import InputNumber from "../../General/InputNumber";
import { API } from "../../../api";
import { message } from "antd";
import moment from "moment";
import { SuccessNotification } from "../../General/Notifications";
import { dateFormChecker } from "../../../helper/Checker";

const ManageSfpStock = ({
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
  const [productionDate, setProductionDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  useEffect(() => {
    if (logistics.length >= 0) {
      setLogisticList(logistics);
      setEditForm(new EditStockForm(logistics));
      setOriginalForm(new EditStockForm(logistics));
    }
  }, [logistics]);

  const isPassingRestrictions = () => {
    if (amount != null && dateFormChecker(productionDate)) {
      if (amount <= 0) {
        message.error("The amount needs to be a positive number!");
        return false;
      }
      return true;
    }
    message.error("Amount and production date need to be filled!");
    return false;
  };

  const checkEmptyInput = (input) => {
    return input === "" || input === "Invalid date" || input === null
      ? null
      : moment(input).format("YYYYMMDD");
  };

  const addStock = async (e) => {
    if (!isPassingRestrictions()) {
      return;
    }

    const data = {
      raw_material_id: parseInt(id),
      stock_id: "",
      amount: amount,
      production_date: checkEmptyInput(productionDate),
      expiration_date: checkEmptyInput(expirationDate),
    };

    // API call and get the new generated stock_id
    await API.sfp.addStock(id, data).then((res) => {
      data.stock_id = res.stock_id;
      editForm.add(res.stock_id, amount);
    });

    API.sfp.updateTotalAmount(id);
    const mergedList = logistics.concat(data);
    setLogisticList(mergedList);
    sendAddToParent(mergedList);
    SuccessNotification("You have successfully added a new stock");
    close(e);
  };

  const reduceStock = (e) => {
    let totalReducedAmount = 0;
    for (let index = 0; index < logisticList.length; index++) {
      logisticList[index].amount -= editForm.stocks[index].subtracted_amount;
      totalReducedAmount += editForm.stocks[index].subtracted_amount;
    }

    logisticList.forEach((e) => {
      if (e.amount === 0) {
        SuccessNotification(
          "You have successfully removed Stock " + e.stock_id
        );
      }
    });

    sendReductionsToAPI();
    API.sfp.updateTotalAmount(id);

    //Update the lists
    const filteredList = logisticList.filter((e) => e.amount !== 0);
    editForm.updateForm();
    setLogisticList(filteredList);
    sendReductionToParent(filteredList, totalReducedAmount);
    close(e);
  };

  const sendReductionsToAPI = () => {
    editForm.stocks.forEach((e) => {
      if (e.new_amount === 0) {
        API.sfp.disableStock(id, e);
      } else if (
        e.new_amount !== e.old_amount &&
        e.new_amount > 0 &&
        e.new_amount < e.old_amount
      ) {
        API.sfp.updateStock(id, e);
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
          header="Production Date"
          value={productionDate}
          onChange={setProductionDate}
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

export default ManageSfpStock;