import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Controls from "src/components/formControls/controls/Controls";
import {
  submittAssignment,
  viewAttemptAssignmentStudent,
} from "./AssignmentAction";
import { CButton, CCard, CCol } from "@coreui/react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { useDispatch, useSelector } from "react-redux";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { Formik, Form, Field, FieldArray } from "formik";
import CustomAlertControl from "../AlertMessage";
import { TextField } from "formik-material-ui";

const StudentViewAssignment = (prop) => {
  const initialValues = {
    assignment_id: "",
    assignment_section_ids: [],
    section_type: [],
    assignment_section_question_ids: [],
    comprehensive_question_ids: [],
    answers: [],
    comprehensive_answers: [],
    comprehensive_answers_save: [],
    mcq_answers: [],
  };

  const assignmentState = useSelector((state) => state.Assignment);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [assignmentID, setAssignmentID] = useState("draftId");
  const [mcqAnsId, setMcqAnsId] = useState([]);

  const showOffline = (e) => {
    setAssignmentID(e.target.id);
  };

  useEffect(async () => {
    showLoader();
    if (prop.location.aboutProps != undefined) {

      await dispatch(
        viewAttemptAssignmentStudent({ id: prop.location.aboutProps })
      );
    }

    setLoading(false);
    hideLoader();
  }, []);

  var mcqAnsArray = []
  var previousMCQQuestionKey = null;
  var previousMCQQuestionOptionId = null;

  const handleMCQChange = (e, sectionKey, questionKey) => {

    var data = []

    if (previousMCQQuestionKey != questionKey) {
      data = [];
      data[questionKey] = e.target.value
      previousMCQQuestionKey = questionKey;
      mcqAnsId.map(function (item, key) {

        if (questionKey == key) {
          mcqAnsId.pop()
        }
      });
      var cleanArray =
        data.filter(function () {
          return true;
        });
      mcqAnsId.push(cleanArray)
    } else {
      data = [];
      data[questionKey] = e.target.value
      previousMCQQuestionKey = questionKey;
      mcqAnsId.map(function (item, key) {

        if (questionKey == key) {
          mcqAnsId.pop()
        }
      });
      var cleanArray =
        data.filter(function () {
          return true;
        });
      mcqAnsId.push(data)
    }
    mcqAnsArray[sectionKey] = mcqAnsId;

  }

  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : (
        <div>
          <CustomAlertControl />
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
                        className="groupbutton-active m-1"
                        id="draftId"
                      >
                        Assigned
                      </CButton>
                    </Link>
                    <Link to="/attempt-student">
                      <CButton
                        className="groupbutton m-1"
                        shape="rounded-pill"
                        onClick={showOffline}
                        className="groupbutton m-1"
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

          {prop.location.aboutProps == undefined ? (
            <NoDataContainer module="Assignment" />
          ) : (
            <div className="row p-2 ">
              <div className="row mb-3 mt-2">
                <div className="col-12 col-sm-12 col-md-8 col-lg-10 col-xl-10 ">
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
                            Start Date:-{" "}
                          </div>
                          <div className="d-inline">
                            {assignmentState.attemptViewStudent.from_date}
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <div className="font-weight-bold d-inline simple-normal-font">
                            {" "}
                            End Date:-{" "}
                          </div>
                          <div className="d-inline">
                            {assignmentState.attemptViewStudent.to_date}
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
                <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 ">
                  <div className="rounded assignment-Viewpage-section-marksh row d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                    <div className="text-center p-2 assignment-normal-font marks-border-css">
                      Total Marks:-{" "}
                      {assignmentState.attemptViewStudent.total_mark == null ?
                        "N/A"
                        :
                        assignmentState.attemptViewStudent.total_mark
                      }
                    </div>
                  </div>
                </div>
              </div>

              <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {

                  values.assignment_id = assignmentState.attemptViewStudent.id;
                  const assignmentSectionIds = [];
                  const sectionType = [];
                  const assignmentSectionQuestionIds = [];
                  const comprehensiveQuestionIdsArray = [];
                  assignmentState.attemptViewStudent.sections &&
                    assignmentState.attemptViewStudent.sections.map(function (
                      item,
                      key
                    ) {

                      assignmentSectionIds.push(item.assignment_section_id);
                      sectionType.push(item.type.tag);
                      // question map
                      const assignmentSectionQuestionIdsBlanks = [];
                      const assignmentSectionQuestionIdsMatchTheFollowing = [];
                      const assignmentSectionQuestionIdsMCQ = [];
                      const assignmentSectionQuestionIdsComprehension = [];
                      const assignmentSectionQuestionIdsQA = [];

                      item.questions.map(function (data, questionKey) {
                        if (data.question.type.tag === "q_a") {
                          assignmentSectionQuestionIdsQA.push(
                            data.section_question_id
                          );
                        }

                        if (data.question.type.tag === "mcq") {
                          assignmentSectionQuestionIdsMCQ.push(
                            data.section_question_id
                          );
                        }

                        if (data.question.type.tag === "blanks") {
                          assignmentSectionQuestionIdsBlanks.push(
                            data.section_question_id
                          );
                        }

                        if (data.question.type.tag === "comprehension") {
                          assignmentSectionQuestionIdsComprehension.push(
                            data.section_question_id
                          );
                        }

                        if (data.question.type.tag === "match_following") {
                          assignmentSectionQuestionIdsMatchTheFollowing.push(
                            data.section_question_id
                          );
                        }

                        if (data.question.type.tag === "comprehension") {
                          const comprehensiveQuestionIds = [];
                          data.question.comprehensiveQuestions.map(function (
                            innerData,
                            comprehensionInnerQuestionKey
                          ) {
                            comprehensiveQuestionIds.push(innerData.id);
                          });

                          comprehensiveQuestionIdsArray.push(
                            comprehensiveQuestionIds
                          );
                        }
                      });

                      assignmentSectionQuestionIdsQA.length > 0
                        ? assignmentSectionQuestionIds.push(
                          assignmentSectionQuestionIdsQA
                        )
                        : null;

                      assignmentSectionQuestionIdsMCQ.length > 0
                        ? assignmentSectionQuestionIds.push(
                          assignmentSectionQuestionIdsMCQ
                        )
                        : null;

                      assignmentSectionQuestionIdsBlanks.length > 0
                        ? assignmentSectionQuestionIds.push(
                          assignmentSectionQuestionIdsBlanks
                        )
                        : null;

                      assignmentSectionQuestionIdsComprehension.length > 0
                        ? assignmentSectionQuestionIds.push(
                          assignmentSectionQuestionIdsComprehension
                        )
                        : null;

                      assignmentSectionQuestionIdsMatchTheFollowing.length > 0
                        ? assignmentSectionQuestionIds.push(
                          assignmentSectionQuestionIdsMatchTheFollowing
                        )
                        : null;

                      if (item.type.tag === "comprehension") {
                        values.comprehensive_answers[key] =
                          values.comprehensive_answers_save;
                        values.comprehensive_question_ids[key] =
                          comprehensiveQuestionIdsArray;
                      }
                    });

                  values.assignment_section_ids = assignmentSectionIds;
                  values.section_type = sectionType;
                  values.assignment_section_question_ids =
                    assignmentSectionQuestionIds;
                  const answerFinalArray = [];
                  values.answers.map((data, index) => {
                    if (data !== undefined && data !== null) {

                      answerFinalArray[index] = data;
                    }


                  });
                  values.answers = [];


                  values.answers = answerFinalArray;
                  values.mcq_answers = mcqAnsArray;

                  dispatch(submittAssignment(values));
                  if(answerFinalArray.length !== 0){
                    history.push('/assignment')
                  }
                }}
              >
                {({ values, errors, isSubmitting, isValid }) => (
                  <div className="mb-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <Form>
                      {/* question answer Part */}
                      {assignmentState.attemptViewStudent.sections &&
                        assignmentState.attemptViewStudent.sections.map(
                          function (
                            item,
                            // key
                            sectionkey
                          ) {
                            {
                              return item.type.tag == "q_a" ? (
                                <>
                                  <div className="mt-2 mb-2 " key={sectionkey}>
                                    <Accordion
                                      className="assignment-card-accordion assignment-card"
                                      style={{
                                        borderRadius: "15px",
                                        backgroundColor: "#F2F4F8",
                                      }}
                                    >
                                      <AccordionSummary
                                        expandIcon={
                                          <ExpandMoreIcon className="" />
                                        }
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        className=""
                                        style={{
                                          padding: "0px 16px",
                                          display: "flex",
                                        }}
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
                                              Total Marks: {
                                                item.total_marks
                                              }{" "}
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
                                                  <FieldArray name="answers">
                                                    <React.Fragment>
                                                      {item.questions.map(
                                                        function (
                                                          data,
                                                          questionKey
                                                        ) {
                                                          return (
                                                            <>
                                                              <div className="assignment-question-font col-12 col-sm-10 col-md-8 col-lg-10 col-xl-10 mb-1">
                                                                {questionKey +
                                                                  1 +
                                                                  ") "}
                                                                {
                                                                  data.question
                                                                    .question
                                                                }
                                                                <Field
                                                                  fullWidth
                                                                  name={`answers.[${sectionkey}].[${questionKey}]`}
                                                                  component={
                                                                    TextField
                                                                  }
                                                                  label="Answer"
                                                                  variant="outlined"
                                                                  className="mt-2 mb-2"
                                                                />
                                                              </div>
                                                              <div className="assignment-question-font col-12 col-sm-2 col-md-4 col-lg-2 col-xl-2 mb-1">
                                                                <h6>
                                                                  Marks:-
                                                                  {data.mark}
                                                                </h6>
                                                              </div>
                                                              <hr className="mt-2 mb-2 assignment-line-accordion"></hr>
                                                            </>
                                                          );
                                                        }
                                                      )}
                                                    </React.Fragment>
                                                  </FieldArray>
                                                  {/* 1 ) {item.questions.question.question} */}
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
                                item.type.tag == "mcq" ? (
                                  <>
                                    <div className="mt-2 mb-2" key={sectionkey}>
                                      <Accordion
                                        className="assignment-card-accordion assignment-card"
                                        style={{
                                          borderRadius: "15px",
                                          backgroundColor: "#F2F4F8",
                                        }}
                                      >
                                        <AccordionSummary
                                          expandIcon={
                                            <ExpandMoreIcon className="" />
                                          }
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                          className=""
                                          style={{
                                            padding: "0px 16px",
                                            display: "flex",
                                          }}
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
                                                Total Marks: {
                                                  item.total_marks
                                                }{" "}
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
                                                    <FieldArray name="mcq_answers">
                                                      <React.Fragment>
                                                        {item.questions.map(
                                                          function (
                                                            data,
                                                            questionKey
                                                          ) {
                                                            return (
                                                              <>
                                                                <div className="assignment-question-font col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-1">
                                                                  <div className="mt-2 row mb-3">
                                                                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                      {questionKey +
                                                                        1 +
                                                                        ")"}
                                                                      {
                                                                        data
                                                                          .question
                                                                          .question
                                                                      }
                                                                    </div>

                                                                    <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                      <h6 className="">
                                                                        Marks:-
                                                                        {
                                                                          data.mark
                                                                        }
                                                                      </h6>
                                                                    </div>
                                                                  </div>

                                                                  {/* {console.log(data.question.options)} */}

                                                                  <div className="col-12 col-sm-10 col-md-8 col-lg-10 col-xl-10 ">
                                                                    <Field
                                                                      // label="Options"
                                                                      component={
                                                                        RadioGroup
                                                                      }
                                                                      // component={
                                                                      //   TextField
                                                                      // }
                                                                      name={`mcq_answers.[${sectionkey}].[${questionKey}]`}
                                                                      row
                                                                      className="ml-3"
                                                                      onChange={(e) => handleMCQChange(e, sectionkey, questionKey)}
                                                                    >
                                                                      {data.question.options.map(
                                                                        (
                                                                          item
                                                                        ) => (
                                                                          <FormControlLabel
                                                                            key={
                                                                              item.id
                                                                            }
                                                                            value={
                                                                              item.name
                                                                            }
                                                                            control={
                                                                              <Radio />
                                                                            }
                                                                            label={
                                                                              item.name
                                                                            }
                                                                            className="ml-2 mr-2"
                                                                          />
                                                                        )
                                                                      )}
                                                                    </Field>
                                                                  </div>
                                                                  <hr className="assignment-line-accordion"></hr>
                                                                </div>
                                                              </>
                                                            );
                                                          }
                                                        )}
                                                      </React.Fragment>
                                                    </FieldArray>
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
                                ) :

                                  // Fill In The Blank Part
                                  item.type.tag == "blanks" ? (
                                    <>
                                      <div className="mt-2 mb-2" key={sectionkey}>
                                        <Accordion
                                          className="assignment-card-accordion assignment-card"
                                          style={{
                                            borderRadius: "15px",
                                            backgroundColor: "#F2F4F8",
                                          }}
                                        >
                                          <AccordionSummary
                                            expandIcon={
                                              <ExpandMoreIcon className="" />
                                            }
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className=""
                                            style={{
                                              padding: "0px 16px",
                                              display: "flex",
                                            }}
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
                                                  Total Marks: {
                                                    item.total_marks
                                                  }{" "}
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
                                                      <FieldArray name="answers">
                                                        <React.Fragment>
                                                          {item.questions.map(
                                                            function (
                                                              data,
                                                              questionKey
                                                            ) {
                                                              return (
                                                                <>
                                                                  <div className="assignment-question-font col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10 mb-1">
                                                                    {questionKey +
                                                                      1 +
                                                                      ")"}
                                                                    {data.question.question.replace(
                                                                      /{blank}/g,
                                                                      "__________"
                                                                    )}
                                                                    <Field
                                                                      fullWidth
                                                                      name={`answers.[${sectionkey}].[${questionKey}]`}
                                                                      component={
                                                                        TextField
                                                                      }
                                                                      label="Answer"
                                                                      variant="outlined"
                                                                      className="mt-2 mb-2"
                                                                    />
                                                                  </div>
                                                                  <div className="assignment-question-font col-12 col-sm-2 col-md-4 col-lg-2 col-xl-2 mb-1">
                                                                    <h6>
                                                                      Marks:-
                                                                      {data.mark}
                                                                    </h6>
                                                                  </div>
                                                                  <hr className="mt-2 mb-2 assignment-line-accordion"></hr>
                                                                </>
                                                              );
                                                            }
                                                          )}
                                                        </React.Fragment>
                                                      </FieldArray>
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
                                  ) :

                                    // Comprehension Part
                                    item.type.tag == "comprehension" ? (
                                      <>
                                        <div className="mt-2 " key={sectionkey}>
                                          <Accordion
                                            className="assignment-card-accordion assignment-card"
                                            style={{
                                              borderRadius: "15px",
                                              backgroundColor: "#F2F4F8",
                                            }}
                                          >
                                            <AccordionSummary
                                              expandIcon={
                                                <ExpandMoreIcon className="" />
                                              }
                                              aria-controls="panel1a-content"
                                              id="panel1a-header"
                                              className=""
                                              style={{
                                                padding: "0px 16px",
                                                display: "flex",
                                              }}
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
                                                    Total Marks: {
                                                      item.total_marks
                                                    }{" "}
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
                                                          questionKey
                                                        ) {
                                                          return (
                                                            <>
                                                              <div
                                                                className="row"
                                                                key={questionKey}
                                                              >
                                                                <div className="assignment-question-font col-10 assignment-link mb-1">
                                                                  {questionKey +
                                                                    1 +
                                                                    ") "}
                                                                  {
                                                                    data.question
                                                                      .question
                                                                  }
                                                                </div>

                                                                <div className="assignment-question-font col-12 col-sm-2 col-md-4 col-lg-2 col-xl-2 mb-1">
                                                                  <h6>
                                                                    Marks:-
                                                                    {data.mark}
                                                                  </h6>
                                                                </div>
                                                              </div>

                                                              <div className="row">
                                                                <div className="col-12 assignment-link ">
                                                                  <div className="mt-2">
                                                                    <div className="p-3 assignment-card-accordion">
                                                                      <div className="row">
                                                                        <FieldArray name="comprehensive_answers_save">
                                                                          <React.Fragment>
                                                                            {data.question.comprehensiveQuestions.map(
                                                                              function (
                                                                                comprehensiveQuestionsData,
                                                                                comprehensiveQuestionsKey
                                                                              ) {
                                                                                // console.log(sectionkey)
                                                                                return (
                                                                                  <div className="assignment-question-font col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-1">
                                                                                    {comprehensiveQuestionsKey +
                                                                                      1 +
                                                                                      ") "}
                                                                                    {
                                                                                      comprehensiveQuestionsData.question
                                                                                    }
                                                                                    <hr className="assignment-line-accordion"></hr>
                                                                                    <div>

                                                                                      <Field
                                                                                        fullWidth
                                                                                        name={`comprehensive_answers_save.[${questionKey}].[${comprehensiveQuestionsKey}]`}
                                                                                        component={
                                                                                          TextField
                                                                                        }
                                                                                        label="Answer"
                                                                                        variant="outlined"
                                                                                        className="mt-2 mb-2"
                                                                                      />
                                                                                    </div>
                                                                                  </div>
                                                                                );
                                                                              }
                                                                            )}
                                                                          </React.Fragment>
                                                                        </FieldArray>
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
                                    ) :

                                      // match Of Following Part
                                      item.type.tag == "match_following" ? (
                                        <div className="mt-2 mb-2 ">
                                          <Accordion
                                            className="assignment-card-accordion assignment-card"
                                            style={{
                                              borderRadius: "15px",
                                              backgroundColor: "#F2F4F8",
                                            }}
                                          >
                                            <AccordionSummary
                                              expandIcon={
                                                <ExpandMoreIcon className="" />
                                              }
                                              aria-controls="panel1a-content"
                                              id="panel1a-header"
                                              className=""
                                              style={{
                                                padding: "0px 16px",
                                                display: "flex",
                                              }}
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
                                                    Total Marks: {item.total_marks}{" "}
                                                  </div>
                                                </Typography>
                                              </div>
                                            </AccordionSummary>
                                            <hr className="m-0 assignment-line-accordion"></hr>

                                            {item.questions.question}
                                            <AccordionDetails className="p-2">
                                              {/* <Typography> */}
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
                                                                {data.question.question}
                                                                <hr className="assignment-line-accordion"></hr>
                                                                <div>
                                                                  <CCol>
                                                                    <CCard className="card p-3 assigncard mt-3 mb-3">
                                                                      <div className="row">
                                                                        <div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                          Apple
                                                                        </div>
                                                                        <div className="p-0 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                                                                  
                                                                        </div>
                                                                        <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 d-flex align-items-center">
                                                                          Flower
                                                                        </div>
                                                                      </div>
                                                                      <div className="row mt-2">
                                                                        <div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                          Rose
                                                                        </div>
                                                                        <div className="p-0 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                                                                          
                                                                        </div>
                                                                        <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 d-flex align-items-center">
                                                                          Fruit
                                                                        </div>
                                                                      </div>
                                                                    </CCard>
                                                                  </CCol>
                                                                </div>
                                                              </div>
                                                              <div className="assignment-question-font col-12 col-sm-2 col-md-4 col-lg-2 col-xl-2 mb-1">
                                                                <h6>
                                                                  Marks:-
                                                                  {data.mark}
                                                                </h6>
                                                              </div>
                                                      
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </>
                                                );
                                              })}
                                              {/* </Typography> */}
                                            </AccordionDetails>
                                          </Accordion>
                                        </div>
                                      ) : (
                                        ""
                                      );
                            }
                          }
                        )}

                      <div className="row mb-2 mt-2">
                        
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center justify-content-sm-center justify-content-md-end justify-content-lg-end justify-content-xl-end">
                          <div className="p-2 d-inline">
                            <Controls.Button
                              text="Submit"
                              className="rounded-pill button-color-rounded-pill"
                              type="submit"
                              style={{ padding: "8px 44px" }}
                            />
                          </div>
                        </div>
                      </div>
                  
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default StudentViewAssignment;
