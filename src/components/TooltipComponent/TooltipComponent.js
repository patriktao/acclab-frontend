import React from "react";
import { Tooltip } from "antd";
import PropTypes from "prop-types";

const TooltipComponent = ({ children, text }) => {
  TooltipComponent.propTypes = {
    text: PropTypes.string,
    children: PropTypes.any,
  };

  return (
    <Tooltip title={text} color="#00bdf2" placement="top">
      {children}
    </Tooltip>
  );
};

export default TooltipComponent;
