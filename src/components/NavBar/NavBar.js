import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { LeftSquareOutlined } from "@ant-design/icons";
import "./NavBar.css";

const NavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="navbar">
      <Button
        className="menu-button"
        type="primary"
        icon={<LeftSquareOutlined />}
        onClick={() => setVisible(true)}
        display="none"
      />
      <Drawer
        title="Topics"
        placement="left"
        width={270}
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      > 
        {menu}
     </Drawer>
    </nav>
  );
};
export default NavBar;  