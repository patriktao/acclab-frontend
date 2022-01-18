import PropTypes from "prop-types";
import { Select } from "antd";

const InputSelect = ({ header, options, onChange, value, placeholder }) => {
  InputSelect.propTypes = {
    header: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    value: PropTypes.any,
    placeholder: PropTypes.string,
  };

  return (
    <div name={`${header}`} className="header-field-wrapper">
      <span className="sub-header">{header}</span>
      <Select
        allowClear
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputSelect;
