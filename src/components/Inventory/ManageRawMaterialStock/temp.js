const addStock = (
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
