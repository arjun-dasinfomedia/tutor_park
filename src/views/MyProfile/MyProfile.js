import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faStar,
  faMinusCircle,
  faPlusCircle,
  faBook,
  faVihara,
  faVial,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import MaterialTable from "material-table";
import {
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModal,
  CProgressBar,
  CProgress,
  CButton,
  CCardHeader,
  CCardBody,
  CCard,
  CImage,
  CRow,
  CCol as CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CCardText,
  CDropdownDivider,
  CCardImage,
} from "@coreui/react";
import {
  userdetails,
  updateUserProfile,
  storeGeotagDetailsUpdate,
  hideArea,
  updateOtherUser,
} from "./myprofileaction";
import { useSelector, useDispatch } from "react-redux";
import profile from "../../assets/images/myfriends/unnamed.jpg";
import {
  getUserRole,
  getUserData,
  getAllDays,
  getAllTeachingMode,
  getAllLanguages,
  checkAccessPermission,
} from "src/utility/utils";
import Controls from "src/components/formControls/controls/Controls";
import { Formik, Form, Field, FieldArray } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { InputAdornment } from "@material-ui/core";
import {
  syllabusListData,
  classListData,
  subjectListData,
} from "../../redux/actions/dropdowns/index";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { RadioGroup, TextField, Select } from "formik-material-ui";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { Country, State, City } from "country-state-city";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import CustomAlertControl from "../AlertMessage";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { compose, withProps } from "recompose";
import Geocode from "react-geocode";

const emptyEducation = { id: null, degree: "", college: "", place: "" };

const emptyExperience = {
  id: null,
  organization: "",
  designation: "",
  experience_month: "",
};
const emptyAvailability = {
  id: null,
  day: "monday",
  start_time: "",
  end_time: "",
};

const MyProfile = () => {
  const dispatch = useDispatch();

  /*State use City and State */
  const [selectedState, setSelectedState] = useState(
    getUserData().user_details.state
  );
  const [selectedCity, setSelectedCity] = useState(
    getUserData().user_details.city
  );
  const [latitude, setLatitude] = useState(
    getUserData().lattitude ?? 16.720549
  );
  const [longitude, setLongitude] = useState(
    getUserData().longitude ?? 78.85437
  );

  const [cityList, setCityList] = useState("");
  const [birth_date, setBirthDate] = useState(
    getUserData().user_details.birth_date ?? new Date()
  );

  const [profilevisible, setProfileVisible] = useState(false);
  const [profilestudentvisible, setProfileStudentVisible] = useState(false);
  const [profileSchoolVisible, setProfileSchoolVisible] = useState(false);

  const [syllabusID, setSyllabusID] = useState(
    getUserData().user_details.syllabus_id
  );
  const [classID, setClassID] = useState(getUserData().user_details.class_id);
  const [subjectID, setSubjectID] = useState(
    getUserData().user_details.subject_id
  );

  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const DropDown = useSelector((state) => state.dropdowns);

  const store = useSelector((state) => state.myProfile);
  const schoolshedule = store.userdetailsData.user_details;

  const genderItems = [
    { id: "Male", title: "Male" },
    { id: "Female", title: "Female" },
    { id: "Other", title: "Other" },
  ];

  const stateList = State.getStatesOfCountry("IN");

  useEffect(async () => {
    showLoader();
    await dispatch(userdetails({ email: getUserData().email }));
    await dispatch(syllabusListData());
    await dispatch(
      classListData({ syllabus_id: getUserData().user_details.syllabus_id })
    );
    await dispatch(
      subjectListData({ class_id: getUserData().user_details.class_id })
    );

    setLoading(false);
    hideLoader();
    stateList.forEach((state) => {
      if (state.name === selectedState) {
        setCityList(City.getCitiesOfState("IN", state.isoCode));
      }
    });
  }, []);

  const columns = [
    {
      title: "Class",
      field: "class",
    },
    {
      title: "Division",
      field: "division",
    },
    {
      title: "Subject",
      field: "subject_name",
    },
    {
      title: "Day",
      field: "day",
    },
    {
      title: "Start Time",
      field: "start_time",
    },
    {
      title: "End Time",
      field: "end_time",
    },
  ];
  const initialValues = {
    first_name: getUserData().first_name,
    last_name: getUserData().last_name,
    phone: getUserData().user_details.phone,
    aadhar_id: getUserData().user_details.aadhar_id,
    nationality: "Indian",
    syllabus_id: syllabusID,
    class_id: classID,
    subject_id: subjectID,
    topic:
      getUserData().user_details.topic === null
        ? ""
        : getUserData().user_details.topic,
    mode_of_teaching: getUserData().user_details.mode_of_teaching,
    online_cost_per_hour:
      getUserData().user_details.online_cost_per_hour === null
        ? 0
        : getUserData().user_details.online_cost_per_hour,
    fb_url: getUserData().user_details.fb_url,
    li_url: getUserData().user_details.li_url,
    tw_url: getUserData().user_details.tw_url,
    insta_url: getUserData().user_details.insta_url,
    languages:
      getUserData().user_details.languages === null
        ? []
        : getUserData().user_details.languages,
    birth_date:
      getUserData().user_details.birth_date === null
        ? new Date()
        : getUserData().user_details.birth_date,
    gender: getUserData().user_details.gender,
    address: getUserData().user_details.area,
    state: selectedState,
    city: selectedCity,
    pincode: getUserData().user_details.pincode,
    education:
      getUserData().user_details.education.length === 0
        ? [emptyEducation]
        : getUserData().user_details.education,
    experience:
      getUserData().user_details.experience.length === 0
        ? [emptyExperience]
        : getUserData().user_details.experience,
    availability:
      getUserData().availability.length === 0
        ? [emptyAvailability]
        : getUserData().availability,
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object({
    first_name: yup
      .string("Enter your first name")
      .required("First name is required"),
    last_name: yup
      .string("Enter your last name")
      .required("Last name is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number is to short")
      .max(10, "Phone number is to long"),
    aadhar_id: yup
      .string()
      .required("Aadhar ID is required")
      .matches(phoneRegExp, "Aadhar ID is not valid")
      .min(12, "Aadhar ID is to short")
      .max(12, "Aadhar ID is to long"),

    // syllabus_id: yup.string().required("Syllabus is required"),
    // class_id: yup.string().required("Class is required"),
    // subject_id: yup.string().required("Subject is required"),
    topic: yup.string().required("Topic is required"),
    mode_of_teaching: yup.string().required("mode of teaching is required"),
    online_cost_per_hour: yup
      .number("Cost should be a number.")
      .positive("Cost should be a positive number")
      .required("cost is required"),
    state: yup.string().required("please select state"),
    city: yup.string().required("please select city"),
    address: yup.string().required("Address is required"),
    pincode: yup.number().positive().required("Pincode is required"),

    education: yup.array().of(
      yup.object().shape({
        degree: yup.string().required("Board/University is required"),
        college: yup.string().required("College is required"),
        place: yup.string().required("Place is required"),
      })
    ),
    experience: yup.array().of(
      yup.object().shape({
        organization: yup.string().required("Organization is required"),
        designation: yup.string().required("Designation is required"),
        experience_month: yup
          .number("It will accept only number")
          .positive("Please enter positive number")
          .required("Months is required"),
      })
    ),
    availability: yup.array().of(
      yup.object().shape({
        day: yup.string().required("Day is required"),
        start_time: yup.string().required("Start Time is required"),
        end_time: yup.string().required("End Time is required"),
      })
    ),
  });

  // student form update Code
  const initialValuesForStudent = {
    first_name: getUserData().first_name,
    last_name: getUserData().last_name,
    phone: getUserData().user_details.phone,
    aadhar_id: getUserData().user_details.aadhar_id,
    gender: getUserData().user_details.gender,
    nationality: "Indian",
    birth_date:
      getUserData().user_details.birth_date === null
        ? new Date()
        : getUserData().user_details.birth_date,
    syllabus_id: syllabusID,
    class_id: classID,
    subject_id: subjectID,
    address: getUserData().user_details.address,
    state: selectedState,
    city: selectedCity,
    pincode: getUserData().user_details.pincode,
  };

  const validationSchemaForStudent = yup.object({
    first_name: yup
      .string("Enter your first name")
      .required("First name is required"),
    last_name: yup
      .string("Enter your last name")
      .required("Last name is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number is to short")
      .max(10, "Phone number is to long"),
    aadhar_id: yup
      .string()
      .required("Aadhar ID is required")
      .matches(phoneRegExp, "Aadhar ID is not valid")
      .min(12, "Aadhar ID is to short")
      .max(12, "Aadhar ID is to long"),
    // syllabus_id: yup.string().required("Syllabus is required"),
    // class_id: yup.string().required("Class is required"),
    // subject_id: yup.string().required("Subject is required"),
    state: yup.string().required("please select state"),
    city: yup.string().required("please select city"),
    address: yup.string().required("Address is required"),
    pincode: yup.number().positive().required("Pincode is required"),
  });

  const onChangeSelectInputs = (e) => {
    if (e.target.name === "syllabus_id") {
      initialValues.syllabus_id = e.target.value;
      setSyllabusID(e.target.value);
      dispatch(classListData({ syllabus_id: e.target.value }));
    } else if (e.target.name === "class_id") {
      initialValues.class_id = e.target.value;
      setClassID(e.target.value);
      dispatch(subjectListData({ class_id: e.target.value }));
    } else {
      initialValues.subject_id = e.target.value;
      setSubjectID(e.target.value);
    }
  };

  const hideAreafunction = (data) => {
    dispatch(hideArea({ hide_area: data }));
  };

  const schedule_list = Object.entries(getUserData().availability_group).map(
    (item, i) => (
      <CTableRow>
        <CTableDataCell className="tabelCellCustomDesign text-center">
          {item[0].toUpperCase()}
        </CTableDataCell>
        <CTableDataCell>
          {item[1].map((data, index) => (
            <CRow>
              <CCol sm={12} xl={6} lg={6} md={6}>
                <div className="labelDesignScheduleMainDiv m-1">
                  <li className="">
                    <a className="labelDesignScheduleStart">
                      {data.start_time}
                    </a>
                  </li>
                  <li className="">
                    <a className="labelDesignScheduleEnd">{data.end_time}</a>
                  </li>
                </div>
              </CCol>
            </CRow>
          ))}
        </CTableDataCell>
      </CTableRow>
    )
  );

  // var cityList = City.getCitiesOfState('IN', 'GJ');
  const handleStateChange = (event, value) => {
    if (event.target.value) {
      setCityList(City.getCitiesOfState("IN", value.props.isocode));
      setSelectedState(event.target.value);
    }
  };

  function handleCitySelect(event, value) {
    setSelectedCity(event.target.value);
  }

  // // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  // Geocode.setApiKey("AIzaSyBfBL2gMrpGgjX-TI_Z9Nh_v4dOfwgF650");

  const handleMapOnClick = async (lat, long) => {
    // const address = null;
    const address = "Geo tag address comes here";
    // Get address from latitude & longitude.
    // Geocode.fromLatLng(lat, long).then(
    //   (response) => {
    //     address = response.results[0].formatted_address;
    //     console.log(address);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
    await dispatch(
      storeGeotagDetailsUpdate({
        latitude: latitude,
        longitude: longitude,
        geo_location: address,
      })
    );
  };

  const MyMapComponent = compose(
    withProps({
      /**
       * Note: create and replace your own key in the Google console.
       * https://console.developers.google.com/apis/dashboard
       * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
       */
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfBL2gMrpGgjX-TI_Z9Nh_v4dOfwgF650&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: latitude, lng: longitude }}
      onClick={(ev) => {
        setLatitude(ev.latLng.lat());
        setLongitude(ev.latLng.lng());
        handleMapOnClick(ev.latLng.lat(), ev.latLng.lng());
      }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: latitude, lng: longitude }} />
      )}
    </GoogleMap>
  ));

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : store.userdetailsData !== null &&
        store.userdetailsData.user_details !== null &&
        store.userdetailsData.user_details !== undefined ? (
        <div>
          <CustomAlertControl />
          <div className="justify-content-center">
            <div className="col-12">
              <div className="col-12">
                <CCard className="profile-card-list-css">
                  <div className="row">
                    <div className="col-12">
                      <div className="mt-2">
                        <div className="myprofile col-12 text-center">
                          {getUserRole() !== "admin" ? (
                            <div className="postsearchheader">
                              My Profile
                              {getUserRole() === "tutor" &&
                                checkAccessPermission("profile_edit") ? (
                                <CButton
                                  className="d-inline textbook-add-button-css"
                                  onClick={() =>
                                    setProfileVisible(!profilevisible)
                                  }
                                >
                                  Edit
                                </CButton>
                              ) : (
                                ""
                              )}
                              {getUserRole() === "student" &&
                                checkAccessPermission("profile_edit") ? (
                                checkAccessPermission("profile_edit") ? (
                                  <CButton
                                    className="d-inline textbook-add-button-css"
                                    onClick={() =>
                                      setProfileStudentVisible(
                                        !profilestudentvisible
                                      )
                                    }
                                  >
                                    Edit
                                  </CButton>
                                ) : null
                              ) : (
                                ""
                              )}
                              {getUserRole() === "school-tutor" ||
                                getUserRole() === "school-student" ||
                                getUserRole() === "school-admin" ? (
                                <CButton
                                  className="d-inline textbook-add-button-css"
                                  onClick={() =>
                                    setProfileSchoolVisible(
                                      !profileSchoolVisible
                                    )
                                  }
                                >
                                  Edit
                                </CButton>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : (
                            <div className="postsearchheader">My Profile </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CCard>
              </div>
              <div className="row mt-3 profiledetils d-flex flex-fill justify-content-sm-center justify-content-xs-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                <div className="image-profile-div col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                  <CImage
                    fluid
                    className="border img-fluid rounded-circle profile-image position-relative img-thumbnail mx-auto d-block "
                    src={profile}
                  />
                </div>
                <div className="user-profile-detils col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                  <div className="row ml-2">
                    <div className="">
                      <span className="username d-inline">
                        {store.userdetailsData.first_name &&
                          store.userdetailsData.last_name !== null
                          ? store.userdetailsData.first_name +
                          " " +
                          store.userdetailsData.last_name
                          : "--Not Available--"}
                        <h5 className="d-inline">
                          {getUserRole() === "admin" ? "(Tutor-park Admin)" : ""}
                        </h5>
                      </span>
                      {getUserRole() === "tutor" ? (
                        <>
                          <div style={{}}>
                            {store.userdetailsData.user_details.avg_ratings === 0 ?
                              <>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                              </> :
                              store.userdetailsData.user_details.avg_ratings > 1 && store.userdetailsData.user_details.avg_ratings < 2 ?
                                <>
                                  <FontAwesomeIcon className="statecolor" icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                </> :
                                store.userdetailsData.user_details.avg_ratings > 2 && store.userdetailsData.user_details.avg_ratings < 3 ?
                                  <>
                                    <FontAwesomeIcon className="statecolor" icon={faStar} />
                                    <FontAwesomeIcon className="statecolor" icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                  </> :
                                  store.userdetailsData.user_details.avg_ratings > 3 && store.userdetailsData.user_details.avg_ratings < 4 ?
                                    <>
                                      <FontAwesomeIcon className="statecolor" icon={faStar} />
                                      <FontAwesomeIcon className="statecolor" icon={faStar} />
                                      <FontAwesomeIcon className="statecolor" icon={faStar} />
                                      <FontAwesomeIcon icon={faStar} />
                                      <FontAwesomeIcon icon={faStar} />
                                    </> :
                                    store.userdetailsData.user_details.avg_ratings > 4 && store.userdetailsData.user_details.avg_ratings < 5 ?
                                      <>
                                        <FontAwesomeIcon className="statecolor" icon={faStar} />
                                        <FontAwesomeIcon className="statecolor" icon={faStar} />
                                        <FontAwesomeIcon className="statecolor" icon={faStar} />
                                        <FontAwesomeIcon className="statecolor" icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                      </> :
                                      store.userdetailsData.user_details.avg_ratings === 5 ?
                                        <>
                                          <FontAwesomeIcon className="statecolor" icon={faStar} />
                                          <FontAwesomeIcon className="statecolor" icon={faStar} />
                                          <FontAwesomeIcon className="statecolor" icon={faStar} />
                                          <FontAwesomeIcon className="statecolor" icon={faStar} />
                                          <FontAwesomeIcon className="statecolor" icon={faStar} />
                                        </> :
                                        ""
                            }
                          </div>
                        </>)
                        : ""

                      }
                    </div>

                    <div className="maileicondiv align-items-center ">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="icon-color"
                      />
                      &nbsp;
                      {store.userdetailsData.email !== null
                        ? store.userdetailsData.email
                        : "--Not Available--"}
                    </div>
                    <div className="phonecondiv align-items-center ">
                      <FontAwesomeIcon
                        icon={faPhoneAlt}
                        className="icon-color"
                      />
                      &nbsp;
                      {store.userdetailsData.user_details.phone !== null
                        ? store.userdetailsData.user_details.phone
                        : "-Not Available-"}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                  <div>Tutor park Points</div>
                  <span className="mt-3">
                    {store.userdetailsData.user_details.tp_points_balance}
                  </span>
                </div>
                {getUserRole() === "admin" ? (
                  ""
                ) : (
                  <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                    <div>Verified Status</div>
                    {getUserRole() === "school-admin" ||
                      getUserRole() === "school-tutor" ||
                      getUserRole() === "school-student" ? (
                      store.userdetailsData.is_verified === 1 ? (
                        <CProgress height={15} className="mb-3">
                          <CProgressBar
                            className="Progress-bar bg-sucess"
                            value={
                              store.userdetailsData.user_details
                                .tutor_verified_status

                            }
                          />{
                            store.userdetailsData.user_details
                              .tutor_verified_status
                          }
                          %
                        </CProgress>
                      ) : (
                        <CProgress height={7} className="mb-3">
                          <CProgressBar
                            className="Progress-bar bg-success"
                            value={100}
                          />0%
                        </CProgress>
                      )
                    ) : store.userdetailsData.user_details
                      .tutor_verified_status === 0 ? (
                      <CProgress height={15} className="mb-3">
                        <CProgressBar
                          className="progress-bar bg-danger"
                          value={100}
                        >0%</CProgressBar>
                      </CProgress>
                    ) : (
                      <CProgress height={15} className="mb-3">
                        <CProgressBar
                          className="progress-bar bg-success"
                          value={
                            store.userdetailsData.user_details
                              .tutor_verified_status
                          }
                        >
                          {
                            store.userdetailsData.user_details
                              .tutor_verified_status
                          }
                          %
                        </CProgressBar>
                      </CProgress>
                    )}
                  </div>
                )}
              </div>
              <div className="row mt-2 mb-2">
                <div className="col-12">
                  <CCard>
                    <CCardHeader className="cardtitle fw-bold text-dark">
                      Personal Details
                    </CCardHeader>
                    <CCardBody>
                      <div className="row">
                        <div className="mb-2 fw-bold col">TP ID</div>
                        <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          {store.userdetailsData.user_details.tp_id &&
                            store.userdetailsData.user_details.tp_id !== null
                            ? store.userdetailsData.user_details.tp_id
                            : "--Not Available--"}
                        </div>
                        <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"></div>
                        <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"></div>
                      </div>
                      <div className="row">
                        <div className="mb-2 fw-bold col">Full Name</div>
                        <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          {store.userdetailsData.first_name &&
                            store.userdetailsData.last_name !== null
                            ? store.userdetailsData.first_name +
                            " " +
                            store.userdetailsData.last_name
                            : "--Not Available--"}
                        </div>

                        <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          Area
                        </div>
                        <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          {store.userdetailsData.user_details.area !== null
                            ? store.userdetailsData.user_details.area
                            : "--Not Available--"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          Gender
                        </div>
                        <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          {store.userdetailsData.user_details.gender !== null
                            ? store.userdetailsData.user_details.gender
                            : "--Not Available--"}
                        </div>
                        <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          City
                        </div>
                        <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          {store.userdetailsData.user_details.city !== null
                            ? store.userdetailsData.user_details.city
                            : "--Not Available--"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          Date of Birth
                        </div>
                        <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          {store.userdetailsData.user_details.birth_date !==
                            null
                            ? store.userdetailsData.user_details.birth_date
                            : "--Not Available--"}
                        </div>
                        <div
                          sm={6}
                          md={6}
                          lg={3}
                          xl={3}
                          className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"
                        >
                          State
                        </div>
                        <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          {store.userdetailsData.user_details.state !== null
                            ? store.userdetailsData.user_details.state
                            : "--Not Available--"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          Nationality
                        </div>
                        <div
                          sm={6}
                          md={6}
                          lg={3}
                          xl={3}
                          className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"
                        >
                          {store.userdetailsData.user_details.nationality !==
                            null
                            ? store.userdetailsData.user_details.nationality
                            : "--Not Available--"}
                        </div>
                        <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          Country
                        </div>
                        <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          {store.userdetailsData.user_details.country !== null
                            ? store.userdetailsData.user_details.country
                            : "--Not Available--"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          Aadhar Id
                        </div>
                        <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          {store.userdetailsData.user_details.aadhar_id !== null
                            ? store.userdetailsData.user_details.aadhar_id
                            : "--Not Available--"}
                        </div>
                        {getUserRole() == "school-student" ? (
                          <>
                            <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                              Syllabus
                            </div>
                            <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                              {store.userdetailsData.user_details
                                .syllabus_name !== null
                                ? store.userdetailsData.user_details
                                  .syllabus_name
                                : "--Not Available--"}
                            </div>
                            <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                              Class
                            </div>
                            <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                              {store.userdetailsData.user_details.class_name !==
                                null
                                ? store.userdetailsData.user_details.class_name
                                : "--Not Available--"}
                            </div>
                            <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                              Division
                            </div>
                            <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                              {store.userdetailsData.user_details
                                .school_class_division_name !== undefined
                                ? store.userdetailsData.user_details
                                  .school_class_division_name
                                : "--Not Available--"}
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        {getUserRole() === "school-tutor" ||
                          getUserRole() === "school-student" ||
                          getUserRole() == "school-admin" ? (
                          ""
                        ) : (
                          <>
                            <div className="mb-2 fw-bold col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                              Geo Tag My Self
                            </div>
                            <div className="mb-2 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                              {store.userdetailsData.user_details
                                .geo_location !== null
                                ? store.userdetailsData.user_details
                                  .geo_location
                                : "--Not Available--"}
                            </div>

                            <div className="row">
                              {store.userdetailsData.user_details.hide_area ===
                                false ? (
                                <div className="col align-item-end">
                                  <div className="mb-3 col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                    <Controls.Button
                                      type="submit"
                                      text="Show Area"
                                      onClick={() => hideAreafunction(true)}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="col align-item-end">
                                  <div className="mb-3 col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                    <Controls.Button
                                      type="submit"
                                      text="Hide Area"
                                      onClick={() => hideAreafunction(false)}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            <div style={{ width: "100%" }} className="mb-3">
                              <MyMapComponent isMarkerShown />
                            </div>
                          </>
                        )}
                      </div>
                    </CCardBody>
                  </CCard>
                </div>
              </div>
              {getUserRole() === "tutor" ? (
                <div>
                  <CRow className="">
                    <CCol className="mt-3" sm={12} md={12} lg={6} xl={6}>
                      <CCardHeader className="cardtitle fw-bold text-dark">
                        Education Details
                      </CCardHeader>
                      {store.userdetailsData.user_details.education.length !==
                        0 ? (
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
                            {store.userdetailsData.user_details.education.map(
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
                          <CCardText style={{ textAlign: "center" }}>
                            N/A
                          </CCardText>
                        </CTable>
                      )}
                    </CCol>
                    <CCol className="mt-3" sm={12} md={12} lg={6} xl={6}>
                      <CCardHeader className="cardtitle fw-bold text-dark">
                        Experience Details
                      </CCardHeader>
                      {store.userdetailsData.user_details.experience.length !==
                        0 ? (
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
                            {store.userdetailsData.user_details.experience.map(
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
                          <CCardText style={{ textAlign: "center" }}>
                            N/A
                          </CCardText>
                        </CTable>
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-3 mb-3" sm={12} md={12} lg={12} xl={12}>
                      <CCard>
                        <CCardHeader className="cardtitle fw-bold text-dark">
                          Can Teach
                        </CCardHeader>
                        {store.userdetailsData.availability.length !== 0 ? (
                          <CCardBody>
                            <CTable borderless responsive>
                              <CTableHead>
                                <CTableRow>
                                  <CTableHeaderCell scope="col">
                                    Preferred Board
                                  </CTableHeaderCell>
                                  <CTableDataCell>
                                    {getUserData().user_details.syllabus_name ??
                                      "--Not Available--"}
                                  </CTableDataCell>
                                  <CTableHeaderCell scope="col">
                                    Mode of classes
                                  </CTableHeaderCell>
                                  <CTableDataCell>
                                    {getUserData().user_details
                                      .mode_of_teaching ?? "--Not Available--"}
                                  </CTableDataCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                <CTableRow>
                                  <CTableHeaderCell scope="row">
                                    Subject
                                  </CTableHeaderCell>
                                  <CTableDataCell>
                                    {getUserData().user_details.subject_name ??
                                      "--Not Available--"}
                                  </CTableDataCell>
                                  <CTableHeaderCell scope="col">
                                    Cost per hour
                                  </CTableHeaderCell>
                                  <CTableDataCell>
                                    {getUserData().user_details
                                      .online_cost_per_hour ??
                                      "--Not Available--"}{" "}
                                    INR
                                  </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                  <CTableHeaderCell scope="row">
                                    Standard
                                  </CTableHeaderCell>
                                  <CTableDataCell>
                                    {getUserData().user_details.class_name ??
                                      "--Not Available--"}
                                  </CTableDataCell>
                                  <CTableHeaderCell scope="col">
                                    Social Profile Links
                                  </CTableHeaderCell>
                                  <CTableDataCell>
                                    <a href={getUserData().user_details.li_url}>
                                      @Linkedin
                                    </a>
                                    , { }
                                    <a href={getUserData().user_details.fb_url}>
                                      @FB
                                    </a>
                                    , { }
                                    <a href={getUserData().user_details.tw_url}>
                                      @Twitter
                                    </a>
                                    , { }
                                    <a
                                      href={
                                        getUserData().user_details.insta_url
                                      }
                                    >
                                      @Insta
                                    </a>
                                  </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                  <CTableHeaderCell scope="row">
                                    Topic
                                  </CTableHeaderCell>
                                  <CTableDataCell>
                                    {getUserData().user_details.topic ??
                                      "--Not Available--"}
                                  </CTableDataCell>
                                </CTableRow>
                              </CTableBody>
                            </CTable>

                            <CTable
                              style={{ backgroundColor: "#efefef" }}
                              responsive
                            >
                              <CTableHead>
                                <CTableRow>
                                  <CTableHeaderCell
                                    width="20%"
                                    scope="col"
                                    className="text-center tabelCellCustomDesignHeader"
                                  >
                                    Day
                                  </CTableHeaderCell>
                                  <CTableHeaderCell
                                    scope="col"
                                    className="text-center"
                                  >
                                    Schedule
                                  </CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>{schedule_list}</CTableBody>
                            </CTable>
                          </CCardBody>
                        ) : (
                          <CTable bordered responsive>
                            <CCardText style={{ textAlign: "center" }}>
                              N/A
                            </CCardText>
                          </CTable>
                        )}
                      </CCard>
                    </CCol>
                  </CRow>
                </div>
              ) : (
                ""
              )}
              {getUserRole() === "school-tutor" ||
                getUserRole() === "school-student" ||
                getUserRole() === "school-admin" ||
                getUserRole() === "tutor" ||
                getUserRole() === "student" ? (
                <div>
                  <div className="row mt-3">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      {store.userdetailsData.school !== "" ? (
                        <>
                          <CCard className="mb-2">
                            <CCardHeader className="cardtitle fw-bold">
                              School Details
                            </CCardHeader>
                            {store.userdetailsData.school === null ? (
                              <NoDataContainer module="School" />
                            ) : (
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <CCard className="card p-3 assigncard mt-3 mb-3">
                                    <div className="row ">
                                      <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3">
                                        <CCardImage
                                          src={
                                            store.userdetailsData.school
                                              .image !== null
                                              ? store.userdetailsData.school
                                                .image
                                              : profile
                                          }
                                          className="img-fluid rounded mx-auto d-flex serchcourse-image"
                                        />
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-7">
                                        <div>
                                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 card-title font-weight-bold text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                                            {store.userdetailsData.school
                                              .school_name !== null
                                              ? store.userdetailsData.school
                                                .school_name
                                              : "--Not Available--"}
                                          </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                          <div className="row">
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 font-weight-bold">
                                              Registration Number
                                            </div>
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                                              {store.userdetailsData.school
                                                .registration_no !== null
                                                ? store.userdetailsData.school
                                                  .registration_no
                                                : "--Not Available--"}
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 font-weight-bold">
                                              Phone Number
                                            </div>
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                              {store.userdetailsData.school
                                                .phone !== null
                                                ? store.userdetailsData.school
                                                  .phone
                                                : "--Not Available--"}
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 font-weight-bold">
                                              Pin code
                                            </div>
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                              {store.userdetailsData.school
                                                .pincode !== null
                                                ? store.userdetailsData.school
                                                  .pincode
                                                : "--Not Available--"}
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 font-weight-bold">
                                              City
                                            </div>
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                              {store.userdetailsData.school
                                                .city !== null
                                                ? store.userdetailsData.school
                                                  .city
                                                : "--Not Available--"}
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 font-weight-bold">
                                              Mobile number
                                            </div>
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                              {store.userdetailsData.school
                                                .mobile !== null
                                                ? store.userdetailsData.school
                                                  .mobile
                                                : "--Not Available--"}
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 font-weight-bold">
                                              Email address
                                            </div>
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                              {store.userdetailsData.school
                                                .email !== null
                                                ? store.userdetailsData.school
                                                  .email
                                                : "--Not Available--"}
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 font-weight-bold">
                                              School Principal{" "}
                                            </div>
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                              {store.userdetailsData.school
                                                .principal !== null
                                                ? store.userdetailsData.school
                                                  .principal
                                                : "Not Available"}
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 font-weight-bold">
                                              School Vice Principal{" "}
                                            </div>
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                              {store.userdetailsData.school
                                                .vice_principal !== null
                                                ? store.userdetailsData.school
                                                  .vice_principal
                                                : "Not Available"}
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 font-weight-bold">
                                              School Incharge{" "}
                                            </div>
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                              {store.userdetailsData.school
                                                .incharge !== null
                                                ? store.userdetailsData.school
                                                  .incharge
                                                : "Not Available"}
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 font-weight-bold">
                                              School Working Year start Date{" "}
                                            </div>
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                                              {store.userdetailsData.school
                                                .working_start_date !== null
                                                ? store.userdetailsData.school
                                                  .working_start_date
                                                : "Not Available"}
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 font-weight-bold">
                                              School Working Year End Date{" "}
                                            </div>
                                            <div className="mb-2 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                              {store.userdetailsData.school
                                                .working_end_date !== null
                                                ? store.userdetailsData.school
                                                  .working_end_date
                                                : "Not Available"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-2 justify-content-center">
                                        <CRow className="text-end text-col-center text-sm-center text-md-start text-lg-start text-xl-start"></CRow>
                                      </div>
                                    </div>
                                  </CCard>
                                </div>
                              </div>
                            )}
                          </CCard>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {getUserRole() === "school-tutor" ? (
                <div>
                  <CCard className=" mt-3 mb-3">
                    <CCardHeader className="cardtitle fw-bold">
                      My Schedule
                    </CCardHeader>
                    <CCardBody>
                      <MaterialTable
                        title=""
                        data={schoolshedule.school_schedule}
                        columns={columns}
                        options={{
                          search: false,
                          selection: false,
                          filtering: false,
                          searchFieldAlignment: "right",
                          pageSize: 5,
                          pageSizeOptions: [5, 10, 15],
                          headerStyle: {
                            top: 0,
                            backgroundColor: "#DEDDF4",
                            color: "#444346",
                            fontWeight: "600",
                            fontSize: "15px",
                          },
                          cellStyle: {
                            Width: "20px",
                            overflow: "Hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "50px",
                            whiteSpace: "nowrap",
                          },
                        }}
                      />
                    </CCardBody>
                  </CCard>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* update profile modal Design. */}

      <CModal
        size="xl"
        visible={profilevisible}
        onDismiss={() => setProfileVisible(false)}
      >
        <CModalHeader
          className="tutorviewmodalheader"
          onDismiss={() => setProfileVisible(false)}
        >
          <CModalTitle>Update Profile</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="p-3">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                console.log(values)
                values.birth_date = moment(birth_date).format("YYYY-MM-DD");
                values.state = selectedState;
                values.city = selectedCity;
                values.syllabus_id = syllabusID;
                values.class_id = classID;
                values.subject_id = subjectID;
                // if(getUserRole())
                // values.role = getUserRole();
                // dispatch(updateUserProfile(values));
                // setProfileVisible(false);
                if (
                  getUserRole() === "school-tutor" ||
                  getUserRole() === "school-student" ||
                  getUserRole() === "school-admin"
                ) {
                  values.role = getUserRole();
                  values.user_id = getUserData().id;
                  dispatch(updateOtherUser(values));
                } else {
                  values.role = getUserRole();
                  dispatch(updateUserProfile(values));
                }
                setProfileVisible(false);
                dispatch(userdetails({ email: getUserData().email }));
              }}

            >
              {({ values, errors, isSubmitting, isValid }) => (
                <Form autoComplete="off">
                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="first_name"
                        component={TextField}
                        variant="outlined"
                        label="First Name *"
                      />
                    </CCol>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="last_name"
                        component={TextField}
                        variant="outlined"
                        label="Last Name *"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="phone"
                        component={TextField}
                        variant="outlined"
                        label="Mobile *"
                      />
                    </CCol>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="aadhar_id"
                        component={TextField}
                        variant="outlined"
                        label="Aadhar ID *"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        label="Gender *"
                        component={RadioGroup}
                        name="gender"
                        row
                      >
                        <FormLabel component="legend">Gender</FormLabel>
                        {genderItems.map((item) => (
                          <FormControlLabel
                            key={item.id}
                            value={item.id}
                            control={<Radio />}
                            label={item.title}
                          />
                        ))}
                      </Field>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="nationality"
                        component={TextField}
                        variant="outlined"
                        label="Nationality"
                        disabled={true}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Syllabus you can Teach</InputLabel>
                        <Field
                          component={Select}
                          name="syllabus_id"
                          label="Syllabus you can Teach *"
                          value={syllabusID}
                          onChange={(e) => onChangeSelectInputs(e)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {DropDown.syllabusList.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>

                      </FormControl>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Class</InputLabel>
                        <Field
                          component={Select}
                          name="class_id"
                          label="Class *"
                          value={classID}
                          onChange={(e) => onChangeSelectInputs(e)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {DropDown.classList.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                        
                      </FormControl>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Subject</InputLabel>
                        <Field
                          component={Select}
                          name="subject_id"
                          label="Subject *"
                          value={subjectID}
                          onChange={(e) => onChangeSelectInputs(e)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {DropDown.subjectList.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="topic"
                        component={TextField}
                        variant="outlined"
                        label="Topic *"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Mode Of Teaching</InputLabel>
                        <Field
                          component={Select}
                          name="mode_of_teaching"
                          label="Mode Of Teaching *"
                        >
                          {getAllTeachingMode().map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="online_cost_per_hour"
                        component={TextField}
                        variant="outlined"
                        label="Cost Per Hour *"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="fb_url"
                        component={TextField}
                        variant="outlined"
                        label="Facebook URL"
                      />
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="li_url"
                        component={TextField}
                        variant="outlined"
                        label="Linkedin URL"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="tw_url"
                        component={TextField}
                        variant="outlined"
                        label="Twitter URL"
                      />
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="insta_url"
                        component={TextField}
                        variant="outlined"
                        label="Instagram URL"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Languages</InputLabel>
                        <Field
                          component={Select}
                          name="languages"
                          label="Languages *"
                          multiple
                        >
                          {getAllLanguages().map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        libInstance={moment}
                      >
                        <KeyboardDatePicker
                          disableFuture={true}
                          maxDate={new Date()}
                          id="date-picker-dialog"
                          label="Birth Date"
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          value={birth_date}
                          // onChange={value => props.setFieldValue("date", value)}
                          onChange={(value) => setBirthDate(value)}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </CCol>
                  </CRow>

                  <div className="d-flex flex-row mt-3">
                    <div className="p-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    <div className="p-2">
                      <h4 className="d-inline iconstyle p-0">
                        Address Details
                      </h4>
                    </div>
                  </div>

                  <CDropdownDivider className="mb-2" />

                  <CRow>
                    <CCol sm={12} md={12} lg={12} xl={12} className="mt-3">
                      <Field
                        multiline
                        name="address"
                        component={TextField}
                        variant="outlined"
                        label="Address *"
                        rows="3"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Select State</InputLabel>
                        <Field
                          component={Select}
                          name="state"
                          label="Select State *"
                          value={selectedState}
                          onChange={(e, value) => handleStateChange(e, value)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {stateList.map((item) => (
                            <MenuItem
                              key={item.name}
                              value={item.name}
                              isocode={item.isoCode}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      {selectedState === "" ? (
                        ""
                      ) : (
                        <FormControl variant="outlined">
                          <InputLabel>Select City</InputLabel>
                          <Field
                            component={Select}
                            name="city"
                            label="Select City *"
                            value={selectedCity}
                            onChange={(e, value) => handleCitySelect(e, value)}
                          >
                            <MenuItem value="">None</MenuItem>
                            {cityList.map((item) => (
                              <MenuItem
                                key={item.name}
                                value={item.name}
                                isocode={item.isoCode}
                              >
                                {item.name}
                              </MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      )}
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="pincode"
                        component={TextField}
                        variant="outlined"
                        label="Pincode *"
                      />
                    </CCol>
                  </CRow>

                  <div className="d-flex flex-row mt-3">
                    <div className="p-2">
                      <FontAwesomeIcon icon={faBook} />
                    </div>
                    <div className="p-2">
                      <h4 className="d-inline iconstyle p-0">
                        Education Details
                      </h4>
                    </div>
                  </div>

                  <CDropdownDivider className="mb-4" />

                  <FieldArray name="education">
                    {({ push, remove }) => (
                      <React.Fragment>
                        {values.education.map((_, index) => (
                          <CRow key={index}>
                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-3">
                              <Field
                                fullWidth
                                name={`education.${index}.degree`}
                                component={TextField}
                                label="Board/University *"
                                variant="outlined"
                              />
                            </CCol>
                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-3">
                              <Field
                                fullWidth
                                name={`education[${index}].college`}
                                component={TextField}
                                label="College/School *"
                                variant="outlined"
                              />
                            </CCol>
                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-3">
                              <Field
                                fullWidth
                                name={`education[${index}].place`}
                                component={TextField}
                                label="Place *"
                                variant="outlined"
                              />
                            </CCol>

                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-3">
                              <CButton
                                disabled={values.education.length === 1}
                                onClick={() => remove(index)}
                                className="btn rounded-circle m-1 roundshap-button m-2"
                              >
                                <FontAwesomeIcon icon={faMinusCircle} />
                              </CButton>
                              <CButton
                                disabled={isSubmitting}
                                onClick={() => push(emptyEducation)}
                                className="btn rounded-circle m-1 roundshap-button m-2"
                              >
                                <FontAwesomeIcon icon={faPlusCircle} />
                              </CButton>
                            </CCol>
                          </CRow>
                        ))}
                      </React.Fragment>
                    )}
                  </FieldArray>

                  <div className="d-flex flex-row">
                    <div className="p-2">
                      <FontAwesomeIcon icon={faVial} />
                    </div>
                    <div className="p-2">
                      <h4 className="d-inline iconstyle p-0">
                        Experience Details
                      </h4>
                    </div>
                  </div>

                  <CDropdownDivider className="mb-4" />

                  <FieldArray name="experience">
                    {({ push, remove }) => (
                      <React.Fragment>
                        {values.experience.map((_, index) => (
                          <CRow key={index}>
                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-3">
                              <Field
                                fullWidth
                                name={`experience.${index}.organization`}
                                component={TextField}
                                label="Organization *"
                                variant="outlined"
                              />
                            </CCol>
                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-3">
                              <Field
                                fullWidth
                                name={`experience[${index}].designation`}
                                component={TextField}
                                label="Designation *"
                                variant="outlined"
                              />
                            </CCol>
                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-3">
                              <Field
                                fullWidth
                                name={`experience[${index}].experience_month`}
                                component={TextField}
                                label="Experience (In Months) *"
                                variant="outlined"
                                type="number"
                              />
                            </CCol>

                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-3">
                              <CButton
                                disabled={values.experience.length === 1}
                                onClick={() => remove(index)}
                                className="btn rounded-circle m-1 roundshap-button m-2"
                              >
                                <FontAwesomeIcon icon={faMinusCircle} />
                              </CButton>
                              <CButton
                                disabled={isSubmitting}
                                onClick={() => push(emptyExperience)}
                                className="btn rounded-circle m-1 roundshap-button m-2"
                              >
                                <FontAwesomeIcon icon={faPlusCircle} />
                              </CButton>
                            </CCol>
                          </CRow>
                        ))}
                      </React.Fragment>
                    )}
                  </FieldArray>

                  {/* availability block */}

                  <div className="d-flex flex-row">
                    <div className="p-2">
                      <FontAwesomeIcon icon={faVihara} />
                    </div>
                    <div className="p-2">
                      <h4 className="d-inline iconstyle p-0">
                        Availability Details
                      </h4>
                    </div>
                  </div>

                  <CDropdownDivider className="mb-4" />

                  <FieldArray name="availability">
                    {({ push, remove }) => (
                      <React.Fragment>
                        {values.availability.map((_, index) => (
                          <CRow key={index}>
                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-3">
                              <FormControl variant="outlined">
                                <InputLabel>Day</InputLabel>
                                <Field
                                  component={Select}
                                  name={`availability.${index}.day`}
                                  label="Day *"
                                >
                                  {getAllDays().map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                                </Field>
                              </FormControl>
                            </CCol>
                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-2">
                              <Field
                                fullWidth
                                name={`availability[${index}].start_time`}
                                component={TextField}
                                label="Start Time *"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                  ),
                                }}
                                variant="outlined"
                                type="time"
                              />
                            </CCol>
                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-3">
                              <Field
                                fullWidth
                                name={`availability[${index}].end_time`}
                                component={TextField}
                                label="End Time *"
                                variant="outlined"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                  ),
                                }}
                                type="time"
                              />
                            </CCol>

                            <CCol sm={3} md={3} lg={3} xl={3} className="mb-3">
                              <CButton
                                disabled={values.availability.length === 1}
                                onClick={() => remove(index)}
                                className="btn rounded-circle m-1 roundshap-button m-2"
                              >
                                <FontAwesomeIcon icon={faMinusCircle} />
                              </CButton>
                              <CButton
                                disabled={isSubmitting}
                                onClick={() => push(emptyAvailability)}
                                className="btn rounded-circle m-1 roundshap-button m-2"
                              >
                                <FontAwesomeIcon icon={faPlusCircle} />
                              </CButton>
                            </CCol>
                          </CRow>
                        ))}
                      </React.Fragment>
                    )}
                  </FieldArray>
                  <CRow>
                    <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
                      <div className="d-inline">
                        <Controls.Button
                          type="submit"
                          text="Submit"
                          className="m-1"
                        />
                      </div>
                      <div className="d-inline">
                        <Button
                          variant="contained"
                          className="m-1"
                          size="large"
                          color="default"
                          onClick={() => setProfileVisible(false)}
                        >
                          Close
                        </Button>
                      </div>
                    </CCol>
                  </CRow>
                </Form>
              )}
            </Formik>
          </CRow>
        </CModalBody>
      </CModal>

      {/* update profile from student side modal Design. */}

      <CModal
        size="xl"
        visible={profilestudentvisible}
        onDismiss={() => setProfileStudentVisible(false)}
      >
        <CModalHeader
          className="tutorviewmodalheader"
          onDismiss={() => setProfileStudentVisible(false)}
        >
          <CModalTitle>Update Profile</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="p-3">
            <Formik
              initialValues={initialValuesForStudent}
              validationSchema={validationSchemaForStudent}
              onSubmit={async (values) => {

                values.birth_date = moment(birth_date).format("YYYY-MM-DD");
                values.state = selectedState;
                values.city = selectedCity;
                values.syllabus_id = syllabusID;
                values.class_id = classID;
                values.subject_id = subjectID;
                if (
                  getUserRole() === "school-tutor" ||
                  getUserRole() === "school-student" ||
                  getUserRole() === "school-admin"
                ) {
                  values.role = getUserRole();
                  values.user_id = getUserData().id;
                  dispatch(updateOtherUser(values));
                } else {
                  values.role = getUserRole();
                  dispatch(updateUserProfile(values));
                }
                setProfileStudentVisible(false);
                dispatch(userdetails({ email: getUserData().email }));
              }}
            >
              {({ values, errors, isSubmitting, isValid }) => (
                <Form autoComplete="off">
                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="first_name"
                        component={TextField}
                        variant="outlined"
                        label="First Name"
                      />
                    </CCol>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="last_name"
                        component={TextField}
                        variant="outlined"
                        label="Last Name"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="phone"
                        component={TextField}
                        variant="outlined"
                        label="Mobile"
                      />
                    </CCol>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="aadhar_id"
                        component={TextField}
                        variant="outlined"
                        label="Aadhar ID"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        label="Gender"
                        component={RadioGroup}
                        name="gender"
                        row
                      >
                        <FormLabel component="legend">Gender</FormLabel>
                        {genderItems.map((item) => (
                          <FormControlLabel
                            key={item.id}
                            value={item.id}
                            control={<Radio />}
                            label={item.title}
                          />
                        ))}
                      </Field>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="nationality"
                        component={TextField}
                        variant="outlined"
                        label="Nationality"
                        disabled={true}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Syllabus</InputLabel>
                        <Field
                          component={Select}
                          name="syllabus_id"
                          label="Syllabus"
                          value={syllabusID}
                          onChange={(e) => onChangeSelectInputs(e)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {DropDown.syllabusList.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Class</InputLabel>
                        <Field
                          component={Select}
                          name="class_id"
                          label="Class"
                          value={classID}
                          onChange={(e) => onChangeSelectInputs(e)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {DropDown.classList.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Subject</InputLabel>
                        <Field
                          component={Select}
                          name="subject_id"
                          label="Subject"
                          value={subjectID}
                          onChange={(e) => onChangeSelectInputs(e)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {DropDown.subjectList.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        libInstance={moment}
                      >
                        <KeyboardDatePicker
                          disableFuture={true}
                          maxDate={new Date()}
                          id="date-picker-dialog"
                          label="Birth Date"
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          value={birth_date}
                          onChange={(value) => setBirthDate(value)}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </CCol>
                  </CRow>

                  <div className="d-flex flex-row mt-3">
                    <div className="p-2">
                      <FontAwesomeIcon icon={faAddressCard} />
                    </div>
                    <div className="p-2">
                      <h6 className="d-inline iconstyle p-0">
                        Address Details
                      </h6>
                    </div>
                  </div>

                  <CDropdownDivider className="mb-2" />

                  <CRow>
                    <CCol sm={12} md={12} lg={12} xl={12} className="mt-3">
                      <Field
                        multiline
                        name="address"
                        component={TextField}
                        variant="outlined"
                        label="Address *"
                        rows="3"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Select State</InputLabel>
                        <Field
                          component={Select}
                          name="state"
                          label="Select State"
                          value={selectedState}
                          onChange={(e, value) => handleStateChange(e, value)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {stateList.map((item) => (
                            <MenuItem
                              key={item.name}
                              value={item.name}
                              isocode={item.isoCode}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Select City</InputLabel>
                        <Field
                          component={Select}
                          name="city"
                          label="Select City"
                          value={selectedCity}
                          onChange={(e, value) => handleCitySelect(e, value)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {cityList.map((item) => (
                            <MenuItem
                              key={item.name}
                              value={item.name}
                              isocode={item.isoCode}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="pincode"
                        component={TextField}
                        variant="outlined"
                        label="Pincode *"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="m-2">
                      <div className="p-2 d-inline">
                        <Controls.Button type="submit" text="Submit" />
                      </div>

                      <Button
                        variant="contained"
                        size="large"
                        color="default"
                        onClick={() => setProfileStudentVisible(false)}
                      >
                        Close
                      </Button>
                    </CCol>
                  </CRow>
                </Form>
              )}
            </Formik>
          </CRow>
        </CModalBody>
      </CModal>

      <CModal
        size="xl"
        visible={profileSchoolVisible}
        onDismiss={() => setProfileSchoolVisible(false)}
      >
        <CModalHeader
          className="tutorviewmodalheader"
          onDismiss={() => setProfileSchoolVisible(false)}
        >
          <CModalTitle>Update Profile</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="p-3">
            <Formik
              initialValues={initialValuesForStudent}
              onSubmit={async (values) => {
                values.birth_date = moment(birth_date).format("YYYY-MM-DD");
                values.state = selectedState;
                values.city = selectedCity;
                values.syllabus_id = syllabusID;
                values.class_id = classID;
                values.subject_id = subjectID;

                values.role = getUserRole();

                values.user_id = getUserData().id;
                dispatch(updateOtherUser(values));

                setProfileSchoolVisible(false);
                dispatch(userdetails({ email: getUserData().email }));
              }}
            >
              {({ values, errors, isSubmitting, isValid }) => (
                <Form autoComplete="off">
                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="first_name"
                        component={TextField}
                        variant="outlined"
                        label="First Name"
                      />
                    </CCol>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="last_name"
                        component={TextField}
                        variant="outlined"
                        label="Last Name"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="phone"
                        component={TextField}
                        variant="outlined"
                        label="Mobile"
                      />
                    </CCol>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="aadhar_id"
                        component={TextField}
                        variant="outlined"
                        label="Aadhar ID"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        label="Gender"
                        component={RadioGroup}
                        name="gender"
                        row
                      >
                        <FormLabel component="legend">Gender</FormLabel>
                        {genderItems.map((item) => (
                          <FormControlLabel
                            key={item.id}
                            value={item.id}
                            control={<Radio />}
                            label={item.title}
                          />
                        ))}
                      </Field>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="nationality"
                        component={TextField}
                        variant="outlined"
                        label="Nationality"
                        disabled={true}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Syllabus</InputLabel>
                        <Field
                          component={Select}
                          name="syllabus_id"
                          label="Syllabus"
                          value={syllabusID}
                          onChange={(e) => onChangeSelectInputs(e)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {DropDown.syllabusList.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Class</InputLabel>
                        <Field
                          component={Select}
                          name="class_id"
                          label="Class"
                          value={classID}
                          onChange={(e) => onChangeSelectInputs(e)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {DropDown.classList.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Subject</InputLabel>
                        <Field
                          component={Select}
                          name="subject_id"
                          label="Subject"
                          value={subjectID}
                          onChange={(e) => onChangeSelectInputs(e)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {DropDown.subjectList.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        libInstance={moment}
                      >
                        <KeyboardDatePicker
                          disableFuture={true}
                          maxDate={new Date()}
                          id="date-picker-dialog"
                          label="Birth Date"
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          value={birth_date}
                          onChange={(value) => setBirthDate(value)}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </CCol>
                  </CRow>

                  <div className="d-flex flex-row mt-3">
                    <div className="p-2">
                      <FontAwesomeIcon icon={faAddressCard} />
                    </div>
                    <div className="p-2">
                      <h6 className="d-inline iconstyle p-0">
                        Address Details
                      </h6>
                    </div>
                  </div>

                  <CDropdownDivider className="mb-2" />

                  <CRow>
                    <CCol sm={12} md={12} lg={12} xl={12} className="mt-3">
                      <Field
                        multiline
                        name="address"
                        component={TextField}
                        variant="outlined"
                        label="Address *"
                        rows="3"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Select State</InputLabel>
                        <Field
                          component={Select}
                          name="state"
                          label="Select State"
                          value={selectedState}
                          onChange={(e, value) => handleStateChange(e, value)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {stateList.map((item) => (
                            <MenuItem
                              key={item.name}
                              value={item.name}
                              isocode={item.isoCode}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>

                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <FormControl variant="outlined">
                        <InputLabel>Select City</InputLabel>
                        <Field
                          component={Select}
                          name="city"
                          label="Select City"
                          value={selectedCity}
                          onChange={(e, value) => handleCitySelect(e, value)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {cityList.map((item) => (
                            <MenuItem
                              key={item.name}
                              value={item.name}
                              isocode={item.isoCode}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                      <Field
                        fullWidth
                        name="pincode"
                        component={TextField}
                        variant="outlined"
                        label="Pincode *"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="m-2">
                      <div className="p-2 d-inline">
                        <Controls.Button type="submit" text="Submit" />
                      </div>

                      <Button
                        variant="contained"
                        size="large"
                        color="default"
                        onClick={() => setProfileStudentVisible(false)}
                      >
                        Close
                      </Button>
                    </CCol>
                  </CRow>
                </Form>
              )}
            </Formik>
          </CRow>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default MyProfile;
