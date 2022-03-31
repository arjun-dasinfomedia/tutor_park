import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faComment,
  faEnvelope,
  faPhoneAlt,
  faStar,
  faEllipsisV,
  faShareAlt,
  faPaperPlane,
  faUser,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
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
  CCardHeader,
} from "@coreui/react";
import TextField from "@material-ui/core/TextField";
import CardText from "reactstrap/lib/CardText";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllMySubscribedCourse,
  viewCourse,
  completeCourse,
} from "./MyCourseActions";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import {
  checkAccessPermission,
  formatDate,
} from "../../utility/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
const PER_PAGE = 10;
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
const MySwal = withReactContent(Swal);

const UncompletedCourseList = (Data) => {
  const dispatch = useDispatch();
  const [viewvisible, setViewVisible] = useState(false);
  const [messagevisible, setMessageVisible] = useState(false);
  const [callvisible, setCallVisible] = useState(false);
  const [sharevisible, setShareVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [courseDataArray, setCourseDataArray] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [mobileNumber, setmobileNumber] = useState("");
  const [demoVideoURL, setDemoVideoURL] = useState("");
  const [videovisible, setvideoVisible] = useState(false);
  const [courseCompleteStatusChange, setCourseCompleteStatusChange] =
    useState(false);

  const [courseVideoURL, setCourseVideoURL] = useState("");
  const [courseVideoVisible, setCourseVideoVisible] = useState(false);

  const store = useSelector((state) => state.myCourse);

  useEffect(async () => {
    showLoader();
    await dispatch(getAllMySubscribedCourse());
    const DataArray = [];
    store.mySubscribedList.map(function (item) {
      if (item.is_completed === false) {
        DataArray.push(item);
      }
    });
    setCourseDataArray(DataArray);
    setLoading(false);
    hideLoader();
  }, []);

  const viewCourseData = (id) => {
    setViewVisible(true);
    dispatch(viewCourse({ id }));
  };

  const callNumberVisible = (data) => {
    setCallVisible(true)
    setmobileNumber(data)
  }

  const courseComplete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to complete this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(completeCourse({ course_id: id }));
      }
    });
  };

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

  const showDemoVideo = (demo_video) => {
    setDemoVideoURL(demo_video);
    setvideoVisible(!videovisible);
  };

  const showCourseVideo = (courseVideo) => {
    setCourseVideoURL(courseVideo);
    setCourseVideoVisible(!courseVideoVisible);
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const pageCount = Math.ceil(courseDataArray.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const loadAllMyCourseListData = courseDataArray
    .filter((item) => {
      if (Data.SearchData == "") {
        return item;
      } else if (
        item.subject_name == null ? "" : item.subject_name.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.title == null ? "" : item.title.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.description == null ? "" : item.description.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.instructor == null ? "" : item.instructor.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      const toShowDescription = item.description.substring(0, 50) + "...";
      return !item.is_completed ? (
        <div className="col-12" key={key}>
          <CCard className="card p-3 friendcard mt-3 mb-3">
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
                  <div className="col-12">
                    <h5 className="d-inline card-title font-weight-bold ">
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
                  <div className="medium-text">{toShowDescription}</div>
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
                  <div className="">{RatingStar(item.avg_ratings)}</div>
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
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>{" "}
                    {item.course_type}
                  </div>
                  <div className="medium-text font-weight-bold">
                    Rs. {item.cost}/-
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 ">
                <div className="row ">
                  {/* <div className="col-12 font-weight-bold d-flex justify-content-end">
                    {item.progress_percent}%
                  </div> */}
                  <div className="mt-1 col-12 d-flex justify-content-end">
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"></div>
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                      {/* <CProgress height={10} className="">
                        <CProgressBar
                          className="bg-warning"
                          value={item.progress_percent}
                        ></CProgressBar>
                      </CProgress> */}
                    </div>
                  </div>

                  {/* <div className="mt-1 col-12 font-weight-bold  d-flex justify-content-end">
                    Completed the Course
                  </div> */}

                  <div className="mt-2 col-12 d-flex justify-content-center">
                    <CTooltip content="Demo Video" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => showDemoVideo(item.demo_video)}
                      >
                        <FontAwesomeIcon icon={faPlayCircle} />
                      </CButton>
                    </CTooltip>

                    {item.course_type == "Recorded" ? (
                      <CTooltip content="Course Video" placement="bottom">
                        <CButton
                          className="btn rounded-circle m-1 roundshap-button"
                          onClick={() => showCourseVideo(item.course_video)}
                        >
                          <FontAwesomeIcon icon={faPlayCircle} />
                        </CButton>
                      </CTooltip>
                    ) : (
                      ""
                    )}

                    <NavLink to="/Messages">
                      <CTooltip content="Message" placement="bottom">
                        <CButton
                          className="btn rounded-circle m-1 roundshap-button"
                        >
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </CButton>
                      </CTooltip>
                    </NavLink>
                    <CTooltip content="Call" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => callNumberVisible(item.phone)}
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
                  {checkAccessPermission("course_edit") ? (
                    <div className="mt-2 col-12 d-flex justify-content-center">
                      <CButton
                        className="complete-course-button"
                        onClick={() => courseComplete(item.id)}
                      >
                        Complete
                      </CButton>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </CCard>
        </div>
      ) : (
        <NoDataContainer module="Course subscription uncompleted" />
      );
    });

  return (
    <div>
      {" "}
      {isLoading ? (
        <>{loader}</>
      ) : loadAllMyCourseListData.length !== 0 ? (
        <div>
          {loadAllMyCourseListData}
          {/* pagination code start */}
          {courseDataArray.length > 10 ? (
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
                <div className="p-2 border tuitionimage col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <CCardImage
                    src={
                      store.selectedCourse !== null
                        ? store.selectedCourse.logo
                        : ""
                    }
                    className="border viewcourselistmodalimage mx-auto d-flex "
                  ></CCardImage>
                  <div>
                    <div className="">{store.selectedCourse.description}</div>
                  </div>
                </div>
                <div className="m-2 border tuitionimage col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <div className="row border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                    <CCardHeader
                      style={{ fontSize: 18 }}
                      className="card-title text-dark"
                    >
                      Course Details
                    </CCardHeader>
                  </div>
                  <div className="p-3">
                    <div className="row">
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
                  <CardText style={{ fontSize: 20 }}>Tutor Number </CardText>
                </div>
                <div className="text-start col-6">
                  {mobileNumber != null ? (
                    <a
                      style={{ fontSize: 20, textDecoration: "none" }}
                      href={"tel:+91" + mobileNumber}
                    >
                      {mobileNumber}
                    </a>
                  ) : (
                    <CardText style={{ fontSize: 20 }}>N/A</CardText>
                  )}
                </div>
              </div>
            </CModalBody>
          </CModal>

          {/* Share Modal code  */}

          <CModal
            visible={sharevisible}
            onDismiss={() => setShareVisible(false)}
          >
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
                  <Button
                    variant="contained"
                    className="mt-4 mb-2"
                    color="primary"
                  >
                    Save Changes
                  </Button>
                </CCol>
              </CRow>
            </CModalBody>
          </CModal>

          {/* Video Modal code  */}

          <CModal
            visible={videovisible}
            onDismiss={() => setvideoVisible(false)}
          >
            <CModalHeader
              onDismiss={() => setvideoVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle>Course Demo Video</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow>
                {demoVideoURL != "" ? (
                  <video playing controls className="h-auto">
                    <source
                      src={demoVideoURL}
                      type="video/mp4"
                      className="h-auto"
                    ></source>
                  </video>
                ) : (
                  <p>There not any demo video available.</p>
                )}
              </CRow>
            </CModalBody>
          </CModal>

          {/* Course Video Modal code  */}

          <CModal
            visible={courseVideoVisible}
            onDismiss={() => setCourseVideoVisible(false)}
          >
            <CModalHeader
              onDismiss={() => setCourseVideoVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle>Course Demo Video</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow>
                <video playing controls className="h-auto">
                  <source
                    src={courseVideoURL}
                    type="video/mp4"
                    className="h-auto"
                  ></source>
                </video>
              </CRow>
            </CModalBody>
          </CModal>
        </div>
      ) : (
        <NoDataContainer module="Course subscription" />
      )}
    </div>
  );
};
export default UncompletedCourseList;
