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
import "./BrandModal.scss";
import { sortCompanies } from "../../helper/Sort";

const { Link, Text } = Typography;

const BrandModal = ({
  visible,
  close,
  addBrandToParent,
  deleteBrandFromParent,
}) => {
  BrandModal.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    addBrandToParent: PropTypes.func,
    deleteBrandFromParent: PropTypes.func,
  };

  const [companyList, setCompanyList] = useState([]);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [brandName, setBrandName] = useState("");
  const [state, setState] = useState({});

  useEffect(() => {
    API.brands.fetchAllCompanies().then((res) => {
      setCompanyList(res);
      setData(res);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e);
    const filter = data.filter((item) =>
      item.name.toLowerCase().includes(e.toLowerCase())
    );
    setCompanyList(filter);
  };

  /* 
    Popover
  */
  const addPopover = () => {
    return (
      <div className="popover">
        <div className="header-field-wrapper">
          <span>Add a new brand</span>
          <Input
            value={brandName}
            className="input-text"
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Type here..."
            onPressEnter={addBrand}
          />
        </div>
        <div className="button">
          <Button type="primary" onClick={addBrand}>
            Add
          </Button>
        </div>
      </div>
    );
  };

  /* 
    Adds a new brand to brand list and for selection in parent component
  */

  const addBrand = () => {
    if (brandName === "") {
      message.warning("Please enter a brand name.");
    } else if (brandChecker()) {
      message.warning("The brand already exists.");
    } else {
      const newList = companyList.concat({ company: brandName });
      setCompanyList(sortCompanies(newList));
      addBrandToParent(brandName);
      API.brands.addCompany(brandName);
    }
  };

  /* 
    Checks if brand already exists in the list
  */
  const brandChecker = () => {
    for (let i = 0; i < companyList.length; i++) {
      if (companyList[i].name.toLowerCase() === brandName.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  /* 
    Deletes a selected company
  */
  const handleDelete = (company) => {
    console.log(company.toLowerCase());
    const filter = companyList.filter(
      (item) => item.name.toLowerCase() !== company.toLowerCase()
    );
    setCompanyList(filter);
    deleteBrandFromParent(company);
    API.brands.deleteCompany(company);
  };

  /* Render each item in the list */
  const listItems = (item) => {
    return (
      <List.Item
        className="row"
        actions={[
          <Link
            onClick={() => setState({ [item.name]: !state[item.name] })}
            type="primary"
          >
            {state[item.name] ? "Cancel" : "Edit"}
          </Link>,
          <Popconfirm
            title="Are you sure to delete this company?"
            onConfirm={() => handleDelete(item.name)}
          >
            <Link type="danger">Delete</Link>
          </Popconfirm>,
        ]}
      >
        <List.Item.Meta className="item" description={renderItem(item.name)} />
      </List.Item>
    );
  };

  /* Render the field in each item */
  const renderItem = (name) => {
    if (state[name]) {
      return (
        <Input
          required
          className="input-text"
          defaultValue={`${name}`}
          onPressEnter={(input) => editBrandName(name, input.target.value)}
        />
      );
    }
    return <Text>{name}</Text>;
  };

  /* Edit name of brand */
  const editBrandName = (name, input) => {
    if (name !== input) {
      companyList.forEach((item) => {
        if (item.name === name) {
          item.name = input;
          item.value = input;
        }
      });
      API.brands.updateCompany(name, input);
    }
    setState({ [name]: false });
  };

  return (
    <Modal
      width={"760px"}
      centered
      maskClosable={false}
      onCancel={close}
      visible={visible}
      onOk={close}
    >
      <section className="BrandModal">
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
            <Popover trigger="click" placement={"bottom"} content={addPopover}>
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
                dataSource={sortBy("company.company", companyList || [])}
                renderItem={listItems}
                rowKey={"company"}
              />
            </InfiniteScroll>
          </div>
        </section>
      </section>
    </Modal>
  );
};

export default BrandModal;
