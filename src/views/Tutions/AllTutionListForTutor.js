import React, { useState, useEffect } from "react";
import {
    CCard,
    CRow,
    CCol,
    CButton,
    CCardImage,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CCardText,
    CLink,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisV,
    faPlusSquare,
    faEye,
    faBullhorn,
    faBookReader,
    faCircle,
} from "@fortawesome/free-solid-svg-icons";
import profile4 from "../../assets/images/My_Tuition/Teacher.png";
import moment from "moment";
import {
    addStudentsInTuition,
    deleteMyTuition,
    getStudentListToAssignInTuition,
    getSubscribedStudentList,
    getTutorAllTutionList,
} from "./TuitionActions";
import { useSelector, useDispatch } from "react-redux";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import ReactPaginate from "react-paginate";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import { NavLink } from "react-router-dom";
import EditTuitionForTutor from "./EditTuition";
import MoreVertIcon from '@mui/icons-material/MoreVert';


const PER_PAGE = 10;

const AllTutionListForTutor = (Data) => {

    const dispatch = useDispatch();
    const store = useSelector((state) => state.TuitionReducer);
    const [currentPage, setCurrentPage] = useState(0);
    const [libraryviewvisible, setLibraryViewVisible] = useState(false);
    const [libraryData, setLibraryData] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [requestDataArray, setRequestDataArray] = useState([]);
    const [videovisible, setvideoVisible] = useState(false);
    const [addStudentListModal, setAddStudentListModal] = useState(false);
    const [subscribedStudentListModal, setSubscribedStudentListModal] =
        useState(false);
    const [demoVideoURL, setDemoVideoURL] = useState("");
    const [currentTuitionID, setCurrentTuitionID] = useState("");
    const [EditTuitionModal, setEditTuitionModal] = useState(false);
    const [EditTuitionData, setEditTuitionData] = useState("")

    var studentDataList = [];

    const EditTuition = (data) => {
        setEditTuitionData(data);
        setEditTuitionModal(true)
    }
    useEffect(async () => {
        showLoader();
        await dispatch(getTutorAllTutionList());
        const dataArray = [];
        {
            store.allListTutor !== null
                ? store.allListTutor.map(function (item) {
                    dataArray.push(item);
                })
                : "";
        }
        setRequestDataArray(dataArray);
        setLoading(false);
        hideLoader();
    }, []);

    const tuitionDelete = (id) => {
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
                dispatch(deleteMyTuition({ id }));
                // Swal.fire("Success", "Tuition Deleted Successfully", "success");
            }
        });
    };
    if (store.tuitionEditStatus == "sucess") {
        setEditTuitionModal(false)
        store.tuitionEditStatus = ""
    }
    const showDemoVideo = (demo_video) => {
        setDemoVideoURL(demo_video);
        setvideoVisible(!videovisible);
    };
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
        window.scrollTo(0, 0)
    }

    // handle select student modal
    async function handelSelectStudentModal(tutionID) {
        setCurrentTuitionID(tutionID);
        await dispatch(getStudentListToAssignInTuition({ tuition_id: tutionID }));
        studentDataList = store.studentListToAddInTution;
        setAddStudentListModal(!addStudentListModal);
    }
    // handle add student in tution action
    function HandleAddStudentInTution(data, evt) {
        const emails = [];
        data.map(function (item) {
            emails.push(item.email);
        });

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(
                    addStudentsInTuition({ tuition_id: currentTuitionID, emails: emails })
                );
                setAddStudentListModal(false);
                setCurrentTuitionID("");
            }
        });
    }

    // handle subscribed student list modal
    async function handleSubscribedStudentModal(tuitionId) {
        setCurrentTuitionID(tuitionId);
        await dispatch(getSubscribedStudentList({ tuition_id: tuitionId }));
        setSubscribedStudentListModal(!subscribedStudentListModal);
    }

    const columns = [
        {
            title: "Name",
            field: "name",
        },
        {
            title: "Email",
            field: "email",
        },
    ];

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

    // library Data store

    const libraryviewCourseData = (Data) => {
        setLibraryViewVisible(true)
        setLibraryData(Data);
    };

    const pageCount = Math.ceil(store.allListTutor.length / PER_PAGE);

    const offset = currentPage * PER_PAGE;

    const loadAllMyTutionTutorListData = store.allListTutor
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
            } else if (
                item.class == null ? "" : item.syllabus.toLowerCase().includes(Data.SearchData.toLowerCase())
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
                                <div className="row m-0">
                                    <div className="col-12">
                                        <h5 className="d-inline card-title font-weight-bold">
                                            {item.title}
                                        </h5>{" "}
                                        <div className="d-inline normal-font">
                                            (TP Point -{" "}
                                            {item.tutor_details.tp_points_balance !== null
                                                ? item.tutor_details.tp_points_balance
                                                : "N/A"}
                                            )
                                        </div>
                                        {item.student_count == 0 || item.library !== null ?
                                            <div className="d-inline r-dot-menu position-absolute">
                                                <div className="d-md-inline marker-remove-textbook-css m-2">
                                                    <CDropdown variant="nav-item" className="d-md-inline marker-remove-textbook-css mr-3">
                                                        <CDropdownToggle
                                                            placement="bottom-end"
                                                            className="py-0 menu-css d-inline "
                                                            caret={false}
                                                        >
                                                            <FontAwesomeIcon
                                                                className="d-inline ellipsis "
                                                                icon={faEllipsisV}
                                                            />
                                                        </CDropdownToggle>
                                                        <CDropdownMenu className="pt-0 timeline-action-dropdown-menu-css m-2" placement="bottom-end">
                                                            {
                                                                item.student_count == 0 ? <CDropdownItem
                                                                    onClick={() => EditTuition(item)}
                                                                >
                                                                    Edit
                                                                </CDropdownItem>
                                                                    : null
                                                            }
                                                            {
                                                                item.library !== null ? <CDropdownItem
                                                                    onClick={() => libraryviewCourseData(item.id)}

                                                                >
                                                                    Library View
                                                                </CDropdownItem> : null
                                                            }


                                                        </CDropdownMenu>
                                                    </CDropdown>
                                                </div>
                                            </div>
                                            : ""}

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
                                <div className="tutiondetailcenter">
                                    <CRow className=" ">
                                        <CCol>
                                            <CCardText>
                                                <CButton
                                                    className="detailbutton tuitionicon"
                                                    onClick={() => handelSelectStudentModal(item.id)}
                                                >
                                                    <FontAwesomeIcon icon={faPlusSquare} className="mr-1" />
                                                    Add Student
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
                                </div>
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
            ) : loadAllMyTutionTutorListData.length !== 0 ? (
                <div>
                    {loadAllMyTutionTutorListData}
                    
                    {/* pagination code start */}
                    {store.allListTutor.length > 10 ? (
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

                    {/* Video Modal code  */}

                    <CModal
                        visible={videovisible}
                        onDismiss={() => setvideoVisible(false)}
                    >
                        <CModalHeader
                            onDismiss={() => setvideoVisible(false)}
                            className="tutorviewmodalheader"
                        >
                            <CModalTitle>Tuition Demo Video</CModalTitle>
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

                    {/* add student list modal */}
                    <CModal
                        size="xl"
                        visible={addStudentListModal}
                        onDismiss={() => setAddStudentListModal(false)}
                    >
                        <CModalHeader
                            onDismiss={() => setAddStudentListModal(false)}
                            className="tutorviewmodalheader"
                        >
                            <CModalTitle>Add Student In This Tuition</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CRow className="m-2">
                                <h5>List of students from your network</h5>
                            </CRow>
                            <CRow className="m-3">
                                <MaterialTable
                                    columns={columns}
                                    data={store.studentListToAddInTution}
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
                                            onClick: (evt, data) =>
                                                HandleAddStudentInTution(data, evt),
                                        },
                                    ]}
                                />
                            </CRow>
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
                            <CModalTitle className="">View Library</CModalTitle>
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
                                            <CLink href={libraryData.attachment} target="_blank" rel="noopener noreferrer">
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
                                        filtering: true,
                                        searchFieldAlignment: "right",
                                        headerStyle: {
                                            backgroundColor: "#DEDDF4",
                                            color: "#444346",
                                            fontWeight: "600",
                                            fontSize: "15px",
                                        },
                                    }}
                                />
                            </CRow>
                        </CModalBody>
                    </CModal>
                    <CModal
                        visible={EditTuitionModal}
                        size="xl"
                        onDismiss={() => setEditTuitionModal(false)}
                    >
                        <CModalHeader
                            onDismiss={() => setEditTuitionModal(false)}
                            className="tutorviewmodalheader"
                        >
                            <CModalTitle>Edit Tuition</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <EditTuitionForTutor data={EditTuitionData} />
                        </CModalBody>
                    </CModal>
                </div>
            ) : (
                <NoDataContainer module="Tution" />
            )}
        </div>
    );
};

export default AllTutionListForTutor;
