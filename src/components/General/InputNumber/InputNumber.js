import React, { useEffect, useState } from "react";
import { InputNumber as AntInputNumber } from "antd";
import PropTypes from "prop-types";
import "../../../styles/inputfields.scss";

const InputNumber = ({
  children,
  value,
  onChange,
  min,
  max,
  style,
  placeholder,
  step,
}) => {
  InputNumber.propTypes = {
    value: PropTypes.number,
    children: PropTypes.any,
    onChange: PropTypes.func,
    max: PropTypes.number,
    placeholder: PropTypes.string,
    step: PropTypes.number,
    min: PropTypes.number,
  };

  const [inputValue, setInputValue] = useState();
  const [stepValue, setStepValue] = useState();

  useEffect(() => {
    typeof value === String
      ? setInputValue(parseInt(value))
      : setInputValue(value);
    if (step === undefined) {
      setStepValue(0.1);
    } else {
      setStepValue(step);
    }
  }, [value, step]);

  return (
    <AntInputNumber
      className="input-number"
      type="number"
      placeholder={placeholder}
      value={inputValue}
      size={"small"}
      onChange={onChange}
      min={min}
      max={max}
      style={style}
      step={stepValue}
    >
      {children}
    </AntInputNumber>
  );
};

export default InputNumber;
