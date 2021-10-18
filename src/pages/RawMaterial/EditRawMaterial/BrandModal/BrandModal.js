import { Modal, List, Spin, Popconfirm, Typography, Button, Input } from "antd";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { API } from "../../../../api";
import "./BrandModal.scss";

const { Link } = Typography;
const { Search } = Input;

const BrandModal = ({ visible, close }) => {
  BrandModal.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
  };

  const [companyList, setCompanyList] = useState([]);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      const companies = await API.brands.fetchAllCompanies();
      setCompanyList(companies);
      setData(companies);
    };
    fetchCompanies();
  }, []);

  const handleDelete = (company) => {
    API.brands.deleteCompany(company);
  };

  const handleSearch = (e) => {
    const filter = data.filter((item) => item.name.toLowerCase().includes(e.target.value));
    setCompanyList(filter);
  };

  return (
    <Modal
      width={"960px"}
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
            <Search
              onChange={(e) => setSearchInput(e.target.value)}
              onSearch={handleSearch}
              value={searchInput}
              size={"large"}
              /* className="input-text" */
              placeholder="Search for brand name..."
              allowClear
              enterButton
            />
            <Button type="primary" style={{ height: "100%" }} size={"large"}>
              Add a new Brand
            </Button>
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
