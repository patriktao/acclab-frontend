import PropTypes from "prop-types";
import { useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const ImageUploader = ({ handleImage, currentImage }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    let status = info.file.status;
    if (status === "uploading") {
      setLoading(true);
    } else if (status === "done" && restrictions(info.file)) {
      setSelectedFile(info.file);
      setLoading(false);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const restrictions = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Image must smaller than 10MB!");
    }
    return isJpgOrPng && isLt10M;
  };

  return (
    <Dragger
      maxCount={1}
      listType="text"
      multiple={false}
      onChange={handleChange}
      onDrop={(e) => {
        setSelectedFile("");
        console.log("Dropped files", e.dataTransfer.files);
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Support for PNG. and JPEG. files.</p>
    </Dragger>
  );
};

ImageUploader.propTypes = {
  handleImage: PropTypes.func,
  currentImage: PropTypes.string,
};

export default ImageUploader;
