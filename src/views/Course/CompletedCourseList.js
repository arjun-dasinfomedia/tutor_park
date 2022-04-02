import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faComment,
  faPhoneAlt,
  faStar,
  faEllipsisV,
  faShareAlt,
  faPaperPlane,
  faUser,
  faCircle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  CTooltip,
  CRow,
  CCol,
  CCard,
  CButton,
  CCardImage,
  CProgress,
  CProgressBar,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCardText,
  CCardHeader,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllMySubscribedCourse,
  viewCourse,
  feedBackAdd,
} from "./MyCourseActions";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { formatDate } from "../../utility/utils";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
const PER_PAGE = 10;

const MySwal = withReactContent(Swal);

const CompletedCourseList = (Data) => {

  const dispatch = useDispatch();
  const [viewvisible, setViewVisible] = useState(false);
  const [feedbackvisible, setFeedbackVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [completeDataArray, setCompleteDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [mobileNumber, setmobileNumber] = useState("");
  const [callvisible, setCallVisible] = useState(false);
  const [messagevisible, setMessageVisible] = useState(false);
  const [sharevisible, setShareVisible] = useState(false);

  const store = useSelector((state) => state.myCourse);

  const feedBackFormVisible = (data) => {
    setFeedbackVisible(true)
    setCourseId(data.id),
      setFeedback(data.title)
  }

  const CallNumberVisible = (data) => {
    setCallVisible(true)
    setmobileNumber(data)

  }

  useEffect(async () => {
    showLoader();
    await dispatch(getAllMySubscribedCourse());
    const DataArray = [];
    store.mySubscribedList.map(function (item) {
      if (item.is_completed !== false) {
        DataArray.push(item);
      }
    });
    setCompleteDataArray(DataArray);
    setLoading(false);
    hideLoader();
  }, []);

  const viewCourseData = (id) => {
    setViewVisible(true)
    dispatch(viewCourse({ id }));
  };

  // add feedback

  const [feedback, setFeedback] = useState("");
  const [courseid, setCourseId] = useState("");
  const [rate, setRate] = useState(0);

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
      feedback_for: "",
      feedback_reference_id: "",
      total_ratings: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      values.feedback_reference_id = courseid;
      values.total_ratings = rate;
      values.feedback_for = feedback;
      dispatch(feedBackAdd(values));
      resetForm({ values: "" });
      clearState();
      setFeedbackVisible(false);
    },
  });

  const RatingStar = (number) => {
    switch (number) {
      case "1":
        return (
          <>
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </>
        );
      case "2":
        return (
          <>
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </>
        );
      case "3":
        return (
          <>
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </>
        );
      case "4":
        return (
          <>
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </>
        );
      case "5":
        return (
          <>
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
          </>
        );
      default:
        return "";
        break;
    }
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0);
  }

  const pageCount = Math.ceil(store.mySubscribedList.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;
  var isCompleted = false;
  const loadAllMyCourseListData = store.mySubscribedList
    .filter((item) => {
      if (Data.SearchData === "") {
        return item;
      } else if (
        item.subject_name === null ? "" : item.subject_name.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.title === null ? "" : item.title.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.description === null ? "" : item.description.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.instructor === null ? "" : item.instructor.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      const toShowDescription = item.description.substring(0, 50) + "...";
      if (item.is_completed !== false) {
        isCompleted = true;
      }
      return item.is_completed ? (
        <div className="col-12 mb-3" key={key}>
          <CCard className="card p-3 friendcard mt-3">
            <div className="text-right d-sm-none position-absolute ellipsisbutton">
              <CDropdown
                variant="nav-item"
                className="marker-remove-textbook-css d-inline m-2"
              >
                <CDropdownToggle
                  placement="bottom-end"
                  className="py-0 menu-css d-inline "
                  caret={false}
                >
                  <FontAwesomeIcon
                    className="d-inline ellipsis"
                    icon={faEllipsisV}
                    id=""
                  />
                </CDropdownToggle>
                <CDropdownMenu
                  className="pt-0 pb-0 courses-dropdown-menu course-action-dropdown-menu-css m-2"
                  placement="bottom-end"
                >
                  <CDropdownItem
                    onClick={() => viewCourseData(item.id)}
                  >
                    View
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
            <div className="row ">
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2">
                <CCardImage
                  className="img-fluid rounded course-image mx-auto d-flex"
                  orientation="top"
                  src={item.logo}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-7">
                <div className="row uncomplete-text">
                  <div className="col-12 ">
                    <h5 className="d-inline card-title font-weight-bold">
                      {item.title}
                    </h5>{" "}
                    <div className="d-inline normal-font ">
                      (TP Point - {item.tp_points_balance})
                    </div>
                    <div className="d-sm-inline  d-none">
                      <CDropdown
                        variant="nav-item"
                        className="marker-remove-textbook-css d-inline m-2"
                      >
                        <CDropdownToggle
                          placement="bottom-end"
                          className="py-0 menu-css d-inline "
                          caret={false}
                        >
                          <FontAwesomeIcon
                            className="course-buttonellipsis d-inline "
                            icon={faEllipsisV}
                            id=""
                          />
                        </CDropdownToggle>
                        <CDropdownMenu
                          className="pt-0 pb-0 courses-dropdown-menu course-action-dropdown-menu-css m-2"
                          placement="bottom-end"
                        >
                          <CDropdownItem
                            onClick={() => viewCourseData(item.id)}
                          >
                            View
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </div>
                  </div>
                  <div className="medium-text ">{toShowDescription}</div>
                  <div className="normal-font ">
                    <FontAwesomeIcon icon={faUser} /> {item.instructor}
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="infocircle1 m-1"
                    />
                    {formatDate(item.start_date)} to {formatDate(item.end_date)}
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="infocircle1 m-1"
                    />{" "}
                    {item.start_time ?? "Not Available"} -{" "}
                    {item.end_time ?? "Not Available"}
                  </div>
                  <div className="normal-font ">
                    {item.number_of_people_attending_course} Student{" "}
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="infocircle1 m-1"
                    />{" "}
                    {item.number_of_videos} Videos{" "}
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="infocircle1 m-1"
                    />{" "}
                    {item.number_of_assignments} Assignments
                  </div>
                  <div className="normal-font ">
                    {item.syllabus_name ?? "Not Added"}
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>{" "}
                    {item.class_name ?? "Not Added"}
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>{" "}
                    {item.subject_name}
                  </div>
                  <div className="medium-text font-weight-bold">
                    Rs. {item.cost}/-
                  </div>
                  <div className="">{RatingStar(item.avg_ratings)}</div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 ">
                <div className="row">
                  <div className="text-right font-weight-bold ">100%</div>
                  <div className="mt-1 col-12 d-flex justify-content-end">
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"></div>
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                      <CProgress height={10} className="">
                        <CProgressBar
                          className="bg-warning"
                          // value={item.progress_percent}
                          value={100}
                        ></CProgressBar>
                      </CProgress>
                    </div>
                  </div>
                  <div className="mt-1 col-12 font-weight-bold  d-flex justify-content-end">
                    Completed the Course
                  </div>
                  <div className="mt-2 col-12 d-flex justify-content-center">
                    <CTooltip content="Feedback" placement="bottom">
                      <CButton
                        // href="#"
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => feedBackFormVisible(item)}
                      >
                        <FontAwesomeIcon icon={faComment} />
                      </CButton>
                    </CTooltip>
                    <NavLink to="/Messages">
                      <CTooltip content="Message" placement="bottom">
                        <CButton className="btn rounded-circle m-1 roundshap-button">
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </CButton>
                      </CTooltip>
                    </NavLink>
                    <CTooltip content="Call" placement="bottom">
                      <CButton
                        // href="#"
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => CallNumberVisible(item.phone)}

                      >
                        <FontAwesomeIcon icon={faPhoneAlt} />
                      </CButton>
                    </CTooltip>

                    {/* <CTooltip content="Share" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => setShareVisible(!sharevisible)}
                      >
                        <FontAwesomeIcon icon={faShareAlt} />
                      </CButton>
                    </CTooltip> */}
                  </div>
                </div>
              </div>
            </div>
          </CCard>
        </div>
      ) : (
        ""
      );
    });

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : loadAllMyCourseListData.length !== 0 && isCompleted ? (
        <div>
          {loadAllMyCourseListData}
           
          {/* pagination code start */}
          {store.mySubscribedList.length > 10 ? (
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

          {/* view my course modal */}

          <CModal
            visible={viewvisible}
            size="xl"
            onDismiss={() => setViewVisible(false)}
          >
            <CModalHeader
              onDismiss={() => setViewVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle className="">View Course</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className="row p-3 d-flex justify-content-around">
                <div className="p-2 border tuitionimage col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 border">
                  <CCardImage
                    src={
                      store.selectedCourse !== null
                        ? store.selectedCourse.logo
                        : ""
                    }
                    className="border viewcourselistmodalimage mx-auto d-flex"
                  ></CCardImage>
                  <div>
                    <div className=" ">{store.selectedCourse.description}</div>
                  </div>
                </div>

                <div className="m-2 border tuitionimage col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <div className="row border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                    <CCardHeader
                      style={{ fontSize: 18 }}
                      className="card-title text-dark"
                    >
                      Book Details
                    </CCardHeader>
                  </div>
                  <div className="p-3">
                    <div className="row ">
                      <div className="col-4 font-weight-bold">
                        Course Title{" "}
                      </div>
                      <div className="col-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.title
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Subject</div>
                      <div className="col-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.subject_name
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Syllabus</div>
                      <div className="col-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.syllabus_name
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Class</div>
                      <div className="col-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.class_name
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Cost</div>
                      <div className="col-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.cost
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">
                        Mode If Teaching{" "}
                      </div>
                      <div className="col-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.mode_of_teaching
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Course Type </div>
                      <div className="col-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.type
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">
                        Duration for complete{" "}
                      </div>

                      <div className="col-8">
                        {store.selectedCourse.duration_for_complete !== null
                          ? store.selectedCourse.duration_for_complete
                          : "Not Available"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CModalBody>
          </CModal>
        </div>
      ) : (
        <NoDataContainer module="Course Completed" />
      )}

      {/* Feedback Modal code  */}

      <CModal
        visible={feedbackvisible}
        onDismiss={() => setFeedbackVisible(false)}
      >
        <CModalHeader
          onDismiss={() => setFeedbackVisible(false)}
          className="tutorviewmodalheader"
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

      {/* Message Modal code  */}

      <CModal
        visible={messagevisible}
        onDismiss={() => setMessageVisible(false)}
      >
        <CModalHeader
          onDismiss={() => setMessageVisible(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Message</CModalTitle>
        </CModalHeader>
        <CModalBody className="ml-3 mr-3 text-center">
          <TextField
            variant="outlined"
            id="Message"
            name="Message"
            label="Message"
            placeholder="Message"
            multiline
            rows={2}
            rowsMax={4}
          />
          <Button
            variant="contained"
            className="mt-4 mb-2"
            style={{ backgroundColor: "#3f51b5", color: "#fff" }}
          >
            Send
          </Button>
        </CModalBody>
      </CModal>

      {/* Call Modal code  */}

      <CModal visible={callvisible} onDismiss={() => setCallVisible(false)}>
        <CModalHeader
          onDismiss={() => setCallVisible(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Call</CModalTitle>
        </CModalHeader>
        <CModalBody className="ml-3 mr-3 text-center">
          <div className="row">
            <div className="text-start col-6">
              <CCardText style={{ fontSize: 20 }}>Tutor Number </CCardText>
            </div>
            <div className="text-start col-6">
              {mobileNumber !== null ? (
                <a
                  style={{ fontSize: 20, textDecoration: "none" }}
                  href={"tel:+91" + mobileNumber}
                >
                  {mobileNumber}
                </a>
              ) : (
                <CCardText style={{ fontSize: 20 }}>N/A</CCardText>
              )}
            </div>
          </div>
        </CModalBody>
      </CModal>

      {/* Share Modal code  */}

      <CModal visible={sharevisible} onDismiss={() => setShareVisible(false)}>
        <CModalHeader
          onDismiss={() => setShareVisible(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Share Through</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="text-start">
            <CCol>
              <CButton className="btn rounded-circle m-1 roundshap-button">
                <FontAwesomeIcon icon={faPhoneAlt} />
              </CButton>
              <CButton className="btn rounded-circle m-1 roundshap-button">
                <FontAwesomeIcon icon={faComment} />
              </CButton>
              <CButton className="btn rounded-circle m-1 roundshap-button">
                <FontAwesomeIcon icon={faWhatsapp} />
              </CButton>
              <CButton className="btn rounded-circle m-1 roundshap-button">
                <FontAwesomeIcon icon={faEnvelope} />
              </CButton>
            </CCol>
          </CRow>
          <CRow className="text-end">
            <CCol>
              <Button
                variant="contained"
                className="mt-4 mb-2 mr-2"
                onClick={() => setShareVisible(false)}
              >
                Close
              </Button>
              <Button variant="contained" className="mt-4 mb-2" color="primary">
                Save Changes
              </Button>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </div>
  );
};
export default CompletedCourseList;
