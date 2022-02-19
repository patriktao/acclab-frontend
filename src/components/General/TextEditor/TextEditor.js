import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PropTypes from "prop-types";
import "./TextEditor.scss";

const TextEditor = ({ originalData, onChange }) => {
  TextEditor.propTypes = {
    originalData: PropTypes.string,
    onChange: PropTypes.func,
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={originalData}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
        console.log({ event, editor, data });
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

export default TextEditor;
