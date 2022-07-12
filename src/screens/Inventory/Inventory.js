import RawMaterialTable from "../../components/Inventory/RawMaterialTable";
import SfpTable from "../../components/Inventory/SfpTable";
import Template from "../Template";

const Inventory = () => {
  return (
    <Template
      content={
        <section className="Inventory">
          <div>
            <h1 className="blue-text"> Inventory </h1>
            <span className="sub-header">
              Create, edit and retrieve raw materials and semi-finished products
              from the inventory
            </span>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <RawMaterialTable />
          </div>
          <div style={{ marginTop: "3rem" }}>
            <SfpTable />
          </div>
        </section>
      }
    />
  );
};

export default Inventory;
