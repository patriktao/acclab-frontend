import React from "react";
import { Drawer } from "antd";

const AddMaterial = ({ visible, open, close }) => {
  return (
    <div>
      <Drawer
        className="drawer-style"
        onClose={close}
        visible={visible}
        placement="right"
        width={650}
        title="Add a new raw material"
      />
    </div>
  );
};

export default AddMaterial;
