import { useEffect, useState } from "react";
import StockModal from "../StockModal";
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
  sendChangesToParent,
  totalAmount,
}) => {
  const [logisticList, setLogisticList] = useState([]);
  const [editForm, setEditForm] = useState();
  const [originalForm, setOriginalForm] = useState();
  const [amount, setAmount] = useState();
  const [productionDate, setProductionDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (logistics !== undefined) {
      setLogisticList(logistics);
      setEditForm(new EditStockForm(logistics));
      setOriginalForm(new EditStockForm(logistics));
    }
  }, [logistics]);

  const isPassingRestrictions = () => {
    if (
      amount !== null &&
      dateFormChecker(productionDate) &&
      quantity !== null
    ) {
      if (!(typeof amount === "number")) {
        message.error("Please enter a number in amount!");
        return false;
      } else if (quantity <= 0) {
        message.error("You need at least 1 quantity!");
        return false;
      } else if (!(typeof amount === "number")) {
        message.error("Please enter a number in quantity!");
        return false;
      }
      return true;
    }
    message.error(
      "Amount, quantity and production date need to be filled correctly!"
    );
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

    //Adding quantity
    let newList = logistics;
    let newAmount = totalAmount;
    for (let i = 0; i < quantity; i++) {
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

      newList = newList.concat(data);
      newAmount += amount;
    }
    API.sfp.updateTotalAmount(id);

    //Update UI
    setLogisticList(newList);
    sendChangesToParent(newList, newAmount);
    SuccessNotification("You have successfully added a new stock");
    close(e);
  };

  const reduceStock = async (e) => {
    //Reduction
    let newAmount = totalAmount;
    for (let i = 0; i < logisticList.length; i++) {
      logisticList[i].amount -= editForm.stocks[i].subtracted_amount;
      newAmount -= editForm.stocks[i].subtracted_amount;
    }

    //API Calls
    await editForm.stocks.forEach((e) => {
      if (e.new_amount === 0) {
        API.sfp.deleteStock(id, e);
      } else if (
        e.new_amount !== e.old_amount &&
        e.new_amount > 0 &&
        e.new_amount < e.old_amount
      ) {
        API.sfp.updateStock(id, e);
      }
    });
    API.sfp.updateTotalAmount(id);

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
    close(e);
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

export default ManageSfpStock;
