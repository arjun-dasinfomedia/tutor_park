import React from "react";
import CustomAlertControl from "../AlertMessage";
import TopFilterEvent from "./TopFilterEvent";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const MyEvents = () => {
  return (
    <>
      {checkAccessPermission("events_view") ? (
        <>
          <CustomAlertControl />
          {/* Event Page */}
          <TopFilterEvent />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default MyEvents;
