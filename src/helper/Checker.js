export const checkString = (o1, o2) => {
  if (o1 !== null && o1 !== "" && o1 !== o2) {
    return true;
  }
  return false;
};

export const checkNumber = (n1, n2) => {
  if (n1 != null && n1 !== n2 && n1 <= 100 && n1 >= 0) {
    return true;
  }
  if (n1 > 100 && n1 < 0) {
    console.log("Raw material nuitritional fact could not be updated");
  }
  return false;
};
