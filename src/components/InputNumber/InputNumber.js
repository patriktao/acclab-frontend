import React from "react";
import { InputNumber as AntInputNumber } from "antd";
import PropTypes from "prop-types";
import "../../styles/inputfields.scss";

const InputNumber = ({ children, value, onChange }) => {
  InputNumber.propTypes = {
    value: PropTypes.string,
    children: PropTypes.any,
    onChange: PropTypes.func,
  };

  return (
    <AntInputNumber
      className="input-number"
      type="number"
      placeholder="0"
      value={value}
      onChange={onChange}
      min={0}
      max={100}
      step={0.1}
    >
      {children}
    </AntInputNumber>
  );
};

export default InputNumber;
