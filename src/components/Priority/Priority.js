import moment from "moment";
import "./Priority.scss";

/* 
  Calculates the priority of an expiration date
*/

export const getPriority = (expirationDate) => {
  const difference = moment(expirationDate).diff(moment(), "days");
  switch (difference) {
    case difference < 0:
      return "expired";
    case difference < 30:
      return "high";
    case difference < 90:
      return "normal";
    default:
      return "low";
  }
};

/* Handles expiration date and returns icon */
export const getPriorityIcon = (expirationDate) => {
  const difference = moment(expirationDate).diff(moment(), "days");
  let color = "";
  let priority = "";
    if(difference < 0){
      priority = "Expired";
      color = "#ff4d4f";
    }
    else if(difference < 30){
      priority = "High";
      color = "#F2C94C";
    }
    else if(difference < 90){
      priority = "Normal";
      color = "#29CC97";
    }
    else {
      priority = "Low";
      color = "#9A9DA5";
    }
  return (
    <div className="Priority">
      <div className="priority-design" style={{ background: `${color}` }}>
        {priority.toUpperCase()}
      </div>
    </div>
  );
};
