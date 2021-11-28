import PropTypes from "prop-types";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./EditRawMaterial.scss";
import TooltipComponent from "../TooltipComponent";
import InputNumber from "../InputNumber";
import { InboxOutlined } from "@ant-design/icons";
import { isEqual } from "lodash/fp";
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
import { API } from "../../api";
import { sortCompanies } from "../../helper/Sort";
import RawMaterialClass from "../../classes/RawMaterialClass";
import EditBrands from "../EditBrands";
import EditLocations from "../EditLocations";

const { Dragger } = Upload;
const { TextArea } = Input;

const EditRawMaterial = ({ visible, close, data, handleEdit, handleImage }) => {
  EditRawMaterial.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    data: PropTypes.object,
    handleEdit: PropTypes.func,
  };

  /* Modal States */
  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  /* Data States */
  const [brands, setBrands] = useState([]);
  const [countries, setCountries] = useState([]);
  const [forms, setForms] = useState([]);
  const [locations, setLocations] = useState([]);

  /* Input Field States */
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("");
  const [unit, setUnit] = useState("");
  const [form, setForm] = useState("");
  const [location, setLocation] = useState("");
  const [fat, setFat] = useState(0);
  const [carb, setCarb] = useState(0);
  const [protein, setProtein] = useState(0);
  const [salt, setSalt] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [content, setContent] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState("");
  const [rawMaterialForm, setRawMaterialForm] = useState();
  const [oldRawMaterial, setOldRawMaterial] = useState();

  useEffect(() => {
    const fetchData = () => {
      API.brands.fetchAllCompanies().then((res) => setBrands(res));
      API.brands.fetchAllCountries().then((res) => setCountries(res));
      API.locations.fetchLocations().then((res) => setLocations(res));
      API.rawMaterial.fetchForms().then((res) => setForms(res));
    };

    const setData = () => {
      if (data != null) {
        setName(data.material_name);
        setBrand(data.company);
        setCountry(data.country);
        setUnit(data.unit);
        setForm(data.form);
        setLocation(data.location);
        setFat(data.fat);
        setCarb(data.carbohydrate);
        setProtein(data.protein);
        setSalt(data.salt);
        setSugar(data.sugar);
        setFiber(data.fiber);
        setContent(data.content);
        setRawMaterialForm(new RawMaterialClass(data));
        setOldRawMaterial(new RawMaterialClass(data));
      }
    };
    fetchData();
    setData();
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

  const handleOk = (e) => {
    rawMaterialForm.name = name;
    rawMaterialForm.brand = brand;
    rawMaterialForm.country = country;
    rawMaterialForm.unit = unit;
    rawMaterialForm.location = location;
    rawMaterialForm.form = form;
    rawMaterialForm.fat = fat;
    rawMaterialForm.protein = protein;
    rawMaterialForm.salt = salt;
    rawMaterialForm.carb = carb;
    rawMaterialForm.sugar = sugar;
    rawMaterialForm.fiber = fiber;
    rawMaterialForm.content = content;
    rawMaterialForm.image = image;
    if (!isEqual(rawMaterialForm, oldRawMaterial)) {
      sendDataToParent();
      sendDataToAPI();
    }
    close(e);
  };

  const sendDataToParent = () => {
    handleEdit(rawMaterialForm);
  };

  const sendDataToAPI = () => {
    API.rawMaterial.editMaterial(
      data.raw_material_id,
      rawMaterialForm.toJsonObject()[0]
    );
  };

  const openLocationModal = () => {
    setLocationModalVisible(true);
  };

  const closeLocationModal = (e) => {
    e.stopPropagation();
    setLocationModalVisible(false);
  };

  const openBrandModal = () => {
    setBrandModalVisible(true);
  };

  const closeBrandModal = (e) => {
    e.stopPropagation();
    setBrandModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Succesfully edited raw material");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.success("Failed editing raw material");
  };

  /* 
    Sets a new list for brands; used to add, delete and edit a brand from EditBrands.
  */
  const setCurrentBrands = (list) => {
    setBrands(list);
  };

  /* 
    Sets a new list for stored locations; used to add, delete and edit a location from EditLocations.
  */
    const setCurrentLocations = (list) => {
      setLocations(list);
    }

  /* Image Upload */
  /*   function beforeUpload(file) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    const size = file.size < 7e6;
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    if (!size) {
      message.error("Image must smaller than 7MB!");
    }
    return isJpgOrPng && size;
  } */

  const uploadImage = (info) => {
    console.log(info.file.linkProps);
    /* const status = info.file.status;
    if (status === "uploading") {
      console.log(info.file, info.fileList);
      return;
    }
    if (status === "done") {
      setImage(info.file.uid);
      handleImage(info.file.uid);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    } */
  };

  return (
    <Modal
      maskClosable={false}
      centered
      visible={visible}
      onOk={(e) => handleOk(e)}
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
                          onChange={(e) =>
                            e.target.value !== name && setName(e.target.value)
                          }
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
                            options={brands}
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
                        </Form.Item>
                        <Button className="button" onClick={openBrandModal}>
                          <PlusOutlined />
                          <EditBrands
                            visible={brandModalVisible}
                            close={closeBrandModal}
                            sendChangesToParent={setCurrentBrands}
                          />
                        </Button>
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
                          options={countries}
                          filterOption={(inputValue, option) =>
                            option.value
                              .toUpperCase()
                              .indexOf(inputValue.toUpperCase()) !== -1
                          }
                          onChange={(e) => e !== country && setCountry(e)}
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
                      setImage("");
                      console.log("Dropped files", e.dataTransfer.files);
                    }}
                    onChange={(e) => e !== image && uploadImage}
                    /* beforeUpload={beforeUpload} */
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
                    onChange={(e) => e !== unit && setUnit(e)}
                    value={unit}
                  />
                </div>
                <div className="header-field-wrapper">
                  <span className="sub-header">Material Form</span>
                  <Select
                    options={forms}
                    placeholder="Select here..."
                    onChange={(e) => e !== form && setForm(e)}
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
                      onChange={(e) => e !== location && setLocation(e)}
                    />
                    <Button className="button" onClick={openLocationModal}>
                      <PlusOutlined />
                      <EditLocations
                        visible={locationModalVisible}
                        close={closeLocationModal}
                        sendChangesToParent={setCurrentLocations}
                      />
                    </Button>
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
                  <InputNumber
                    value={fat}
                    onChange={(e) => e !== fat && setFat(e)}
                  />
                </div>
                <div className="header-field-wrapper">
                  <span className="sub-header">Carbohydrate</span>
                  <InputNumber value={carb} onChange={(e) => setCarb(e)} />
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
