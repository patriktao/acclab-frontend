import React, { createContext, useState, useEffect } from "react";
import { API } from "../api";

const RawMaterialContext = createContext({});

const EditRawMaterialProvider = (props) => {
  const [editVisible, setEditVisible] = useState({});

  const openEdit = (id) => {
    setEditVisible({ [id]: true });
  };

  const closeEdit = (e, id) => {
    e.stopPropagation();
    setEditVisible({ [id]: false });
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
