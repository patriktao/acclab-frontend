import moment from "moment";

/* Checking if input and existing data is the same */

export const checkString = (o1, o2) => {
  if (o1 !== null && o1 !== "" && o1 !== o2) {
    return true;
  }
  return false;
};

/* Checking if input satisfies conditions in Edit Raw Material  */

export const checkNumber = (n1, n2) => {
  if (n1 != null && n1 !== n2 && n1 <= 100 && n1 >= 0) {
    return true;
  }
  if (n1 > 100 && n1 < 0) {
    console.log("Raw material nuitritional fact could not be updated");
  }
  return false;
};

/* Check the item date and if requirements are satisfied, return the date in string format */

export const checkDate = (inputData, startDate, endDate) => {
  const date = moment(inputData);
  if (startDate == null || endDate == null) {
    return "";
  } else if (
    (date.isAfter(startDate) || date.isSame(startDate, "date")) &&
    (date.isBefore(endDate) || date.isSame(endDate, "date"))
  ) {
    return date.format("YYYYMMDD");
  }
};