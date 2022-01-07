import React, { createContext, useState } from "react";

const RawMaterialContext = createContext({});

const EditRawMaterialProvider = (props) => {
  const [editVisible, setEditVisible] = useState(false);

  const openEdit = () => {
    setEditVisible(true);
  };
  
  const closeEdit = (e) => {
    e.stopPropagation();
    setEditVisible(false);
  };

  const editContextCalue = {
    openEdit,
    closeEdit,
    editVisible,
  };
  return <RawMaterialContext.Provider value={editContextCalue} {...props} />;
};

const useEditRawMaterial = () => React.useContext(RawMaterialContext);

export { EditRawMaterialProvider, useEditRawMaterial };
