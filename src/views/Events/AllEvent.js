import React, { useEffect, useState } from "react";
import {
    CRow,
    CCol,
    CCard,
    CButton,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CCardImage,
    CTooltip,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CCardText,
    CLink
} from "@coreui/react";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faCheck,
    faPhoneAlt,
    faSave,
    faRupeeSign,
    faPaperPlane,
    faStickyNote,
    faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import profile4 from "../../assets/images/My_Tuition/Teacher.png";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import {
    getAllMyEventsList,
    deleteMyEvent,
    attendEventAction,
    saveEventOnCalendarAction,
    friendData,
    sendInvitations,
    postLibraryItemOnTimeline
} from "./EventsActions";
import Swal from "sweetalert2";
import CardText from "reactstrap/lib/CardText";
import { checkAccessPermission } from "src/utility/utils";
import MaterialTable from "material-table";

const PER_PAGE = 10;

const AllEvent = (props) => {

    const dispatch = useDispatch();
    const store = useSelector((state) => state.events);

    const [callvisible, setCallVisible] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [libraryviewvisible, setLibraryViewVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [mobileNumber, setMobileNumber] = useState("");
    const [libraryData, setLibraryData] = useState('');
    const [invitationsvisible, setInvitationsVisible] = useState(false);
    const [invitationsId, setInvitationsId] = useState("")

    const pageCount = Math.ceil(store.allEventsList && store.allEventsList.length / PER_PAGE);

    const callNumberVisible = (data) => {
        setCallVisible(true);
        setMobileNumber(data)
    }

    const offset = currentPage * PER_PAGE;

    useEffect(async () => {
        showLoader();
        await dispatch(friendData());
        await dispatch(getAllMyEventsList({ type: 'list' }));
        setLoading(false);
        hideLoader();
    }, []);

    // Delete a Event
    const eventDelete = (id) => {
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
                dispatch(deleteMyEvent({ id: id }));
            }
        });
    };

    // Attend a Event
    const attendEvent = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You wont to attend this event!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Attend it",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(attendEventAction({ id: id }));
            }
        });
    };

    // Save To Calendar
    const handleSaveToCalendar = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You wont to save this event on calendar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Attend it",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(saveEventOnCalendarAction({ id: id }));
            }
        });
    };

    // Send Invitation
    const sendInvitationsAction = (rowData) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to send a Invitations for this students?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const emails = [];
                rowData.map(function (item) {
                    emails.push(item.email);
                });
                dispatch(sendInvitations({ event_id: invitationsId, emails: emails }));
                setInvitationsVisible(false)
            }
        });
    };

    // handle post library item on timeline
    const handlePostOnTimeline = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Post it",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(postLibraryItemOnTimeline({ type_id: item.id, type: "event" }));
            }
        });
    };

    // library Data store
    const libraryviewCourseData = (Data) => {
        setLibraryViewVisible(true)
        setLibraryData(Data)
    };

    // invitation Column
    const columns = [
        {
            title: "Name",
            field: "name",
        },
        {
            title: "Email",
            field: "email",
        },
        {
            title: "Number",
            field: "contact_no",
        },
    ]

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
        window.scrollTo(0, 0);
    }

    const loadAllMyEventsListData = store.allEventsList && store.allEventsList
        .filter((item) => {
            if (props.SearchData === "") {
                return item;
            } else if (
                item.title === null? "": item.title 
                    .toLowerCase()
                    .includes(props.SearchData.toLowerCase())
            ) {
                return item;
            } else if (
                item.description === null? "" : item.description
                    .toLowerCase()
                    .includes(props.SearchData.toLowerCase())
            ) {
                return item;
            } else if (
                item.topic === null ? "": item.topic
                    .toLowerCase()
                    .includes(props.SearchData.toLowerCase())
            ) {
                return item;
            } else if (
                item.speaker_name === null ? "": item.speaker_name.toLowerCase().includes(props.SearchData.toLowerCase())
            ) {
                return item;
            } else if (
                item.mode === null ? "" : item.mode
                    .toLowerCase()
                    .includes(props.SearchData.toLowerCase())
            ) {
                return item;
            } else if (
                item.target_audience === null ? "" : item.target_audience
                    .toLowerCase()
                    .includes(props.SearchData.toLowerCase())
            ) {
                return item;
            }
        })
        .slice(offset, offset + PER_PAGE)
        .map(function (item, key) {
            const toShowDescription = item.description.substring(0, 50) + "...";
            return (
                <CRow className="">
                    <CCol sm={12} md={12} lg={12} xl={12} >
                        <CCard className="card p-3 friendcard mb-2 mt-2">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 ">
                                    <CCardImage
                                        src={item.image}
                                        className="img-fluid rounded mx-auto d-flex serchcourse-image"
                                    />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-7 text-center text-sm-center text-md-start text-lg-start text-xl-start">
                                    <div className="row m-0">
                                        <div
                                            className="col-12"
                                        >
                                            <h5 className="d-inline card-title font-weight-bold">{item.title}</h5>{" "}

                                            <div className="d-inline medium-text"> ({item.topic})</div>
                                            <div className="d-inline normal-font">   <FontAwesomeIcon className="svg-inline--fa fa-ellipsis-v fa-w-6 d-inline"
                                                icon={faRupeeSign}/> {item.price}</div>

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
                                                            className="d-inline ellipsis"
                                                            icon={faEllipsisV}
                                                            id=""
                                                        />
                                                    </CDropdownToggle>
                                                    <CDropdownMenu
                                                        className="pt-0 timeline-action-dropdown-menu-css m-2"
                                                        placement="bottom-end"
                                                    >
                                                        {checkAccessPermission("events_delete") ?
                                                            <CDropdownItem onClick={() => eventDelete(item.id)}>
                                                                Delete
                                                            </CDropdownItem> : ""}
                                                        {item.library !== null ?
                                                            <CDropdownItem onClick={() =>
                                                                libraryviewCourseData(item.library)
                                                            }>
                                                                Library View
                                                            </CDropdownItem> : ""}
                                                    </CDropdownMenu>
                                                </CDropdown>

                                            </div>
                                        </div>
                                        <div className="medium-text">{item.description}</div>
                                        <div className="normal-font mb-1">
                                            <img src={profile4} className="tuitionteacher mr-1" />
                                            {item.speaker_name}
                                            <span className="mr-1 ml-1"><FontAwesomeIcon icon={faCircle} className="infocircle1 m-1" /></span> {item.from_date} {" to "} {item.to_date}
                                            <span className="ml-1 mr-1"><FontAwesomeIcon icon={faCircle} className="infocircle1 m-1" /></span> {item.from_time} To {item.to_time}{" "}
                                        </div>
                                        <div className="normal-font ">
                                            {item.target_audience}
                                            <span className="ml-1 mr-1"> <FontAwesomeIcon icon={faCircle} className="infocircle1 m-1" /></span> {item.mode}{" "}
                                            {/* {
                                                checkAccessPermission("events_delete") ? <CButton className="questionicon m-1 text-danger"><FontAwesomeIcon icon={faTrashAlt} onClick={() => eventDelete(item.id)} /></CButton> : null
                                            } */}

                                        </div>
                                        <div className="normal-font ">
                                            {/* <CButton className="questionicon1 m-1 "><FontAwesomeIcon icon={faShareAlt} /></CButton> */}

                                        </div>
                                    </div>
                                </div>
                                {
                                    checkAccessPermission("events_edit") ? <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 d-flex justify-content-center align-items-center">
                                        <CTooltip content="Send invitations" placement="bottom">
                                            <CButton className="btn rounded-circle m-1 roundshap-button"
                                                onClick={() => setInvitationsVisible(!invitationsvisible, setInvitationsId(item.id))}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPaperPlane}
                                                />
                                            </CButton>
                                        </CTooltip>
                                        <CTooltip content="Attend Event" placement="bottom" >
                                            <CButton className="btn rounded-circle m-1 sessionbutton"
                                                onClick={() => attendEvent(item.id)}
                                            >
                                                <FontAwesomeIcon icon={faCheck}
                                                />
                                            </CButton>
                                        </CTooltip>
                                        <CTooltip content="Save" placement="bottom">
                                            <CButton className="btn rounded-circle m-1 sessionbutton"
                                                onClick={() => handleSaveToCalendar(item.id)} >
                                                <FontAwesomeIcon icon={faSave}
                                                />
                                            </CButton>
                                        </CTooltip>
                                        <CTooltip content="Call" placement="bottom">
                                            <CButton className="btn rounded-circle m-1 sessionbutton"

                                                onClick={() => callNumberVisible(item.speaker_mobile_number)}
                                            >
                                                <FontAwesomeIcon icon={faPhoneAlt}
                                                />
                                            </CButton>
                                        </CTooltip>
                                        <CTooltip content="Post To Timeline" placement="bottom">
                                            <CButton className="btn rounded-circle m-1 sessionbutton"
                                                // onClick={() => setCallVisible(!callvisible, setMobileNumber(item.speaker_mobile_number))}
                                                onClick={() =>
                                                    handlePostOnTimeline(item)
                                                }
                                            >
                                                <FontAwesomeIcon icon={faStickyNote}
                                                />
                                            </CButton>
                                        </CTooltip>
                                    </div> : null
                                }

                            </div>
                        </CCard>
                    </CCol>
                </CRow>
            );
        });

    return (
        <div>

            {isLoading ? (
                <>{loader}</>
            ) : loadAllMyEventsListData.length !== 0 ? (
                <div>
                    {loadAllMyEventsListData}
                  
                    {/* pagination code start */}
                    {store.allEventsList.length > 10 ? (
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

                    <CModal visible={callvisible} onDismiss={() => setCallVisible(false)}>
                        <CModalHeader onDismiss={() => setCallVisible(false)} className="tutorviewmodalheader">
                            <CModalTitle>Call Event</CModalTitle>
                        </CModalHeader>
                        <CModalBody className="ml-3 mr-3 text-center">
                            <CRow>
                                <CCol className="text-start">
                                    <CardText style={{ fontSize: 20 }}>Mobile Number </CardText>
                                </CCol>
                                <CCol className="text-start">
                                    {/* <CardText >{number}</CardText> */}
                                    {
                                        mobileNumber !== '' ? <a
                                            style={{ fontSize: 20, textDecoration: "none" }}
                                            href={"tel:+91" + mobileNumber}
                                        >
                                            {mobileNumber}
                                        </a> : <CardText >Mobile number is not available.</CardText>
                                    }

                                </CCol>
                            </CRow>
                        </CModalBody>
                    </CModal>

                    {/* Library Details View Modal */}

                    <CModal size="lg" visible={libraryviewvisible} onDismiss={() => setLibraryViewVisible(false)}>
                        <CModalHeader visible={libraryviewvisible} onDismiss={() => setLibraryViewVisible(false)} className="tutorviewmodalheader">
                            <CModalTitle className="font-weight-bold">View Library</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CRow>
                                <CCol sm={1} md={1} lg={1} xl={1} style={{ maxWidth: 20 }}>
                                </CCol>
                                <CCol className=" border tuitionimage p-0 my-2 " sm={3} md={3} lg={3} xl={3}>
                                    <CCardImage
                                        src={
                                            libraryData.image
                                        }
                                        className="border viewcourselistmodalimage"
                                    ></CCardImage>
                                    <div>
                                        <div className="pl-2 pb-2 ">
                                            {libraryData.description}
                                        </div>
                                    </div>
                                </CCol>
                                <CCol sm={1} md={1} lg={1} xl={1} style={{ maxWidth: 20 }}>
                                </CCol>
                                <CCol className="border tuitionimage my-2">
                                    <CRow className="border viewmodalcolor font-weight-bold viewmodalcoursedaetail" >
                                        <CCol>
                                            <CCardText style={{ fontSize: 18 }} className="p-2 text-dark">
                                                Library Details
                                            </CCardText>
                                        </CCol>
                                    </CRow>
                                    <CRow className="pt-2 pl-2">
                                        <CCol>
                                            <CCardText style={{ fontSize: 18 }}>
                                                Title{" "}
                                            </CCardText>
                                        </CCol>
                                        <CCol className="p-0">
                                            <CCardText style={{ fontSize: 18, color: "#8f8f8f" }} >
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
                                            <CCardText style={{ fontSize: 18 }} className="pl-2">Attachment</CCardText>
                                        </CCol>
                                        <CCol>
                                            <CLink
                                                href={libraryData.attachment}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {libraryData.attachment && libraryData.attachment.slice(0, 20) + "..."}
                                            </CLink>
                                        </CCol>
                                    </CRow>

                                </CCol>
                                <CCol sm={1} md={1} lg={1} xl={1} style={{ maxWidth: 20 }}>
                                </CCol>
                            </CRow>

                        </CModalBody>
                    </CModal>

                    {/* invitations send friend list  */}

                    <CModal size="lg" visible={invitationsvisible} onDismiss={() => setInvitationsVisible(false)}>
                        <CModalHeader onDismiss={() => setInvitationsVisible(false)} className="tutorviewmodalheader">
                            <CModalTitle>Participants List</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <MaterialTable
                                title=""
                                columns={columns}
                                data={store.friendData}
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
                                        tooltip: "Invitations Send",
                                        icon: "send",
                                        onClick: (event, rowData) => sendInvitationsAction(rowData)
                                    },
                                ]}
                            />
                        </CModalBody>
                    </CModal>
                </div>
            ) : (
                <NoDataContainer module="Events" />
            )}
        </div>
    );
};

export default AllEvent;
