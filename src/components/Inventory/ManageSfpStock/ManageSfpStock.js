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

const ManageSfpStock = ({
  close,
  visible,
  unit,
  logistics,
  id,
  sendAddToParent,
  sendReductionToParent,
}) => {
  const [logisticList, setLogisticList] = useState([]);
  const [editForm, setEditForm] = useState();
  const [originalForm, setOriginalForm] = useState();
  const [amount, setAmount] = useState();
  const [productionDate, setProductionDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (logistics.length > 0 && counter === 0) {
      setLogisticList(logistics);
      setEditForm(new EditStockForm(logistics));
      setOriginalForm(new EditStockForm(logistics));
      setTotalAmount(logistics[0].total_amount);
      setCounter(1);
    }
  }, [logistics, counter]);

  const isPassingRestrictions = () => {
    if (
      amount != null &&
      dateFormChecker(productionDate) &&
      dateFormChecker(expirationDate)
    ) {
      if (amount <= 0) {
        message.error("The amount needs to be a positive number!");
        return false;
      } else if (expirationDate.isSameOrBefore(productionDate)) {
        message.error("Production date must come before expiration date!");
        return false;
      }
      return true;
    }
    message.error(
      "Amount, production date and expiration date needs to be filled!"
    );
    return false;
  };

  const checkEmptyInput = (input) => {
    return input === "" || input === "Invalid date" || input === null
      ? null
      : moment(input).format("YYYYMMDD");
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
      production_date: checkEmptyInput(productionDate),
      expiration_date: checkEmptyInput(expirationDate),
    };

    // API call and get the new generated stock_id
    API.sfp.addStock(id, data).then((res) => {
      data.stock_id = res.stock_id;
      console.log(data);

      // Update total amount
      updateTotalAmount(id, totalAmount + amount);

      /* Push new stock to form */
      editForm.add({
        stock_id: res.stock_id,
        old_amount: data.amount,
        subtracted_amount: 0,
        new_amount: data.amount,
        total_amount: newTotalAmount,
      });
    });

    /* Update the lists */
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

    console.log("Form before reduction: " + editForm.stocks);
    sendReductionsToAPI();
    updateTotalAmount(id, totalAmount - totalReducedAmount);

    //Update the lists
    const filteredList = logisticList.filter((e) => e.amount !== 0);
    editForm.updateForm();
    setLogisticList(filteredList);
    sendReductionToParent(filteredList, totalReducedAmount);
    console.log("New Form: " + editForm.stocks);
    close(e);
  };

  const dateFormChecker = (date) => {
    return date !== "" && date !== null;
  };

  const updateTotalAmount = (id, amount) => {
    editForm.updateTotalAmount(amount);
    API.sfp.updateTotalAmount(id, amount);
    setTotalAmount(amount);
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
