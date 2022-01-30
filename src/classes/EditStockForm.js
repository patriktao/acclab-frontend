class EditStockForm {
  #stocks = [];
  #totalAmount = 0;

  constructor(data) {
    if (data !== undefined && data !== null) {
      data.forEach((stock) => {
        this.#stocks.push({
          stock_id: stock.stock_id,
          old_amount: stock.amount,
          subtracted_amount: 0,
          new_amount: stock.amount,
          total_amount: stock.total_amount,
        });
        this.#totalAmount = stock.total_amount;
      });
    }
  }

  get stocks() {
    return this.#stocks;
  }

  get totalAmount() {
    return this.#totalAmount;
  }

  set totalAmount(amount) {
    if (typeof amount === Number && amount >= 0) {
      this.#totalAmount = amount;
    }
  }

  edit(stock_id, editedAmount, currentAmount) {
    if (
      editedAmount !== null &&
      editedAmount <= currentAmount &&
      editedAmount >= 0
    ) {
      this.#stocks.some((stock) => {
        if (stock.stock_id === stock_id) {
          stock.subtracted_amount = editedAmount;
          stock.new_amount = stock.old_amount - editedAmount;
        }
      });
    }
  }

  updateTotalAmount(newTotalAmount) {
    this.#stocks.forEach((stock) => {
      stock.total_amount = newTotalAmount;
    });
  }

  add(new_stock) {
    this.#stocks.push(new_stock);
  }

  updateForm() {
    const temp = this.#stocks.filter((e) => e.new_amount !== 0);
    this.#stocks = temp;
  }
}

export default EditStockForm;
