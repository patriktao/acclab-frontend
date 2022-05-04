import PropTypes from "prop-types";
import { DatePicker } from "antd";

const InputDatePicker = ({ header, value, onChange }) => {
  InputDatePicker.propTypes = {
    header: PropTypes.string,
    value: PropTypes.string || PropTypes.object,
    onChange: PropTypes.func,
  };

  return (
    <div name={`${header}`} className="header-field-wrapper">
      <span className="sub-header">{header}</span>
      <DatePicker
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

export default InputDatePicker;
