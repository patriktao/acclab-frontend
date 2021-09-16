import {
  Modal,
  AutoComplete,
  Input,
  Select,
  Form,
  DatePicker,
  Radio,
  Button,
} from "antd";
import PropTypes from "prop-types";
import "./FilterComponent.css";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;
const axios = require("axios");

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
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/brands/raw_material_companies");
        setCompanies(response.data);
      } catch (err) {
        if (err.response) {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchCompanies();

    const fetchCountries = async () => {
      try {
        const response = await axios.get("/brands/raw_material_countries");
        setCountries(response.data);
      } catch (err) {
        if (err.response) {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchCountries();

    const fetchForms = async () => {
      try {
        const response = await axios.get("/material_forms");
        const formsArray = [];
        response.data.forEach((item) => {
          formsArray.push({
            value: item.form,
            name: item.form,
          });
        });
        formsArray.sort((a, b) => a.name.localeCompare(b.name));
        setForms(formsArray);
      } catch (err) {
        if (err.response) {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchForms();

    const fetchLocations = async () => {
      try {
        const response = await axios.get("/stored_locations");
        const locationArray = [];
        response.data.forEach((item) => {
          locationArray.push({
            value: item.location,
            name: item.location,
          });
        });
        locationArray.sort((a, b) => a.name.localeCompare(b.name));
        setLocations(locationArray);
      } catch (err) {
        if (err.response) {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchLocations();
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

  /* Passes all states to parent component */
  const passStatesToParent = async (e) => {
    const stateMap = new Map();
    stateMap.set("brand", brand);
    stateMap.set("country", country);
    stateMap.set("location", location);
    stateMap.set("form", form);
    stateMap.set("receivedDate", receivedDate);
    stateMap.set("expirationDate", expirationDate);
    stateMap.set("priority", priority);
    await handleFilter(stateMap);
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
        className="filter-component"
        visible={filterVisible}
        onOk={passStatesToParent}
        onCancel={closeFilter}
        maskClosable={false}
      >
        <span className="modal-sub-header"> What are you looking for?</span>
        <h1 style={{ paddingBottom: "1rem" }}>Choose your filters</h1>
        <section className="modal-rows">
          <div className="modal-columns">
            <div name="Brand" className="header-field-component">
              <span className="modal-sub-header">Brand</span>
              <Form.Item>
                <AutoComplete
                  dataSource={companies.map((e) => e.company)}
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
                    className="input-autocomplete"
                    placeholder="All brands..."
                    suffix={<SearchOutlined style={{ fontSize: "1rem" }} />}
                  />
                </AutoComplete>
              </Form.Item>
            </div>
            <div name="Country" className="header-field-component">
              <span className="modal-sub-header">Country</span>
              <Form.Item>
                <AutoComplete
                  dataSource={countries.map((e) => e.country)}
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
                    className="input-autocomplete"
                    placeholder="All countries..."
                    suffix={<SearchOutlined style={{ fontSize: "1rem" }} />}
                  />
                </AutoComplete>
              </Form.Item>
            </div>
          </div>
          <div className="modal-columns">
            <div name="Location" className="header-field-component">
              <span className="modal-sub-header">Stored Location</span>
              <Form.Item>
                <Select
                  allowClear
                  options={locations}
                  value={location}
                  placeholder="All locations..."
                  onChange={(e) => setLocation(e)}
                />
              </Form.Item>
            </div>
            <div name="Form" className="header-field-component">
              <span className="modal-sub-header">Material Form</span>
              <Form.Item>
                <Select
                  allowClear
                  options={forms}
                  placeholder="All forms..."
                  onChange={(e) => setForm(e)}
                  value={form}
                />
              </Form.Item>
            </div>
          </div>
          <div className="modal-columns">
            <div className="header-field-component">
              <span className="modal-sub-header">Received Date</span>
              <RangePicker
                allowClear
                showToday
                className="date-component"
                format={"MMM D, YYYY"}
                value={receivedDate}
                onChange={(e) => setReceivedDate(e)}
              />
            </div>
            <div name="expiration-date" className="header-field-component">
              <span className="modal-sub-header">Expiration Date</span>
              <RangePicker
                allowClear
                showToday
                className="date-component"
                format={"MMM D, YYYY"}
                onChange={(e) => setExpirationDate(e)}
                value={expirationDate}
              />
            </div>
          </div>

          <div className="priority-clear">
            <div name="priority" className="header-field-component">
              <span className="modal-sub-header">Priority for Usage</span>
              <Radio.Group defaultValue="" value={priority} buttonStyle="solid">
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
      </Modal>
    </>
  );
};

export default FilterComponent;
