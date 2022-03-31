import React from "react";
import CustomAlertControl from "../AlertMessage";
import TopFilterHeader from "./TopFilterHeader";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const SearchCourse = () => {
  return (
    <>
      {checkAccessPermission("search_course_view") ? (
        <>
          <CustomAlertControl />
          <TopFilterHeader />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default SearchCourse;
