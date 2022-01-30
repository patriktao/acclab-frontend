import React from "react";
import { Modal, Table, Input, Button, Tabs } from "antd";
import { useState, useEffect } from "react";
import { InputField, InputSelect } from "../../InputFields";
import Units from "../../General/Units";
import { API } from "../../../api";
import "./CreateSfp.scss";
import ImageUploader from "../../General/ImageUploader";
import { formulation_columns } from "../../../screens/SemiFinishedProduct/SemiFinishedProductColumns";
import PropTypes from "prop-types";
import ManageFormulation from "../ManageFormulation/";

const { TextArea } = Input;
const { TabPane } = Tabs;

const CreateSfp = ({ visible, onClose, data, formulationData, id }) => {
  CreateSfp.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.object,
    formulationData: PropTypes.array,
    id: PropTypes.string,
  };

  const [SfpData, setSfpData] = useState([]);
  const [formulation, setFormulation] = useState([]);
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [location, setLocation] = useState("");
  const [showFormulationModal, setShowFormulationModal] = useState(false);

  useEffect(() => {
    API.locations.fetchLocations().then((res) => setLocations(res));
    if (data !== null && data !== undefined) {
      setSfpData(data);
      setName(data.sfp_name);
      setUnit(data.unit);
      //setFormulation(formulationData);
      setLocation(data.location);
    }

    if (id !== undefined) {
      API.sfp.fetchFormulation(id).then((res) => setFormulation(res));
    }
  }, [data]);

  const handleFormulation = (form) => {
    //make the form the new formulation
    //add percentage attribute to the raw materials (those which existed in the formulation previously) in the form form.
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

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      width={"750px"}
      centered
      onCancel={(e) => onClose(e)}
    >
      <section className="CreateSfp">
        <h1>Edit {name}</h1>
        <div className="rows">
          <div className="information">
            <InputField
              header={"Semi-Finished Product Name"}
              onChange={(e) => setName(e.target.value)}
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
          <ImageUploader imageURL={""} />
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
                  footer={() => (
                    <div style={{ display: "grid", justifyContent: "center" }}>
                      <Button
                        type="primary"
                        onClick={() => setShowFormulationModal(true)}
                      >
                        Manage Formulation
                      </Button>
                      <ManageFormulation
                        visible={showFormulationModal}
                        onClose={(e) => {
                          e.stopPropagation();
                          setShowFormulationModal(false);
                        }}
                        formulation={formulation}
                        handleFormulation={handleFormulation}
                      />
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
              <TextArea showCount />
            </div>
          </TabPane>
        </Tabs>
      </section>
    </Modal>
  );
};

export default CreateSfp;
