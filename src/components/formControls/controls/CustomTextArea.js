import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, label, value, rows, error = null, onChange } = props;
  return (
    <TextField
      id="outlined-multiline-static"
      variant="outlined"
      multiline
      name={name}
      label={label}
      value={value}
      rows={rows}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      style={{ width: "98%" }}
    />
  );
}
