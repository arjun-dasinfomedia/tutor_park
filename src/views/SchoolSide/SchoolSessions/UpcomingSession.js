import React, { Component, useEffect, useState } from "react";
import {
  CCard,
  CRow,
  CButton,
  CCol,
  CCardImage,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import NoDataContainer from "../../NoDataContainer/noDataContainer";
import profile4 from "../../../assets/images/My_Tuition/Teacher.png";
import { useSelector, useDispatch } from "react-redux";
import {
  upcomingSessionList,
  updateSessionCompletedStatus,
} from "./sessionsActions";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { getUserData, getUserRole } from "../../../utility/utils";
import ReactPaginate from "react-paginate";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";
const PER_PAGE = 10;

const CompleteSession = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const sessions = useSelector((state) => state.schoolSessions);
  const [currentPage, setCurrentPage] = useState(0);
  const [sessionMeetingStartButtonStatus, setSessionMeetingStartButtonStatus] =
    useState(false);
  const [endMeetingURL, setSndMeetingURL] = useState("");
  const [meetingId, setMeetingId] = useState("");

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const handleJoinClass = (item) => {
    setSessionMeetingStartButtonStatus(true);
    const bbb = require("bigbluebutton-js");
    // console.log(item.meeting_id)
    // BBB_URL and BBB_SECRET can be obtained
    // by running bbb-conf --secret on your BBB server
    // refer to Getting Started for more information
    let api = bbb.api(
      "https://axisclass.com/bigbluebutton/",
      "BVoHR2z2sq2C7DdkacfmLGrs22iPcy2fdzvtSuEA"
    );
    // console.log(api)
    // console.log("API")
    let http = bbb.http;
    // console.log(http)
    // api module itslef is responsible for constructing URLs
    setMeetingId(item.meeting_id);
    let meetingCreateUrl = api.administration.create(
      item.class.class_name + ' ' + item.class.standard + " " + item.division,
      item.meeting_id,
      {
        duration: 100,
        attendeePW: "secret",
        moderatorPW: "supersecret",
      }
    );
    // console.log(meetingCreateUrl)
    // http method should be used in order to make calls
    http(meetingCreateUrl).then((result) => {
      // console.log(result)

      if (getUserRole() == "tutor") {
        let moderatorUrl = api.administration.join(
          getUserData().first_name + " " + getUserData().last_name,
          item.meeting_id,
          "supersecret"
        );
        // console.log(`Moderator link: ${moderatorUrl}`)
        window.open(moderatorUrl);
      } else {
        let attendeeUrl = api.administration.join(
          getUserData().first_name + " " + getUserData().last_name,
          item.meeting_id,
          "secret"
        );
        // console.log(`Attendee link: ${attendeeUrl}`)
        window.open(attendeeUrl);
      }

      let meetingEndUrl = api.administration.end(
        item.meeting_id,
        "supersecret"
      );
      setSndMeetingURL(meetingEndUrl);
      // console.log(`End meeting link: ${meetingEndUrl}`)
    });
  };

  const handleEndClass = async (sessionId) => {
    // console.log("Arjun")
    // console.log(endMeetingURL)
    // window.open(endMeetingURL)
    // window.close()

    // end meeting
    var oReq = new XMLHttpRequest();
    oReq.open("get", endMeetingURL, true);
    oReq.send();
    // await dispatch(updateSessionCompletedStatus({ id: sessionId }));
    setSessionMeetingStartButtonStatus(false);
    dispatch(alertActions.success("Meeting has been ended successfully."));
    toast.success("Meeting has been ended successfully.");
  };

  useEffect(async () => {
    showLoader();
    await dispatch(upcomingSessionList());
    setLoading(false);
    hideLoader();
  }, []);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const pageCount = Math.ceil(sessions.data.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;

  const loadSessionsDynamic = sessions.data
    .filter((item) => {
      if (props.SearchData == "") {
        return item;
      } else if (
        item.subject_name == null ? "" : item.subject_name
          .toLowerCase()
          .includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.teacher_name == null ? "" : item.teacher_name.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.division == null ? "" : item.division.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      return (
        <div key={key}>
          <CCol sm={12} md={12} lg={12} xl={12}>
            <CCard className="p-3 assigncard mt-3">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-2">
                  <CCardImage
                    src={item.class.image}
                    className="img-fluid rounded mx-auto d-flex serchcourse-image"
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-7 text-center mt-xs-2 mt-sm-2 text-sm-center text-md-start text-lg-start text-xl-start">
                  <div className=" row pl-3">
                    <div className="col-12">
                      <div>
                        <h6 className="card-title d-inline font-weight-bold">
                          {item.class.class_name}
                        </h6>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="normal-font">
                        <img
                          src={profile4}
                          className="tuitionteacher normal-font mr-1"
                        />
                        {item.teacher_name}
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="infocircle1 m-1"
                        />{" "}
                        {item.date}{" "}
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="infocircle1 m-1"
                        />{" "}
                        {item.start_time} To {item.end_time}{" "}
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="infocircle1 m-1"
                        />{" "}
                        {item.day}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="normal-font">
                        {item.total_students} Students
                        <span className="ml-1 mr-1">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="infocircle1 m-1"
                          />
                        </span>{" "}
                        {item.subject_name} {" "}
                        <span className="ml-1 mr-1">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="infocircle1 m-1 d-inline"
                          />
                        </span>
                        <p className="d-inline totalassign">
                          {"Section:- "}{item.division}
                        </p>{" "}
                        {getUserRole() === "school-student" ? (
                          <div className="d-inline">
                            <FontAwesomeIcon
                              icon={faCircle}
                              className="infocircle1 m-1"
                            />
                            {item.attendance_status !== null
                              ? item.attendance_status
                              : "Not Available"}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 justify-content-center align-items-center">
                  {getUserRole() === "tutor" ? (
                    <CButton
                      className="btn buynowbutton m-1 font-weight-bold text-center"
                      onClick={() => handleJoinClass(item)}
                      disabled={sessionMeetingStartButtonStatus}
                    >
                      START CLASS
                    </CButton>
                  ) : (
                    <CButton
                      className="btn buynowbutton m-1 font-weight-bold text-center"
                      onClick={() => handleJoinClass(item)}
                    >
                      JOIN CLASS
                    </CButton>
                  )}

                  {sessionMeetingStartButtonStatus == true &&
                    ((getUserRole() === "school-tutor") || (getUserRole() === "school-admin")) &&
                    meetingId === item.meeting_id ? (
                    <CButton
                      className="btn buynowbutton m-1 font-weight-bold text-center"
                      onClick={() => handleEndClass(item.session_id)}
                    >
                      END CLASS
                    </CButton>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </CCard>
          </CCol>
        </div>
      );
    });

  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : loadSessionsDynamic.length !== 0 ? (
        <div>
          <CRow>
            {loadSessionsDynamic}

            {/* pagination code start */}
            {sessions.data.length > 10 ? (
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
          </CRow>
        </div>
      ) : (
        <NoDataContainer module="Upcoming sessions" />
      )}
    </>
  );
};
export default CompleteSession;
