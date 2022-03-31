import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
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
} from "@coreui/react";
import ReactPaginate from "react-paginate";
import EditAssignment from "./EditAssignment";
import "../../assets/css/pagination/paginationStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotAttemptedStudent from "./NotAttemptedStudents"
import {
    faSearch,
    faEye,
    faCircle,
} from "@fortawesome/free-solid-svg-icons";
import profile2 from "../../assets/images/Assignment/Assignment.png";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { getAssignmetList } from "./AssignmentAction";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "src/components/formControls/useForm";
import NoDataContainer from "../NoDataContainer/noDataContainer";

let loadPublisData = ""
const PER_PAGE = 10;

const AssignmentList = (prop) => {

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const [assignmentID, setAssignmentID] = useState("draftId");
    const showOffline = (e) => {
        setAssignmentID(e.target.id);
    };

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [notAttemptedStudent, setNotAttemptedStudent] = useState(false);
    const [noAttemptedViewData, setNoAttemptedViewData] = useState();
    const assignmentState = useSelector((state) => state.Assignment);
    const [editvisible, setEditVisible] = useState(false);
    const [loadAssignmentData, setloadAssignmentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const pageCount = Math.ceil(assignmentState.assignmentList.published_assignments && assignmentState.assignmentList.published_assignments.length / PER_PAGE);
    const offset = currentPage * PER_PAGE;
    const [searchAssignment, setSearchAssignment] = useState("");

    const listNotAttemptedAssignment = (id) => {
        setNotAttemptedStudent(true);
        setNoAttemptedViewData(id);
    }

    useEffect(async () => {
        showLoader();
        await dispatch(getAssignmetList());
        setLoading(false);
        hideLoader();

    }, []);

    useLayoutEffect(() => {

        if (assignmentState.assignmentList.published_assignments == undefined) {
        }
        else {

            setloadAssignmentData(assignmentState.assignmentList.published_assignments)
            loadPublisData = loadAssignmentData
        }
    })

    {
        loadPublisData == null ?
            ""
            :

            loadPublisData = assignmentState.assignmentList.published_assignments && assignmentState.assignmentList.published_assignments.filter((item) => {
                if (searchAssignment == "") {

                    return item;
                } else if (
                    item.title == null ? "": item.title.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {

                    return item;
                } else if (
                    item.syllabus == null ? "" :item.syllabus.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {

                    return item;
                } else if (
                    item.description == null ? "" : item.description.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {

                    return item;
                }
                else if (
                    item.subject == null ? "" :item.subject.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {

                    return item;
                }
                else if (
                    item.class == null ? "" :item.class.toLowerCase().includes(searchAssignment.toLowerCase())
                ) {

                    return item;
                } {
                    return ""
                }

            })
                .slice(offset, offset + PER_PAGE)
                .map(function (item, key) {

                    return (
                        <div key={key}>
                            {/* Card Design */}
                            <CCol>
                                <CCard className="card p-3 assigncard mt-3 mb-3">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-2">
                                            <CCardImage
                                                src={item.image == null ? profile2 : item.image}
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

                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 justify-content-center d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center">
                                                    <div className="justify-content-center assignmentdescription d-flex d-md-block justify-content-lg-center justify-content-md-center justify-content-sm-center medium-text">
                                                        {item.description}
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                        <div className="carddetailfooter normal-font">
                                                            <CTooltip content="Attempted" placement="bottom">
                                                                <Link to={{
                                                                    pathname: '/attempted-assignment',
                                                                    aboutProps: item
                                                                }}
                                                                >
                                                                    <CButton
                                                                        className="btn m-1 sessionbutton"
                                                                    >
                                                                        Attempted
                                                                    </CButton>
                                                                </Link>
                                                            </CTooltip>
                                                            <CTooltip content="Not Attempted" placement="bottom">
                                                                <CButton
                                                                    className="btn m-1 sessionbutton"
                                                                    onClick={() => listNotAttemptedAssignment(item.id)}
                                                                >
                                                                    Not Attempted
                                                                </CButton>
                                                            </CTooltip>
                                                        </div>
                                                        <div className="font-weight-bold">Total Attempted:-{item.total_attempted}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* icon button */}
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 d-flex justify-content-center align-items-center">
                                            <CTooltip content="View" placement="bottom">
                                                <Link
                                                    to={{
                                                        pathname: '/draft-assignment-view',
                                                        aboutProps: item.id
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
                        </div>
                    )

                })
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
                                        >
                                            Create Assignment
                                        </CButton>
                                    </Link>
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
                                <Link to="/assignment" >
                                    <CButton
                                        className="groupbutton m-1"
                                        shape="rounded-pill"
                                        onClick={showOffline}
                                        
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


            <div>
                {isLoading ? (
                    <> {loader}</>
                ) :
                    assignmentState.assignmentList.published_assignments !== null ? (
                        <>
                            {loadPublisData}
                            <div className="mt-4 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center">
                                {assignmentState.assignmentList.published_assignments.length > 10 ? 
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
                    ) : (
                        <NoDataContainer module="Assignment publish" />
                    )}


                <CModal
                    visible={editvisible}
                    size="lg"
                    onDismiss={() => setEditVisible(false)}
                >
                    <CModalHeader
                        onDismiss={() => setEditVisible(false)}
                        className="tutorviewmodalheader"
                    >
                        <CModalTitle>Edit Assignment</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <EditAssignment />
                    </CModalBody>
                </CModal>

                <CModal
                    visible={notAttemptedStudent}
                    size="lg"
                    onDismiss={() => setNotAttemptedStudent(false)}
                >
                    <CModalHeader
                        onDismiss={() => setNotAttemptedStudent(false)}
                        className="tutorviewmodalheader"
                    >
                        <CModalTitle>Not Attempted Students</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <NotAttemptedStudent id={noAttemptedViewData} />
                    </CModalBody>
                </CModal>
            </div >

        </>
    );
};
export default AssignmentList;