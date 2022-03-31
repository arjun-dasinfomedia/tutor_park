import React, { useState } from "react";
import SchoolDiaryContainer from './SchoolDiaryContainer'

import {
  CCard,
  CButton
} from "@coreui/react";
import CustomAlertControl from "../../AlertMessage";

const TopFilterSchoolDiary = () => {

  const [schoolDiaryID, setSchoolDiaryID] = useState("MyDiary");
  const showOffline = (e) => {
    setSchoolDiaryID(e.target.id);
  }

  return (
    <>
      <div className="mt-3 mb-3">
      <CustomAlertControl />
        <CCard className="schooldiary-header-css">
          <div className="PostHeader row mt-3">
            <div className="text-center">
              <div className="page-header-size">School Diary</div>
            </div>
          </div>
          <div className="row mt-2 mb-3 ">
            <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
            <div className="text-center col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">
              <CButton
                className={(schoolDiaryID === 'MyDiary' ? "groupbutton-active m-1" : "groupbutton m-1")}
                onClick={showOffline}
                id="MyDiary"
              >
                My Diary
              </CButton>
              <CButton
                className={(schoolDiaryID === 'SchoolDiaryList' ? "groupbutton-active m-1" : "groupbutton m-1")}
                onClick={showOffline}
                id="SchoolDiaryList"
              >
                School Diary
              </CButton>
            </div>
          </div>
        </CCard>
      </div>
      <SchoolDiaryContainer Data={schoolDiaryID} />
    </>
  );
};

export default TopFilterSchoolDiary;
