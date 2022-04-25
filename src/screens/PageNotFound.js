import React from "react";
import Photo from "../images/cones.png";
import Template from "./Template";

const PageNotFound = () => {
  return (
    <Template
      content={
        <div style={wrapper} id="wrapper">
          <img style={image} src={Photo} alt="" />
          <div id="info">
            <h3>This page could not be found.</h3>
          </div>
        </div>
      }
    />
  );
};

const wrapper = {
  display: "grid",
  justifyItems: "center",
  gridTemplateRows: "3fr 1fr",
};

const image = {
  width: "400px",
  height: "400px",
};

export default PageNotFound;
