import React from "react";
import CustomAlertControl from "../AlertMessage";
import Home from "./Dashboard";

const dashboard = () => {
  return (
    <>
      <CustomAlertControl />
      <Home />
    </>
  );
};
export default dashboard;
