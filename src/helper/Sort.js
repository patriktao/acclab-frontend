import PropTypes from "prop-types";

export const sortCompanies = (array) => {
  sortCompanies.propTypes = {
    array: PropTypes.array,
  };
  return array.sort((a, b) => a.company.localeCompare(b.company));
};