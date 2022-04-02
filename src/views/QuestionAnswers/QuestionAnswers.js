import React, { useEffect, useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCardText,
  CCard,
  CRow,
  CButton,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
  CCardFooter,
  CAvatar,
  CCardImage,
  CLink,
} from "@coreui/react";
import { getUserData, getUserRole } from "../../utility/utils";
import { Autocomplete } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faThumbsUp,
  faThumbsDown,
  faEllipsisH,
  faAward,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  addAnswers,
  bestAnswer,
  feedBackAdd,
  deleteQuestion,
  getAllFilteredQuestionsList,
} from "./QuestionAnswersAction";
import { useSelector, useDispatch } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { useFormik } from "formik";
import * as yup from "yup";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Swal from "sweetalert2";
import { libraryListData } from "../../redux/actions/dropdowns/index";
import withReactContent from "sweetalert2-react-content";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import { checkAccessPermission } from "src/utility/utils";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import profile from "src/assets/images/avatars/male.jpg"
const MySwal = withReactContent(Swal);

const PER_PAGE = 10;

const QuestionAnswers = (Data) => {

  const dispatch = useDispatch();
  const List = useSelector((state) => state.questionAnswer);
  const DropDown = useSelector((state) => state.dropdowns);

  const [currentPage, setCurrentPage] = useState(0);
  const [libraryviewvisible, setLibraryViewVisible] = useState(false);
  const [selectedLibrary, setSelectedLibrary] = useState("");
  const [libraryData, setLibraryData] = useState("");
  const [feedbackvisible, setFeedbackVisible] = useState(false);
  const [editvisible, setEditVisible] = useState(false);
  const [answerupdate, setAnswer] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [questionId, setQuestionId] = useState("");
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  // add feedback

  const [feedback, setFeedback] = useState("");
  const [answerid, setAnswerId] = useState("");
  const [rate, setRate] = useState(0);


  const FeedBackForQuestion = (data) => {
    setFeedbackVisible(true)
    setAnswerId(data)
  }

  const clearState = () => {
    setRate("");
  };

  const validationSchema = yup.object({
    detailed_feedback: yup
      .string("Enter your feedback")
      .required("feedback is required"),
  });

  const formikfeedback = useFormik({
    initialValues: {
      detailed_feedback: "",
      feedback_for: "answer",
      feedback_reference_id: "",
      total_ratings: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      values.feedback_reference_id = answerid;
      values.total_ratings = rate;
      // console.log(values)
      dispatch(feedBackAdd(values));
      resetForm({ values: "" });
      clearState();
      setFeedbackVisible(false);
    },
  });

  const setQuestionID = (id) => {
    setQuestionId(id);
  };

  // library Data store

  const libraryviewCourseData = (Data) => {
    setLibraryData(Data);
  };

  // Library item dropdown

  function handleLibrarySelect(value) {
    {
      value !== null && setSelectedLibrary(value.id);
    }
  }

  // add answer code

  const validationAddAnswer = yup.object({
    answer: yup.string("Enter your answer").required("answer is required"),
  });

  const initialValues = {
    question_id: "",
    answer: "",
    library_id: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationAddAnswer,

    onSubmit: (values, { resetForm }) => {
      let data = new FormData();
      data.append("question_id", questionId);
      data.append("answer", values.answer);
      {
        selectedLibrary === "" ? "" : data.append("library_id", selectedLibrary);
      }

      dispatch(addAnswers(data));
      resetForm({ values: "" });
    },
  });

  const handleConfirmAnswer = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Best answer it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(bestAnswer({ id }));
      }
    });
  };

  const handleConfirmCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteQuestion({ id }));
      }
    });
  };

  useEffect(async () => {
    showLoader();
    await dispatch(getAllFilteredQuestionsList());
    dispatch(libraryListData());
    setLoading(false);
    hideLoader();
  }, []);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const pageCount = Math.ceil(List.List.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const questionDynamic = List.List.filter((item) => {
    if (Data.searchData === "") {
      return item;
    } else if (
      item.question === null ? "" : item.question.toLowerCase().includes(Data.searchData.toLowerCase())
    ) {
      return item;
    }
  })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, index) {
      return (
        <>
          <CCard className="pt-3 mt-3 mb-3 tuitioncard">
            <Accordion
              onClick={() => setQuestionID(item.id)}
              className="accordion-header-css"
              style={{ backgroundColor: "#F2F4F8" }}
            >
              {item.my_student_question === true ? (
                <AccordionSummary
                  style={{
                    borderLeft: "5px solid",
                    borderLeftColor: "#FF0000",
                  }}
                  expandIcon={
                    <ExpandMoreIcon
                      style={{
                        fontSize: "-webkit-xxx-large",
                        color: "#5A55CB",
                      }}
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <div className="question-ans-questions">
                      {item.question}
                    </div>
                  </Typography>
                </AccordionSummary>
              ) : (
                <AccordionSummary
                  style={{
                    borderLeft: "5px solid",
                    borderLeftColor: "#E49E07",
                  }}
                  expandIcon={
                    <ExpandMoreIcon
                      style={{
                        fontSize: "-webkit-xxx-large",
                        color: "#5A55CB",
                      }}
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <div className="question-ans-questions">
                      {item.question}
                    </div>
                  </Typography>
                </AccordionSummary>
              )}

              <AccordionDetails style={{ backgroundColor: "#F2F4F8" }}>
                <Typography>
                  <div className="row border-0 questioncard">
                    <div className="col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1 mb-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                      <CAvatar
                        orientation="top"
                        src={item.image}
                        className="avatarimg "
                      />
                    </div>

                    <div className="col-12 col-sm-12 col-md-11 col-lg-11 col-xl-11 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                      <div className="row d-flex d-column">
                        <div className="pl-4 pt-1">
                          <div className=" ">
                            <h6 className="text-center d-xl-inline-flex d-lg-inline-flex d-md-inline-flex font-weight-bold">
                              {item.created_by}
                            </h6>
                            <div className="text-center d-xl-inline-flex d-lg-inline-flex d-md-inline-flex normal-text ml-2">
                              {item.created_at} {item.created_time}
                            </div>{" "}
                          </div>
                          {getUserRole() === "school-student" ||
                            getUserRole() === "school-student" ? (
                            <div className="text-small d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                              {item.class} {"-"} {item.division}
                            </div>
                          ) : (
                            <div className="text-small d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                              {item.class} Students
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {checkAccessPermission("question_and_answers_edit") ? (
                    <>
                      <div className="d-flex d-column">
                        <CCard className="questionfooter">
                          <div className="row">
                            <div className="Tuitionsub col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                              <CButton className="questionicon m-1 ">
                                <FontAwesomeIcon icon={faThumbsUp} />
                              </CButton>
                              <CButton className="questionicon m-1 ">
                                <FontAwesomeIcon icon={faThumbsDown} />
                              </CButton>
                            </div>
                            {checkAccessPermission(
                              "question_and_answers_delete"
                            ) ? (
                              <>
                                {item.created_by_email ===
                                  getUserData().email ? (
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center justify-content-sm-center justify-content-md-end justify-content-lg-end justify-content-xl-end">
                                    <button
                                      className="todo-delete-button d-inline m-1"
                                      onClick={() =>
                                        handleConfirmCancel(item.id)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        className="deleteicon"
                                        icon={faTrashAlt}
                                      />
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : null}
                          </div>
                        </CCard>
                      </div>

                      <div className="">
                        {item.best_answer === "No" ? (
                          <CCardFooter
                            className="border-0 p-0"
                            style={{ backgroundColor: "#F2F4F8" }}
                          >
                            <form onSubmit={formik.handleSubmit} className="">
                              <div className="row border-0 questioncard">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-3">
                                  <TextField
                                    variant="outlined"
                                    key={index}
                                    name="answer"
                                    label="Enter answer"
                                    value={formik.values.answer}
                                    onChange={formik.handleChange}
                                    error={
                                      formik.touched.answer &&
                                      Boolean(formik.errors.answer)
                                    }
                                    helperText={
                                      formik.touched.answer &&
                                      formik.errors.answer
                                    }
                                  />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                  <Autocomplete
                                    options={DropDown.libraryList}
                                    getOptionLabel={(option) => option.name}
                                    name="library_id"
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Library Item"
                                        variant="outlined"
                                        autoComplete="off"
                                        fullWidth
                                      />
                                    )}
                                    onChange={(event, value) =>
                                      handleLibrarySelect(value)
                                    }
                                  />
                                </div>
                                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <CButton
                                    className="answerbutton m-1"
                                    type="submit"
                                  >
                                    Add Answer
                                  </CButton>
                                </div>
                              </div>
                            </form>
                          </CCardFooter>
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  ) : null}

                  {item.answers.map((answer) => (
                    <div>
                      <CCard className="px-3 pt-3 answerbest mb-3 mt-3">
                        <div className="row ">
                          <div className="col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1 mb-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                            <CAvatar
                              orientation="top"
                              src={answer.image}
                              className="avatarimg"
                            />
                          </div>

                          <div className="col-12 col-sm-12 col-md-11 col-lg-11 col-xl-11 justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                            <div className="row d-column">
                              <div className="Tuitionsub pl-4 pt-1 col-12">
                                <div className="">
                                  <h6 className="text-center d-xl-inline-flex d-lg-inline-flex d-md-inline-flex font-weight-bold">
                                    {answer.created_by}
                                  </h6>
                                  <div className="text-center d-xl-inline-flex d-lg-inline-flex d-md-inline-flex normal-text ml-2">
                                    {answer.created_at} {answer.created_time}
                                  </div>{" "}
                                </div>
                                <div className="d-inline d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  {getUserRole() === "parent" ? "" :
                                    <small>Class 9th Students</small>}
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="d-inline d-flex justify-content-center justify-content-sm-center justify-content-md-end justify-content-lg-end justify-content-xl-end">
                                  {answer.best_answer == "Yes" ? (
                                    <div className="">
                                      <div className="besticonimg">
                                        <FontAwesomeIcon icon={faAward} />
                                      </div>
                                      <div className="best-answer-css ">
                                        <p>Best Answer</p>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className=" mt-1 d-inline d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faCircle}
                                      className="infocircle1 m-1"
                                    />{" "}
                                    {answer.answer}
                                  </div>
                                </div>

                                {answer.library !== null ? (
                                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ml-2 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                    <CButton
                                      className="answerbutton m-1"
                                      type="submit"
                                      onClick={() =>
                                        setLibraryViewVisible(
                                          !libraryviewvisible,
                                          libraryviewCourseData(answer.library)
                                        )
                                      }
                                    >
                                      Library View
                                    </CButton>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                          {checkAccessPermission(
                            "question_and_answers_edit"
                          ) ? (
                            <>
                              <div className="">
                                <hr className="cardbodyfooterline mt-3"></hr>
                                <div>
                                  <div className="col-12">
                                    <CCard className="border-0 bg-white answersfooter">
                                      <div className="row">
                                        <div className="Tuitionsub col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                          <CButton className="questionicon m-1 bg-white">
                                            <FontAwesomeIcon
                                              icon={faThumbsUp}
                                            />
                                          </CButton>
                                          <CButton className="questionicon m-1 bg-white">
                                            <FontAwesomeIcon
                                              icon={faThumbsDown}
                                            />
                                          </CButton>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  d-flex justify-content-center justify-content-sm-center justify-content-md- justify-content-lg-end justify-content-xl-end">
                                          <div className="tutordetail">
                                            <div className="col-12">
                                              <CButton className="bg-white questionicon d-inline m-1">
                                                <CDropdown
                                                  variant="nav-item"
                                                  className="d-md-inline marker-remove-textbook-css"
                                                >
                                                  <CDropdownToggle
                                                    placement="bottom-end"
                                                    className="py-0 menu-css d-inline"
                                                    caret={false}
                                                  >
                                                    <FontAwesomeIcon
                                                      className="bg-white svg-inline--fass  fa-ellipsis-v fa-w-6 d-inline questiondots"
                                                      icon={faEllipsisH}
                                                    />
                                                  </CDropdownToggle>
                                                  <CDropdownMenu
                                                    className="pt-0 question-ans-dropdown-menu course-action-dropdown-menu-css"
                                                    placement="bottom-end"
                                                  >
                                                    {item.best_answer ===
                                                      "Yes" ? (
                                                      <div>
                                                        <CDropdownItem
                                                          onClick={() =>
                                                            handleConfirmAnswer(
                                                              answer.id
                                                            )
                                                          }
                                                          disabled
                                                        >
                                                          Best Answer
                                                        </CDropdownItem>
                                                      </div>
                                                    ) : (
                                                      <div>
                                                        <CDropdownItem
                                                          onClick={() =>
                                                            handleConfirmAnswer(
                                                              answer.id
                                                            )
                                                          }
                                                        >
                                                          Best Answer
                                                        </CDropdownItem>
                                                      </div>
                                                    )}
                                                    <CDropdownItem

                                                      onClick={() => FeedBackForQuestion(answer.id)}
                                                    >
                                                      Feedback
                                                    </CDropdownItem>
                                                  </CDropdownMenu>
                                                </CDropdown>
                                              </CButton>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </CCard>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </CCard>
                    </div>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </CCard>
        </>
      );
    });

  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : questionDynamic.length !== 0 ? (
        <div>
          <>{questionDynamic}</>
          
          {/* pagination code start */}
          {List.List.length > 10 ? (
            <div className="mt-4 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center">
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                activeClassName={"active"}
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageClassName={"page-item"}
                nextLinkClassName={"page-link"}
                nextClassName={"page-item next"}
                previousClassName={"page-item prev"}
                previousLinkClassName={"page-link"}
                pageLinkClassName={"page-link"}
                containerClassName={
                  "pagination react-paginate col-12 col-sm-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center"
                }
              />
            </div>
          ) : (
            ""
          )}

          {/* pagination code end */}
        </div>
      ) : (
        <NoDataContainer module="Question Answer" />
      )}

      {/* Feedback Modal code  */}

      <CModal
        visible={feedbackvisible}
        onDismiss={() => setFeedbackVisible(false)}
      >
        <CModalHeader
          className="tutorviewmodalheader"
          onDismiss={() => setFeedbackVisible(false)}
        >
          <CModalTitle>Feedback</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={formikfeedback.handleSubmit}>
            <TextField
              className="mb-3"
              variant="outlined"
              id="detailed_feedback"
              name="detailed_feedback"
              label="Feedback"
              multiline
              rows={3}
              rowsMax={4}
              value={formikfeedback.values.detailed_feedback}
              onChange={formikfeedback.handleChange}
              error={
                formikfeedback.touched.detailed_feedback &&
                Boolean(formikfeedback.errors.detailed_feedback)
              }
              helperText={
                formikfeedback.touched.detailed_feedback &&
                formikfeedback.errors.detailed_feedback
              }
            />
            <Container>
              {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                  <label>
                    <Radio
                      type="radio"
                      value={givenRating}
                      onClick={() => {
                        setRate(givenRating);
                      }}
                      onChange={formikfeedback.handleChange}
                    />
                    <Rating>
                      <FaStar
                        color={
                          givenRating < rate || givenRating === rate
                            ? "rgb(228,158,7)"
                            : "rgb(119,119,119)"
                        }
                      />
                    </Rating>
                  </label>
                );
              })}
            </Container>

            <Button
              type="submit"
              variant="contained"
              className="mt-4 mb-2"
              style={{ backgroundColor: "#3f51b5", color: "#fff" }}
            >
              Submit
            </Button>
          </form>
        </CModalBody>
      </CModal>

      {/* Library Details View Modal */}

      <CModal
        size="lg"
        visible={libraryviewvisible}
        onDismiss={() => setLibraryViewVisible(false)}
      >
        <CModalHeader
          visible={libraryviewvisible}
          onDismiss={() => setLibraryViewVisible(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle className="">View Library</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm={1} md={1} lg={1} xl={1} style={{ maxWidth: 20 }}></CCol>
            <CCol
              className=" border tuitionimage p-0 my-2 "
              sm={3}
              md={3}
              lg={3}
              xl={3}
            >
              <CCardImage
                src={libraryData.image}
                className="border viewcourselistmodalimage"
              ></CCardImage>
              <div>
                <div className="pl-2 pb-2 ">{libraryData.description}</div>
              </div>
            </CCol>
            <CCol sm={1} md={1} lg={1} xl={1} style={{ maxWidth: 20 }}></CCol>
            <CCol className="border tuitionimage my-2">
              <CRow className="border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                <CCol>
                  <CCardText style={{ fontSize: 18 }} className="p-2 text-dark">
                    Library Details
                  </CCardText>
                </CCol>
              </CRow>
              <CRow className="pt-2 pl-2">
                <CCol>
                  <CCardText style={{ fontSize: 18 }}>Title </CCardText>
                </CCol>
                <CCol className="p-0">
                  <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                    {libraryData.name}
                  </CCardText>
                </CCol>
              </CRow>
              <CRow className="pl-2">
                <CCol>
                  <CCardText style={{ fontSize: 18 }}>Subject</CCardText>
                </CCol>
                <CCol>
                  <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                    {libraryData.subject_name}
                  </CCardText>
                </CCol>
              </CRow>
              <CRow className="pl-2">
                <CCol>
                  <CCardText style={{ fontSize: 18 }}>Syllabus</CCardText>
                </CCol>
                <CCol>
                  <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                    {libraryData.syllabus_name}
                  </CCardText>
                </CCol>
              </CRow>
              <CRow className="pl-2">
                <CCol>
                  <CCardText style={{ fontSize: 18 }}>Class</CCardText>
                </CCol>
                <CCol>
                  <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                    {libraryData.class_name}
                  </CCardText>
                </CCol>
              </CRow>

              <CRow>
                <CCol>
                  <CCardText style={{ fontSize: 18 }} className="pl-2">
                    Attachment
                  </CCardText>
                </CCol>
                <CCol>
                  <CLink href={libraryData.attachment} target="_blank" rel="noopener noreferrer">
                    {libraryData.attachment &&
                      libraryData.attachment.slice(0, 20) + "..."}
                  </CLink>
                </CCol>
              </CRow>
            </CCol>
            <CCol sm={1} md={1} lg={1} xl={1} style={{ maxWidth: 20 }}></CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </>
  );
};

export default QuestionAnswers;
