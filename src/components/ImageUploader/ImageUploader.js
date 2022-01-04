import PropTypes from "prop-types";
import { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ImageUploader = ({ handleImage, currentImage, id }) => {
  ImageUploader.propTypes = {
    handleImage: PropTypes.func,
    currentImage: PropTypes.string,
    id: PropTypes.number,
  };

  const [selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      setLoading(true);
      console.log("uploading");
      return;
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      console.log(info.file, info.fileList);
      setLoading(false);
    } else if (status === "error") {
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

  return (
    <Upload
      maxCount={1}
      listType="picture"
      beforeUpload={restrictions}
      onChange={handleChange}
      progress
      action={`localhost:4000/upload/raw_materials/${id}`}
      onDrop={(e) => {
        setSelectedFile("");
        console.log("Dropped files", e.dataTransfer.files);
      }}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default ImageUploader;
