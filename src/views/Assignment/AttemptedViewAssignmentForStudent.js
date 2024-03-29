import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Controls from "src/components/formControls/controls/Controls";
import { getViewSubmittedAssignment } from "./AssignmentAction";
import { Link } from "react-router-dom";
import { CCard, CCol, CButton } from "@coreui/react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { useForm } from "src/components/formControls/useForm";
import useFullPageLoader from "src/hooks/useFullPageLoader";

const AttemptedViewAssignmentForStudent = (prop) => {
  const assignmentState = useSelector((state) => state.Assignment);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [assignmentID, setAssignmentID] = useState("draftId");
  const showOffline = (e) => {
    setAssignmentID(e.target.id);
  };
  useEffect(async () => {
    showLoader();
    if (prop.location.aboutProps !== undefined) {
      await dispatch(
        getViewSubmittedAssignment({
          student_assignment_id: prop.location.aboutProps.student_assignment_id,
        })
      );
    }
    setLoading(false);
    hideLoader();
  }, []);

  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : (
        <div>
          <CCard className="course-card-list-css page-header-size">
            <div className="course-header">
              <div className="col-12">
                <div className="row mt-3 d-flex">
                  <div className="text-center col-12">
                    <div className="postsearchheader">Assignment</div>
                  </div>
                </div>
                <div className="row mt-1 mb-3">
                  <div className="col-md-1 col-lg-1 col-xl-1"></div>
                  <div className="text-center col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 text-center">
                    <Link to="/assignment">
                      <CButton
                        className="groupbutton m-1"
                        shape="rounded-pill"
                        onClick={showOffline}
                        id="draftId"
                      >
                        Assigned
                      </CButton>
                    </Link>
                    <Link to="/attempt-student">
                      <CButton
                        shape="rounded-pill"
                        onClick={showOffline}
                        className="groupbutton-active m-1"
                        id="publish"
                      >
                        Attempted
                      </CButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CCard>
          {prop.location.aboutProps === undefined ? (
            <NoDataContainer module="Assignment" />
          ) : (
            <div className="row p-2 ">
              <div className="row mb-3 mt-2">
                <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 ">
                  <div className="row d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                    <div className="card-title text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                      <div className="d-inline">
                        <div className="font-weight-bold d-inline card-title">
                          {
                            assignmentState.viewSubmittedAssignment.assignment
                              .title
                          }
                        </div>
                      </div>
                    </div>

                    <div className="lh-lg medium-text text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                      {
                        assignmentState.viewSubmittedAssignment.assignment
                          .description
                      }
                    </div>

                    <div className="lh-lg text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <div className="font-weight-bold d-inline simple-normal-font">
                            {" "}
                            Date:-{" "}
                          </div>
                          <div className="d-inline">
                            {
                              assignmentState.viewSubmittedAssignment.assignment
                                .from_date
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lh-lg normal-font text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                      {
                        assignmentState.viewSubmittedAssignment.assignment
                          .syllabus
                      }{" "}
                      |
                      {
                        assignmentState.viewSubmittedAssignment.assignment
                          .subject
                      }{" "}
                      |
                      {assignmentState.viewSubmittedAssignment.assignment.class}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                  {assignmentState.viewSubmittedAssignment.tutor_status ===
                  "pending" ? (
                    ""
                  ) : (
                    <div className="rounded assignment-Viewpage-section-marksh row d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                      <div className="text-center p-2 assignment-normal-font marks-border-css">
                        <>
                          Obtained Mark:-
                          {
                            assignmentState.viewSubmittedAssignment
                              .obtained_mark
                          }
                        </>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                  <div className="rounded assignment-Viewpage-section-marksh row d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                    <div className="text-center p-2 assignment-normal-font marks-border-css">
                      Total Marks:{" "}
                      {assignmentState.viewSubmittedAssignment.assignment
                        .total_mark === null
                        ? "N/A"
                        : assignmentState.viewSubmittedAssignment.assignment
                            .total_mark}
                    </div>
                  </div>
                </div>
              </div>

              {/* question answer Part */}
              {assignmentState.viewSubmittedAssignment.sections &&
                assignmentState.viewSubmittedAssignment.sections.map(function (
                  item,
                  key
                ) {
                  {
                    return item.section_detail.type.tag === "q_a" ? (
                      <>
                        <div className="mt-2 mb-2 " key={key}>
                          <Accordion
                            className="assignment-card-accordion assignment-card"
                            style={{
                              borderRadius: "15px",
                              backgroundColor: "#F2F4F8",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon className="" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className=""
                              style={{ padding: "0px 16px", display: "flex" }}
                            >
                              <div className="row col-12 ">
                                <Typography className="fw-bold assignment-link col-6 col-sm-6 col-md-2 col-lg-2 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="fw-bold assignment-question-section-font">
                                    Section
                                  </div>
                                </Typography>
                                <Typography className="col-6 col-sm-6 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="p-2 section-part m-1">
                                    {item.section_detail.section_name}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="col-12 col-xl-7 section-part1 p-2 m-1">
                                    {item.section_detail.description}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-3 d-flex d-flex justify-content-center justify-content-sm-center justify-content-md-end justify-content-lg-end justify-content-xl-end align-items-center">
                                  <div className="assignment-normal-font">
                                    {" "}
                                    {assignmentState.viewSubmittedAssignment
                                      .tutor_status === "pending" ? (
                                      ""
                                    ) : (
                                      <h6>
                                        Obtained mark: {item.obtained_mark}{" "}
                                      </h6>
                                    )}
                                  </div>
                                </Typography>
                              </div>
                            </AccordionSummary>
                            <hr className="m-0 assignment-line-accordion"></hr>
                            <AccordionDetails className="p-2">
                              {/* <Typography> */}
                              <div className="row">
                                <div className="col-12 assignment-link ">
                                  <div className="mt-2">
                                    <div className="p-3 assignment-card-accordion">
                                      <div className="row">
                                        {item.questions.map(function (
                                          data,
                                          key
                                        ) {
                                          return (
                                            <>
                                              <div className="assignment-question-font col-12 col-sm-10 col-md-8 col-lg-10 col-xl-10 mb-1">
                                                {key + 1 + ") "}
                                                {data.question_detail.question}

                                                <h6 className="font-weight-bold">
                                                  Answer:-{" "}
                                                  {data.student_answer === null
                                                    ? "N/A"
                                                    : data.student_answer
                                                        .answer}
                                                </h6>
                                                <hr className="assignment-line-accordion"></hr>
                                              </div>
                                              <div className="assignment-question-font col-12 col-sm-2 col-md-4 col-lg-2 col-xl-2 mb-1">
                                                {assignmentState
                                                  .viewSubmittedAssignment
                                                  .tutor_status ===
                                                "pending" ? (
                                                  ""
                                                ) : (
                                                  <h6>
                                                    Obtained Mark:-{" "}
                                                    {data.obtained_mark}
                                                  </h6>
                                                )}
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </>
                    ) : // MCQ Part
                    item.section_detail.type.tag === "mcq" ? (
                      <>
                        <div className="mt-2 mb-2" key={key}>
                          <Accordion
                            className="assignment-card-accordion assignment-card"
                            style={{
                              borderRadius: "15px",
                              backgroundColor: "#F2F4F8",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon className="" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className=""
                              style={{ padding: "0px 16px", display: "flex" }}
                            >
                              <div className="row col-12 ">
                                <Typography className="fw-bold assignment-link col-6 col-sm-6 col-md-2 col-lg-2 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="fw-bold assignment-question-section-font">
                                    Section
                                  </div>
                                </Typography>
                                <Typography className="col-6 col-sm-6 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="p-2 section-part m-1">
                                    {item.section_detail.section_name}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="col-12 col-xl-7 section-part1 p-2 m-1">
                                    {item.section_detail.description}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-3 d-flex d-flex justify-content-center justify-content-sm-center justify-content-md-end justify-content-lg-end justify-content-xl-end align-items-center">
                                  <div className="assignment-normal-font">
                                    {" "}
                                    {assignmentState.viewSubmittedAssignment
                                      .tutor_status === "pending" ? (
                                      ""
                                    ) : (
                                      // <h6>Obtained Mark:- {data.question_detail.obtained_mark}</h6>
                                      <h6>
                                        obtained_mark: {item.obtained_mark}{" "}
                                      </h6>
                                    )}
                                  </div>
                                </Typography>
                              </div>
                            </AccordionSummary>
                            <hr className="m-0 assignment-line-accordion"></hr>
                            <AccordionDetails className="p-2">
                              <div className="row">
                                <div className="col-12 assignment-link ">
                                  <div className="mt-2">
                                    <div className="p-3 assignment-card-accordion">
                                      <div className="row">
                                        {item.questions.map(function (
                                          data,
                                          key
                                        ) {
                                          return (
                                            <>
                                              <div className="assignment-question-font col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-1">
                                                <div className="mt-2 row mb-3">
                                                  <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                    {key + 1 + ")"}
                                                    {
                                                      data.question_detail
                                                        .question
                                                    }
                                                  </div>
                                                </div>

                                                <div className="col-12 col-sm-10 col-md-8 col-lg-10 col-xl-10 ">
                                                  <h6 className="font-weight-bold">
                                                    Answer:-{" "}
                                                    {data.student_answer.answer}
                                                  </h6>
                                                  <hr className="assignment-line-accordion"></hr>
                                                </div>
                                              </div>
                                              <div className="assignment-question-font col-12 col-sm-2 col-md-4 col-lg-2 col-xl-2 mb-1">
                                                {assignmentState
                                                  .viewSubmittedAssignment
                                                  .tutor_status ===
                                                "pending" ? (
                                                  ""
                                                ) : (
                                                  <h6>
                                                    Obtained Mark:-{" "}
                                                    {data.obtained_mark}
                                                  </h6>
                                                )}
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </>
                    ) : // Fill In the Blanks Part
                    item.section_detail.type.tag === "blanks" ? (
                      <>
                        <div className="mt-2 mb-2" key={key}>
                          <Accordion
                            className="assignment-card-accordion assignment-card"
                            style={{
                              borderRadius: "15px",
                              backgroundColor: "#F2F4F8",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon className="" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className=""
                              style={{ padding: "0px 16px", display: "flex" }}
                            >
                              <div className="row col-12 ">
                                <Typography className="fw-bold assignment-link col-6 col-sm-6 col-md-2 col-lg-2 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="fw-bold assignment-question-section-font">
                                    Section
                                  </div>
                                </Typography>
                                <Typography className="col-6 col-sm-6 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="p-2 section-part m-1">
                                    {item.section_detail.section_name}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="col-12 col-xl-7 section-part1 p-2 m-1">
                                    {item.section_detail.description}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-3 d-flex d-flex justify-content-center justify-content-sm-center justify-content-md-end justify-content-lg-end justify-content-xl-end align-items-center">
                                  <div className="assignment-normal-font">
                                    {" "}
                                    {assignmentState.viewSubmittedAssignment
                                      .tutor_status === "pending" ? (
                                      ""
                                    ) : (
                                      <h6>
                                        obtained_mark: {item.obtained_mark}{" "}
                                      </h6>
                                    )}
                                  </div>
                                </Typography>
                              </div>
                            </AccordionSummary>
                            <hr className="m-0 assignment-line-accordion"></hr>
                            <AccordionDetails className="p-2">
                              <div className="row">
                                <div className="col-12 assignment-link ">
                                  <div className="mt-2">
                                    <div className="p-3 assignment-card-accordion">
                                      <div className="row">
                                        {item.questions.map(function (data) {
                                          return (
                                            <>
                                              <div className="assignment-question-font col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10 mb-1">
                                                {key + 1 + ")"}
                                                {data.question_detail.question.replace(
                                                  /{blank}/g,
                                                  "__________"
                                                )}

                                                <h6 className="font-weight-bold">
                                                  Answer:-
                                                  {data.student_answer.answer}
                                                </h6>
                                                <hr className="assignment-line-accordion"></hr>
                                              </div>
                                              <div className="assignment-question-font col-12 col-sm-2 col-md-4 col-lg-2 col-xl-2 mb-1">
                                                {assignmentState
                                                  .viewSubmittedAssignment
                                                  .tutor_status ===
                                                "pending" ? (
                                                  ""
                                                ) : (
                                                  <h6>
                                                    Obtained Mark:-{" "}
                                                    {data.obtained_mark}
                                                  </h6>
                                                )}
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </>
                    ) : // Comprehension part
                    item.section_detail.type.tag === "comprehension" ? (
                      <>
                        <div className="mt-2 ">
                          <Accordion
                            className="assignment-card-accordion assignment-card"
                            style={{
                              borderRadius: "15px",
                              backgroundColor: "#F2F4F8",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon className="" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className=""
                              style={{ padding: "0px 16px", display: "flex" }}
                            >
                              <div className="row col-12 ">
                                <Typography className="fw-bold assignment-link col-6 col-sm-6 col-md-2 col-lg-2 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="fw-bold assignment-question-section-font">
                                    Section
                                  </div>
                                </Typography>
                                <Typography className="col-6 col-sm-6 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="p-2 section-part m-1">
                                    {item.section_detail.section_name}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="col-12 col-xl-7 section-part1 p-2 m-1">
                                    {item.section_detail.description}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-3 d-flex d-flex justify-content-center justify-content-sm-center justify-content-md-end justify-content-lg-end justify-content-xl-end align-items-center">
                                  <div className="assignment-normal-font">
                                    {" "}
                                    {assignmentState.viewSubmittedAssignment
                                      .tutor_status === "pending" ? (
                                      ""
                                    ) : (
                                      <h6>
                                        obtained_mark: {item.obtained_mark}{" "}
                                      </h6>
                                    )}
                                  </div>
                                </Typography>
                              </div>
                            </AccordionSummary>
                            <hr className="m-0 assignment-line-accordion"></hr>
                            <AccordionDetails className="p-0 mb-2">
                              <Typography>
                                <div className="row">
                                  <div className="col-12 assignment-link ">
                                    <div className="mt-2">
                                      <div className="friendcard p-3 assignment-card-accordion">
                                        {item.questions.map(function (
                                          data,
                                          key
                                        ) {
                                          return (
                                            <>
                                              <div className="row" key={key}>
                                                <div className="assignment-question-font col-12 assignment-link mb-1">
                                                  {
                                                    data.question_detail
                                                      .question
                                                  }
                                                </div>
                                              </div>

                                              <div className="row">
                                                <div className="col-12 assignment-link ">
                                                  <div className="mt-2">
                                                    <div className="p-3 assignment-card-accordion">
                                                      <div className="row">
                                                        <div className="assignment-question-font col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10 mb-1">
                                                          {data.student_answer ===
                                                          null
                                                            ? "N/A"
                                                            : data.student_answer.map(
                                                                function (
                                                                  item,
                                                                  key
                                                                ) {
                                                                  return (
                                                                    <>
                                                                      {key +
                                                                        1 +
                                                                        ") " +
                                                                        item
                                                                          .comprehensive_question
                                                                          .question}

                                                                      <h6 className="font-weight-bold">
                                                                        Answer:-
                                                                        {
                                                                          item
                                                                            .comprehensive_question
                                                                            .answer
                                                                            .answer
                                                                        }
                                                                      </h6>
                                                                      <hr className="assignment-line-accordion"></hr>
                                                                    </>
                                                                  );
                                                                }
                                                              )}

                                                          <div className="assignment-question-font col-12 col-sm-2 col-md-4 col-lg-2 col-xl-2 mb-1">
                                                            {assignmentState
                                                              .viewSubmittedAssignment
                                                              .tutor_status ===
                                                            "pending" ? (
                                                              ""
                                                            ) : (
                                                              <h6>
                                                                Obtained Mark:-{" "}
                                                                {
                                                                  data.obtained_mark
                                                                }
                                                              </h6>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </>
                    ) : // match the following part
                    item.section_detail.type.tag === "match_following" ? (
                      <div className="mt-2 mb-2 ">
                        <Accordion
                          className="assignment-card-accordion assignment-card"
                          style={{
                            borderRadius: "15px",
                            backgroundColor: "#F2F4F8",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className=""
                            style={{ padding: "0px 16px", display: "flex" }}
                          >
                            <div className="row col-12 ">
                              <Typography className="fw-bold assignment-link col-6 col-sm-6 col-md-2 col-lg-2 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                <div className="fw-bold assignment-question-section-font">
                                  Section
                                </div>
                              </Typography>
                              <Typography className="col-6 col-sm-6 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                <div className="p-2 section-part m-1">
                                  {item.section_detail.section_name}
                                </div>
                              </Typography>
                              <Typography className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                <div className="col-12 col-xl-7 section-part1 p-2 m-1">
                                  {item.section_detail.description}
                                </div>
                              </Typography>
                              <Typography className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-3 d-flex d-flex justify-content-center justify-content-sm-center justify-content-md-end justify-content-lg-end justify-content-xl-end align-items-center">
                                <div className="assignment-normal-font">
                                  {" "}
                                  {assignmentState.viewSubmittedAssignment
                                    .tutor_status === "pending" ? (
                                    ""
                                  ) : (
                                    <h6>
                                      obtained_mark: {item.obtained_mark}{" "}
                                    </h6>
                                  )}
                                </div>
                              </Typography>
                            </div>
                          </AccordionSummary>
                          <hr className="m-0 assignment-line-accordion"></hr>

                          <AccordionDetails className="p-2">
                            {item.questions.map(function (data, key) {
                              return (
                                <>
                                  <div className="row" key={key}>
                                    <div className="col-12 assignment-link ">
                                      <div className="mt-2">
                                        <div className="p-3 assignment-card-accordion">
                                          <div className="row">
                                            <div className="assignment-question-font col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10 mb-1">
                                              {key + 1 + ") "}
                                              {data.question_detail.question}

                                              <div>
                                                <CCol>
                                                  <CCard className="card p-3 assigncard mt-3 mb-3">
                                                    <div className="row">
                                                      <div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 ">
                                                        {data.question_detail.options.left_option.map(
                                                          function (item) {
                                                            return (
                                                              <>
                                                                <div className="mt-4">
                                                                  {item.name}
                                                                  <br />
                                                                </div>
                                                              </>
                                                            );
                                                          }
                                                        )}
                                                      </div>
                                                      <div className="p-0 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                                                        {data.question_detail.options.left_option.map(
                                                          function (item) {
                                                            return (
                                                              <>
                                                                <div className="mt-2">
                                                                  <Controls.Input
                                                                    name="answer"
                                                                    label=""
                                                                    values={
                                                                      values.answer
                                                                    }
                                                                    onChange={
                                                                      handleInputChange
                                                                    }
                                                                  />
                                                                </div>
                                                              </>
                                                            );
                                                          }
                                                        )}
                                                      </div>
                                                      <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 r">
                                                        {data.question_detail.options.right_option.map(
                                                          function (item) {
                                                            return (
                                                              <>
                                                                <div className="mt-4">
                                                                  {item.name}
                                                                  <br />
                                                                </div>
                                                              </>
                                                            );
                                                          }
                                                        )}
                                                      </div>
                                                    </div>
                                                  </CCard>
                                                </CCol>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ) : (
                      ""
                    );
                  }
                })}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default AttemptedViewAssignmentForStudent;
