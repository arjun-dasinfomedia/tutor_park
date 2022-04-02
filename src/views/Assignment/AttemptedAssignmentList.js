import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    CCard,
    CCol,
    CCardImage,
    CButton,
    CTooltip,
    CFormInput,
    CBadge,
} from "@coreui/react";
import ReactPaginate from "react-paginate";
import "../../assets/css/pagination/paginationStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faCircle,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import profile2 from "../../assets/images/Assignment/Assignment.png";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { getStudentSubmittedAssignment } from "./AssignmentAction";
import { useDispatch, useSelector } from "react-redux";
import NoDataContainer from "../NoDataContainer/noDataContainer";

const PER_PAGE = 10;
let attemptedAssignmentData = ""

const AttemptedAssignment = (prop) => {    

    const [assignmentID, setAssignmentID] = useState("draftId");
    const [searchAssignment, setSearchAssignment] = useState("");
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const assignmentState = useSelector((state) => state.Assignment);
    const [loadAssignmentData, setloadAssignmentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const pageCount = Math.ceil(loadAssignmentData && loadAssignmentData.length / PER_PAGE);
    const offset = currentPage * PER_PAGE;

    const SearchAssignmentData = (e) => {
        setSearchAssignment(e.target.value)
    }

    const showOffline = (e) => {
        setAssignmentID(e.target.id);
    };
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    useEffect(async () => {
        showLoader();
        if (prop.location.aboutProps !== undefined) {
            dispatch(getStudentSubmittedAssignment({ assignment_id: prop.location.aboutProps.id }));
        }

        setLoading(false);
        hideLoader();

    }, []);

    {
        prop.location.aboutProps !== undefined ?
            attemptedAssignmentData = assignmentState.studentSubmittedAssignment && assignmentState.studentSubmittedAssignment.filter((item) => {
                if (searchAssignment === "") {
                    return item;
                } else if (
                    item.assignment.title === null ? "" : item.assignment.title.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {
                    return item;
                } else if (
                    item.assignment.description === null ? "": item.assignment.description.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {
                    return item;
                } else if (
                    item.assignment.syllabus === null ? "" : item.assignment.syllabus.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {
                    return item;
                }
                else if (
                    item.assignment.class === null ? "": item.assignment.class.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {
                    return item;
                }
                else if (
                    item.assignment.subject === null ? "": item.assignment.subject.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {
                    return item;
                }

                else if (
                    item.student.tp_id === null ? "": item.student.tp_id.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {
                    return item;
                }
                else if (
                    item.student.name === null ? "": item.student.name.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {
                    return item;
                }
                else if (
                    item.student.email === null ? "" :item.student.email.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {
                    return item;
                }
                {
                    return ""
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
                                                            {item.assignment.title} (Total Marks:-{item.assignment.total_mark})
                                                        </h6>{" "}
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className=" mt-2">
                                                        {
                                                            item.obtained_mark !== null && item.obtained_mark !== '' ? <h5 className="d-inline font-weight-bold mt-2 card-title ">
                                                                (Obtained Marks:-{item.obtained_mark})
                                                            </h5> : null
                                                        }
                                                        {item.tutor_status === undefined ?
                                                            <CBadge color="danger" className="h6">Not Evaluated</CBadge>
                                                            :
                                                            item.tutor_status === "pending" ?
                                                                <CBadge color="danger" className="h6">Not Evaluated</CBadge>
                                                                :
                                                                <CBadge color="success" className="h6">Evaluated</CBadge>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="col-12 justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                                                    <div className="justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center medium-text">
                                                        {item.assignment.description}
                                                    </div>
                                                </div>

                                                <div className="col-12 justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                                                    <div className="carddetailfooter normal-font">
                                                        {item.assignment.syllabus}
                                                        <span className="ml-1 mr-1">
                                                            <FontAwesomeIcon
                                                                icon={faCircle}
                                                                className="infocircle1 m-1"
                                                            />
                                                        </span>{" "}
                                                        {item.assignment.subject}{" "}
                                                        <span className="ml-1 mr-1">
                                                            <FontAwesomeIcon
                                                                icon={faCircle}
                                                                className="infocircle1 m-1"
                                                            />
                                                        </span>{" "}
                                                        {item.assignment.class}{" "}
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                            Student TP_ID:-
                                                        </div>
                                                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                                            <h6 className="">
                                                                {item.student.tp_id}
                                                            </h6></div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                            Student Name:-
                                                        </div>
                                                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                                            <h6 className="">
                                                                {item.student.name}
                                                            </h6></div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                            Student Email:-
                                                        </div>
                                                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                                            <h6 className="">
                                                                {item.student.email}
                                                            </h6></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* icon button */}
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 d-flex justify-content-center align-items-center">
                                            
                                            <CTooltip content="View" placement="bottom">
                                                <Link
                                                    to={{
                                                        pathname: 'attempted-view-assign-tutor',
                                                        aboutProps: item
                                                    }}><CButton
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
                    )

                })
            :
            <NoDataContainer module="assignment" />
    }

    return (
        <>

            <CCard className="course-card-list-css page-header-size">
                <div className="course-header">
                    <div className="col-12">
                        <div className="row mt-3 d-flex">
                            <div className="text-center col-12">
                                <div className="postsearchheader">
                                    Assignment
                                    <Link to="/add-assignment" className="text-decoration-none">
                                        <CButton
                                            className="d-inline textbook-add-button-css w-auto "
                                            onClick={() => setAddAssign(!addAssign)}
                                        >
                                            Create Assignment
                                        </CButton></Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 row mb-3">
                            <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                            <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 d-flex position-relative text-center">
                                <CFormInput
                                    className="searchinput rounded-pill pr-5"
                                    placeholder="Search Assignment"
                                    onChange={(event) => SearchAssignmentData(event)}
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
                                <Link to="/assignment" >
                                    <CButton
                                        
                                        shape="rounded-pill"
                                        onClick={showOffline}
                                        className="groupbutton m-1"
                                        id="draftId"

                                    >
                                        Draft
                                    </CButton>
                                </Link>

                                <Link to="/publish-assignment" >
                                    <CButton
                                        
                                        shape="rounded-pill"
                                        onClick={showOffline}
                                        className="groupbutton-active m-1"
                                        id="publish"
                                    >
                                        Publish
                                    </CButton>
                                </Link>

                                <Link to="/question-bank">
                                    <CButton
                                        
                                        shape="rounded-pill"
                                        onClick={showOffline}
                                        className={
                                            assignmentID === "Question Bank"
                                                ? "groupbutton-active m-1"
                                                : "groupbutton m-1"
                                        }
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

            <div>
                {isLoading ? (
                    <>{loader}</>
                )
                    :
                    (
                        <>
                        
                            {attemptedAssignmentData.length > 0 ?
                                attemptedAssignmentData
                                :
                                <NoDataContainer module="Student Attempted Assignment" />
                            }
                            {prop.location.aboutProps === undefined ?
                                ""
                                :
                                prop.location.aboutProps.total_attempted === 0 ?
                                ""
                                :
                                assignmentState.studentSubmittedAssignment.length === 0 ?
                                    <div className="loader"></div>
                                    :
                                    assignmentState.studentSubmittedAssignment && assignmentState.studentSubmittedAssignment > 10 ? (
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
                        </>
                    )
                }
            </div>

        </>
    );
};
export default AttemptedAssignment;
