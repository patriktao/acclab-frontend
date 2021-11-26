import {
  Modal,
  List,
  Popconfirm,
  Typography,
  Button,
  Input,
  Popover,
  message,
} from "antd";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { sortBy } from "lodash/fp";
import { API } from "../../api";
import "./EditBrands.scss";
import { sortCompanies } from "../../helper/Sort";
import TooltipComponent from "../TooltipComponent";

const { Link, Text } = Typography;

const EditBrands = ({ visible, close, sendEditToParent }) => {
  EditBrands.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    sendEditToParent: PropTypes.func,
  };

  const [brands, setBrands] = useState([]);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [brandName, setBrandName] = useState("");
  const [state, setState] = useState({});

  useEffect(() => {
    API.brands.fetchAllCompanies().then((res) => {
      setBrands(res);
      setData(res);
    });
  }, []);

  /* 
  Render each brand in the list 
 
  TODO: Fix the title of Pop Confirm such that it will display the text in two rows.
  */

  const brandList = (item) => {
    return (
      <List.Item
        className="row"
        actions={[
          <Link
            onClick={() => {
              setState({ [item.name]: !state[item.name] });
            }}
            type="primary"
          >
            {state[item.name] ? "Close" : "Edit"}
          </Link>,
          <Popconfirm
            title={
              "Are you sure to delete this brand?" +
              "\n" +
              "This brand will be deleted from all raw materials who uses it"
            }
            onConfirm={() => handleDelete(item.name)}
          >
            <Link type="danger">Delete</Link>
          </Popconfirm>,
        ]}
      >
        <List.Item.Meta className="item" description={brandField(item.name)} />
      </List.Item>
    );
  };

  /* The Input field in each brand */
  const brandField = (name) => {
    if (state[name]) {
      return (
        <TooltipComponent
          component={
            <Input
              required
              className="input-text"
              defaultValue={`${name}`}
              onPressEnter={(input) => {
                handleEdit(name, input.target.value);
                setState({ [name]: !state[name] });
              }}
            />
          }
          text={"Press Enter to save brand"}
          trigger={"focus"}
        />
      );
    }
    return <Text>{name}</Text>;
  };

  /* 
    Popover for adding a new brand
  */
  const addBrandPopover = () => {
    return (
      <div className="popover">
        <div className="header-field-wrapper">
          <span>Add a new brand</span>
          <Input
            value={brandName}
            allowClear
            className="input-text"
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Type here your brand name..."
            onPressEnter={handleAdd}
          />
        </div>
        <div className="button">
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </div>
    );
  };

  /* 
    Checks if brand already exists in the brand list
  */

  const brandChecker = () => {
    for (let i = 0; i < brands.length; i++) {
      if (brands[i].name.toLowerCase() === brandName.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  const handleSearch = (e) => {
    setSearchInput(e);
    const filter = data.filter((item) =>
      item.name.toLowerCase().includes(e.toLowerCase())
    );
    setBrands(filter);
  };

  const handleAdd = () => {
    if (brandName === "") {
      message.warning("Please enter a brand name.");
    } else if (brandChecker()) {
      message.warning("The brand already exists.");
    } else {
      const mergedList = brands.concat([{ value: brandName, name: brandName }]);
      const sortedCompanies = sortCompanies(mergedList);
      setBrands(sortedCompanies);
      setData(sortedCompanies);
      sendEditToParent(sortedCompanies);
      API.brands.addCompany(brandName);
    }
  };

  const handleDelete = (company) => {
    const filter = brands.filter(
      (item) => item.name.toLowerCase() !== company.toLowerCase()
    );
    setBrands(filter);
    setData(filter);
    sendEditToParent(filter);
    API.brands.deleteCompany(company);
  };

  const handleEdit = (name, input) => {
    if (name !== input) {
      brands.forEach((obj) => {
        if (obj.name === name) {
          obj.name = input;
          obj.value = input;
        }
      });
      setData(brands);
      sendEditToParent(brands);
      API.brands.updateCompany(name, input);
    }
  };

  return (
    <Modal
      width={"760px"}
      centered
      visible={visible}
      onCancel={close}
      onOk={close}
      maskClosable={false}
    >
      <section className="EditBrands">
        <section className="header">
          <h1>Edit Brands</h1>
        </section>
        <section className="body">
          <div className="options">
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              value={searchInput}
              size={"large"}
              className="input-text"
              placeholder="Search for a brand name..."
              allowClear
              enterbutton="true"
            />
            <Popover
              trigger="click"
              placement={"bottom"}
              content={addBrandPopover}
            >
              <Button
                type="primary"
                style={{ height: "100%", borderRadius: "12px" }}
                size={"large"}
              >
                Add a new Brand
              </Button>
            </Popover>
          </div>
          <div className="list">
            <InfiniteScroll
              initialLoad={false}
              loadMore={() => console.log("infinite scroll")}
              useWindow={false}
            >
              <List
                size="large"
                dataSource={sortBy("company.company", brands || [])}
                renderItem={brandList}
                rowKey={"company"}
              />
            </InfiniteScroll>
          </div>
        </section>
      </section>
    </Modal>
  );
};

export default EditBrands;
