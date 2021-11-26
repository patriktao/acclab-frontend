import React from "react";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import "./TooltipComponent";

const TooltipComponent = ({ component, text, trigger }) => {
  TooltipComponent.propTypes = {
    text: PropTypes.string,
    component: PropTypes.any,
  };

  return (
    <Tooltip title={text} color="#00bdf2" trigger={trigger}>
      {component}
    </Tooltip>
  );
};

export default TooltipComponent;
