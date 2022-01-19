import PropTypes from "prop-types";
import TooltipComponent from "../components/General/TooltipComponent";
import { Button, Tabs } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

const InventoryInterface = ({
  name,
  information,
  products,
  history,
  handleStock,
  openHandleStock,
  edit,
  openEdit,
}) => {
  InventoryInterface.propTypes = {
    name: PropTypes.string,
    information: PropTypes.any,
    products: PropTypes.any,
    history: PropTypes.any,
    handleStock: PropTypes.object,
    openHandleStock: PropTypes.func,
    edit: PropTypes.object,
    openEdit: PropTypes.func,
  };

  return (
    <section className="RawMaterial">
      <div className="content-header">
        <div>
          <div className="header-information">
            <h1 className="blue-text">Inventory</h1>
            <TooltipComponent
              text={"Create, edit and retrieve information of items."}
              component={<InfoCircleOutlined />}
              trigger={"hover"}
            />
          </div>
          <span className="sub-header">{name}</span>
        </div>
        <div className="buttons">
          <Button
            className="table-add"
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={openHandleStock}
          >
            Handle Stock
            {handleStock}
          </Button>
          <Button
            className="table-add"
            type="primary"
            size="large"
            icon={<EditOutlined />}
            onClick={openEdit}
          >
            Edit
            {edit}
          </Button>
        </div>
      </div>
      <div />
      <div className="tabs">
        <Tabs
          defaultActiveKey="1"
          size={"large"}
          style={{ marginBottom: 32 }}
          tabPosition="top"
        >
          <TabPane tab="Information" key="1">
            {information}
          </TabPane>
          <TabPane tab="Products" key="2" disabled>
            {products}
          </TabPane>
          <TabPane tab="History" key="3" disabled>
            {history}
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
};

export default InventoryInterface;
