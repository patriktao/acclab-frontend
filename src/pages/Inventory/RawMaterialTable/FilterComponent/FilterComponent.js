import {
  Modal,
  AutoComplete,
  Input,
  Select,
  Form,
  DatePicker,
  Radio,
} from "antd";
import PropTypes from "prop-types";
import "./FilterComponent.css";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;
const { Option } = Select;
const axios = require("axios");

const FilterComponent = ({ filterVisible, closeFilter }) => {
  /* Type Checker */
  FilterComponent.propTypes = {
    filterVisible: PropTypes.bool,
    closeFilter: PropTypes.func,
  };

  /* States */
  const [companies, setCompanies] = useState([]);
  const [forms, setForms] = useState([]);
  const [locations, setLocations] = useState([]);

  /* Fetch Data from Backend API */

  /* AutoComplete Component */
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/brands/companies");
        setCompanies(response.data);
      } catch (err) {
        if (err.response) {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchCompanies();

    /* Select Component have data type {value,name} */
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
        /* Sorting the List */
        locationArray.sort((a, b) => a.name.localeCompare(b.name));
        /* Set State */
        setLocations(locationArray);
      } catch (err) {
        if (err.response) {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchLocations();
  }, []);

  return (
    <>
      <Modal
        className="filter-component"
        visible={filterVisible}
        onOk={closeFilter}
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
                >
                  <Input
                    allowClear
                    className="brand-input-field"
                    placeholder="All brands..."
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
                  placeholder="Select location..."
                />
              </Form.Item>
            </div>
            <div name="Form" className="header-field-component">
              <span className="modal-sub-header">Material Form</span>
              <Form.Item>
                <Select
                  allowClear
                  options={forms}
                  placeholder="Select form..."
                />
              </Form.Item>
            </div>
          </div>

          <div className="modal-columns">
            <div name="recieved-date" className="header-field-component">
              <span className="modal-sub-header">Recieved Date</span>
              <RangePicker className="date-component" format={"MMM D, YYYY"} />
            </div>
            <div name="expiration-date" className="header-field-component">
              <span className="modal-sub-header">Expiration Date</span>
              <RangePicker className="date-component" format={"MMM D, YYYY"} />
            </div>
          </div>

          <div name="priority" className="header-field-component">
            <span className="modal-sub-header">Priority for Usage</span>
            <Radio.Group className="" defaultValue="a" buttonStyle="solid">
              <Radio.Button value="a">All</Radio.Button>
              <Radio.Button value="b">Low</Radio.Button>
              <Radio.Button value="c">Normal</Radio.Button>
              <Radio.Button value="d">High</Radio.Button>
              <Radio.Button value="e">Expried</Radio.Button>
            </Radio.Group>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default FilterComponent;
