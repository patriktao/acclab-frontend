import React from "react";
import { Modal, Table, Input, Button, Tabs, message } from "antd";
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

const { TextArea } = Input;
const { TabPane } = Tabs;

const EditSfp = ({ visible, onClose, data, id, sendChanges }) => {
  EditSfp.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.array,
    id: PropTypes.string,
    sendChanges: PropTypes.func,
  };

  const [originalData, setOriginalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [formulation, setFormulation] = useState([]);
  const [editForm, setEditForm] = useState([]);
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [location, setLocation] = useState("");
  const [processSteps, setProcessSteps] = useState("");
  const [sfpId, setSfpId] = useState();
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    API.locations.fetchLocations().then((res) => setLocations(res));

    if (data !== null && data !== undefined) {
      setName(data.sfp_name);
      setUnit(data.unit);
      setLocation(data.location);
      setProcessSteps(data.process_steps);
      setCurrentImage(data.image);
      setEditData(new SfpClass(data));
      setOriginalData(new SfpClass(data));
    }

    if (id !== undefined) {
      setSfpId(id);
      API.sfp
        .fetchFormulation(id)
        .then((res) => {
          setFormulation(res);
        })
        .then(setEditForm(formulation));
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
      render: (material_name) => (
        <span style={{ fontWeight: "500" }}>{material_name}</span>
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

  const handleOk = async (e) => {
    editData.name = name;
    editData.unit = unit;
    editData.location = location;
    editData.process_steps = processSteps;

    await handleImageAPI().then(() => {
      if (!isEqual(editData.toJsonObject(), originalData.toJsonObject())) {
        API.sfp.editInformation(sfpId, editData.toJsonObject());

        editForm.forEach((item) => {
          API.sfp.editFormulation(sfpId, item);
        });

        sendChanges({
          editForm: editForm,
          sfp_name: name,
          unit: unit,
          location: location,
          process_steps: processSteps,
          image: editData.image,
        });
        message.success("Successfully edited SFP.");
      } else {
        message.success("No changes made.");
      }
      onClose(e);
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
      width={"750px"}
      centered
      footer={[
        <Button onClick={(e) => onClose(e)}>Close</Button>,
        <Button type="primary" onClick={(e) => handleOk(e)}>
          OK
        </Button>,
      ]}
      onCancel={(e) => onClose(e)}
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
          <ImageUploader handleImage={handleImage} imageURL={currentImage} />
        </div>

        <Tabs defaultActiveKey={1}>
          <TabPane tab={"Formulation"} key="1">
            <div className="formulation">
              <div className="table">
                <Table
                  columns={formulation_columns.filter(
                    (col) => col.dataIndex !== "raw_material_id"
                  )}
                  dataSource={formulation}
                  rowKey={"raw_material_id"}
                  bordered
                  pagination={false}
                />
              </div>
            </div>
          </TabPane>
          <TabPane tab={"Process Steps"} key="2">
            <div className="process-steps">
              <TextArea
                showCount
                rows={10}
                defaultValue={processSteps}
                onChange={(e) => setProcessSteps(e.target.value)}
              />
            </div>
          </TabPane>
        </Tabs>
      </section>
    </Modal>
  );
};

export default EditSfp;
