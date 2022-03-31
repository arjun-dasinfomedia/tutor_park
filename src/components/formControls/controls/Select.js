import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

export default function Select(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    other = null,
    dropDownType = null,
  } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem
            key={dropDownType == "schoolDiary" ? item.subject_id : item.id}
            value={
              dropDownType == "user"
                ? item.email
                : dropDownType == "user_id"
                ? item.id
                : dropDownType == "schoolDiary"
                ? item.subject_id
                : dropDownType == "parent" ?
                  item.id
                : item.id
            }
          >
            {dropDownType == "user"
              ? item.name + " - " + item.tp_id + " - " + item.email
              : dropDownType == "user_id"
              ? item.name + " - " + item.tp_id + " - " + item.email
              : dropDownType == "schoolDiary"
              ? item.subject_name
              : dropDownType == "parent" ?
                  item.first_name + " " + item.last_name
              : item.name}
          </MenuItem>
        ))}
        {other && <MenuItem value="other">Other</MenuItem>}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
