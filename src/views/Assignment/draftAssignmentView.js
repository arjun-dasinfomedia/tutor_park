import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Controls from "src/components/formControls/controls/Controls";
import { viewAttemptAssignmentStudent } from "./AssignmentAction";
import { Link } from "react-router-dom";
import { CCard, CCol, CButton } from "@coreui/react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { useDispatch, useSelector } from "react-redux";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { useForm } from "src/components/formControls/useForm";

const DraftAssignementView = (prop) => {
  const initialFValues = {
    answer: "1",
  };

  const validate = () => {};
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
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
        viewAttemptAssignmentStudent({ id: prop.location.aboutProps })
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
                        shape="rounded-pill"
                        onClick={showOffline}
                        className={
                          assignmentID === "draftId"
                            ? "groupbutton-active m-1"
                            : "groupbutton m-1"
                        }
                        id="draftId"
                      >
                        Draft
                      </CButton>
                    </Link>

                    <Link to="/publish-assignment">
                      <CButton
                        shape="rounded-pill"
                        onClick={showOffline}
                        className={
                          assignmentID === "publish"
                            ? "groupbutton-active m-1"
                            : "groupbutton m-1"
                        }
                        id="publish"
                      >
                        Publish
                      </CButton>
                    </Link>
                    <Link to="/question-bank">
                      <CButton
                        shape="rounded-pill"
                        onClick={showOffline}
                        className={
                          assignmentID === "Question Bank"
                            ? "groupbutton-active m-1"
                            : "groupbutton m-1"
                        }
                        id="Question Bank"
                      >
                        Question Bank
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
                <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 ">
                  <div className="row d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                    <div className="card-title text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                      <div className="d-inline">
                        <div className="font-weight-bold d-inline card-title">
                          {assignmentState.attemptViewStudent.title}
                        </div>
                      </div>
                    </div>
                    <div className="lh-lg medium-text text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                      {assignmentState.attemptViewStudent.description}
                    </div>
                    <div className="lh-lg text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <div className="font-weight-bold d-inline simple-normal-font">
                            {" "}
                            Date:-{" "}
                          </div>
                          <div className="d-inline">
                            {assignmentState.attemptViewStudent.from_date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lh-lg normal-font text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                      {assignmentState.attemptViewStudent.syllabus} |
                      {assignmentState.attemptViewStudent.subject} |
                      {assignmentState.attemptViewStudent.class}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                  <div className="rounded assignment-Viewpage-section-marksh row d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                    <div className="text-center p-2 assignment-normal-font marks-border-css">
                      Total Marks:
                      {assignmentState.attemptViewStudent.total_mark == ""
                        ? "N/A"
                        : assignmentState.attemptViewStudent.total_mark}
                    </div>
                  </div>
                </div>
              </div>

              {/* question answer Part */}
              {assignmentState.attemptViewStudent.sections &&
                assignmentState.attemptViewStudent.sections.map(function (
                  item,
                  key
                ) {
                  {
                    // Question and Answer Part
                    return item.type.tag === "q_a" ? (
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
                                    {item.section_name}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="col-12 col-xl-7 section-part1 p-2 m-1">
                                    {item.description}
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
                                                {data.question.question}

                                                <h6 className="font-weight-bold ml-3">
                                                  Answer:-{" "}
                                                  {data.question.answer.answer}
                                                </h6>
                                                <hr className="assignment-line-accordion"></hr>
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* </Typography> */}
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </>
                    ) : // MCQ Part
                    item.type.tag === "mcq" ? (
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
                              <div className="row col-12">
                                <Typography className="fw-bold assignment-link col-12 col-sm-12 col-md-2 col-lg-2 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start align-items-center">
                                  <div className="fw-bold assignment-question-section-font">
                                    Section
                                  </div>
                                </Typography>
                                <Typography className="col-6 col-sm-6 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start align-items-center">
                                  <div className="p-2 section-part m-1">
                                    {item.section_name}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start align-items-center">
                                  <div className="col-12 col-xl-7 section-part1 p-2 m-1">
                                    {item.description}
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
                                                {data.question.question}

                                                <h6 className="font-weight-bold ml-3">
                                                  Answer:-{" "}
                                                  {data.question.answer.answer}
                                                </h6>
                                                <hr className="assignment-line-accordion"></hr>
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* </Typography> */}
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </>
                    ) : // Fill In the Blanks Part
                    item.type.tag === "blanks" ? (
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
                                    {item.section_name}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="col-12 col-xl-7 section-part1 p-2 m-1">
                                    {item.description}
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
                                                {key + 1 + ")"}
                                                {data.question.question.replace(
                                                  /{blank}/g,
                                                  "__________"
                                                )}

                                                <h6 className="font-weight-bold">
                                                  Answer:-
                                                  {data.question.answer.answer}
                                                </h6>
                                                <hr className="assignment-line-accordion"></hr>
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* </Typography> */}
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </>
                    ) : // Comprehension part
                    item.type.tag === "comprehension" ? (
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
                                    {item.section_name}
                                  </div>
                                </Typography>
                                <Typography className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div className="col-12 col-xl-7 section-part1 p-2 m-1">
                                    {item.description}
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
                                        <div className="row" key={key}>
                                          <div className="assignment-question-font col-12 assignment-link mb-1">
                                            {item.questions.map(function (
                                              data,
                                              questionKey
                                            ) {
                                              return (
                                                <>
                                                  <div
                                                    className="row"
                                                    key={questionKey}
                                                  >
                                                    <div className="assignment-question-font col-10 assignment-link mb-1">
                                                      {questionKey + 1 + ") "}
                                                      {data.question.question}
                                                    </div>

                                                    <div className="assignment-question-font col-12 col-sm-2 col-md-4 col-lg-2 col-xl-2 mb-1">
                                                      <h6>
                                                        Marks:-
                                                        {data.mark}
                                                      </h6>
                                                    </div>
                                                  </div>
                                                  <hr className="assignment-line-accordion"></hr>
                                                  {data.question.comprehensiveQuestions.map(
                                                    function (item, key) {
                                                      return (
                                                        <>
                                                          {key +
                                                            1 +
                                                            ") " +
                                                            item.question}

                                                          <h6 className="font-weight-bold">
                                                            Answer:-
                                                            {item.answer.answer}
                                                          </h6>
                                                          <hr className="assignment-line-accordion"></hr>
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </>
                                              );
                                            })}
                                          </div>
                                        </div>
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
                    item.type.tag === "match_following" ? (
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
                                  {item.section_name}
                                </div>
                              </Typography>
                              <Typography className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                <div className="col-12 col-xl-7 section-part1 p-2 m-1">
                                  {item.description}
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
                                              {data.question}
                                              <hr className="assignment-line-accordion"></hr>
                                              <div>
                                                <CCol>
                                                  <CCard className="card p-3 assigncard mt-3 mb-3">
                                                    <div className="row">
                                                      <div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 ">
                                                        {data.question.options.left_option.map(
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
                                                        {data.question.options.left_option.map(
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
                                                        {data.question.options.right_option.map(
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
export default DraftAssignementView;
