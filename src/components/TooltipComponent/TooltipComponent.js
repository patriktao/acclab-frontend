import React from "react";
import { Tooltip } from "antd";
import PropTypes from "prop-types";

const TooltipComponent = ({ component, text }) => {
  TooltipComponent.propTypes = {
    text: PropTypes.string,
    component: PropTypes.any,
  };

  return (
    <Tooltip
      disableTriggerFocus={true}
      title={text}
      color="#00bdf2"
      placement="top"
    >
      {component}
    </Tooltip>
  );
};

export default TooltipComponent;
