import React from "react";
import { Modal, Table, Button, Tabs, message } from "antd";
import { useState, useEffect } from "react";
import { InputField, InputSelect } from "../../InputFields";
import Units from "../../General/Units";
import { API } from "../../../api";
import "./EditSfp.scss";
import ImageUploader from "../../General/ImageUploader";
import PropTypes from "prop-types";
import { InputNumber } from "antd";
import SfpClass from "../../../classes/SfpClass";
import { isEqual } from "lodash/fp";
import { Link } from "react-router-dom";
import { useEditSfp } from "../../../context/edit-sfp";
import { Popconfirm } from "antd";
import TextEditor from "../../General/TextEditor";
const { TabPane } = Tabs;

const EditSfp = ({ visible, data, sendChangesToParent, deleteSfp }) => {
  EditSfp.propTypes = {
    visible: PropTypes.bool,
    data: PropTypes.object,
    sendChangesToParent: PropTypes.func,
    deleteSfp: PropTypes.func,
  };

  const [{ originalData, editData }, setData] = useState({
    originalData: null,
    editData: null,
  });

  const [{ editForm, originalForm }, setForm] = useState({
    editForm: [],
    originalForm: [],
  });

  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [location, setLocation] = useState("");
  const [processSteps, setProcessSteps] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState();
  const { closeEdit } = useEditSfp();

  useEffect(() => {
    API.locations.fetchLocations().then((res) => setLocations(res));

    const fetchFormulation = () => {
      API.sfp.fetchFormulation(data.sfp_id).then((res) => {
        setForm({
          editForm: JSON.parse(JSON.stringify(res)),
          originalForm: JSON.parse(JSON.stringify(res)),
        });
      });
    };

    if (data !== null && data !== undefined) {
      setName(data.sfp_name);
      setUnit(data.unit);
      setLocation(data.location);
      setProcessSteps(data.process_steps);
      setCurrentImage(data.image);
      setId(data.sfp_id);
      setData({
        originalData: new SfpClass(data),
        editData: new SfpClass(data),
      });
      fetchFormulation();
    }
  }, [data]);

  const formulation_columns = [
    {
      title: "raw_material_id",
      dataIndex: "raw_material_id",
      key: "raw_material_id",
    },
    {
      title: "Material Name",
      dataIndex: "material_name",
      key: "material_name",
      render: (material_name, record) => (
        <Link to={`/inventory/rawmaterial/${record.raw_material_id}`}>
          {material_name}
        </Link>
      ),
    },
    {
      title: "Brand",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Percentage (%)",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage, record) => (
        <InputNumber
          className="input-number"
          size={"small"}
          style={{ width: "8rem" }}
          placeholder={0}
          min={0}
          max={100}
          defaultValue={percentage}
          step={0.1}
          onChange={(e) => editPercentage(e, record)}
        />
      ),
    },
  ];

  const editPercentage = (e, record) => {
    editForm.forEach((item) => {
      if (item.raw_material_id === record.raw_material_id) {
        item.percentage = e;
      }
    });
  };

  const handleEdit = async (e) => {
    editData.sfp_name = name;
    editData.unit = unit;
    editData.location = location;
    editData.process_steps = processSteps;

    await handleImageAPI().then(async () => {
      if (editData.isEqual(originalData) && isEqual(editForm, originalForm)) {
        message.success("No changes made.");
      } else {
        sendChangesToParent({
          editForm: editForm,
          sfp_id: id,
          sfp_name: name,
          unit: unit,
          location: location,
          process_steps: processSteps,
          image: editData.image,
        });

        //API
        API.sfp.editInformation(id, editData.toJsonObject());

        editForm.forEach((item) => {
          API.sfp.editFormulation(id, item);
        });

        //update the originaldata
        originalData.name = name;
        originalData.unit = unit;
        originalData.location = location;
        originalData.process_steps = processSteps;

        //TODO: set ORIGINALFORM to EDITFORM, CURRENTLY NOT WORKING.

        //success
        message.success("Successfully edited SFP.");
      }
      closeEdit(e, id);
    });
  };

  const handleImage = (file) => {
    file ? setImage(file) : setImage(null);
  };

  const handleImageAPI = async () => {
    if (image === "") {
      return;
    } else if (image !== null && editData.image === "") {
      await API.sfp.uploadImage(image, id).then((res) => {
        console.log("uploading picture");
        editData.image = res;
      });
    } else if (image !== null && editData.image !== "") {
      await API.sfp.updateImage(image, id).then((res) => {
        console.log("updating picture");
        editData.image = res;
      });
    } else if (image === null && editData.image !== "") {
      await API.sfp.deleteImage(id).then(() => {
        console.log("deleting picture");
        editData.image = "";
      });
    }
  };

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      width={"800px"}
      centered
      footer={[
        <section className="edit-raw-material-footer">
          <div>
            <Popconfirm
              title={"Are you sure?"}
              okType={"danger"}
              okText={"Delete"}
              onConfirm={(e) => deleteSfp(e, id)}
            >
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </div>
          <div>
            <Button key="close" onClick={(e) => closeEdit(e, id)}>
              Cancel
            </Button>
            <Button key="ok" type="primary" onClick={(e) => handleEdit(e)}>
              OK
            </Button>
          </div>
        </section>,
      ]}
      onCancel={(e) => closeEdit(e, id)}
    >
      <section className="EditSfp">
        <h1>Edit {name}</h1>
        <div className="rows">
          <div className="information">
            <InputField
              header={"Semi-Finished Product Name"}
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              placeholder={"Enter a name..."}
            />
            <div className="side-by-side">
              <InputSelect
                header={"Units"}
                options={Units}
                value={unit}
                onChange={(e) => {
                  if (e !== unit) {
                    setUnit(e);
                  }
                }}
              />
              <InputSelect
                header={"Location"}
                options={locations}
                value={location}
                onChange={(e) => {
                  if (e !== location) {
                    setLocation(e);
                  }
                }}
              />
            </div>
          </div>
          <div className="header-field-wrapper">
            <span className="sub-header">Image</span>
            <ImageUploader handleImage={handleImage} imageURL={currentImage} />
          </div>
        </div>

        <Tabs defaultActiveKey={1}>
          <TabPane tab={"Formulation"} key="1">
            <div className="formulation">
              <div className="table">
                <Table
                  columns={formulation_columns.filter(
                    (col) => col.dataIndex !== "raw_material_id"
                  )}
                  dataSource={originalForm || []}
                  rowKey={"raw_material_id"}
                  bordered
                  pagination={false}
                  size="middle"
                />
              </div>
            </div>
          </TabPane>
          <TabPane tab={"Process Steps"} key="2">
            <div className="process-steps">
              <TextEditor
                originalData={processSteps}
                onChange={(data) => setProcessSteps(data)}
              />
            </div>
          </TabPane>
        </Tabs>
      </section>
    </Modal>
  );
};

export default EditSfp;
