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
import { sortBy } from 'lodash/fp';
import { API } from "../../../../api";
import "./BrandModal.scss";
import { sortCompanies } from "../../../../helper/Sort";

const { Link } = Typography;

const BrandModal = ({
  visible,
  close,
  companies,
  addBrandToParent,
  deleteBrandFromParent,
}) => {
  BrandModal.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    companies: PropTypes.array,
    addBrandToParent: PropTypes.func,
    deleteBrandFromParent: PropTypes.func,
  };

  const [companyList, setCompanyList] = useState([]);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    setCompanyList(companies);
    setData(companies);
  }, [companies]);

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
              enterButton
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
                dataSource={sortBy('company.company', companyList || [])}
                renderItem={(item) => (
                  <List.Item className="row" key={item.id}>
                    <List.Item.Meta className="item" title={item.company} />
                    <div className="options">
                      <div>
                        <Link type="primary">Edit</Link>
                      </div>
                      <div>
                        <Popconfirm
                          title="Are you sure to delete this company?"
                          onConfirm={() => handleDelete(item.company)}
                        >
                          <Link type="danger">Remove</Link>
                        </Popconfirm>
                      </div>
                    </div>
                  </List.Item>
                )}
              ></List>
            </InfiniteScroll>
          </div>
        </section>
      </section>
    </Modal>
  );
};

export default BrandModal;
