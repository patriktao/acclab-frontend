import PropTypes from "prop-types";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./CreateRawMaterial.scss";
import InputNumber from "../../General/InputNumber";
import { isEqual } from "lodash/fp";
import {
  Modal,
  Input,
  AutoComplete,
  Popconfirm,
  Button,
  Select,
  Form,
  message,
} from "antd";
import { API } from "../../../api";
import { sortCompanies } from "../../../helper/Sort";
import RawMaterialClass from "../../../classes/RawMaterialClass";
import EditBrands from "../EditBrands";
import EditLocations from "../EditLocations";
import ImageUploader from "../../General/ImageUploader";
import Units from "./Units";

const { TextArea } = Input;

const CreateRawMaterial = ({ visible, close, sendChangesToParent }) => {
  CreateRawMaterial.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    sendChangesToParent: PropTypes.func,
  };

  /* Modal States */
  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  /* Data States */
  const [brands, setBrands] = useState([]);
  const [countries, setCountries] = useState([]);
  const [forms, setForms] = useState([]);
  const [locations, setLocations] = useState([]);
  const [id, setId] = useState();

  /* Input Field States */
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("");
  const [unit, setUnit] = useState("g");
  const [form, setForm] = useState("Liquid");
  const [location, setLocation] = useState("Ambient");
  const [fat, setFat] = useState(0);
  const [carb, setCarb] = useState(0);
  const [protein, setProtein] = useState(0);
  const [salt, setSalt] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [content, setContent] = useState("");
  const [rawMaterialForm, setRawMaterialForm] = useState();

  /* Image States */
  const [image, setImage] = useState(null);

  useEffect(() => {
    API.brands.fetchAllCompanies().then((res) => setBrands(res));
    API.brands.fetchAllCountries().then((res) => setCountries(res));
    API.locations.fetchLocations().then((res) => setLocations(res));
    API.materialforms.fetchForms().then((res) => setForms(res));
    setRawMaterialForm(new RawMaterialClass());
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Succesfully edited raw material");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.success("Failed editing raw material");
  };

  const handleOk = async (e) => {
    if (passRestrictions()) {
      createMaterial(e);
    }
  };

  const passRestrictions = () => {
    if (name === "" || name === null) {
      message.error("Please type a material name!");
      return false;
    } else if (!ifExistsInList(brands, brand)) {
      message.error("Please select a brand from the list!");
      return false;
    } else if (!ifExistsInList(countries, country)) {
      message.error("Please select a country from the list!");
      return false;
    } else if (!ifExistsInList(locations, location)) {
      message.error("Please select a storage location");
      return false;
    }
    return true;
  };

  const ifExistsInList = (array, object) => {
    return array.find((e) => e.name === object) === undefined ? false : true;
  };

  const createMaterial = async (e) => {
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
    await createAPI().then((res) => {
      if (res !== "failed") {
        imageAPI();
        sendChangesToParent(rawMaterialForm);
      }
    });
    close(e);
  };

  const imageAPI = async () => {
    if (image !== undefined || image !== null) {
      await API.rawMaterial.uploadImage(image, id).then((res) => {
        console.log("uploading picture");
        console.log(res);
        rawMaterialForm.image = res;
      });
    }
  };

  const createAPI = async () => {
    let response = await API.rawMaterial
      .createRawMaterial(rawMaterialForm.toJsonObject())
      .then((res) => {
        rawMaterialForm.id = res;
        setId(res);
        console.log(res);
      });
    return response;
  };

  /* Functions to children*/

  const handleImage = (file) => {
    file ? setImage(file) : setImage(null);
  };

  const setCurrentBrands = (list) => {
    setBrands(list);
  };

  const setCurrentLocations = (list) => {
    setLocations(list);
  };

  return (
    <Modal
      maskClosable={false}
      centered
      visible={visible}
      onCancel={(e) => close(e)}
      width={"950px"}
      footer={[
        <Button key="submit" onClick={(e) => close(e)}>
          Cancel
        </Button>,
        <Popconfirm
          title={"Are you sure?"}
          onConfirm={handleOk}
          okText="Yes"
          cancelText="No"
        >
          <Button key="submit" type="primary">
            OK
          </Button>
        </Popconfirm>,
      ]}
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
        <section className="CreateRawMaterial">
          <section className="GeneralInformation">
            <h1>Add a new raw material</h1>
            <div className="rows">
              <div className="image-general-information">
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
                        <Button
                          className="button"
                          onClick={() => setBrandModalVisible(true)}
                        >
                          <PlusOutlined />
                          <EditBrands
                            visible={brandModalVisible}
                            close={(e) => {
                              e.stopPropagation();
                              setBrandModalVisible(false);
                            }}
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
                        >
                          <Input
                            allowClear
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
                <div className="header-field-wrapper">
                  <span className="sub-header">Image</span>
                  <ImageUploader handleImage={handleImage} imageURL={""} />
                </div>
              </div>
              <div className="column-3">
                <div className="header-field-wrapper">
                  <span className="sub-header">Unit</span>
                  <Select
                    options={Units}
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
                    <Button
                      className="button"
                      onClick={() => setLocationModalVisible(true)}
                    >
                      <PlusOutlined />
                      <EditLocations
                        visible={locationModalVisible}
                        close={(e) => {
                          e.stopPropagation();
                          setLocationModalVisible(false);
                        }}
                        sendChangesToParent={setCurrentLocations}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="NuitritionalFacts">
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

export default CreateRawMaterial;
