import React from 'react'
import TopFilterPoints from './TopFilterPoints';
import CustomAlertControl from "../AlertMessage";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const MyPoints = () => {
  return (
    <>
      {checkAccessPermission("my_points_view") ? (
        <>
          {/* Transfer Main Page */}
          <TopFilterPoints />
          <CustomAlertControl />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}

    </>
  )
}
export default MyPoints;
