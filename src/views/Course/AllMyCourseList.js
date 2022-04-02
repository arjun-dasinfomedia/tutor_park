import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faComment,
  faEnvelope,
  faCircle,
  faPhoneAlt,
  faStar,
  faEllipsisV,
  faShareAlt,
  faPaperPlane,
  faUser,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  CTooltip,
  CRow,
  CCol,
  CCard,
  CButton,
  CCardImage,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCardText,
  CLink,
  CCardHeader,
} from "@coreui/react";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllMyCourseList,
  viewCourse,
  deleteCourse,
  subscribeMyCourse,
} from "./MyCourseActions";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
import {
  checkAccessPermission,
  formatDate,
  getUserRole,
} from "../../utility/utils";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import CardText from "reactstrap/lib/CardText";
import EditMyCourse from "./EditMyCourse";
import {
  classListData,
  subjectListData,
  syllabusListData,
} from "src/redux/actions/dropdowns";

const PER_PAGE = 10;

const AllMyCourseList = (Data) => {

  const dispatch = useDispatch();
  const store = useSelector((state) => state.myCourse);
  const [viewvisible, setViewVisible] = useState(false);
  const [libraryviewvisible, setLibraryViewVisible] = useState(false);
  const [libraryData, setLibraryData] = useState("");
  const [editvisible, setEditVisible] = useState(false);
  const [messagevisible, setMessageVisible] = useState(false);
  const [callvisible, setCallVisible] = useState(false);
  const [sharevisible, setShareVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [editData, setEditData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [videovisible, setvideoVisible] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [demoVideoURL, setDemoVideoURL] = useState("");
  const [number, setNumber] = useState("");

  if(store.courseUpdateStatus === "sucess")
  {
    setEditVisible(false)
    store.courseUpdateStatus = ""
  }
  useEffect(async () => {
    showLoader();
    await dispatch(getAllMyCourseList());
    await dispatch(syllabusListData());
    await dispatch(subjectListData());
    await dispatch(classListData());
    setLoading(false);
    hideLoader();
  }, []);

  const viewCourseData = (id) => {
    setViewVisible(true)
    dispatch(viewCourse({ id }));
  };

  // library Data store

  const libraryviewCourseData = (Data) => {
    setLibraryViewVisible(true)
    setLibraryData(Data);
  };

  const subscribeCourse = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to subscribe to this Course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "NO",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(subscribeMyCourse({ course_id: id }));
      }
    });
  };

  const courseDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCourse({ id }));
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
        break;
    }
  };

  const ShowCallData = (data) => {
    setCallVisible(true)
    setNumber(data)
  }

  const editCourseData = (item) => {
    setEditData(item);
    setEditVisible(!editvisible);
  };

  const showDemoVideo = (demo_video) => {
    setDemoVideoURL(demo_video);
    setvideoVisible(!videovisible);
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0);

    if (loadAllMyCourseListData.length === 0) {
      setCurrentPage(0)
    }
  }

  const pageCount = Math.ceil(store.myAllCourseList.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const loadAllMyCourseListData = store.myAllCourseList
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
      return (
        <CCol sm={12} md={12} lg={12} xl={12} key={key}>
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
                  {checkAccessPermission("course_edit") ? (
                    <>
                      <CDropdownItem onClick={() => editCourseData(item)}>
                        Edit
                      </CDropdownItem>
                    </>
                  ) : (
                    ""
                  )}
                  {checkAccessPermission("course_delete") ? (
                    <CDropdownItem onClick={() => courseDelete(item.id)}>
                      Delete
                    </CDropdownItem>
                  ) : null}

                  {checkAccessPermission("course_view") ? (
                    <CDropdownItem
                      onClick={() => viewCourseData(item.id)}
                    >
                      View
                    </CDropdownItem>
                  ) : null}

                  {item.library !== null ? (
                    <CDropdownItem
                      onClick={() => libraryviewCourseData(item.library)}
                    >
                      Library View
                    </CDropdownItem>
                  ) : (
                    ""
                  )}
                </CDropdownMenu>
              </CDropdown>
            </div>
            <div className="row ">
              <div className="align-items-center col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2">
                <CCardImage
                  className="img-fluid rounded course-image mx-auto d-flex "
                  orientation="top"
                  src={item.logo}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-7 text-center text-sm-center text-md-center text-lg-center text-xl-start">
                <div className="row uncomplete-text">
                  <div className="col-12">
                    <h5 className="d-inline card-title font-weight-bold ">
                      {item.title}
                    </h5>{" "}
                    <div className="d-inline normal-font ">
                      (TP Point - {item.tp_points_balance})
                    </div>
                    <div className="d-sm-inline d-none">
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
                          {getUserRole() === "tutor" ? (
                            <>
                              <CDropdownItem
                                onClick={() => editCourseData(item)}
                              >
                                Edit
                              </CDropdownItem>
                              <CDropdownItem
                                onClick={() => courseDelete(item.id)}
                              >
                                Delete
                              </CDropdownItem>
                            </>
                          ) : (
                            ""
                          )}

                          <CDropdownItem
                            onClick={() =>
                              setViewVisible(
                                !viewvisible,
                                viewCourseData(item.id)
                              )
                            }
                          >
                            View
                          </CDropdownItem>

                          {item.library !== null ? (
                            <CDropdownItem
                              onClick={() => libraryviewCourseData(item.library)}
                            >
                              Library View
                            </CDropdownItem>
                          ) : (
                            ""
                          )}
                        </CDropdownMenu>
                      </CDropdown>
                    </div>
                  </div>
                  <div className="medium-text ">{toShowDescription}</div>
                  <div className="normal-font ">
                    <FontAwesomeIcon icon={faUser} /> {item.instructor}{" "}
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>
                    {formatDate(item.start_date)} to {formatDate(item.end_date)}{" "}
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>
                    {item.start_time ?? "Not Available"} -{" "}
                    {item.end_time ?? "Not Available"}
                  </div>
                  <div className="normal-font ">
                    {item.number_of_people_attending} Student{" "}
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>{" "}
                    {item.total_videos} Videos{" "}
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>{" "}
                    {item.total_assignments} Assignments
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>{" "}
                    Course Topics - {item.course_topics}
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
                  <div className="">{RatingStar(item.avg_ratings)}</div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                <CTooltip content="Demo Video" placement="bottom">
                  <CButton
                    className="btn rounded-circle m-1 roundshap-button"
                    onClick={() => showDemoVideo(item.demo_video)}
                  >
                    <FontAwesomeIcon icon={faPlayCircle} />
                  </CButton>
                </CTooltip>
                <NavLink to="/Messages">
                  <CTooltip content="message" placement="bottom">
                    <CButton className="btn rounded-circle m-1 roundshap-button">
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </CButton>
                  </CTooltip>
                </NavLink>
                <CTooltip content="Call" placement="bottom">
                  <CButton
                    className="btn rounded-circle m-1 roundshap-button"
                    onClick={() => ShowCallData(item.phone)}
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
          </CCard>
        </CCol>
      );
    });

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : loadAllMyCourseListData.length !== 0 ? (
        <div>
          {loadAllMyCourseListData}

          {/* pagination code start */}
          {store.myAllCourseList.length > 10 ? (
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

          {/* edit course modal */}
          {store.courseUpdateStatus !== false ? (
            <CModal
              size="lg"
              visible={editvisible}
              onDismiss={() => setEditVisible(false)}
            >
              <CModalHeader
                onDismiss={() => setEditVisible(false)}
                className="tutorviewmodalheader"
              >
                <CModalTitle>Edit My Course</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <EditMyCourse Data={editData} />
              </CModalBody>
            </CModal>
          ) : (
            <CModal size="lg" onDismiss={() => setEditVisible(false)}>
              <CModalHeader
                onDismiss={() => setEditVisible(false)}
                className="tutorviewmodalheader"
              >
                <CModalTitle>Edit My Course</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <EditMyCourse Data={editData} />
              </CModalBody>
            </CModal>
          )}
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
                    // style={{ height: 120, width: 120, borderRadius: 10 }}
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
                      className="text-dark card-title"
                    >
                      Course Details
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
                      <div
                        className="col-8 "
                        style={{ textTransform: "capitalize" }}
                      >
                        {store.selectedCourse !== null
                          ? store.selectedCourse.mode_of_teaching
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Course Type </div>
                      <div
                        className="col-8"
                        style={{ textTransform: "capitalize" }}
                      >
                        {store.selectedCourse.type !== null
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
                    <div className="row">
                      <div className="col-4 font-weight-bold">
                        Course Topics{" "}
                      </div>
                      <div className="col-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.course_topics
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">
                        Number of People Attending{" "}
                      </div>
                      <div className="col-8">
                        {store.selectedCourse.number_of_people_attending !==
                          null
                          ? store.selectedCourse.number_of_people_attending
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Description </div>
                      <div className="col-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.description
                          : "Not Available"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              <CModalTitle className="font-weight-bold">
                View Library
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow>
                <CCol
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  style={{ maxWidth: 20 }}
                ></CCol>
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
                <CCol
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  style={{ maxWidth: 20 }}
                ></CCol>
                <CCol className="border tuitionimage my-2">
                  <CRow className="border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                    <CCol>
                      <CCardText
                        style={{ fontSize: 18 }}
                        className="p-2 text-dark"
                      >
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
                      <CLink href={libraryData.attachment} target="_blank">
                        {libraryData.attachment &&
                          libraryData.attachment.slice(0, 20) + "..."}
                      </CLink>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  style={{ maxWidth: 20 }}
                ></CCol>
              </CRow>
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
                <div className="col-6 text-start">
                  <CardText style={{ fontSize: 20 }}>Tutor Number </CardText>
                </div>
                <div className="col-6  text-start">
                  {number !== null ? (
                    <a
                      style={{ fontSize: 20, textDecoration: "none" }}
                      href={"tel:+91" + number}
                    >
                      {number}
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
                {demoVideoURL !== "" ? (
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
        </div>
      ) : (
        <NoDataContainer module="Course" />
      )}
    </div>
  );
};

export default AllMyCourseList;
