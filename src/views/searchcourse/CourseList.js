import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPhoneAlt,
  faStar,
  faPaperPlane,
  faUser,
  faPlayCircle,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import {
  CTooltip,
  CRow,
  CCol,
  CCard,
  CButton,
  CCardImage,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCardHeader,
} from "@coreui/react";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
import { useSelector, useDispatch } from "react-redux";
import {
  createRazorpayOrderID,
  getAllCourseListSearch,
  subscribeMyCourse,
  viewCourse,
} from "./SearchCourseActions";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { formatDate, getUserData } from "../../utility/utils";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CardText from "reactstrap/lib/CardText";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import Swal from "sweetalert2";
import Logo from "../../assets/images/logo/Logo_Option-1.png";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";
import { getRazorPaySettings } from "../Tutions/TuitionActions";

const PER_PAGE = 10;

const CourseList = (props) => {

  const dispatch = useDispatch();
  const store = useSelector((state) => state.searchCourse);
  const tuitionStore = useSelector((state) => state.TuitionReducer);
  const [currentPage, setCurrentPage] = useState(0);

  const [viewvisible, setViewVisible] = useState(false);
  const [messagevisible, setMessageVisible] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [callvisible, setCallVisible] = useState(false);
  const [videovisible, setvideoVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [number, setNumber] = useState("");
  const [demoVideoURL, setDemoVideoURL] = useState("");
  const [noDataAvailableInSearch, setNoDataAvailableInSearch] = useState(false);

  useEffect(async () => {
    showLoader();
    await dispatch(getAllCourseListSearch());
    await dispatch(getRazorPaySettings());
    setLoading(false);
    hideLoader();
  }, []);

  const CallModalOpen = (data) => {

    setCallVisible(true);
    setNumber(data)

  }

  const viewCourseData = (id) => {
    setViewVisible(true)
    dispatch(viewCourse({ id }));
  };

  const showDemoVideo = (demo_video) => {
    setDemoVideoURL(demo_video);
    setvideoVisible(!videovisible);
  };

  const subscribeCourse = async (id, cost) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to join to this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "NO",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        createRazorPayPaymentUsingCheckout(id, cost)
      }
    });
  };

  // razorpay payment process code
  const createRazorPayPaymentUsingCheckout = async (id, cost) => {
    const orderData = await dispatch(createRazorpayOrderID({ amount: cost }));
    // console.log(process.env.RAZORPAY_KEY_ID)
    const options = {
      key: tuitionStore.razorpaySettings.mode === "test" ? tuitionStore.razorpaySettings.test_key_id : tuitionStore.razorpaySettings.live_key_id,
      // key: 'rzp_test_jBlFauAaq9RkSM',
      // key: process.env.RAZORPAY_KEY_ID,
      amount: orderData.amount, //  = INR 1
      name: 'Tutor Park',
      description: 'Online Learning Portal',
      image: Logo,
      order_id: orderData.order_id,
      handler: function (response) {
        if (response.razorpay_payment_id !== null) {
          dispatch(subscribeMyCourse({ course_id: id, razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature }));
          dispatch(getAllCourseListSearch());
        } else {
          dispatch(alertActions.error(response.message.toString()));
          toast.error(response.message.toString());
          return false
          alert("There is an error in payment process");
        }
      },
      prefill: {
        name: getUserData().first_name + " " + getUserData().first_name,
        contact: getUserData().user_details.phone,
        email: getUserData().email
      },
      notes: {
        address: 'Tutor Park - take payment from customers online'
      },
      theme: {
        color: '#5a55cb',
        // hide_topbar: false
      }
    };

    // open checkout modal
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      dispatch(alertActions.error(response.error.description.toString()));
      toast.error(response.error.description.toString());
      return false
    });
    rzp1.open();
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

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

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const pageCount = Math.ceil(store.courseDataList && store.courseDataList.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const loadAllMyCourseListData = store.courseDataList && store.courseDataList
    .filter((item) => {
      if (props.Data == "") {
        return item;
      } else if (
        item.subject_name == null ? "" : item.subject_name.toLowerCase().includes(props.Data.toLowerCase())
      ) {
        return item;
      } else if (item.title == null ? "" : item.title.toLowerCase().includes(props.Data.toLowerCase())) {
        return item;
      } else if (
        item.description == null ? "" : item.description.toLowerCase().includes(props.Data.toLowerCase())
      ) {
        return item;
      } else if (
        item.syllabus_name == null ? "" : item.syllabus_name.toLowerCase().includes(props.Data.toLowerCase())
      ) {
        return item;
      } else if (
        item.class_name == null ? "" : item.class_name.toLowerCase().includes(props.Data.toLowerCase())
      ) {
        return item;
      } else if (
        item.subject_name == null ? "" : item.subject_name.toLowerCase().includes(props.Data.toLowerCase())
      ) {
        return item;
        ErrorMessage = "1"
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      const toShowDescription = item.description.substring(0, 50) + "...";
      return (
        <CCol sm={12} md={12} lg={12} xl={12} key={key}>
          <CCard className="card p-3 friendcard mb-3 mt-3">

            <div className="row ">
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 ">
                <CCardImage
                  className="img-fluid serchcourse-image mx-auto d-flex"
                  orientation="top"
                  src={item.logo}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-7 text-center text-sm-center text-md-start text-lg-start text-xl-start">
                <div className="row m-0">
                  <div className="col-12">
                    <h5 className="d-inline card-title font-weight-bold">
                      {item.title}{" "}
                    </h5>{" "}
                    <div className="d-inline normal-font">
                      (TP Point - {item.tp_points_balance})
                    </div>

                  </div>
                  <div className="medium-text">{toShowDescription}</div>
                  <div className="normal-font text-monospace mb-1">
                    <FontAwesomeIcon icon={faUser} /> {item.instructor}{" "}
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>{" "}
                    {formatDate(item.start_date)} to{"  "}
                    {formatDate(item.end_date)}{" "}
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>
                    {item.start_time ?? "Not Available"} -{" "}
                    {item.end_time ?? "Not Available"}
                  </div>
                  <div className="normal-font text-monospace">
                    {item.number_of_people_attending_course} Student{" "}
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>
                    {item.total_videos ?? "Not Available"} Videos{" "}
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>{" "}
                    {item.total_assignments ?? "Not Available"} Assignments
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
                  <div>{RatingStar(item.avg_ratings)}</div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                <div className="row">
                  <div className="col-12 d-flex justify-content-center">
                    <CButton
                      className="btn buynowbutton m-1 font-weight-bold"
                      onClick={() => subscribeCourse(item.id, item.cost)}
                    >
                      JOIN NOW
                    </CButton>
                  </div>

                  <div className="d-flex justify-content-center mt-4">
                    <CTooltip content="Demo Video" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => showDemoVideo(item.demo_video)}
                      >
                        <FontAwesomeIcon className="" icon={faPlayCircle} />
                      </CButton>
                    </CTooltip>
                    <CTooltip content="View" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => viewCourseData(item.id)}
                      >
                        <FontAwesomeIcon className="" icon={faEye} />
                      </CButton>
                    </CTooltip>
                    <NavLink to="/Messages">
                      <CTooltip content="Message" placement="bottom">
                        <CButton
                          className="btn rounded-circle m-1 roundshap-button"
                        >
                          <FontAwesomeIcon
                            className=""
                            icon={faPaperPlane}
                          />
                        </CButton>
                      </CTooltip>
                    </NavLink>
                    <CTooltip content="Call" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 roundshap-button"

                        onClick={() => CallModalOpen(item.phone)}
                      >
                        <FontAwesomeIcon className="" icon={faPhoneAlt} />
                      </CButton>
                    </CTooltip>
                  </div>
                </div>
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
      ) : store.courseDataList && store.courseDataList.length !== 0 ? (
        <div>
          {loadAllMyCourseListData}
          {/* pagination code start */}
          {store.courseDataList.length > 10 ? (
            <div className="mt-4 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center ">
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
                <div className="border tuitionimage col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 p-2">
                  <CCardImage
                    src={
                      store.selectedCourse !== null
                        ? store.selectedCourse.logo
                        : ""
                    }
                    className="border viewcourselistmodalimage mx-auto d-flex"
                  ></CCardImage>
                  <div>
                    <div className="">{store.selectedCourse.description}</div>
                  </div>
                </div>
                <div className="border tuitionimage col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 m-2">
                  <div className="row border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                    <CCardHeader
                      style={{ fontSize: 18 }}
                      className="text-dark card-title"
                    >
                      Course Details{" "}
                    </CCardHeader>
                  </div>
                  <div className="p-2">
                    <div className="row">
                      <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 font-weight-bold">
                        Course Title{" "}
                      </div>
                      <div className="col-6 col-sm-6 dol-md-8 col-lg-8 col-xl-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.title
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 font-weight-bold">
                        Subject
                      </div>
                      <div className="col-6 col-sm-6 dol-md-8 col-lg-8 col-xl-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.subject_name
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 font-weight-bold">
                        Syllabus
                      </div>
                      <div className="col-8 col-sm-8 dol-md-8 col-lg-8 col-xl-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.syllabus_name
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 font-weight-bold">
                        Class
                      </div>
                      <div className="col-6 col-sm-6 dol-md-8 col-lg-8 col-xl-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.class_name
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 font-weight-bold">
                        Cost
                      </div>
                      <div className="col-6 col-sm-6 dol-md-8 col-lg-8 col-xl-8">
                        {store.selectedCourse !== null
                          ? "Rs " + store.selectedCourse.cost + "/-"
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 font-weight-bold">
                        Mode If Teaching{" "}
                      </div>
                      <div className="col-6 col-sm-6 dol-md-8 col-lg-8 col-xl-8">
                        {/* {store.selectedCourse !== null
                          ? store.selectedCourse.mode_of_teaching.charAt(0).toUpperCase()
                          : "Not Available"} */}
                        { }
                        {store.selectedCourse.mode_of_teaching
                          ? store.selectedCourse.mode_of_teaching
                            .charAt(0)
                            .toUpperCase() +
                          store.selectedCourse.mode_of_teaching
                            .slice(1)
                            .replace("_", " ")
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 font-weight-bold">
                        Course Type{" "}
                      </div>
                      <div className="col-6 col-sm-6 dol-md-8 col-lg-8 col-xl-8">
                        {store.selectedCourse !== null
                          ? store.selectedCourse.type
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 font-weight-bold">
                        Duration To Complete{" "}
                      </div>
                      <div className="col-6 col-sm-6 dol-md-8 col-lg-8 col-xl-8">
                        {store.selectedCourse.duration_for_complete !== null
                          ? store.selectedCourse.duration_for_complete
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 font-weight-bold">
                        Total Assignments{" "}
                      </div>
                      <div className="col-6 col-sm-6 dol-md-8 col-lg-8 col-xl-8">
                        {store.selectedCourse.total_assignments !== null
                          ? store.selectedCourse.total_assignments
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 font-weight-bold">
                        Total Videos{" "}
                      </div>
                      <div className="col-6 col-sm-6 dol-md-8 col-lg-8 col-xl-8">
                        {store.selectedCourse.total_videos !== null
                          ? store.selectedCourse.total_videos
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 font-weight-bold">
                        Tp Points
                      </div>
                      <div className="col-6 col-sm-6 dol-md-8 col-lg-8 col-xl-8">
                        {store.selectedCourse.total_videos !== null
                          ? store.selectedCourse.total_videos
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
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
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
              <CRow>
                <CCol className="text-start">
                  <CardText style={{ fontSize: 20 }}>Tutor Number </CardText>
                </CCol>
                <CCol className="text-start">
                  <a
                    style={{ fontSize: 20, textDecoration: "none" }}
                    href={"tel:+91" + number}
                  >
                    {number}
                  </a>
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
          {noDataAvailableInSearch === true ? (
            <>
              <p>no data available</p>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <NoDataContainer module="Course" />
      )}
    </div>
  );
};

export default CourseList;
