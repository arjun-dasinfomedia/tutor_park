import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CCard,
  CButton,
  CBadge,
  CTooltip,
  CModal,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CCardImage,
  CCardText,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCheck,
  faEye,
  faCalendarAlt,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import profile4 from "../../assets/images/My_Tuition/Teacher.png";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import {
  attendEventAction,
  getUpcommingEventsList,
  saveEventOnCalendarAction,
} from "./EventsActions";
import moment from "moment";
import Swal from "sweetalert2";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { checkAccessPermission, getUserData } from "src/utility/utils";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

const PER_PAGE = 10;

const UpcomingEvent = (props) => {

  const dispatch = useDispatch();
  const store = useSelector((state) => state.events);
  const [viewvisible, setViewVisible] = useState(false);
  const [viewData, setViewData] = useState("");
  const [listItemType, setListItemType] = useState("list");
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(async () => {
    showLoader();
    await dispatch(getUpcommingEventsList({ type: "upcoming" }));
    const dataArray = [];
    {
      store.allEventsList !== null ?
        store.allEventsList.map(function (item) {
          dataArray.push({ id: item.id, title: item.title, start: item.calendar_from_date, end: item.calendar_to_date });
        }) : ''
    }

    setCalendarEventsData(dataArray);
    setLoading(false);
    hideLoader();
  }, []);

  // attend event fuction
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

  // View Event
  const handleViewEvent = (item) => {
    setViewData(item);
    setViewVisible(!viewvisible);
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  // List Time Item
  const handleListItemType = (e) => {
    setListItemType(e.target.id);
  };

  // Handle Online Join Event
  const handleOnlineJoinEvent = (createMeetingURL, meetingID, speackerEmail) => {

    const bbb = require('bigbluebutton-js')

    // refer to Getting Started for more information
    let api = bbb.api(
      'https://axisclass.com/bigbluebutton/',
      'BVoHR2z2sq2C7DdkacfmLGrs22iPcy2fdzvtSuEA'
    )

    let http = bbb.http

    http(createMeetingURL).then((result) => {

      if (getUserData().email == speackerEmail) {
        let moderatorUrl = api.administration.join(getUserData().first_name + " " + getUserData().last_name, meetingID, 'supersecret')
        window.open(moderatorUrl)

      } else {
        let attendeeUrl = api.administration.join(getUserData().first_name + " " + getUserData().last_name, '1', 'secret')
        window.open(attendeeUrl)
      }
    })

  };


  const pageCount = Math.ceil(
    store.allEventsList && store.allEventsList.length / PER_PAGE
  );

  const offset = currentPage * PER_PAGE;

  const loadUpcommingEventsListData = store.allEventsList
    .filter((item) => {
      if (props.SearchData == "") {
        return item;
      } else if (
        item.title == null ?"": item.title.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.description == null ?"" : item.description.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.topic == null ? "" : item.topic.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.speaker_name == null ? "" : item.speaker_name.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.mode == null ?"" : item.mode.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.target_audience == null ? "" :item.target_audience
          .toLowerCase()
          .includes(props.SearchData.toLowerCase())
      ) {
        return item;
      }
    })

    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      const toShowDescription = item.description.substring(0, 50) + "...";
      var date = moment(item.from_date, "DD-MM-YYYY");
      var dateNumber = date.format("Do");
      var monthName = date.format("MMM");

      return (
        <CRow className="">
          <CCol sm={12} md={12} lg={12} xl={12}>
            <CCard className="card p-2 friendcard mb-2 mt-2">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-1 ">
                  <CBadge color=" rounded-pill p-3 m-2 eventbadge">
                    {dateNumber} <br />
                    {monthName}
                  </CBadge>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 text-center text-sm-center text-md-start text-lg-start text-xl-start">
                  <div className="row m-0">
                    <div className="col-12">
                      <div className="d-inline card-title"> {item.title} </div>
                    </div>

                    <div className="medium-font text-monospace mb-1">
                      <img src={profile4} className="tuitionteacher mr-1" />
                      {item.speaker_name}
                      <span className="mr-1 ml-1">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="infocircle1 m-1"
                        />
                      </span>{" "}
                      {item.from_date} {" to "} {item.to_date}
                      <span className="mr-1">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="infocircle1 m-1"
                        />
                      </span>{" "}
                      {item.from_time} To {item.to_time}{" "}
                    </div>
                  </div>
                </div>
                {
                  checkAccessPermission("events_edit") ? <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 d-flex justify-content-center align-items-center">
                    <CTooltip content="View" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 sessionbutton"

                        onClick={() => handleViewEvent(item)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Attend Event" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 sessionbutton"
                        onClick={() => attendEvent(item.id)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </CButton>
                    </CTooltip>
                    {
                      item.mode == "Online" ? <><CTooltip content="Join" placement="bottom">
                        <CButton
                          className="btn rounded-circle m-1 sessionbutton"
                          onClick={() => handleOnlineJoinEvent(item.create_meeting_url, item.meeting_id, item.speaker_email)}
                        >
                          <FontAwesomeIcon icon={faClipboardCheck} />
                        </CButton>
                      </CTooltip></> : ""
                    }

                    <CTooltip content="Save To Calendar" placement="bottom">
                      <CButton
                        className="btn rounded-circle mr-3 sessionbutton"
                        onClick={() => handleSaveToCalendar(item.id)}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
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
      ) : loadUpcommingEventsListData.length !== 0 ? (
        <div className="mt-2">
          <div className="row mt-2 mb-3">
            <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
            <div className="text-center col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">
              <CButton
                className={
                  listItemType === "list"
                    ? "groupbutton-active m-1"
                    : "groupbutton m-1"
                }
                shape="rounded-pill"
                onClick={handleListItemType}
                id="list"
              >
                List View
              </CButton>
              <CButton
                className={
                  listItemType === "calendar"
                    ? "groupbutton-active m-1"
                    : "groupbutton m-1"
                }
                shape="rounded-pill"
                onClick={handleListItemType}
                id="calendar"
              >
                Calendar View
              </CButton>
            </div>
            <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
          </div>

          {listItemType == "calendar" && calendarEventsData.length > 0 ? (
            <CRow className="">
              <CCol sm={12} md={12} lg={12} xl={12}>
                <CCard className="card p-2 friendcard mb-2 mt-2">
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    defaultView="dayGridMonth"
                    header={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,dayGridWeek,dayGridDay",
                    }}
                    nowIndicator="true"
                    initialView="dayGridMonth"
                    height="parent"
                    events={calendarEventsData}
                  />
                </CCard>
              </CCol>
            </CRow>
          ) : (
            loadUpcommingEventsListData
          )}
          {/* {loadUpcommingEventsListData} */}
            
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
          <CModal
            size="lg"
            visible={viewvisible}
            onDismiss={() => setViewVisible(false)}
          >
            <CModalHeader
              onDismiss={() => setViewVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle>View Event</CModalTitle>
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
                    src={viewData.image}
                    className="border viewcourselistmodalimage"
                  ></CCardImage>
                  <div>
                    <div className="pl-2 pb-2 ">{viewData.description}</div>
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
                        Event Details
                      </CCardText>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CCardText style={{ fontSize: 18 }} className="pl-2">
                        Title
                      </CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.title}
                      </CCardText>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CCardText style={{ fontSize: 18 }} className="pl-2">
                        Topic/Subject
                      </CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.topic}
                      </CCardText>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CCardText style={{ fontSize: 18 }} className="pl-2">
                        Mode
                      </CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.mode}
                      </CCardText>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CCardText style={{ fontSize: 18 }} className="pl-2">
                        Price(₹)
                      </CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {"₹"} {viewData.price}
                      </CCardText>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CCardText style={{ fontSize: 18 }} className="pl-2">
                        Target Audience
                      </CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.target_audience}
                      </CCardText>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CCardText style={{ fontSize: 18 }} className="pl-2">
                        Schedule Date
                      </CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.from_date} To  {viewData.to_date}
                      </CCardText>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CCardText style={{ fontSize: 18 }} className="pl-2">
                        Schedule Time
                      </CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.from_time} To {viewData.to_time}
                      </CCardText>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CCardText style={{ fontSize: 18 }} className="pl-2">
                        Speaker Name
                      </CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.speaker_name}
                      </CCardText>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CCardText style={{ fontSize: 18 }} className="pl-2">
                        Speaker Mobile No.
                      </CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.speaker_mobile_number}
                      </CCardText>
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


        </div>
      ) : (
        <NoDataContainer module="Events" />
      )}
    </div>
  );
};

export default UpcomingEvent;
