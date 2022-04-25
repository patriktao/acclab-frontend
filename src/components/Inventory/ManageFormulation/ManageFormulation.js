import React, { useEffect, useState } from "react";
import { Modal, Radio } from "antd";
import PropTypes from "prop-types";
import RawMaterialTable from "../RawMaterialTable";
import "./ManageFormulation.scss";
import { API } from "../../../api";

const ManageFormulation = ({
  visible,
  onClose,
  formulation,
  handleFormulation,
}) => {
  ManageFormulation.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    formulation: PropTypes.array,
    handleFormulation: PropTypes.func,
  };

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (formulation !== undefined) {
      let formulationArray = Object.keys(formulation).map(
        (key) => formulation[key].raw_material_id
      );
      setSelected(formulationArray);
    }
  }, [formulation]);

  const rowSelection = {
    type: () => <Radio>Checkbox</Radio>,
    selectedRowKeys: selected,
    onChange: (selectedRowKeys) => {
      setSelected(selectedRowKeys);
    },
    hideSelectAll: () => false,
  };

  const handleOk = (e) => {
    // We only get the id of the materials, so we need to refetch its information from API request.
    // We need to check that we send the information of the selected materials to the parent component.
    API.rawMaterial.fetchAll().then((res) => {
      let temp = [];
      selected.forEach((id) => {
        let rawMaterial = res.find((item) => item.raw_material_id === id);
        if (rawMaterial !== undefined) {
          temp.push({
            raw_material_id: rawMaterial.raw_material_id,
            percentage: 0,
            country: rawMaterial.country,
            company: rawMaterial.company,
            material_name: rawMaterial.material_name,
          });
        }
      });
      handleFormulation(temp);
    });
    onClose(e);
  };

  return (
    <Modal
      centered
      width="1100px"
      visible={visible}
      onCancel={(e) => onClose(e)}
      onOk={(e) => handleOk(e)}
    >
      <section className="ManageFormulation">
        <RawMaterialTable rowSelection={{ ...rowSelection }} />
      </section>
    </Modal>
  );
};

export default ManageFormulation;
