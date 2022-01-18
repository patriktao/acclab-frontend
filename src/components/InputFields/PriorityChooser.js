import PropTypes from "prop-types";
import { Radio } from "antd";

const PriorityChooser = ({ header, value, onClick }) => {
  PriorityChooser.propTypes = {
    header: PropTypes.string,
    value: PropTypes.any,
    onClick: PropTypes.func,
  };

  return (
    <div name="priority" className="header-field-wrapper">
      <span className="sub-header">Priority for Usage</span>
      <Radio.Group defaultValue="" value={value} buttonStyle="solid">
        <Radio.Button value="" onClick={onClick}>
          All
        </Radio.Button>
        <Radio.Button value="low" onClick={onClick}>
          Low
        </Radio.Button>
        <Radio.Button value="normal" onClick={onClick}>
          Normal
        </Radio.Button>
        <Radio.Button value="high" onClick={onClick}>
          High
        </Radio.Button>
        <Radio.Button value="expired" onClick={onClick}>
          Expired
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default PriorityChooser;
