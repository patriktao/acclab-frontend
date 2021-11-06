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

const DefaultState = {
  editing: {}
};

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
  const [showEdit, setShowEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const [state, setState] = useState(DefaultState);

  useEffect(() => {
    API.brands.fetchAllCompanies().then((res) => {
      setCompanyList(res);
      setData(res);
      console.log(res);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e);
    const filter = data.filter((item) =>
      item.company.toLowerCase().includes(e.toLowerCase())
    );
    setCompanyList(filter);
  };

  /* 
    Popover
  */
  const addPopover = () => {
    return (
      <div className="popover">
        <Input
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className="input-text"
          placeholder="Type brand name..."
          onPressEnter={addBrand}
        />
        <Button type="primary" onClick={addBrand}>
          Add
        </Button>
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
      if (companyList[i].company.toLowerCase() === brandName.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  /* 
    Deletes a selected company
  */
  const handleDelete = (company) => {
    API.brands.deleteCompany(company);
    const filter = companyList.filter(
      (item) => item.company.toLowerCase() !== company.toLowerCase()
    );
    deleteBrandFromParent(company);
    setCompanyList(filter);
  };

  /* What to produce in  */
  const listItems = (item) => {
  const { editing } = state;
  return (
    <List.Item
      className="row"
      actions={[
        <Link onClick={() => setShowEdit(!showEdit)} type="primary">
          {editing[item.id] ? "Cancel" : "Edit"}
        </Link>,
        <Popconfirm
          title="Are you sure to delete this company?"
          onConfirm={() => handleDelete(item.company)}
        >
          <Link type="danger">Delete</Link>
        </Popconfirm>
      ]}
    >
      <List.Item.Meta
        className="item"
        description={renderItem(item.company)}
      />
    </List.Item>
  )};

  /* Render item field in the list */
  const renderItem = (company) => {
    const { editing } = state;
    if (editing[company]) {
      return (
        <Input
          required
          defaultValue={`${company}`}
          onPressEnter={editBrandName}
        />
      );
    }
    return <Text>{company}</Text>;
  };

  /* edit Name of Brand */
  const editBrandName = (e) => {
    const input = e.target.value;
    setNewName(input);
    //Här vill vi ändra i JSON Array som går in i tabellen, vi måste hitta rätt ID.
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
            <Popover
              trigger="click"
              placement={"bottom"}
              title="Add a new Brand"
              content={addPopover}
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
            <InfiniteScroll initialLoad={false} pageStart={0} useWindow={false}>
              <List
                itemLayout="horizontal"
                size="middle"
                dataSource={sortBy("company.company", companyList || [])}
                renderItem={listItems}
                rowKey={'company'}
              />
            </InfiniteScroll>
          </div>
        </section>
      </section>
    </Modal>
  );
};

export default BrandModal;
