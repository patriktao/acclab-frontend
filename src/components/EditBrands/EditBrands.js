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

const { Link, Text } = Typography;

const EditBrands = ({ visible, close, sendEditToParent }) => {
  EditBrands.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    sendEditToParent: PropTypes.func,
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
    Adds a brand
  */

  const addBrand = () => {
    if (brandName === "") {
      message.warning("Please enter a brand name.");
    } else if (brandChecker()) {
      message.warning("The brand already exists.");
    } else {
      const addTolist = companyList.concat([
        { value: brandName, name: brandName },
      ]);
      const sortedCompanies = sortCompanies(addTolist);
      setCompanyList(sortedCompanies);
      setData(sortedCompanies);
      sendEditToParent(sortedCompanies);
      API.brands.addCompany(brandName);
    }
  };

  /* 
    Deletes a selected company
  */
  const handleDelete = (company) => {
    const filter = companyList.filter(
      (item) => item.name.toLowerCase() !== company.toLowerCase()
    );
    setCompanyList(filter);
    setData(filter);
    sendEditToParent(filter);
    API.brands.deleteCompany(company);
  };

  /* Edit a brand */
  const handleEdit = (name, input) => {
    if (name !== input) {
      companyList.forEach((obj) => {
        if (obj.name === name) {
          obj.name = input;
          obj.value = input;
        }
      });
      sendEditToParent(companyList);
      setData(companyList);
      API.brands.updateCompany(name, input);
    }
    setState({ [name]: false });
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

  /* Render field in each item */
  const renderItem = (name) => {
    if (state[name]) {
      return (
        <Input
          required
          className="input-text"
          defaultValue={`${name}`}
          onPressEnter={(input) => handleEdit(name, input.target.value)}
        />
      );
    }
    return <Text>{name}</Text>;
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

export default EditBrands;
