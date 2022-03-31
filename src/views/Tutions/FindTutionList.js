import React, { useState, useEffect } from "react";
import {
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CTable,
  CTableHead,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCardText,
  CCard,
  CRow,
  CCol,
  CButton,
  CCardImage,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faEye,
  faBullhorn,
  faBookReader,
  faCircle,
  faPhoneAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import profile4 from "../../assets/images/My_Tuition/Teacher.png";
import {
  getFindAllTutionList,
  getRazorPaySettings,
  getSubscribedStudentList,
  subscribeTuition,
  viewUserDetails,
} from "./TuitionActions";
import { useSelector, useDispatch } from "react-redux";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import ReactPaginate from "react-paginate";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import MaterialTable from "material-table";
import { createRazorpayOrderID } from "../searchcourse/SearchCourseActions";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";
import Logo from "../../assets/images/logo/Logo_Option-1.png";
import { getUserData } from "src/utility/utils";

const MySwal = withReactContent(Swal);
const PER_PAGE = 10;

const FindTutionList = (Data) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.TuitionReducer);
  const [videovisible, setvideoVisible] = useState(false);
  const [demoVideoURL, setDemoVideoURL] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [viewvisible, setViewVisible] = useState(false);
  const [callvisible, setCallVisible] = useState(false);
  const [number, setNumber] = useState("");

  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [requestDataArray, setRequestDataArray] = useState([]);

  const [subscribedStudentListModal, setSubscribedStudentListModal] =
    useState(false);
  const [currentTuitionID, setCurrentTuitionID] = useState("");

  // handle subscribed student list modal
  async function handleSubscribedStudentModal(tuitionId) {
    setCurrentTuitionID(tuitionId);
    await dispatch(getSubscribedStudentList({ tuition_id: tuitionId }));
    setSubscribedStudentListModal(!subscribedStudentListModal);
  }

  const columnsForSubscribedStudentsList = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Email",
      field: "email",
    },
  ];

  useEffect(async () => {
    showLoader();
    await dispatch(getFindAllTutionList());
    await dispatch(getRazorPaySettings());
    setLoading(false);
    hideLoader();
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
        return "";
        break;
    }
  };

  const JoinClass = (id, cost) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to join this tuition?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        createRazorPayPaymentUsingCheckout(id, cost)
        // dispatch(subscribeTuition({ tuition_id: id }));

      }
    });
  };

  // razorpay payment process code
  const createRazorPayPaymentUsingCheckout = async (id, cost) => {
    const orderData = await dispatch(createRazorpayOrderID({ amount: cost }));
    // console.log(process.env.RAZORPAY_KEY_ID)
    const options = {
      key: store.razorpaySettings.mode === "test" ? store.razorpaySettings.test_key_id : store.razorpaySettings.live_key_id,
      // key: 'rzp_test_jBlFauAaq9RkSM',
      // key: process.env.RAZORPAY_KEY_ID,
      amount: orderData.amount, //  = INR 1
      name: 'Tutor Park',
      description: 'Online Learning Portal',
      image: Logo,
      order_id: orderData.order_id,
      handler: function (response) {
        if (response.razorpay_payment_id !== null) {
          dispatch(subscribeTuition({ tuition_id: id, razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature }));

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

  const callModalOpen = (data) => {

    setCallVisible(true)
    setNumber(data.tutor_details.phone)
  }
  const showDemoVideo = (demo_video) => {
    setDemoVideoURL(demo_video);
    setvideoVisible(!videovisible);
  };
  const viewUserData = (tutor_email) => {
    setViewVisible(true);
    dispatch(viewUserDetails({ email: tutor_email }));
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }
  const pageCount = Math.ceil(store.findListStudent.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const loadAllMyTutionStudentListData = store.findListStudent
    .filter((item) => {
      if (Data.SearchData == "") {
        return item;
      } else if (
        item.subject == null ? "" : item.subject.toLowerCase().includes(Data.SearchData.toLowerCase())
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
        item.syllabus == null ? "" : item.syllabus.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      return (
        <CCol sm={12} md={12} lg={12} xl={12} key={key}>
          <CCard className="card p-3 friendcard mb-3 mt-3">
            <div className="row ">
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 ">
                <CCardImage
                  className="img-fluid serchcourse-image tution-image tuitionimage rounded-lg mx-auto d-flex mt-2 "
                  orientation="top"
                  src={item.image}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6 text-center text-sm-center text-md-start text-lg-start text-xl-start">
                <div className="row m-2">
                  <div className="col-12">
                    <h5 className="d-inline card-title font-weight-bold">
                      {item.title}
                    </h5>{" "}
                    <div className="d-inline normal-font">
                      (TP Point - {item.tutor_details.tp_points_balance})
                    </div>
                  </div>
                  <div className="medium-text">{item.description}</div>
                  <div className="normal-font text-monospace mb-1">
                    <img src={profile4} className="tuitionteacher  mr-1" />
                    {item.tutor_name} | {item.start_date} to {item.end_date}
                  </div>
                  <div className="normal-font text-monospace mb-1">
                    {item.availability.map((availability) => {
                      return (
                        <>
                          {availability.day.charAt(0).toUpperCase() +
                            availability.day.slice(1)}
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="infocircle1 m-1"
                          />
                          {availability.date}
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="infocircle1 m-1"
                          />
                          {availability.start_time}
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="infocircle1 m-1"
                          />{" "}
                          {availability.end_time}
                          <br />
                        </>
                      );
                    })}
                  </div>
                  <div className="normal-font text-monospace">
                    {item.syllabus}{" "}
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="infocircle1 m-1"
                    />{" "}
                    {item.subject}{" "}
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="infocircle1 m-1"
                    />{" "}
                    {item.mode_of_teaching}
                  </div>
                  <div className="medium-text font-weight-bold">
                    Rs. {item.cost}/-
                  </div>
                </div>
              </div>
              <CCol className="  tuitioncardlast">
                <CRow className=" ">
                  <CCol>
                    <CCardText>
                      <CButton
                        className="detailbutton tuitionicon"
                        onClick={() => JoinClass(item.id, item.cost)}
                      >
                        <FontAwesomeIcon icon={faPlusSquare} className="mr-1" />
                        Subscribe
                      </CButton>
                    </CCardText>
                  </CCol>
                  <CCol className="p-0">
                    <CCardText>
                      <NavLink to="/messages">
                        <CButton className="detailbutton tuitionicon">
                          <FontAwesomeIcon icon={faBullhorn} className="mr-1" />
                          Announcement
                        </CButton>
                      </NavLink>
                    </CCardText>
                  </CCol>
                </CRow>
                <CRow className="">
                  <CCol>
                    <CCardText>
                      <CButton
                        onClick={() => showDemoVideo(item.demo_video)}
                        className="detailbutton tuitionicon"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" />
                        Demo
                      </CButton>
                    </CCardText>
                  </CCol>
                  <CCol>
                    <CCardText>
                      <NavLink to="/assignment">
                        <CButton className="detailbutton tuitionicon">
                          <FontAwesomeIcon
                            icon={faBookReader}
                            className="mr-1"
                          />
                          Home Work
                        </CButton>
                      </NavLink>
                    </CCardText>
                  </CCol>
                </CRow>
                <CRow className="">
                  <CCol>
                    <CCardText>
                      <CButton
                        className="detailbutton tuitionicon"
                        onClick={() => handleSubscribedStudentModal(item.id)}
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" />
                        Students
                      </CButton>
                    </CCardText>
                  </CCol>
                  <CCol>
                    <CCardText>
                      <NavLink to="/assignment">
                        <CButton className="detailbutton tuitionicon">
                          <FontAwesomeIcon
                            icon={faBookReader}
                            className="mr-1"
                          />
                          Class Work
                        </CButton>
                      </NavLink>
                    </CCardText>
                  </CCol>
                </CRow>
                <CRow className="">
                  <CCol>
                    <CCardText>
                      <CButton
                        className="detailbutton tuitionicon"
                        onClick={() => viewUserData(item.tutor_email)}
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" />
                        Profile
                      </CButton>
                    </CCardText>
                  </CCol>
                  <CCol>
                    <CCardText>
                      <CButton
                        className="detailbutton tuitionicon"
                        onClick={() => callModalOpen(item)}
                      >
                        <FontAwesomeIcon icon={faPhoneAlt} className="mr-1" />
                        Contact
                      </CButton>
                    </CCardText>
                  </CCol>
                </CRow>
              </CCol>
            </div>
          </CCard>
        </CCol>
      );
    });

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : loadAllMyTutionStudentListData.length !== 0 ? (
        <div>
          {loadAllMyTutionStudentListData}
          
          {/* pagination code start */}
          {requestDataArray.length > 10 ? (
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
                  "pagination react-paginate col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center"
                }
              />
            </div>
          ) : (
            ""
          )}
          {/* pagination code end */}
        </div>
      ) : (
        <NoDataContainer module="Tuition" />
      )}

      {/* Video Modal code  */}

      <CModal visible={videovisible} onDismiss={() => setvideoVisible(false)}>
        <CModalHeader
          onDismiss={() => setvideoVisible(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Tuition Demo Video</CModalTitle>
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

      {/* Call Modal code  */}

      <CModal visible={callvisible} onDismiss={() => setCallVisible(false)}>
        <CModalHeader
          onDismiss={() => setCallVisible(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Contact Details</CModalTitle>
        </CModalHeader>
        <CModalBody className="ml-3 mr-3 text-center">
          <CRow>
            <CCol className="text-start">
              <CCardText style={{ fontSize: 20 }}>Tutor Number :- </CCardText>
            </CCol>
            <CCol className="text-start">
              <CCardText style={{ fontSize: 20 }}>{number}</CCardText>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>

      {/* View Modal code  */}

      <CModal
        visible={viewvisible}
        size="xl"
        onDismiss={() => setViewVisible(false)}
      >
        <CModalHeader
          onDismiss={() => setViewVisible(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle className="">Tutor Profile</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="p-2">
            <div className="row justify-content-around">
              <div className="d-inline border-0 tuitionimage col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-2">
                <CCardImage
                  src={store.viewUserData.image}
                  className="border tutorviewmodalimage mb-xs-2 mb-sm-2 mb-md-2 mb-lg-0 mb-xl-0"
                ></CCardImage>
              </div>
              <div className="d-inline border tuitionimage col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 p-0 text-wrap">
                <div className="border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                  <CCardHeader
                    style={{ fontSize: 18 }}
                    className="card-title text-dark"
                  >
                    Tutor Details
                  </CCardHeader>
                </div>
                <div className="col-12 p-3">
                  <div className="row">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                      Name
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                      {store.viewUserData.first_name}{" "}
                      {store.viewUserData.last_name}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                      City
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                      {store.viewUserData.user_details !== undefined
                        ? store.viewUserData.user_details.city
                        : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                      State
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                      {store.viewUserData.user_details !== undefined
                        ? store.viewUserData.user_details.state
                        : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                      Number
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                      {store.viewUserData.user_details !== undefined &&
                        store.viewUserData.user_details.phone !== null
                        ? store.viewUserData.user_details.phone
                        : "N/A"}
                    </div>
                  </div>
                  <div className="row  ">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                      Email
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
                      {store.viewUserData.email}
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                      Languages
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                      {store.viewUserData.user_details !== undefined &&
                        store.viewUserData.user_details.languages !== null
                        ? store.viewUserData.user_details.languages.toString()
                        : "N/A"}
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                      Avg Ratings
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                      {store.viewUserData.user_details !== undefined &&
                        store.viewUserData.user_details.avg_ratings !== null
                        ? RatingStar(
                          store.viewUserData.user_details.avg_ratings
                        )
                        : "N/A"}
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                      TP Points
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                      {store.viewUserData.user_details !== undefined &&
                        store.viewUserData.user_details.tp_points_balance !== null
                        ? store.viewUserData.user_details.tp_points_balance
                        : "N/A"}
                    </div>
                  </div>
                  {store.viewUserData.user_details !== undefined &&
                    store.viewUserData.user_details.hide_area !== false ? (
                    <div className="row ">
                      <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                        Geo Tag Location
                      </div>
                      <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                        {store.viewUserData.user_details.geo_location}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <CCardHeader className="card-title cardtitle font-weight-bold text-dark">
                  Education Details
                </CCardHeader>
                {store.viewUserData.user_details !== undefined &&
                  store.viewUserData.user_details.education.length !== 0 ? (
                  <CTable bordered responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell
                          scope="col"
                          className="header-profile-table"
                        >
                          Degree/Standard
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          scope="col"
                          className="header-profile-table"
                        >
                          College/School
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          scope="col"
                          className="header-profile-table"
                        >
                          Place
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {store.viewUserData.user_details.education.map(
                        (educationData, index) => (
                          <CTableRow key="index">
                            <CTableDataCell scope="row">
                              {educationData.degree}
                            </CTableDataCell>
                            <CTableDataCell>
                              {educationData.college}
                            </CTableDataCell>
                            <CTableDataCell>
                              {educationData.place}
                            </CTableDataCell>
                          </CTableRow>
                        )
                      )}
                    </CTableBody>
                  </CTable>
                ) : (
                  <CTable bordered responsive>
                    <CCardText style={{ textAlign: "center" }}>N/A</CCardText>
                  </CTable>
                )}
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <CCardHeader className="card-title cardtitle fw-bold text-dark">
                  Experience Details
                </CCardHeader>
                {store.viewUserData.user_details !== undefined &&
                  store.viewUserData.user_details.experience.length !== 0 ? (
                  <CTable bordered responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell
                          scope="col"
                          className="header-profile-table"
                        >
                          School/College Name
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          scope="col"
                          className="header-profile-table"
                        >
                          Designation
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          scope="col"
                          className="header-profile-table"
                        >
                          Experience in month
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {store.viewUserData.user_details.experience.map(
                        (experienceData, index) => (
                          <CTableRow key="index">
                            <CTableDataCell scope="row">
                              {experienceData.organization}
                            </CTableDataCell>
                            <CTableDataCell>
                              {experienceData.designation}
                            </CTableDataCell>
                            <CTableDataCell>
                              {experienceData.experience_month}
                            </CTableDataCell>
                          </CTableRow>
                        )
                      )}
                    </CTableBody>
                  </CTable>
                ) : (
                  <CTable bordered responsive>
                    <CCardText style={{ textAlign: "center" }}>N/A</CCardText>
                  </CTable>
                )}
              </div>
            </div>
          </div>
        </CModalBody>
      </CModal>

      {/* subscribed Student list modal */}
      <CModal
        size="xl"
        visible={subscribedStudentListModal}
        onDismiss={() => setSubscribedStudentListModal(false)}
      >
        <CModalHeader
          onDismiss={() => setSubscribedStudentListModal(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Enrolled Student List In This Tuition</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="m-3">
            <MaterialTable
              columns={columnsForSubscribedStudentsList}
              data={store.subscribedStudentList}
              options={{
                search: true,
                selection: true,
                filtering: true,
                searchFieldAlignment: "right",
                headerStyle: {
                  backgroundColor: "#DEDDF4",
                  color: "#444346",
                  fontWeight: "600",
                  fontSize: "15px",
                },
              }}
              actions={[
                {
                  tooltip: "Add selected students in tuition",
                  icon: "add",
                  onClick: (evt, data) => HandleAddStudentInTution(data, evt),
                },
              ]}
            />
          </CRow>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default FindTutionList;