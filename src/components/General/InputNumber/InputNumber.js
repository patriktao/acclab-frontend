import React, { useEffect, useState } from "react";
import { InputNumber as AntInputNumber } from "antd";
import PropTypes from "prop-types";
import "../../../styles/inputfields.scss";

const InputNumber = ({
  children,
  value,
  onChange,
  defaultValue,
  max,
  style,
  placeholder,
}) => {
  InputNumber.propTypes = {
    value: PropTypes.number,
    children: PropTypes.any,
    onChange: PropTypes.func,
    defaultValue: PropTypes.any,
    max: PropTypes.number,
    placeholder: PropTypes.string,
  };

  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    typeof value === String
      ? setInputValue(parseInt(value))
      : setInputValue(value);
  }, [value]);

  return (
    <AntInputNumber
      className="input-number"
      type="number"
      placeholder={placeholder}
      value={inputValue}
      onChange={onChange}
      min={0}
      max={max}
      style={style}
      step={0.1}
      defaultValue={defaultValue}
    >
      {children}
    </AntInputNumber>
  );
};

export default InputNumber;
