import moment from "moment";
import { Button, Tooltip, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { EllipsisOutlined } from "@ant-design/icons";
import "./RawMaterialTable.css";
import { getPriorityIcon } from "../../../components/Priority/Priority";
import { useState } from "react";

const editMenu = (
  <Menu style={{ borderRadius: "4px" }}>
    <Menu.Item style={{ borderRadius: "4px" }}>Edit item</Menu.Item>
  </Menu>
);

export const raw_material_columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Item name",
    dataIndex: "name",
    key: "name",
    render: (name, record) => (
      <Link
        to={
          "/inventory/" +
          record.id +
          "/" +
          name.replace(/\s/g, "").toLowerCase()
        }
      >
        {name}
      </Link>
    ),
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Brand",
    dataIndex: "company",
    key: "company",
    sorter: (a, b) => a.company.localeCompare(b.company),
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    sorter: (a, b) => a.country.localeCompare(b.country),
  },
  {
    title: "Form",
    dataIndex: "form",
    key: "form",
    sorter: (a, b) => a.form.localeCompare(b.form),
  },
  {
    title: "Amount (g/unit)",
    dataIndex: "amount",
    key: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    sorter: (a, b) => a.location.localeCompare(b.location),
  },
  {
    title: "Receieved Date",
    dataIndex: "received_date",
    key: "received_date",
    render: (received_date) => (
      <p style={{ marginBottom: "auto" }}>
        {moment(received_date).format("MMM D, YYYY")}
      </p>
    ),
    sorter: (a, b) =>
      moment(a.received_date).format("YYYYMMDD") -
      moment(b.received_date).format("YYYYMMDD"),
  },
  {
    title: "Expiration Date",
    dataIndex: "expiration_date",
    key: "expiration_date",
    render: (expiration_date) => (
      <p style={{ marginBottom: "auto" }}>
        {moment(expiration_date).format("MMM D, YYYY")}
      </p>
    ),
    sorter: (a, b) =>
      moment(a.expiration_date).format("YYYYMMDD") -
      moment(b.expiration_date).format("YYYYMMDD"),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    sorter: (a, b) => a.priority.localeCompare(b.priority),
    render: (priority, record) => getPriorityIcon(record.expiration_date),
  },
  {
    title: "Edit",
    dataIndex: "",
    key: "",
    render: () => (
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Tooltip title="Edit Item">
          <Dropdown overlay={editMenu} placement="bottomCenter" trigger="click">
            <Button className="edit-button">
              <EllipsisOutlined style={{ fontSize: "22px" }} />{" "}
            </Button>
          </Dropdown>
        </Tooltip>
      </div>
    ),
  },
];
