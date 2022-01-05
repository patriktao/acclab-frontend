import PropTypes from "prop-types";
import { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ImageUploader = ({ handleImage }) => {
  ImageUploader.propTypes = {
    handleImage: PropTypes.func,
  };

  const handleChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log("uploading");
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const restrictions = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const size = file.size < 7e6;
    if (!size) {
      message.error("Image must smaller than 7MB!");
    }
    return isJpgOrPng && size;
  };

  const customRequest = ({ onSuccess, onError, file }) => {
    setTimeout(() => {
      try {
        if (restrictions(file)) {
          onSuccess(null, file);
          handleImage(file);
        } else {
          onError();
        }
      } catch (err) {
        console.log(err);
        onError();
      }
    }, 1);
  };

  return (
    <Upload
      maxCount={1}
      listType="picture"
      onChange={handleChange}
      customRequest={customRequest}
      onDrop={(e) => {
        console.log("Dropped files", e.dataTransfer.files);
      }}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default ImageUploader;
