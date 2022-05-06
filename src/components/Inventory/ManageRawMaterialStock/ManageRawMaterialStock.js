import { useState, useEffect } from "react";
import moment from "moment";
import { message } from "antd";
import { API } from "../../../api";
import { SuccessNotification } from "../../General/Notifications";
import InputNumber from "../../General/InputNumber";
import EditStockForm from "../../../classes/EditStockForm";
import InputDatePicker from "../../InputFields/InputDatePicker";
import { dateFormChecker } from "../../../helper/Checker";
import StockModal from "../StockModal";

const ManageRawMaterialStock = ({
  close,
  visible,
  unit,
  logistics,
  id,
  sendChangesToParent,
  totalAmount,
}) => {
  const [logisticList, setLogisticList] = useState([]);
  const [editForm, setEditForm] = useState();
  const [originalForm, setOriginalForm] = useState();
  const [amount, setAmount] = useState();
  const [orderDate, setOrderDate] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (logistics.length !== undefined) {
      setLogisticList(logistics);
      setEditForm(new EditStockForm(logistics));
      setOriginalForm(new EditStockForm(logistics));
    }
  }, [logistics]);

  const checkEmptyInput = (input) => {
    return input === "" || input === "Invalid date" || input === null
      ? null
      : moment(input).format("YYYYMMDD");
  };

  const isPassingRestrictions = () => {
    if (
      amount != null &&
      dateFormChecker(receivedDate) &&
      dateFormChecker(expirationDate) &&
      quantity !== null
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
      "Amount, quantity, received date, and expiration date needs to be filled correctly!"
    );
    return false;
  };

  const addStock = async (e) => {
    if (!isPassingRestrictions()) {
      return;
    }

    let newList = logistics;
    let newAmount = totalAmount;
    for (let i = 0; i < quantity; i++) {
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
      newList = newList.concat(data);
      newAmount += amount;
    }
    API.rawMaterial.updateTotalAmount(id).then(() => {
      setLogisticList(newList);
      sendChangesToParent(newList, newAmount);
      SuccessNotification("You have successfully added new stock");
      close(e);
    });
  };

  const reduceStock = async (e) => {
    //Reduction
    let newAmount = totalAmount;
    for (let i = 0; i < logisticList.length; i++) {
      newAmount -= editForm.stocks[i].subtracted_amount;
      logisticList[i].amount -= editForm.stocks[i].subtracted_amount;
    }

    //API Calls
    await editForm.stocks.forEach((e) => {
      console.log(e);
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
    API.rawMaterial.updateTotalAmount(id).then(() => {
      //Remove empty stocks
      const filteredList = logisticList.filter((e) => e.amount !== 0);
      editForm.updateForm();

      //Update UI
      setLogisticList(filteredList);
      sendChangesToParent(filteredList, newAmount);

      //Notifications
      logisticList.forEach((e) => {
        if (e.amount === 0) {
          SuccessNotification(
            "You have successfully removed Stock " + e.stock_id
          );
        }
      });
      //Close Modal
      close(e);
    });
  };

  const AddStockComponents = (
    <div className="rows">
      <div className="column-1">
        <div className="header-field-wrapper">
          <span className="sub-header">Quantity</span>
          <InputNumber
            onChange={(e) => setQuantity(e)}
            value={quantity}
            placeholder="e.g. 2"
            min={1}
            max={24}
            step={1}
          />
        </div>
        <div className="header-field-wrapper">
          <span className="sub-header">Amount (In Each Package)</span>
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
    <StockModal
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
