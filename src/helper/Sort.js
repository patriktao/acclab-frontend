import PropTypes from "prop-types";

export const sortCompanies = (array) => {
  sortCompanies.propTypes = {
    array: PropTypes.array,
  };
  array.forEach((a) => console.log(a));
  const sortedList = array.sort((a, b) => a.name.localeCompare(b.name));
  return sortedList;
};
