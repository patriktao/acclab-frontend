import PropTypes from "prop-types";

export const sortList = (array) => {
  sortList.propTypes = {
    array: PropTypes.array,
  };
  array.forEach((a) => console.log(a));
  const sortedList = array.sort((a, b) => a.name.localeCompare(b.name));
  return sortedList;
};
