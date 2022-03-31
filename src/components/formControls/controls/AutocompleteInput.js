import React from "react";
import { Autocomplete } from "@mui/material";
import { TextField, FormControl } from "@material-ui/core";

export default function AutocompleteInput(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    other = null,
    dropDownType = null,
    getOptionLabel,
    renderInput,
  } = props;

  return (
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      name={name}
      renderInput={renderInput}
      onChange={onChange}
    />
  );
}
