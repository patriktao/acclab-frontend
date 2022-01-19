import FilterModal from "../../../General/FilterModal";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { API } from "../../../../api";
import {
  InputSelect,
  InputRangePicker,
  PriorityChooser,
} from "../../../InputFields";
import { Button } from "antd";

const SfpFilter = ({
  filterVisible,
  closeFilter,
  handleFilter,
  handleClear,
}) => {
  SfpFilter.propTypes = {
    filterVisible: PropTypes.bool,
    closeFilter: PropTypes.func,
    handleFilter: PropTypes.func,
    handleClear: PropTypes.func,
  };

  /* Data Fields */
  const [locations, setLocations] = useState([]);

  /* Input Fields */
  const [location, setLocation] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [priority, setPriority] = useState("");

  useEffect(() => {
    API.locations.fetchLocations().then((res) => setLocations(res));
  }, []);

  const passStatesToParent = (e) => {
    handleFilter({
      location: location,
      expiration_date: expirationDate,
      priority: priority,
    });
    closeFilter(e);
  };

  const resetFields = () => {
    setLocation(null);
    setExpirationDate(null);
    setPriority("");
    handleClear();
  };

  const handlePriority = (e) => {
    if (e.target.value === "") {
      setPriority("");
    } else {
      setPriority(e.target.value);
    }
  };

  return (
    <FilterModal
      visible={filterVisible}
      onCancel={closeFilter}
      onOk={(e) => passStatesToParent(e)}
      content={
        <section className="rows">
          <div className="columns">
            <InputSelect
              header="Stored Location"
              options={locations}
              value={location}
              placeholder="All locations..."
              onChange={(e) => setLocation(e)}
            />
            <InputRangePicker
              header="Expiration Date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e)}
            />
          </div>
          <div className="priority-clear">
            <PriorityChooser value={priority} onClick={handlePriority} />
            <Button type="dashed" onClick={resetFields}>
              Reset
            </Button>
          </div>
        </section>
      }
    />
  );
};

export default SfpFilter;
