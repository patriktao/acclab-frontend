import {
  Modal,
  Input,
  Popover,
  Button,
  List,
  Popconfirm,
  Typography,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { API } from "../../api";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { sortBy } from "lodash/fp";
import TooltipComponent from "../TooltipComponent";
import { sortList } from "../../helper/Sort";

const { Link, Text } = Typography;

const EditLocations = ({ visible, close, sendChangesToParent }) => {
  EditLocations.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    sendChangesToParent: PropTypes.func,
  };

  const [locations, setLocations] = useState([]);
  const [data, setData] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [searchField, setSearchField] = useState("");
  const [fieldState, setFieldState] = useState({});

  useEffect(() => {
    API.locations.fetchLocations().then((res) => {
      setLocations(res);
      setData(res);
    });
  }, []);

  const handlesearchField = (e) => {
    setSearchField(e);
    const filter = data.filter((item) =>
      item.name.toLowerCase().includes(e.toLowerCase())
    );
    setLocations(filter);
  };

  const locationList = (item) => {
    return (
      <List.Item
        className="row"
        actions={[
          <Link
            onClick={() => {
              setFieldState({ [item.name]: !fieldState[item.name] });
            }}
            type="primary"
          >
            {fieldState[item.name] ? "Close" : "Edit"}
          </Link>,
          <Popconfirm
            title={
              "Are you sure to delete this stored location?" +
              "\n" +
              "This stored location will be deleted from all raw materials who uses it"
            }
            onConfirm={() => handleDelete(item.name)}
          >
            <Link type="danger">Delete</Link>
          </Popconfirm>,
        ]}
      >
        <List.Item.Meta
          className="item"
          description={locationField(item.name)}
        />
      </List.Item>
    );
  };

  const handleDelete = (company) => {
    const filter = locations.filter(
      (item) => item.name.toLowerCase() !== company.toLowerCase()
    );
    setLocations(filter);
    setData(filter);
    sendChangesToParent(filter);
    API.locations.deleteLocation(company);
  };

  const handleEdit = (name, input) => {
    if (name !== input) {
      locations.forEach((obj) => {
        if (obj.name === name) {
          obj.name = input;
          obj.value = input;
        }
      });
      setData(locations);
      sendChangesToParent(locations);
      API.locations.updateLocation(name, input);
    }
  };

  const locationField = (name) => {
    if (fieldState[name]) {
      return (
        <TooltipComponent
          component={
            <Input
              required
              className="input-text"
              defaultValue={`${name}`}
              onPressEnter={(input) => {
                handleEdit(name, input.target.value);
                setFieldState({ [name]: !fieldState[name] });
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

  const addNewLocation = () => {
    return (
      <div className="popover">
        <div className="header-field-wrapper">
          <span>Add a new stored location</span>
          <Input
            value={newLocation}
            allowClear
            className="input-text"
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Type a new stored location..."
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

  const ifLocationExists = () => {
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].name.toLowerCase() === newLocation.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  const handleAdd = () => {
    if (newLocation === "") {
      message.warning("Please enter a brand name.");
    } else if (ifLocationExists()) {
      message.warning("The brand already exists.");
    } else {
      const mergedList = locations.concat([
        { value: newLocation, name: newLocation },
      ]);
      const sortedList = sortList(mergedList);
      setLocations(sortedList);
      setData(sortedList);
      sendChangesToParent(sortedList);
      API.locations.addLocation(newLocation);
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
      footer={[
        <Button key="submit" type="primary" onClick={close}>
          Close
        </Button>,
      ]}
    >
      <section className="EditBrands">
        <section className="header">
          <h1>Edit Stored Locations</h1>
        </section>
        <section className="body">
          <div className="options">
            <Input
              onChange={(e) => handlesearchField(e.target.value)}
              value={searchField}
              size={"large"}
              className="input-text"
              placeholder="searchField for a location name..."
              allowClear
              enterbutton="true"
            />
            <Popover
              trigger="click"
              placement={"bottom"}
              content={addNewLocation}
            >
              <Button
                type="primary"
                style={{ height: "100%", borderRadius: "12px" }}
                size={"large"}
              >
                Add a new Stored Location
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
                dataSource={sortBy("location.location", locations || [])}
                renderItem={locationList}
                rowKey={"location"}
              />
            </InfiniteScroll>
          </div>
        </section>
      </section>
    </Modal>
  );
};

export default EditLocations;
