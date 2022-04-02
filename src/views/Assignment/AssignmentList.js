import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import Controls from "src/components/formControls/controls/Controls";
import {
  CCard,
  CCol,
  CCardImage,
  CButton,
  CTooltip,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CRow,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faSearch,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import profile2 from "../../assets/images/Assignment/Assignment.png";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import {
  getAssignmetList,
  getAssignmentStudentList,
  publishAssignmentStudent,
} from "./AssignmentAction";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/pagination/paginationStyle.css";
import ReactPaginate from "react-paginate";
import { useForm } from "src/components/formControls/useForm";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import MaterialTable from "material-table";
import moment from "moment";
import { checkAccessPermission } from "src/utility/utils";

const PER_PAGE = 10;
let loadAssignment = "";

const draftAssignment = () => {

  const [publishData, setPublishData] = useState("");
  const [publishAssignment, setPublishAssignment] = useState(false);
  const [searchAssignment, setSearchAssignment] = useState("");
  const [assignmentID, setAssignmentID] = useState("draftId");
  const [addAssign, setAddAssign] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [shareVisible, setShareVisible] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const assignmentState = useSelector((state) => state.Assignment);
  const [uploadvisible, setUploadVisible] = useState(false);
  const [editvisible, setEditVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadAssignmentData, setloadAssignmentData] = useState("");
  const pageCount = Math.ceil(
    assignmentState.assignmentList.draft_assignments && assignmentState.assignmentList.draft_assignments.length / PER_PAGE
  );
  const offset = currentPage * PER_PAGE;
  const user_id = [];

  const showOffline = (e) => {
    setAssignmentID(e.target.id);
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  // initial value for publish the assignment
  const initialFValues = {
    to_date: moment(),
    from_date: moment(),
  };

  // validation for publish assignment
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("to_date" in fieldValues)
      temp.to_date = fieldValues.to_date ? "" : "to_date fireld is Required..";

    if ("form_date" in fieldValues)
      temp.form_date = fieldValues.form_date
        ? ""
        : "form_date field is required.";

    setErrors({
      ...temp,
    });
    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  useEffect(async () => {
    showLoader();
    await dispatch(getAssignmetList());
    setLoading(false);
    hideLoader();
  }, []);

  useLayoutEffect(() => {

    if (assignmentState.assignmentList.draft_assignments === undefined) {
    } else {
      setloadAssignmentData(assignmentState.assignmentList.draft_assignments);
      loadAssignment = loadAssignmentData;
    }
  });

  // Column For publish assignment
  const columns = [
    {
      title: "TP_ID",
      field: "tp_id",
    },
    {
      title: "Name",
      field: "name",
      // render: rowData => rowData.first_name + " " + rowData.last_name
    },
    {
      title: "Email",
      field: "email",
    },
  ];

  // Modal Open Publishing the assignment
  const handlePublishAssignment = (data) => {
    setPublishAssignment(true);
    setPublishData(data);
    dispatch(getAssignmentStudentList({ assignment_id: data.id }));
  };

  // publish The Assignment
  const addStudentToAssignment = (data) => {
    data.map(function (item) {
      user_id.push(item.id);
    });

    if (validate()) {
      dispatch(
        publishAssignmentStudent({
          from_date: moment(values.form_date).format("YYYY-MM-DD"),
          to_date: moment(values.to_date).format("YYYY-MM-DD"),
          user_ids: user_id,
          id: publishData.id,
        })
      );
      // resetForm();
      setPublishAssignment(false);
    }
  };


  return (
    <>
      <CCard className="course-card-list-css page-header-size">
        <div className="course-header">
          <div className="col-12">
            <div className="row mt-3 d-flex">
              <div className="text-center col-12">
                <div className="postsearchheader">
                  Assignment
                  {/* {getUserData().role_name === "tutor" ? */}
                  {checkAccessPermission("assignment_add") ? (
                    <Link to="/add-assignment" className="text-decoration-none">
                      <CButton
                        className="d-inline textbook-add-button-css w-auto "
                        onClick={() => setAddAssign(!addAssign)}
                      >
                        Create Assignment
                      </CButton>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mt-2 row mb-3">
              <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
              <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 d-flex position-relative text-center">
                <CFormInput
                  className="searchinput rounded-pill pr-5"
                  placeholder="Search Assignment"
                  onChange={(event) => setSearchAssignment(event.target.value)}
                ></CFormInput>
                <CButton className="searchbutton position-absolute rounded-pill">
                  {" "}
                  <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                </CButton>
              </div>
              <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
            </div>
            <div className="row mt-1 mb-3">
              <div className="col-md-1 col-lg-1 col-xl-1"></div>
              <div className="text-center col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 text-center">
                <Link to="/assignment">
                  <CButton
                    className="groupbutton-active m-1"
                    shape="rounded-pill"
                    onClick={showOffline}

                    id="draftId"
                  >
                    Draft
                  </CButton>
                </Link>

                <Link to="/publish-assignment">
                  <CButton
                    className="groupbutton m-1"
                    shape="rounded-pill"
                    onClick={showOffline}

                    id="publish"
                  >
                    Publish
                  </CButton>
                </Link>
                <Link to="/question-bank">
                  <CButton
                    className="groupbutton m-1"
                    shape="rounded-pill"
                    onClick={showOffline}

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
      {loadAssignment === null ? (
        <div>
          <NoDataContainer module="Assignment" />
        </div>
      ) : (
        (loadAssignment =
          assignmentState.assignmentList.draft_assignments &&
          assignmentState.assignmentList.draft_assignments
            .filter((item) => {
              if (searchAssignment === "") {
                return item;
              } else if (
                item.title === null ? "" :
                item.title
                  .toLowerCase()
                  .includes(searchAssignment.toLowerCase())
              ) {
                return item;
              } else if (
                item.syllabus === null ? "" :
                item.syllabus
                  .toLowerCase()
                  .includes(searchAssignment.toLowerCase())
              ) {
                return item;
              } else if (
                item.description === null ? "" :
                item.description
                  .toLowerCase()
                  .includes(searchAssignment.toLowerCase())
              ) {
                return item;
              } else if (
                item.subject === null ? "" :
                item.subject
                  .toLowerCase()
                  .includes(searchAssignment.toLowerCase())
              ) {
                return item;
              } else if (
                item.class === null ? "" :
                item.class
                  .toLowerCase()
                  .includes(searchAssignment.toLowerCase())
              ) {
                return item;
              }
              {
                return "";
              }
            })
            .slice(offset, offset + PER_PAGE)
            .map(function (item, key) {
              return (
                <>
                  <CCol key={key}>
                    <CCard className="card p-3 assigncard mt-3 mb-3">
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-2">
                          <CCardImage
                            src={item.image === null ? profile2 : item.image}
                            className="img-fluid rounded mx-auto d-flex serchcourse-image"
                          />
                        </div>
                        <div className="p-0 col-12 col-sm-12 col-md-8 col-lg-8 col-xl-7 text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                          <div className="row cardinfo m-0 d-flex d-column p-0">
                            <div className="">
                              <div className=" mt-2">
                                <h6 className="d-inline font-weight-bold mt-2 card-title ">
                                  {item.title}
                                </h6>{" "}
                              </div>
                            </div>

                            <div className="col-12 justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                              <div className="justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center medium-text">
                                {item.description}
                              </div>
                            </div>

                            <div className="col-12 justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                              <div className="carddetailfooter normal-font">
                                {item.syllabus}
                                <span className="ml-1 mr-1">
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    className="infocircle1 m-1"
                                  />
                                </span>{" "}
                                {item.subject}{" "}
                                <span className="ml-1 mr-1">
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    className="infocircle1 m-1"
                                  />
                                </span>{" "}
                                {item.class}{" "}
                              </div>
                            </div>
                            <div className="col-12 justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                              {checkAccessPermission("assignment_edit") ? (
                                <div className="carddetailfooter normal-font">
                                  <CTooltip
                                    content="Publish Assignment"
                                    placement="bottom"
                                  >
                                    <CButton
                                      className="btn m-1 sessionbutton"
                                      onClick={() =>
                                        handlePublishAssignment(item)
                                      }
                                    >
                                      Publish
                                    </CButton>
                                  </CTooltip>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 d-flex justify-content-center align-items-center">
                          <CTooltip content="View" placement="bottom">
                            <Link
                              to={{
                                pathname: "/draft-assignment-view",
                                aboutProps: item.id,
                              }}
                            >
                              <CButton
                                className="btn rounded-circle m-1 sessionbutton"

                              >
                                <FontAwesomeIcon icon={faEye} />
                              </CButton>
                            </Link>
                          </CTooltip>
                        </div>
                      </div>
                    </CCard>
                  </CCol>
                </>
              );
            }))
      )}
      <div>
        {isLoading ? (
          <>{loader}</>
        ) : (

          assignmentState.assignmentList.draft_assignments !== undefined && assignmentState.assignmentList.draft_assignments !== null ? (
            <>
              {loadAssignment}
              <div className="mt-4 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center">
                {assignmentState.assignmentList.draft_assignments.length > 10 ?
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
                  /> : ""}
              </div>
            </>
          ) : (""
            // <NoDataContainer module="Assignment publish" />
          ))}




        <CModal
          visible={publishAssignment}
          size="lg"
          onDismiss={() => setPublishAssignment(false)}
        >
          <CModalHeader
            onDismiss={() => setPublishAssignment(false)}
            className="tutorviewmodalheader"
          >
            <CModalTitle>Publish Assignment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol>
                <Controls.DatePicker
                  name="from_date"
                  label="Start Date *"
                  value={values.from_date}
                  onChange={handleInputChange}
                  previousDateStatus={true}
                />
              </CCol>
              <CCol>
                <Controls.DatePicker
                  name="to_date"
                  label="End Date *"
                  value={values.to_date}
                  onChange={handleInputChange}
                  previousDateStatus={true}
                />
              </CCol>
            </CRow>
            <CRow>
              {values.from_date === null && values.to_date === null ? (
                <div style={{ textAlign: 'center', paddingTop: '10%' }}>
                  <h4>Please Select Date</h4>
                </div>
              ) : (
                <div className="text-center p-3">
                  <MaterialTable
                    title=""
                    data={assignmentState.publishStudentList}
                    columns={columns}
                    options={{
                      actionsColumnIndex: -1,
                      search: true,
                      selection: true,
                      filtering: true,
                      searchFieldAlignment: "right",
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 15],
                      headerStyle: {
                        backgroundColor: "#DEDDF4",
                        color: "#444346",
                        fontWeight: "600",
                        fontSize: "15px",
                      },
                    }}
                    actions={[
                      {
                        tooltip: "To Publish",
                        icon: "publish",
                        onClick: (evt, data) =>
                          addStudentToAssignment(data, evt),
                      },
                    ]}
                  />
                </div>
              )}
            </CRow>
          </CModalBody>
        </CModal>
      </div>
    </>
  );
};
export default draftAssignment;
