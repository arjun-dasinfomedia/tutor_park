import React, { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import MomentUtils from "@date-io/moment";

export default function DatePicker(props) {
  const {
    name,
    label,
    value,
    minDate = null,
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
    <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        disableCloseOnSelect
        {...(previousDateStatus && { disablePast: true })}
        {...(futureDateStatus && { disableFuture: true })}
        variant="inline"
        inputVariant="outlined"
        label={label}
        autoOk={true}
        showTodayButton={true}
        format="dd/MM/yyyy"
        name={name}
        value={value}
        {...(minDate && { minDate: minDate })}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
