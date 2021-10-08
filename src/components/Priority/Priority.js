import moment from "moment";
import "./Priority.scss";

export const getPriority = (expirationDate) => {
  const difference = moment(expirationDate).diff(moment(), "days");
  if (difference < 0) {
    return "expired";
  } else if (difference < 30) {
    return "high";
  } else if (difference < 90) {
    return "normal";
  } else {
    return "low";
  }
};

/* Handles expiration date and returns icon */
export const getPriorityIcon = (expirationDate) => {
  const difference = moment(expirationDate).diff(moment(), "days");
  console.log(difference);
  if (difference < 0) {
    return PriorityIcon("Expired");
  } else if (difference < 30) {
    return PriorityIcon("High");
  } else if (difference < 90) {
    return PriorityIcon("Normal");
  } else {
    return PriorityIcon("Low");
  }
};

/* Helper */

const PriorityIcon = (priority) => {
  let choice = priority.toLowerCase();
  let color = "";
  console.log(choice);
  switch (choice) {
    case (choice = "expired"):
      color = "#ff4d4f";
      break;
    case (choice = "high"):
      color = "#F2C94C";
      break;
    case (choice = "normal"):
      color = "#29CC97";
      break;
    case (choice = "low"):
      color = "#9A9DA5";
      break;
    default:
      color = "";
      break;
  }
  return (
    <div className="priority-icon">
      <div className="priority-design" style={{ background: `${color}` }}>
        {priority.toUpperCase()}
      </div>
    </div>
  );
};
