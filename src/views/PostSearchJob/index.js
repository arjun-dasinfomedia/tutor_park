import React from "react";
import TopFilterHeader from "./TopFilterHeader";
import CustomAlertControl from "../AlertMessage";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const PostSearchJob = () => {
  return (
    <>
      {checkAccessPermission("Post_and_search_job_view") ? (
        <>
          <CustomAlertControl />
          {/* Top Filter Of Post and job Search */}
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

export default PostSearchJob;
