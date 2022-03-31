import React from "react";
import TopFilterCourse from "./TopFilterCourse";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const Course = () => {
  return (
    <>
      {checkAccessPermission("course_view") ? (
        <>
          <TopFilterCourse />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default Course;
