export const checkString = (o1, o2) => {
  if (o1 !== null && o1 !== "" && o1 !== o2) {
    return true;
  }
  return false;
};

export const checkNumber = (n1, n2) => {
  if (n1 != null && n1 !== n2) {
    return true;
  }
  return false;
};
