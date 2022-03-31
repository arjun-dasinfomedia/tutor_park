import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

export default function DatePicker(props) {
  const {
    name,
    label,
    value,
    minTime = null,
    onChange,
    previousDateStatus = null,
    futureDateStatus = null,
  } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} disableCloseOnSelect>
      <TimePicker
        label={label}
        name={name}
        value={value}
        {...(minTime && { minTime: minTime })}
        renderInput={(params) => <TextField {...params} />}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
      />
    </LocalizationProvider>
  );
}
