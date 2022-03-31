import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CCard,
  CButton,
} from "@coreui/react";
const TopFilterQuestionBank = () => {

  const [questionBankID, setQuestionBankID] = useState("");
  const showOffline = (e) => {
    setQuestionBankID(e.target.id);
  };

  return (
    <>
      <CCard className="course-card-list-css page-header-size">
        <div className="course-header">
          <div className="col-12">
            <div className="row mt-3 d-flex">
              <div className="text-center col-12">
                <div className="postsearchheader">
                  Question Bank
                  <Link to="/add-questionBank" className="text-decoration-none">
                    <CButton
                      className="d-inline textbook-add-button-css w-auto "

                    >
                      Add
                    </CButton>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row mt-1 mb-3">
              <div className="col-md-1 col-lg-1 col-xl-1"></div>
              <div className="text-center col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 text-center">
                <Link to="assignment">
                  <CButton
                    shape="rounded-pill"
                    onClick={showOffline}
                    className={
                      questionBankID === "Assignment"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    id="Assignment"
                  >
                    Assignment
                  </CButton>
                </Link>
                <Link to="question-bank">
                  <CButton
                    shape="rounded-pill"
                    onClick={showOffline}
                    className={
                      questionBankID === "Question Bank"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    id="Question Bank"
                    active
                  >
                    Question Bank
                  </CButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CCard>
    </>
  );
};

export default TopFilterQuestionBank;
