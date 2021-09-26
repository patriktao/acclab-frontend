import React from "react";
import { useState } from "react";
import {
  AutoComplete,
  Input,
  Select,
  Form,
  DatePicker,
  Button,
  Upload,
  Divider,
  Modal,
  message,
  Drawer,
} from "antd";
import { SearchOutlined, InboxOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Dragger } = Upload;
let index = 0;

const AddMaterial = ({ visible, close }) => {
  /* Data States */
  const [companies, setCompanies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [forms, setForms] = useState([]);
  const [locations, setLocations] = useState([]);
  const [companyName, setCompanyName] = useState();

  /* Input Field States */
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState();
  const [form, setForm] = useState();
  const [receivedDate, setReceivedDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);

  /* Resets all input fields */
  const resetFields = () => {
    setName("");
    setBrand("");
    setCountry("");
    setLocation();
    setForm();
    setReceivedDate(null);
    setExpirationDate(null);
  };
/* 
  const handleUpload = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
  }; */

  const onNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const addItem = () => {
    console.log("addItem");
    setCompanies([...companies, name || `New item ${index++}`]);
    setCompanyName("");
  };

  return (
    <div>
      <Modal
        className="drawer-style"
        onClose={close}
        onOK={close}
        visible={visible}
        placement="right"
        width={950}
      >
        <section>
          <div>
            <span className="modal-sub-header">Enter material details</span>
            <h1 style={{ paddingBottom: "1rem" }}>Add a raw material</h1>
            <section className="modal-rows">
              <div className="modal-columns">
                <div name="Name" className="header-field-component">
                  <span className="modal-sub-header">Material Name</span>
                  <Input
                    allowClear
                    className="input-autocomplete"
                    placeholder="Enter material name..."
                    onChange={(e) => setCompanyName(e)}
                  />
                </div>
              </div>
              <div className="modal-columns">
                <div name="Name" className="header-field-component">
                  <span className="modal-sub-header"></span>
                  {/*                   <Input
                    allowClear
                    className="input-autocomplete"
                    placeholder="Enter material name..."
                    onChange={(e) => setName(e)}
                  /> */}
                  <Select
                    style={{ width: 240 }}
                    placeholder="custom dropdown render"
                    dropdownRender={(menu) => (
                      <div>
                        {menu}
                        <Divider style={{ margin: "4px 0" }} />
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            padding: 8,
                          }}
                        >
                          <Input
                            style={{ flex: "auto" }}
                            value={companyName}
                            onChange={onNameChange}
                          />
                          <a
                            style={{
                              flex: "none",
                              padding: "8px",
                              display: "block",
                              cursor: "pointer",
                            }}
                            onClick={addItem}
                          >
                            <PlusOutlined /> Add item
                          </a>
                        </div>
                      </div>
                    )}
                  >
                    {companies.map((item) => (
                      <Option key={item}>{item}</Option>
                    ))}
                  </Select>
                </div>
              </div>
            </section>
          </div>
        </section>
      </Modal>
    </div>
  );
};

export default AddMaterial;
