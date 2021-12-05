import { notification } from "antd";

const openNotificationWithIcon = (type, description) => {
    notification[type]({
      message: 'Success',
      description: description,
      duration: 6,
    });
};

export default openNotificationWithIcon
