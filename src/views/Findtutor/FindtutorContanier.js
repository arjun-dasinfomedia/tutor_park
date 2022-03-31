import React, { useEffect, useState } from "react";
import {
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CTable,
  CTableHead,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CTooltip,
  CCardText,
  CCard,
  CRow,
  CCol,
  CButton,
  CFormSelect,
  CFormInput,
  CCardImage,
  CProgress,
  CProgressBar,
  CCardHeader,
} from "@coreui/react";
import { NavLink } from "react-router-dom";
import { getAllTeachingMode } from "../../utility/utils";
import { useSelector, useDispatch } from "react-redux";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faIdCard,
  faEye,
  faBook,
  faPaperPlane,
  faPhoneAlt,
  faCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
import {
  retrieveTutorListUsingFilter,
  tutorList,
  viewTutorDetails,
  tutorDirectMessage,
} from "./FindtutorAction";
import {
  subjectListData,
  syllabusListData,
  classListData,
} from "../../redux/actions/dropdowns/index";
import CardText from "reactstrap/lib/CardText";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";

const PER_PAGE = 10;

const Findtutor = () => {

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [viewvisible, setViewVisible] = useState(false);
  const [messagevisible, setMessageVisible] = useState(false);
  const [callvisible, setCallVisible] = useState(false);
  const DropDown = useSelector((state) => state.dropdowns);
  const [tutorsearch, setTutorSearch] = useState("");
  const Tutor = useSelector((state) => state.findTutor);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [mobileNumber, setmobileNumber] = useState("");

  const [syllabusId, setSyllabusId] = useState("");
  const [classId, setClasssId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [mode, setMode] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [messageData, setMessageData] = useState(null);

  const TutorSeachData = (e) => {
    setTutorSearch(e.target.value)
  }

  const genderData = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "other", name: "Other" },
  ];

  useEffect(async () => {
    showLoader();
    await dispatch(tutorList());
    dispatch(syllabusListData());
    setLoading(false);
    hideLoader();
  }, []);

  const initialFValues = {
    message: "",
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("message" in fieldValues)
      temp.message = fieldValues.message ? "" : "Please enter message.";

    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      let data = new FormData();

      data.append("message", values.message);
      data.append("to", messageData);

      dispatch(tutorDirectMessage(data));
      resetForm();
      setMessageVisible(false);
    }
  };

  const messageView = (data) => {
    setMessageVisible(true);
    setMessageData(data);
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const viewTutorData = (email) => {
    setViewVisible(true)
    dispatch(viewTutorDetails({ email: email }));
  };


  const pageCount = Math.ceil(Tutor.data.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  // code start for filter
  const handleOnInputChange = (e) => {
    if (e.target.name == "city") setCity(e.target.value);
    else if (e.target.name == "experience") setExperience(e.target.value);
  };

  const onDropDownValueChange = (event) => {
    if (event.target.name == "syllabus_id") {
      setSyllabusId(event.target.value);
      dispatch(classListData({ syllabus_id: event.target.value }));
    } else if (event.target.name == "class_id") {
      setClasssId(event.target.value);
      dispatch(subjectListData({ class_id: event.target.value }));
    } else if (event.target.name == "mode") {
      setMode(event.target.value);
    } else if (event.target.name == "gender") {
      setGender(event.target.value);
    } else {
      setSubjectId(event.target.value);
    }
  };

  const handleFilterSubmit = async () => {
    await dispatch(
      retrieveTutorListUsingFilter({
        city: city,
        syllabus_id: syllabusId,
        class_id: classId,
        subject_id: subjectId,
        mode: mode,
        gender: gender,
        experience: experience,
      })
    );
  };

  const CallNumberVisible = (data) => {
    setCallVisible(true)
    setmobileNumber(data)

  }

  const tutorDynamic = Tutor.data
    .filter((item) => {
      if (tutorsearch == "") {
        return item;
      } else if (item.name == null ? "" : item.name.toLowerCase().includes(tutorsearch.toLowerCase())) {
        return item;
      } else if (
        item.institute == null ? "" : item.institute.toLowerCase().includes(tutorsearch.toLowerCase())
      ) {
        return item;
      }
      else if (item.city == null ? "" : item.city.toLowerCase().includes(tutorsearch.toLowerCase())) {
        return item;
      } else if (item.address == null ? "" : item.address.toLowerCase().includes(tutorsearch.toLowerCase())) {
        return item;
      } else if (
        item.experience == null ? "" : item.experience
          .toString()
          .toLowerCase()
          .includes(tutorsearch.toLowerCase())
      ) {
        return item;
      } else if (
        item.mode_of_classes == null ? "" : item.mode_of_classes.toLowerCase().includes(tutorsearch.toLowerCase())
      ) {
        return item;
      } else if (
        item.degree == null ? "" : item.degree.toLowerCase().includes(tutorsearch.toLowerCase())
      ) {
        return item;
      } else if (
        item.classes == null ? "" : item.classes
          .toString()
          .toLowerCase()
          .includes(tutorsearch.toLowerCase())
      ) {
        return item;
      } else if (
        item.classes == null ? "" : item.classes
          .toString()
          .toLowerCase()
          .includes(tutorsearch.toLowerCase())
      ) {
        return item;
      } else if (
        item.syllabuses == null ? "" : item.syllabuses
          .toString()
          .toLowerCase()
          .includes(tutorsearch.toLowerCase())
      ) {
        return item;
      } else if (item.topic != null) {
        if (item.topic.toLowerCase().includes(tutorsearch.toLowerCase())) {
          return item;
        }
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      return (
        <div className="row assigncardFindTutor" key={key}>
          <div className="col-12">
            <CCard className="p-3 assigncard mt-3">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 ">
                  <CCardImage
                    className="img-fluid serchcourse-image mx-auto d-flex"
                    orientation="top"
                    src={item.image}
                  />
                </div>
                <div className=" col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                  <div className="row m-0">
                    <div className=" col-12">
                      <h5 className="d-inline card-title font-weight-bold">
                        {item.name}
                      </h5>{" "}
                      <div className="d-inline medium-text">
                        {" "}
                        {item.degree && item.degree}{" "}
                      </div>
                      <div className="d-inline normal-font">
                        (TP Point - {item.tp_points})
                      </div>
                    </div>

                    <div className="col-12 justify-content-center d-flex d-md-block  justify-content-lg-center justify-content-md-center justify-content-sm-center">
                      <div className="justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center simple-normal-font">
                        <div className="infocircle">
                          {item.total_students} Students{" "}
                          <span className="ml-1 mr-1">
                            <FontAwesomeIcon
                              icon={faCircle}
                              className="infocircle1 m-1"
                            />
                          </span>
                          {item.experience} Years Experience
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="simple-normal-font justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                        <FontAwesomeIcon
                          icon={faIdCard}
                          className="phoneicon"
                        />
                        {/* &nbsp; {item.role_id} | {item.city} | {item.address} */}
                        &nbsp; {item.city} | {item.address}
                        {/* <a href="#" className="text-decoration-none">Hyderbad</a> */}
                      </div>
                    </div>
                    {item.syllabuses.length > 0 &&
                      item.classes.length > 0 &&
                      item.subjects.length > 0 &&
                      item.mode_of_classes != "" ? (
                      <>
                        <div className="col-12">
                          <div className="simple-normal-font justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                            <span className="ml-1 mr-1">
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="infocircle1 m-1"
                              />
                            </span>{" "}
                            {item.syllabuses.toString()}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="simple-normal-font justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                            <span className="ml-1 mr-1">
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="infocircle1 m-1"
                              />
                            </span>{" "}
                            {item.classes.toString()}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="simple-normal-font justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                            <span className="ml-1 mr-1">
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="infocircle1 m-1"
                              />
                            </span>{" "}
                            {item.subjects.toString()}{" "}
                            <span className="ml-1 mr-1">
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="infocircle1 m-1"
                              />
                            </span>{" "}
                            {item.topic}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="simple-normal-font justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                            <span className="ml-1 mr-1">
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="infocircle1 m-1"
                              />
                            </span>{" "}
                            {item.mode_of_classes}
                          </div>
                        </div>{" "}
                      </>
                    ) : (
                      ""
                    )}

                    <div className="col-12 justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                      <div className="carddetailfooter normal-font">
                        {item.avg_ratings == 0 ?
                          <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </> :
                          item.avg_ratings > 1 && item.avg_ratings < 2 ?
                            <>
                              <FontAwesomeIcon className="statecolor" icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                            </> :
                            item.avg_ratings > 2 && item.avg_ratings < 3 ?
                              <>
                                <FontAwesomeIcon className="statecolor" icon={faStar} />
                                <FontAwesomeIcon className="statecolor" icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                              </> :
                              item.avg_ratings > 3 && item.avg_ratings < 4 ?
                                <>
                                  <FontAwesomeIcon className="statecolor" icon={faStar} />
                                  <FontAwesomeIcon className="statecolor" icon={faStar} />
                                  <FontAwesomeIcon className="statecolor" icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                </> :
                                item.avg_ratings > 4 && item.avg_ratings < 5 ?
                                  <>
                                    <FontAwesomeIcon className="statecolor" icon={faStar} />
                                    <FontAwesomeIcon className="statecolor" icon={faStar} />
                                    <FontAwesomeIcon className="statecolor" icon={faStar} />
                                    <FontAwesomeIcon className="statecolor" icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                  </> :
                                  item.avg_ratings == 5 ?
                                    <>
                                      <FontAwesomeIcon className="statecolor" icon={faStar} />
                                      <FontAwesomeIcon className="statecolor" icon={faStar} />
                                      <FontAwesomeIcon className="statecolor" icon={faStar} />
                                      <FontAwesomeIcon className="statecolor" icon={faStar} />
                                      <FontAwesomeIcon className="statecolor" icon={faStar} />
                                    </> :
                                    "N/A"
                        }

                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm 12 col-md-12 col-lg-12 col-xl-3 justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-end">
                  <div className="row tutordetail">
                    <div className="col-12">
                      <div className="font-weight-bold">{item.tutor_verified_status}%</div>
                    </div>
                    <div className="col-12">
                      <CProgress height={10} className="mt-3 tutorprogress ">
                        <CProgressBar
                          className="bg-warning"
                          value={item.tutor_verified_status}
                        ></CProgressBar>
                      </CProgress>
                    </div>
                    <div className=" mt-4 col-12">
                      <NavLink to="/library">
                        <CTooltip content="Library" placement="bottom">
                          <CButton className="btn rounded-circle m-1 roundshap-button">
                            <FontAwesomeIcon className="" icon={faBook} />
                          </CButton>
                        </CTooltip>
                      </NavLink>
                      <CTooltip content="View" placement="bottom">
                        <CButton
                          className="btn rounded-circle m-1 roundshap-button"
                          onClick={() => viewTutorData(item.email)}
                        >
                          <FontAwesomeIcon className="" icon={faEye} />
                        </CButton>
                      </CTooltip>
                      {/* <NavLink to="/Messages"> */}
                      <CTooltip content="Message" placement="bottom">
                        <CButton
                          className="btn rounded-circle m-1 roundshap-button"
                          onClick={() => messageView(item.email)}
                        >
                          <FontAwesomeIcon className="" icon={faPaperPlane} />
                        </CButton>
                      </CTooltip>
                      {/* </NavLink> */}
                      <CTooltip content="Call" placement="bottom">
                        <CButton
                          className="btn rounded-circle m-1 roundshap-button"
                          onClick={() => CallNumberVisible(item.phone)}
                        >
                          <FontAwesomeIcon className="" icon={faPhoneAlt} />
                        </CButton>
                      </CTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </CCard>
          </div>
        </div>
      );
    });

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : tutorDynamic.length !== 0 ? (
        <>
          <CCard className="course-card-list-css">
            <div className="course-header">
              <div className="col-12">
                <div className="row mt-3 d-flex">
                  <div className="text-center col-12">
                    <div className="postsearchheader">Find a Tutor</div>
                  </div>
                </div>
                <div className="mt-2 row">
                  <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                  <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 d-flex position-relative text-center">
                    <CFormInput
                      onChange={(event) => TutorSeachData(event)}
                      className="searchinput rounded-pill pr-5"
                      placeholder="Enter Course,subject, Standard etc."
                    ></CFormInput>
                    <CButton className="searchbutton rounded-pill">
                      {" "}
                      <FontAwesomeIcon
                        className="serchingicon"
                        icon={faSearch}
                      />
                    </CButton>
                  </div>
                  <div sm={1} md={3} lg={3} xl={3}></div>
                </div>
                <div className="row mt-2 mb-3 my-0 justify-content-center">
                  <div className=" text-center col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="col-sm-12 col-md-12 col-lg-2 com-xl-2 d-inline textbook-search-mobile-view-css">
                      <CFormInput
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect4 d-inline mr-1  mb-1"
                        name="city"
                        onChange={(event) => handleOnInputChange(event)}
                        placeholder="City"
                        value={city}
                      />
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline  col-sm-2 col-xl-2">
                      <CFormSelect
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect5 d-inline mr-1 mb-1 "
                        name="syllabus_id"
                        onChange={(value) => onDropDownValueChange(value)}
                      >
                        <option value="" disabled selected>
                          Syllabus
                        </option>
                        {DropDown.syllabusList.map((e) => {
                          return <option value={e.id}>{e.name}</option>;
                        })}
                      </CFormSelect>
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline col-sm-2 col-xl-2">
                      <CFormSelect
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect5 d-inline mr-1 mb-1"
                        name="class_id"
                        onChange={(value) => onDropDownValueChange(value)}
                      >
                        <option value="" disabled selected>
                          Class
                        </option>
                        {DropDown.classList.map((e) => {
                          return <option value={e.id}>{e.name}</option>;
                        })}
                      </CFormSelect>
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline col-sm-2 col-xl-2">
                      <CFormSelect
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect5 d-inline mr-1 mb-1 "
                        name="subject_id"
                        onChange={(value) => onDropDownValueChange(value)}
                      >
                        <option value="" disabled selected>
                          Subject
                        </option>
                        {DropDown.subjectList.map((e) => {
                          return <option value={e.id}>{e.name}</option>;
                        })}
                      </CFormSelect>
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline col-sm-2 col-xl-2">
                      <CFormSelect
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect5 d-inline mr-1 mb-1 "
                        name="mode"
                        onChange={(value) => onDropDownValueChange(value)}
                      >
                        <option value="" disabled selected>
                          selcet Mode
                        </option>
                        {getAllTeachingMode().map((e) => {
                          return <option value={e.id}>{e.name}</option>;
                        })}
                      </CFormSelect>
                    </div>
                    {/* <div className="textbook-search-mobile-view-css d-inline  col-sm-2 col-xl-2">
                      <CFormSelect
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect5 d-inline mr-1 mb-1 "
                        name="gender"
                        onChange={(value) => onDropDownValueChange(value)}
                      >
                        <option value="" disabled selected>
                          select Gender
                        </option>
                        {genderData.map((e) => {
                          return <option value={e.id}>{e.name}</option>;
                        })}
                      </CFormSelect>
                    </div> */}
                    <div className="textbook-search-mobile-view-css d-inline col-sm-2 col-xl-2">
                      <CFormInput
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect4 d-inline mb-1 "
                        placeholder="Years Of Experience"
                        onChange={(event) => handleOnInputChange(event)}
                        name="experience"
                        value={experience}
                      />
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline col-sm-2 col-xl-2">
                      <CButton
                        className="textbook-add-button-css"
                        onClick={() => handleFilterSubmit()}
                      >
                        Go
                      </CButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CCard>

          {tutorDynamic}

          {/* pagination code start */}
          {Tutor.data.length > 10 ? (
            <div className="mt-4 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center">
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                // breakClassName={'break-me'}
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

          {/* Message Modal code  */}

          <CModal
            visible={messagevisible}
            onDismiss={() => setMessageVisible(false)}
            onClick={resetForm}
          >
            <CModalHeader
              onDismiss={() => setMessageVisible(false)}
              className="tutorviewmodalheader"
              onClick={resetForm}
            >
              <CModalTitle>Direct Message</CModalTitle>
            </CModalHeader>
            <CModalBody className="ml-3 mr-3 text-center">
              <Form onSubmit={handleSubmit}>
                <Controls.CustomTextArea
                  label="Message *"
                  rows={5}
                  name="message"
                  value={values.message}
                  onChange={handleInputChange}
                  error={errors.message}
                />
                <div className="p-2 d-inline">
                  <Controls.Button type="submit" text="Submit" />
                </div>
                <div className="p-2 d-inline">
                  <Controls.Button
                    text="Reset"
                    color="default"
                    onClick={resetForm}
                  />
                </div>
              </Form>
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
                  <CardText style={{ fontSize: 20 }} className="tutorcallmodal">
                    Tutor Number{" "}
                  </CardText>
                </CCol>
                <CCol className="text-start">
                  {/* <CardText style={{ fontSize: 20 }}>N/A</CardText> */}
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
                </CCol>
              </CRow>
            </CModalBody>
          </CModal>

          {/* View Message Modal code  */}
          <CModal
            visible={viewvisible}
            size="xl"
            onDismiss={() => setViewVisible(false)}
          >
            <CModalHeader
              onDismiss={() => setViewVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle className="">View Tutor</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className="p-2">
                <div className="row justify-content-around">
                  <div className="d-inline border-0 tuitionimage col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-2">
                    <CCardImage
                      src={
                        Tutor.viewTutorData.image && Tutor.viewTutorData.image
                      }
                      className="border tutorviewmodalimage mb-xs-2 mb-sm-2 mb-md-2 mb-lg-0 mb-xl-0"
                    ></CCardImage>
                  </div>
                  <div className="d-inline border tuitionimage col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 p-0 text-wrap">
                    <div className="border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                      <CCardHeader
                        style={{ fontSize: 18 }}
                        className="text-dark card-title"
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
                          {Tutor.viewTutorData.first_name}{" "}
                          {Tutor.viewTutorData.last_name}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                          City
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                          {Tutor.viewTutorData.user_details !== undefined
                            ? Tutor.viewTutorData.user_details.city
                            : ""}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                          State
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                          {Tutor.viewTutorData.user_details !== undefined
                            ? Tutor.viewTutorData.user_details.state
                            : ""}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                          Number
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                          {Tutor.viewTutorData.user_details !== undefined &&
                            Tutor.viewTutorData.user_details.phone !== null
                            ? Tutor.viewTutorData.user_details.phone
                            : "N/A"}
                        </div>
                      </div>
                      <div className="row  ">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                          Email
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
                          {Tutor.viewTutorData.email}
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                          Languages
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                          {Tutor.viewTutorData.user_details !== undefined &&
                            Tutor.viewTutorData.user_details.languages !== null
                            ? Tutor.viewTutorData.user_details.languages.toString()
                            : "N/A"}
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                          Avg Ratings
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                          {Tutor.viewTutorData.user_details !== undefined &&
                            Tutor.viewTutorData.user_details.avg_ratings !== null
                            ? (
                              Tutor.viewTutorData.user_details.avg_ratings == 0 ?
                                <>
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                  <FontAwesomeIcon icon={faStar} />
                                </> :
                                Tutor.viewTutorData.user_details.avg_ratings == 1 ?
                                  <>
                                    <FontAwesomeIcon className="statecolor" icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                  </> :
                                  Tutor.viewTutorData.user_details.avg_ratings == 2 ?
                                    <>
                                      <FontAwesomeIcon className="statecolor" icon={faStar} />
                                      <FontAwesomeIcon className="statecolor" icon={faStar} />
                                      <FontAwesomeIcon icon={faStar} />
                                      <FontAwesomeIcon icon={faStar} />
                                      <FontAwesomeIcon icon={faStar} />
                                    </> :
                                    Tutor.viewTutorData.user_details.avg_ratings == 3 ?
                                      <>
                                        <FontAwesomeIcon className="statecolor" icon={faStar} />
                                        <FontAwesomeIcon className="statecolor" icon={faStar} />
                                        <FontAwesomeIcon className="statecolor" icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                      </> :
                                      Tutor.viewTutorData.user_details.avg_ratings == 4 ?
                                        <>
                                          <FontAwesomeIcon className="statecolor" icon={faStar} />
                                          <FontAwesomeIcon className="statecolor" icon={faStar} />
                                          <FontAwesomeIcon className="statecolor" icon={faStar} />
                                          <FontAwesomeIcon className="statecolor" icon={faStar} />
                                          <FontAwesomeIcon icon={faStar} />
                                        </> :
                                        Tutor.viewTutorData.user_details.avg_ratings == 5 ?
                                          <>
                                            <FontAwesomeIcon className="statecolor" icon={faStar} />
                                            <FontAwesomeIcon className="statecolor" icon={faStar} />
                                            <FontAwesomeIcon className="statecolor" icon={faStar} />
                                            <FontAwesomeIcon className="statecolor" icon={faStar} />
                                            <FontAwesomeIcon className="statecolor" icon={faStar} />
                                          </> :
                                          "N?A"

                            )
                            : "N/A"}
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                          TP Points
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                          {Tutor.viewTutorData.user_details !== undefined &&
                            Tutor.viewTutorData.user_details.tp_points_balance !==
                            null
                            ? Tutor.viewTutorData.user_details.tp_points_balance
                            : "N/A"}
                        </div>
                      </div>
                      {Tutor.viewTutorData.user_details !== undefined &&
                        Tutor.viewTutorData.user_details.hide_area !== false ? (
                        <div className="row ">
                          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                            Geo Tag Location
                          </div>
                          <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                            {Tutor.viewTutorData.user_details.geo_location}
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
                    <CCardHeader className="card-title cardtitle text-dark font-weight-bold">
                      Education Details
                    </CCardHeader>
                    {Tutor.viewTutorData.user_details !== undefined &&
                      Tutor.viewTutorData.user_details.education.length !== 0 ? (
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
                          {Tutor.viewTutorData.user_details.education.map(
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
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <CCardHeader className="card-title cardtitle text-dark fw-bold">
                      Experience Details
                    </CCardHeader>
                    {Tutor.viewTutorData.user_details !== undefined &&
                      Tutor.viewTutorData.user_details.experience.length !== 0 ? (
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
                          {Tutor.viewTutorData.user_details.experience.map(
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
                  </div>
                </div>
              </div>
            </CModalBody>
          </CModal>
        </>
      ) : (
        <>
          <CCard className="course-card-list-css">
            <div className="course-header">
              <div className="col-12">
                <div className="row mt-3 d-flex">
                  <div className="text-center col-12">
                    <div className="postsearchheader">Find a Tutor</div>
                  </div>
                </div>
                <div className="mt-2 row">
                  <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                  <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 d-flex position-relative text-center">
                    <CFormInput
                      onChange={(event) => setTutorSearch(event.target.value)}
                      className="searchinput rounded-pill pr-5"
                      placeholder="Enter Course,subject, Standard etc."
                    ></CFormInput>
                    <CButton className="searchbutton rounded-pill">
                      {" "}
                      <FontAwesomeIcon
                        className="serchingicon"
                        icon={faSearch}
                      />
                    </CButton>
                  </div>
                  <div sm={1} md={3} lg={3} xl={3}></div>
                </div>
                <div className="row mt-2 mb-3 my-0 justify-content-center">
                  <div className=" text-center col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="col-sm-12 col-md-12 col-lg-2 com-xl-2 d-inline textbook-search-mobile-view-css">
                      <CFormInput
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect4 d-inline mr-1  mb-1"
                        name="city"
                        onChange={(event) => handleOnInputChange(event)}
                        placeholder="City"
                        value={city}
                      />
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline  col-sm-2 col-xl-2">
                      <CFormSelect
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect5 d-inline mr-1 mb-1 "
                        name="syllabus_id"
                        onChange={(value) => onDropDownValueChange(value)}
                      >
                        <option value="" disabled selected>
                          Syllabus
                        </option>
                        {DropDown.syllabusList.map((e) => {
                          return <option value={e.id}>{e.name}</option>;
                        })}
                      </CFormSelect>
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline col-sm-2 col-xl-2">
                      <CFormSelect
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect5 d-inline mr-1 mb-1"
                        name="class_id"
                        onChange={(value) => onDropDownValueChange(value)}
                      >
                        <option value="" disabled selected>
                          Class
                        </option>
                        {DropDown.classList.map((e) => {
                          return <option value={e.id}>{e.name}</option>;
                        })}
                      </CFormSelect>
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline col-sm-2 col-xl-2">
                      <CFormSelect
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect5 d-inline mr-1 mb-1 "
                        name="subject_id"
                        onChange={(value) => onDropDownValueChange(value)}
                      >
                        <option value="" disabled selected>
                          Subject
                        </option>
                        {DropDown.subjectList.map((e) => {
                          return <option value={e.id}>{e.name}</option>;
                        })}
                      </CFormSelect>
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline col-sm-2 col-xl-2">
                      <CFormSelect
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect5 d-inline mr-1 mb-1 "
                        name="mode"
                        onChange={(value) => onDropDownValueChange(value)}
                      >
                        <option value="" disabled selected>
                          selcet Mode
                        </option>
                        {getAllTeachingMode().map((e) => {
                          return <option value={e.id}>{e.name}</option>;
                        })}
                      </CFormSelect>
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline  col-sm-2 col-xl-2">
                      <CFormSelect
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect5 d-inline mr-1 mb-1 "
                        name="gender"
                        onChange={(value) => onDropDownValueChange(value)}
                      >
                        <option value="" disabled selected>
                          select Gender
                        </option>
                        {genderData.map((e) => {
                          return <option value={e.id}>{e.name}</option>;
                        })}
                      </CFormSelect>
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline col-sm-2 col-xl-2">
                      <CFormInput
                        aria-label="Default select example"
                        className="textbook-search-menu-css CFormSelect4 d-inline mb-1 "
                        placeholder="No.Experience"
                        onChange={(event) => handleOnInputChange(event)}
                        name={experience}
                      />
                    </div>
                    <div className="textbook-search-mobile-view-css d-inline col-sm-2 col-xl-2">
                      <CButton
                        className="textbook-add-button-css"
                        onClick={() => handleFilterSubmit()}
                      >
                        Go
                      </CButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CCard>
          <NoDataContainer module="Find Tutor" />
        </>
      )}
    </div>
  );
};

export default Findtutor;
