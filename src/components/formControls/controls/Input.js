import React from "react";
import { InputAdornment, TextField } from "@material-ui/core";

export default function Input(props) {
  const {
    name,
    label,
    value,
    type = null,
    labelShow = null,
    error = null,
    onChange,
  } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      {...(type && { type: type })}
    />
  );
}
