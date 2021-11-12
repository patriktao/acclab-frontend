import { Modal, Input, AutoComplete, Button, Select, Form } from "antd";
import PropTypes from "prop-types";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./AddRawMaterial.scss";
import TooltipComponent from "../../TooltipComponent";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { API } from "../../../api";

const { Dragger } = Upload;
const { TextArea } = Input;

const AddRawMaterial = ({ visible, close }) => {
  AddRawMaterial.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
  };

  /* Data States */
  const [companies, setCompanies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [forms, setForms] = useState([]);
  const [locations, setLocations] = useState([]);

  /* Input States */
  const [name, setName] = useState("");
  const [brand, setBrand] = useState();
  const [country, setCountry] = useState();
  const [unit, setUnit] = useState();
  const [form, setForm] = useState();
  const [location, setLocation] = useState();
  const [content, setContent] = useState();

  /* Fetch */
  useEffect(() => {
    API.rawMaterial.fetchCompanies().then((res) => setCompanies(res));
    API.rawMaterial.fetchCountries().then((res) => setCountries(res));
    API.rawMaterial.fetchLocations().then((res) => setLocations(res));
    API.rawMaterial.fetchForms().then((res) => setForms(res));
  }, []);

  const units = [
    {
      value: "g",
      name: "g",
    },
    {
      value: "units",
      name: "units",
    },
  ];

  const handleImage = (info) => {
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

  return (
    <Modal
      centered
      visible={visible}
      onOk={close}
      onCancel={close}
      width={"950px"}
    >
      <section className="AddMaterialModal">
        <section className="general">
          <h1>Add a raw material</h1>
          <div className="rows">
            <div className="image-wrapper">
              <div className="column-wrapper">
                <div className="column-1">
                  <div className="header-field-wrapper">
                    <span className="sub-header">Material Name</span>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your email",
                        },
                      ]}
                    >
                      <Input
                        className="input-text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter material name..."
                        allowClear
                        required
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="column-2">
                  <div className="header-field-wrapper">
                    <span className="sub-header">Brand</span>
                    <div className="field-add-wrapper">
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
                          placeholder="Select a brand..."
                          suffix={
                            <SearchOutlined style={{ fontSize: "1rem" }} />
                          }
                        />
                      </AutoComplete>
                      <TooltipComponent
                        text="Add a new brand"
                        component={
                          <Button className="button">
                            <PlusOutlined />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                  <div className="header-field-wrapper">
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
                        placeholder="Choose a country..."
                        suffix={<SearchOutlined style={{ fontSize: "1rem" }} />}
                      />
                    </AutoComplete>
                  </div>
                </div>
              </div>
              <div name="ImageUpload">
                <Dragger
                  listType="text"
                  name="file"
                  maxCount={1}
                  onDrop={(e) =>
                    console.log("Dropped files", e.dataTransfer.files)
                  }
                  onChange={handleImage}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for PNG. and JPEG. files.
                  </p>
                </Dragger>
              </div>
            </div>

            <div className="column-3">
              <div className="header-field-wrapper">
                <span className="sub-header">Unit</span>
                <Select
                  options={units}
                  placeholder="Select here..."
                  onChange={(e) => setUnit(e)}
                  value={unit}
                />
              </div>
              <div className="header-field-wrapper">
                <span className="sub-header">Material Form</span>
                <Select
                  options={forms}
                  placeholder="Select here..."
                  onChange={(e) => setForm(e)}
                  value={form}
                />
              </div>
              <div className="header-field-wrapper">
                <span className="sub-header">Stored Location</span>
                <div className="field-add-wrapper">
                  <Select
                    options={locations}
                    value={location}
                    placeholder="Select here..."
                    onChange={(e) => setLocation(e)}
                  />
                  <TooltipComponent
                    text="Add a new location"
                    component={
                      <Button className="button">
                        <PlusOutlined />
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="facts">
          <h2>Nuitritional Facts (per 100g)</h2>
          <div className="rows">
            <div className="column-4">
              <div className="header-field-wrapper">
                <span className="sub-header">Fat</span>
                <Input
                  className="input-text"
                  maxLength={0}
                  type="number"
                  placeholder="0"
                />
              </div>
              <div className="header-field-wrapper">
                <span className="sub-header">Carbohydrate</span>
                <Input className="input-text" type="number" placeholder="0" />
              </div>
              <div className="header-field-wrapper">
                <span className="sub-header">Protein</span>
                <Input className="input-text" type="number" placeholder="0" />
              </div>
              <div className="header-field-wrapper">
                <span className="sub-header">Salt</span>
                <Input className="input-text" type="number" placeholder="0" />
              </div>
              <div className="header-field-wrapper">
                <span className="sub-header">Sugar</span>
                <Input className="input-text" type="number" placeholder="0" />
              </div>
              <div className="header-field-wrapper">
                <span className="sub-header">Fibre</span>
                <Input className="input-text" type="number" placeholder="0" />
              </div>
            </div>
            <div className="header-field-wrapper">
              <span className="sub-header">Content</span>
              <TextArea
                className="input-text"
                placeholder="Write the content of the raw material..."
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                autoSize={{ minRows: 3 }}
              />
            </div>
          </div>
        </section>
      </section>
    </Modal>
  );
};

export default AddRawMaterial;
