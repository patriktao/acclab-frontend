import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PropTypes from "prop-types";
import "./TextEditorReadOnly.scss";

const TextEditorReadOnly = ({ originalData }) => {
  TextEditorReadOnly.propTypes = {
    originalData: PropTypes.string,
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={originalData}
      disabled={true}
      config={{
        removePlugins: ["toolbar"],
        toolbar: [],
      }}
      onReady={(editor) => {
        console.log("Ready to read!", editor);
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  );
};

export default TextEditorReadOnly;
