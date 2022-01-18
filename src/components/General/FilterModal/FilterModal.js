import PropTypes from "prop-types";
import { Modal } from "antd";
import "./FilterModal.scss"

const FilterModal = ({ visible, onOk, onCancel, content }) => {
  FilterModal.propTypes = {
    filterVisible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    content: PropTypes.any,
  };

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={false}
      width={"650px"}
    >
      <section className="FilterComponent">
        <span className="sub-header"> What are you looking for?</span>
        <h1 style={{ paddingBottom: "1rem" }}>Choose your filters</h1>
        {content}
      </section>
    </Modal>
  );
};

export default FilterModal;
