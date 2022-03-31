import React from "react";
import FindtutorContanier from "./FindtutorContanier";
import CustomAlertControl from "../AlertMessage";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const Findtutor = () => {
  return (
    <>
      {checkAccessPermission("find_tutor_view") ? (
        <>
          <CustomAlertControl />
          <FindtutorContanier />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default Findtutor;
