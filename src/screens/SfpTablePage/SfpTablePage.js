import React from "react";
import Template from "../Template";
import SfpTable from "../../components/Inventory/SfpTable";

const SfpTablePage = () => {
  return (
    <Template
      content={
        <section className="SfpTablePage">
          <h1 className="blue-text"> Semi Finished Products </h1>
          <span className="sub-header">
            Create, edit and retrieve raw materials and semi-finished products
            from the inventory
          </span>
          <div style={{ marginTop: "1.5rem" }}>
            <SfpTable />
          </div>
        </section>
      }
    />
  );
};

export default SfpTablePage;
