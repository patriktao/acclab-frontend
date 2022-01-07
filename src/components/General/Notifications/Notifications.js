import { notification } from "antd";

const duration = 6;

export const SuccessNotification = (description) => {
  notification["success"]({
    message: "Success",
    description: description,
    duration: duration,
  });
};

export const WarningNotification = (description) => {
  notification["warning"]({
    message: "Warning",
    description: description,
    duration: duration,
  });
};

export const ErrorNotification = (description) => {
  notification["error"]({
    message: "Error",
    description: description,
    duration: duration,
  });
};
