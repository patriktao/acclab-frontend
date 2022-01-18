import { Button } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { API } from "../../../../api";
import {
  InputWithAutoComplete,
  InputSelect,
  PriorityChooser,
  InputRangePicker,
} from "../../../InputFields";
import FilterModal from "../../../General/FilterModal";

const RawMaterialFilter = ({
  filterVisible,
  closeFilter,
  handleFilter,
  handleClear,
}) => {
  RawMaterialFilter.propTypes = {
    filterVisible: PropTypes.bool,
    closeFilter: PropTypes.func,
    handleFilter: PropTypes.func,
    handleClear: PropTypes.func,
  };

  /* Data States */
  const [companies, setCompanies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [forms, setForms] = useState([]);
  const [locations, setLocations] = useState([]);

  /* Input Field States */
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState(null);
  const [form, setForm] = useState(null);
  const [receivedDate, setReceivedDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [priority, setPriority] = useState("");

  useEffect(() => {
    API.rawMaterial.fetchCompanies().then((res) => setCompanies(res));
    API.rawMaterial.fetchCountries().then((res) => setCountries(res));
    API.locations.fetchLocations().then((res) => setLocations(res));
    API.materialforms.fetchForms().then((res) => setForms(res));
  }, []);

  const resetFields = () => {
    setBrand("");
    setCountry("");
    setLocation(null);
    setForm(null);
    setReceivedDate(null);
    setExpirationDate(null);
    setPriority("");
    handleClear();
  };

  const passStatesToParent = async (e) => {
    const dataMap = new Map();
    dataMap.set("brand", brand);
    dataMap.set("country", country);
    dataMap.set("location", location);
    dataMap.set("form", form);
    dataMap.set("receivedDate", receivedDate);
    dataMap.set("expirationDate", expirationDate);
    dataMap.set("priority", priority);
    await handleFilter(dataMap);
    closeFilter(e);
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
      onOk={passStatesToParent}
      onCancel={closeFilter}
      content={
        <section className="rows">
          <div className="columns">
            <InputWithAutoComplete
              header="Brand"
              onChange={(e) => setBrand(e)}
              value={brand}
              options={companies}
              placeholder={"All brands..."}
            />
            <InputWithAutoComplete
              header="Country"
              onChange={(e) => setCountry(e)}
              value={country}
              options={countries}
              placeholder="All countries..."
            />
          </div>
          <div className="columns">
            <InputSelect
              header="Stored Location"
              options={locations}
              value={location}
              placeholder="All locations..."
              onChange={(e) => setLocation(e)}
            />
            <InputSelect
              header="Material Form"
              options={forms}
              value={form}
              placeholder="All forms..."
              onChange={(e) => setForm(e)}
            />
          </div>
          <div className="columns">
            <InputRangePicker
              header="Received Date"
              value={receivedDate}
              onChange={(e) => setReceivedDate(e)}
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

export default RawMaterialFilter;
