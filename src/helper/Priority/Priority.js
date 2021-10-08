import moment from "moment";

const getPriority = (expirationDate) => {
  const date = moment(expirationDate).format("MMM D, YYYY");
  const today = moment().startOf("day");
  const difference = moment.duration(today.diff(date)).asDays();
  switch (difference) {
    case difference <= 0:
      return "Expired";
    case difference <= 20:
      return "High";
    case difference <= 50:
      return "Normal";
    default:
      return "Low";
  }
};

const getPriorityIcon = (expirationDate) => {
  console.log(expirationDate);
  const date = moment(expirationDate).format("MMM D, YYYY");
  const today = moment().format("MMM D, YYYY");
  const difference = date.diff(today, "days");
  switch (difference) {
    case difference <= 0:
      return <div>Test</div>;
    case difference <= 20:
      return <div>Test</div>;
    case difference <= 50:
      return <div>Test</div>;
    default:
      return <div>Test</div>;
  }
};

export { getPriority, getPriorityIcon };
