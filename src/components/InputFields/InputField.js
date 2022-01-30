import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

const InputField = ({ header, onChange, value, placeholder }) => {
  InputField.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    header: PropTypes.string,
  };

  return (
    <div className="header-field-wrapper">
      <span className="sub-header">{header}</span>
      <Input
        className="input-text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputField;
