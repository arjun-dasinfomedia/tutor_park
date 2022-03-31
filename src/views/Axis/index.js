import React from "react";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";
import Axis from "./Axis";

const AxisIndex = () => {
  return (
    <>
      {checkAccessPermission("axis_view") ? (
        <>
          <Axis />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default AxisIndex;
