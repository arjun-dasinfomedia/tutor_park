import React from "react";
import { CRow, CCol, CCard } from "@coreui/react";
import Todo from "./Todo";
import CustomAlertControl from "../AlertMessage";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const TopFilter = () => {
  return (
    <>
      {checkAccessPermission("to_do_view") ? (
        <div style={{ marginTop: "15px" }}>
          <CustomAlertControl />
          <CRow>
            <CCol sm={12} md={12} lg={12} xl={12}>
              <CCard className="timeline-header-css">
                <div class="PostHeader row mt-1">
                  <div className="mt-5 mb-5 text-center">
                    <div className="page-header-size">To do</div>
                  </div>
                </div>
              </CCard>
            </CCol>
          </CRow>
          <Todo />
        </div>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default TopFilter;
