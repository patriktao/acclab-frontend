import {
  Modal,
  AutoComplete,
  Input,
  Select,
  DatePicker,
  Radio,
  Button,
} from "antd";
import PropTypes from "prop-types";
import "./FilterComponent.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { API } from "../../../api";

const { RangePicker } = DatePicker;

const FilterComponent = ({
  filterVisible,
  closeFilter,
  handleFilter,
  handleClear,
}) => {
  FilterComponent.propTypes = {
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
  const [location, setLocation] = useState();
  const [form, setForm] = useState();
  const [receivedDate, setReceivedDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [priority, setPriority] = useState();

  /* Fetches Data, the select components have data types {value, name} and require different method to handle */
  useEffect(() => {
    API.rawMaterial.fetchCompanies().then((res) => setCompanies(res));
    API.rawMaterial.fetchCountries().then((res) => setCountries(res));
    API.locations.fetchLocations().then((res) => setLocations(res));
    API.rawMaterial.fetchForms().then((res) => setForms(res));
  }, []);

  /* Resets all input fields */
  const resetFields = () => {
    setBrand("");
    setCountry("");
    setLocation();
    setForm();
    setReceivedDate(null);
    setExpirationDate(null);
    setPriority("");
    handleClear();
  };

  /* Passes all states and data to parent component */
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

  /* Handles priority change */
  const handlePriority = (e) => {
    if (e.target.value === "") {
      setPriority("");
    } else {
      setPriority(e.target.value);
    }
  };

  return (
    <>
      <Modal
        visible={filterVisible}
        onOk={passStatesToParent}
        onCancel={closeFilter}
        maskClosable={false}
        width={"650px"}
      >
        <section className="FilterComponent">
          <span className="sub-header"> What are you looking for?</span>
          <h1 style={{ paddingBottom: "1rem" }}>Choose your filters</h1>
          <section className="rows">
            <div className="columns">
              <div name="Brand" className="header-field-wrapper">
                <span className="sub-header">Brand</span>
                <AutoComplete
                  options={companies}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={(e) => setBrand(e)}
                  value={brand}
                >
                  <Input
                    allowClear
                    className="input-text"
                    placeholder="All brands..."
                    suffix={<SearchOutlined style={{ fontSize: "1rem" }} />}
                  />
                </AutoComplete>
              </div>
              <div name="Country" className="header-field-wrapper">
                <span className="sub-header">Country</span>
                <AutoComplete
                  options={countries}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={(e) => setCountry(e)}
                  value={country}
                >
                  <Input
                    allowClear
                    className="input-text"
                    placeholder="All countries..."
                    suffix={<SearchOutlined style={{ fontSize: "1rem" }} />}
                  />
                </AutoComplete>
              </div>
            </div>
            <div className="columns">
              <div name="Location" className="header-field-wrapper">
                <span className="sub-header">Stored Location</span>
                <Select
                  allowClear
                  options={locations}
                  value={location}
                  placeholder="All locations..."
                  onChange={(e) => setLocation(e)}
                />
              </div>
              <div name="Form" className="header-field-wrapper">
                <span className="sub-header">Material Form</span>
                <Select
                  allowClear
                  options={forms}
                  placeholder="All forms..."
                  onChange={(e) => setForm(e)}
                  value={form}
                />
              </div>
            </div>
            <div className="columns">
              <div className="header-field-wrapper">
                <span className="sub-header">Received Date</span>
                <RangePicker
                  allowClear
                  showToday
                  className="input-date"
                  format={"MMM D, YYYY"}
                  value={receivedDate}
                  onChange={(e) => setReceivedDate(e)}
                />
              </div>
              <div name="expiration-date" className="header-field-wrapper">
                <span className="sub-header">Expiration Date</span>
                <RangePicker
                  allowClear
                  showToday
                  className="input-date"
                  format={"MMM D, YYYY"}
                  onChange={(e) => setExpirationDate(e)}
                  value={expirationDate}
                />
              </div>
            </div>

            <div className="priority-clear">
              <div name="priority" className="header-field-wrapper">
                <span className="sub-header">Priority for Usage</span>
                <Radio.Group
                  defaultValue=""
                  value={priority}
                  buttonStyle="solid"
                >
                  <Radio.Button value="" onClick={handlePriority}>
                    All
                  </Radio.Button>
                  <Radio.Button value="low" onClick={handlePriority}>
                    Low
                  </Radio.Button>
                  <Radio.Button value="normal" onClick={handlePriority}>
                    Normal
                  </Radio.Button>
                  <Radio.Button value="high" onClick={handlePriority}>
                    High
                  </Radio.Button>
                  <Radio.Button value="expired" onClick={handlePriority}>
                    Expired
                  </Radio.Button>
                </Radio.Group>
              </div>
              <div>
                <Button type="dashed" onClick={resetFields}>
                  Reset
                </Button>
              </div>
            </div>
          </section>
        </section>
      </Modal>
    </>
  );
};

export default FilterComponent;
