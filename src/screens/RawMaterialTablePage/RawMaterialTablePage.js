import React from "react";
import RawMaterialTable from "../../components/Inventory/RawMaterialTable";
import Template from "../Template";

const RawMaterialTablePage = () => {
  return (
    <Template
      content={
        <section className="RawMaterialTable">
          <h1 className="blue-text"> Raw Materials </h1>
          <span className="sub-header">
            Create, edit and retrieve raw materials
            from the inventory
          </span>
          <div style={{ marginTop: "1.5rem" }}>
            <RawMaterialTable />
          </div>
        </section>
      }
    />
  );
};

export default RawMaterialTablePage;
