import React from "react";
import CustomAlertControl from "../AlertMessage";
import TopFilterLibrary from "./TopFilterLibrary";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const Library = () => {
  return (
    <>
      {checkAccessPermission("library_view") ? (
        <>
          <CustomAlertControl />
          {/* Top Filter Of Library Page */}
          <TopFilterLibrary />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default Library;
