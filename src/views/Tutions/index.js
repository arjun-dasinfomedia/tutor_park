import React from "react";
import TopHeaderMyTution from "./TopHeader";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const MyTution = () => {
  return (
    <>
      {checkAccessPermission("tuition_view") ? (
        <TopHeaderMyTution />
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};

export default MyTution;
