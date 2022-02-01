import "./CreateSfp.scss";
import { Modal, Table, Input, Button, Tabs, message } from "antd";
import { useState, useEffect } from "react";
import { InputField, InputSelect } from "../../InputFields";
import Units from "../../General/Units";
import { API } from "../../../api";
import ImageUploader from "../../General/ImageUploader";
import PropTypes from "prop-types";
import ManageFormulation from "../ManageFormulation/";
import InputNumber from "../../General/InputNumber";
import SfpClass from "../../../classes/SfpClass";

import { useHistory } from "react-router";

const { TextArea } = Input;
const { TabPane } = Tabs;

const CreateSfp = ({ visible, onClose, sendChangesToParent }) => {
  CreateSfp.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    sendChangesToParent: PropTypes.func,
  };

  const history = useHistory();

  const [sfpForm, setSfpForm] = useState([]);
  const [formulation, setFormulation] = useState([]);
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("g");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("Ambient");
  const [processSteps, setProcessSteps] = useState("");
  const [showFormulationModal, setShowFormulationModal] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    API.locations.fetchLocations().then((res) => setLocations(res));
    setSfpForm(new SfpClass());
  }, []);

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
          style={{ width: "8rem" }}
          placeholder={`0 - 100%`}
          max={100}
          defaultValue={0}
          onChange={(e) => editPercentage(e, record)}
        />
      ),
    },
  ];

  const handleFormulation = (form) => {
    form.forEach((item) => {
      formulation.forEach((e) => {
        if (e.raw_material_id === item.raw_material_id) {
          item.percentage = e.percentage;
          return;
        }
      });
    });
    setFormulation(form);
  };

  const editPercentage = (e, record) => {
    if (0 <= e <= 100) {
      formulation.forEach((item) => {
        if (item.raw_material_id === record.raw_material_id) {
          item.percentage = e;
        }
      });
    }
    console.log(formulation);
  };

  const handleImage = (file) => {
    file ? setImage(file) : setImage(null);
  };

  const imageAPI = async () => {
    if (image !== undefined && image !== null && image !== "") {
      await API.sfp.uploadImage(image, sfpForm.sfp_id).then((res) => {
        console.log("uploading picture");
        console.log(res);
        sfpForm.image = res;
      });
    }
  };

  const passingRestrictions = () => {
    if (name === "") {
      message.warning("Please enter a SFP name!");
      return false;
    } else if (formulation.length === 0) {
      message.warning("Please add raw materials to your formulation!");
      return false;
    }
    return true;
  };

  const handleOk = async (e) => {
    if (!passingRestrictions()) {
      return;
    }
    sfpForm.sfp_name = name;
    sfpForm.unit = unit;
    sfpForm.location = location;
    sfpForm.process_steps = processSteps;
    await createSfpAPI().then(async (res) => {
      if (res !== "failed") {
        await imageAPI().then(() => {
          sendChangesToParent(sfpForm);
          history.push(`/inventory/sfp/${sfpForm.sfp_id}`);
        });
      }
    });
    onClose(e);
  };

  const createSfpAPI = async () => {
    let response = await API.sfp
      .createSfp(sfpForm.toJsonObject())
      .then((res) => {
        sfpForm.sfp_id = res;
        setId(res);
      });

    await API.sfp.createFormulation(sfpForm.sfp_id, formulation);

    return response;
  };

  const selectRawMaterials = (
    <ManageFormulation
      visible={showFormulationModal}
      onClose={(e) => {
        e.stopPropagation();
        setShowFormulationModal(false);
      }}
      formulation={formulation}
      handleFormulation={handleFormulation}
    />
  );

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      width={"750px"}
      centered
      onCancel={(e) => onClose(e)}
      onOk={(e) => handleOk(e)}
    >
      <section className="CreateSfp">
        <h1>Add a Semi-Finished Product</h1>
        <div className="rows">
          <div className="information">
            <InputField
              header={"Semi-Finished Product Name"}
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder={"Enter SFP name..."}
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
          <ImageUploader imageURL={""} handleImage={handleImage} />
        </div>

        <Tabs defaultActiveKey={1}>
          <TabPane tab={"Formulation"} key="1">
            <div className="formulation">
              <div className="table">
                <Table
                  size="small"
                  columns={formulation_columns.filter(
                    (col) => col.dataIndex !== "raw_material_id"
                  )}
                  dataSource={formulation}
                  rowKey={"raw_material_id"}
                  footer={() => (
                    <div style={{ display: "grid", justifyContent: "center" }}>
                      <Button
                        type="primary"
                        onClick={() => setShowFormulationModal(true)}
                      >
                        Manage Formulation
                      </Button>
                      {selectRawMaterials}
                    </div>
                  )}
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
                rows={8}
                onChange={(e) => setProcessSteps(e.target.value)}
              />
            </div>
          </TabPane>
        </Tabs>
      </section>
    </Modal>
  );
};

export default CreateSfp;
