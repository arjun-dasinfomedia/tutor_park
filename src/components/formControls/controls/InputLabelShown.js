import React from "react";
import { InputAdornment, TextField } from "@material-ui/core";

export default function InputLabelShown(props) {
  const { name, label, value, type = null, error = null, onChange } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      InputProps={{
        startAdornment: <InputAdornment position="start"></InputAdornment>,
      }}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      {...(type && { type: type })}
    />
  );
}
