import PropTypes from "prop-types";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const InputRangePicker = ({ header, value, onChange }) => {
  InputRangePicker.propTypes = {
    header: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
  };

  return (
    <div name={`${header}`} className="header-field-wrapper">
      <span className="sub-header">{header}</span>
      <RangePicker
        allowClear
        showToday
        className="input-date"
        format={"MMM D, YYYY"}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputRangePicker;
