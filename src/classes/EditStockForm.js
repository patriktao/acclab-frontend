import PropTypes from "prop-types";

class EditStockForm {
  #stocks = [];

  constructor(data) {
    if (data !== undefined && data !== null) {
      data.forEach((stock) => {
        this.#stocks.push({
          stock_id: stock.stock_id,
          old_amount: stock.amount,
          subtracted_amount: 0,
          new_amount: stock.amount,
        });
      });
    }
  }

  get stocks() {
    return this.#stocks;
  }

  edit(stock_id, editedAmount, currentAmount) {
    if (editedAmount !== null && 0 <= editedAmount <= currentAmount) {
      this.#stocks.forEach((stock) => {
        if (stock.stock_id === stock_id) {
          stock.subtracted_amount = editedAmount;
          stock.new_amount = stock.old_amount - editedAmount;
        }
      });
    }
  }

  add(stock_id, amount) {
    this.#stocks.push({
      stock_id: stock_id,
      old_amount: amount,
      subtracted_amount: 0,
      new_amount: amount,
    });
    console.log(this.#stocks);
  }

  updateForm() {
    const temp = this.#stocks.filter((e) => e.new_amount !== 0);
    this.#stocks = temp;
  }

  toJsonObject() {
    return JSON.stringify(this.#stocks);
  }
}

export default EditStockForm;
