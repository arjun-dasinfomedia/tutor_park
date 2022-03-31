import React from "react";
import TopFilter from "./TopFilter";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";
import CustomAlertControl from '../AlertMessage'

const Earnings = () => {
  return (
    <>
      {checkAccessPermission("earnings_payments_view") ? (
        <>
        <CustomAlertControl />
          <TopFilter />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default Earnings;
