import React, { createContext, useState } from "react";

const SfpContext = createContext({});

const EditSfpProvider = (props) => {
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
  return <SfpContext.Provider value={editContextCalue} {...props} />;
};

const useEditSfp = () => React.useContext(SfpContext);

export { EditSfpProvider, useEditSfp };
