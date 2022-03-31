import React from "react";
import CustomAlertControl from "../AlertMessage";
import TopFilterNetwork from "./TopFilterNetwork";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const Network = () => {
  return (
    <>
      {checkAccessPermission("network_view") ? (
        <>
          <CustomAlertControl />
          <TopFilterNetwork />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default Network;
