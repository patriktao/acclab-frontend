import moment from "moment";

/* Check if input and existing data is the same */

export const checkString = (o1, o2) => {
  return o1 !== null && o1 !== "" && o1 !== o2 ? true : false;
};

/* Check if input are equal, if input is empty string => return false */

export const checkURLString = (o1, o2) => {
  return o1 !== null && o1 !== o2 ? true : false;
};

/* Check if input satisfies conditions in Edit Raw Material  */

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
  }
  if (
    (date.isAfter(startDate) || date.isSame(startDate, "date")) &&
    (date.isBefore(endDate) || date.isSame(endDate, "date"))
  ) {
    return date.format("YYYYMMDD");
  }
};

export const dateFormChecker = (date) => {
  return date !== "" && date !== null;
};