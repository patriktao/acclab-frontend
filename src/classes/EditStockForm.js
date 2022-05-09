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

  edit(stock_id, editAmount, currentAmount) {
    if (editAmount === null || editAmount === undefined) {
      this.adjustStock(stock_id, 0);
    } else if (0 <= editAmount <= currentAmount) {
      this.adjustStock(stock_id, editAmount);
    }
  }

  async adjustStock(stock_id, editAmount) {
    const stock = await this.#stocks.find((s) => s.stock_id === stock_id);
    stock.subtracted_amount = editAmount;
    stock.new_amount = stock.old_amount - editAmount;
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
