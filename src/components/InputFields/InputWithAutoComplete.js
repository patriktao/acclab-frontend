import PropTypes from "prop-types";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const InputWithAutoComplete = ({
  header,
  onChange,
  value,
  options,
  placeholder,
}) => {
  InputWithAutoComplete.propTypes = {
    header: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    options: PropTypes.array,
    placeholder: PropTypes.string,
  };

  return (
    <div name={`${header}`} className="header-field-wrapper">
      <span className="sub-header">{header}</span>
      <AutoComplete
        options={options}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={onChange}
        value={value}
      >
        <Input
          allowClear
          className="input-text"
          placeholder={placeholder}
          suffix={<SearchOutlined style={{ fontSize: "1rem" }} />}
        />
      </AutoComplete>
    </div>
  );
};

export default InputWithAutoComplete;
