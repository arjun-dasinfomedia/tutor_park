import React from "react";
import { TextareaAutosize } from "@material-ui/core";

export default function Input(props) {
  const { name, placeholder, value, error = null, onChange } = props;
  return (
    <TextareaAutosize
      variant="outlined"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      style={{ width: "98%", height: "80%" }}
    />
  );
}
