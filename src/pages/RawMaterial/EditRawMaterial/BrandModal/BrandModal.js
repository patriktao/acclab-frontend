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
import { API } from "../../../../api";
import "./BrandModal.scss";

const { Link } = Typography;

const BrandModal = ({ visible, close }) => {
  BrandModal.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
  };

  const [companyList, setCompanyList] = useState([]);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      const companies = await API.brands.fetchAllCompanies();
      setCompanyList(companies);
      setData(companies);
    };

    fetchCompanies();
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e);
    const filter = data.filter((item) =>
      item.company.toLowerCase().includes(e.toLowerCase())
    );
    setCompanyList(filter);
  };

  const handleAdd = () => {
    const newList = companyList.concat({ company: brandName });
    setCompanyList(newList);
    API.brands.addCompany(brandName);
  };

  const handleDelete = (company) => {
    API.brands.deleteCompany(company);
    const filter = companyList.filter(
      (item) => !item.company.toLowerCase().includes(company.toLowerCase())
    );
    setCompanyList(filter);
  };

  const addBrandName = async () => {
    if (brandName === "") {
      message.warning("Please enter a brand name.");
    } else if (brandChecker()) {
      message.warning("The brand already exists.");
    } else {
      handleAdd();
    }
  };

  const brandChecker = () => {
    for (let i = 0; i < companyList.length; i++) {
      if (companyList[i].company.toLowerCase() === brandName.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  const addPopover = () => {
    return (
      <div className="popover">
        <Input
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className="input-text"
          placeholder="Type brand name..."
          onPressEnter={addBrandName}
        />
        <Button type="primary" onClick={addBrandName}>
          Add
        </Button>
      </div>
    );
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
                dataSource={companyList}
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
