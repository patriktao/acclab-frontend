import PropTypes from "prop-types";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./EditRawMaterial.scss";
import TooltipComponent from "../../../components/TooltipComponent";
import InputNumber from "../../../components/InputNumber";
import { InboxOutlined } from "@ant-design/icons";
import {
  Modal,
  Input,
  AutoComplete,
  Button,
  Select,
  Form,
  Upload,
  message,
} from "antd";
import {
  fetchCompanies,
  fetchCountries,
  fetchForms,
  fetchLocations,
} from "../../../api";

const { Dragger } = Upload;
const { TextArea } = Input;

const EditRawMaterial = ({ visible, close, data, handleEdit, handleImage }) => {
  EditRawMaterial.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    data: PropTypes.object,
  };

  /* Data States */
  const [companies, setCompanies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [forms, setForms] = useState([]);
  const [locations, setLocations] = useState([]);

  /* Input Field States */
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [country, setCountry] = useState();
  const [unit, setUnit] = useState();
  const [form, setForm] = useState();
  const [location, setLocation] = useState();
  const [fat, setFat] = useState();
  const [carbohydrate, setCarbohydrate] = useState();
  const [protein, setProtein] = useState();
  const [salt, setSalt] = useState();
  const [sugar, setSugar] = useState();
  const [fiber, setFiber] = useState();
  const [content, setContent] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (data != null) {
      setName(data.material_name);
      setBrand(data.company);
      setCountry(data.country);
      setUnit(data.unit);
      setForm(data.form);
      setLocation(data.location);
      setFat(data.fat);
      setCarbohydrate(data.carbohydrate);
      setProtein(data.protein);
      setSalt(data.salt);
      setSugar(data.sugar);
      setFiber(data.fiber);
      setContent(data.content);
    }
    fetchCompanies().then((res) => setCompanies(res));
    fetchCountries().then((res) => setCountries(res));
    fetchLocations().then((res) => setLocations(res));
    fetchForms().then((res) => setForms(res));
  }, [data]);

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

  /* Passes all states and data to parent component */
  const sendDataToParent = async (e) => {
    const dataMap = new Map();
    dataMap.set("name", name);
    dataMap.set("brand", brand);
    dataMap.set("country", country);
    dataMap.set("unit", unit);
    dataMap.set("location", location);
    dataMap.set("form", form);
    dataMap.set("fat", fat);
    dataMap.set("protein", protein);
    dataMap.set("salt", salt);
    dataMap.set("carbohydrate", carbohydrate);
    dataMap.set("sugar", sugar);
    dataMap.set("fiber", fiber);
    dataMap.set("content", content);
    await handleEdit(dataMap);
    close(e);
  };

  /* Functions */
  function beforeUpload(file) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const size = file.size / 1024 / 1024 < 5;
    if (!size) {
      message.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && size;
  }

  function readFile(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const uploadImage = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      setImageLoading(true);
      console.log(info.file, info.fileList);
      return;
    }
    if (status === "done") {
      readFile(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setImageLoading(false);
        handleImage();
      });
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Succesfully edited raw material");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.success("Failed editing raw material");
  };

  /* Api Requests */
  const handleForm = async (e) => {};

  return (
    <Modal
      centered
      visible={visible}
      onOk={sendDataToParent}
      onCancel={close}
      width={"950px"}
    >
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          name: name,
          brand: brand,
          country: country,
        }}
      >
        <section className="EditRawMaterial">
          <section className="general">
            <h1>Edit {name}</h1>
            <div className="rows">
              <div className="image-wrapper">
                <div className="column-wrapper">
                  <div className="column-1">
                    <div className="header-field-wrapper">
                      <span className="sub-header">Material Name</span>
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input material name!",
                          },
                        ]}
                      >
                        <Input
                          className="input-text"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          placeholder="Enter material name..."
                          required
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="column-2">
                    <div className="header-field-wrapper">
                      <span className="sub-header">Brand</span>
                      <div className="field-add-wrapper">
                        <Form.Item
                          name="brand"
                          rules={[
                            {
                              required: true,
                              message: "Please choose a brand!",
                            },
                          ]}
                        >
                          <AutoComplete
                            dataSource={companies.map((e) => e.company)}
                            filterOption={(inputValue, option) =>
                              option.value
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                            }
                            onChange={(e) => setBrand(e)}
                            value={brand}
                            allowClear
                          >
                            <Input
                              className="input-text"
                              placeholder="Select a brand..."
                              suffix={
                                <SearchOutlined style={{ fontSize: "1rem" }} />
                              }
                            />
                          </AutoComplete>
                        </Form.Item>
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
                      <Form.Item
                        name="country"
                        rules={[
                          {
                            required: true,
                            message: "Please choose a country!",
                          },
                        ]}
                      >
                        <AutoComplete
                          dataSource={countries.map((e) => e.country)}
                          filterOption={(inputValue, option) =>
                            option.value
                              .toUpperCase()
                              .indexOf(inputValue.toUpperCase()) !== -1
                          }
                          onChange={(e) => setCountry(e)}
                          value={country}
                          allowClear
                        >
                          <Input
                            className="input-text"
                            placeholder="Choose a country..."
                            suffix={
                              <SearchOutlined style={{ fontSize: "1rem" }} />
                            }
                          />
                        </AutoComplete>
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div name="ImageUpload">
                  <Dragger
                    listType="text"
                    name="file"
                    maxCount={1}
                    onDrop={(e) => {
                      setImageUrl("");
                      console.log("Dropped files", e.dataTransfer.files);
                    }}
                    onChange={uploadImage}
                    beforeUpload={beforeUpload}
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
                  <InputNumber value={fat} onChange={(e) => setFat(e)} />
                </div>
                <div className="header-field-wrapper">
                  <span className="sub-header">Carbohydrate</span>
                  <InputNumber
                    value={carbohydrate}
                    onChange={(e) => setCarbohydrate(e)}
                  />
                </div>
                <div className="header-field-wrapper">
                  <span className="sub-header">Protein</span>
                  <InputNumber
                    value={protein}
                    onChange={(e) => setProtein(e)}
                  />
                </div>
                <div className="header-field-wrapper">
                  <span className="sub-header">Salt</span>
                  <InputNumber value={salt} onChange={(e) => setSalt(e)} />
                </div>
                <div className="header-field-wrapper">
                  <span className="sub-header">Sugar</span>
                  <InputNumber value={sugar} onChange={(e) => setSugar(e)} />
                </div>
                <div className="header-field-wrapper">
                  <span className="sub-header">Fiber</span>
                  <InputNumber value={fiber} onChange={(e) => setFiber(e)} />
                </div>
              </div>
              <div className="header-field-wrapper">
                <span className="sub-header">Content</span>
                <TextArea
                  className="input-text"
                  placeholder="Write the content of the raw material..."
                  autoSize={{ minRows: 3 }}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
          </section>
        </section>
      </Form>
    </Modal>
  );
};

export default EditRawMaterial;
