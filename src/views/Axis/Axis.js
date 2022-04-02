import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
} from "@coreui/react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useEffect, useState } from "react";
import { getUserData } from "src/utility/utils";
import Swal from "sweetalert2";
import CustomAlertControl from "../AlertMessage";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import XMLParser from "react-xml-parser";

const Axis = () => {
  const dispatch = useDispatch();
  const [createMeetingModal, setCreateMeetingModal] = useState(false);
  const [meetingType, setMeetingType] = useState("Create Meeting");
  const [meetingID, setMeetingID] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [moderatorMeetingJoinURL, setModeratorMeetingJoinURL] = useState(null);

  const makeid = () => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    setMeetingID(text);
  };

  // const uniqueMeetingID = makeid();
  useEffect(() => {
    setCreateMeetingModal(!createMeetingModal);
    return false;
    // asis class create code
  }, []);

  const handleMeetingCreate = () => {
    const bbb = require("bigbluebutton-js");

    // BBB_URL and BBB_SECRET can be obtained
    // by running bbb-conf --secret on your BBB server
    // refer to Getting Started for more information
    let api = bbb.api(
      "https://axisclass.com/bigbluebutton/",
      "BVoHR2z2sq2C7DdkacfmLGrs22iPcy2fdzvtSuEA"
    );

    let http = bbb.http;

    if (meetingID === null) {
      Swal.fire(
        "Warning",
        "Click Generate ID button to generate meeting ID.",
        "warning"
      );
      return false;
    }
    // api module itslef is responsible for constructing URLs
    let meetingCreateUrl = api.administration.create(
      "One To One Conference",
      meetingID,
      {
        duration: 100,
        attendeePW: "secret",
        moderatorPW: "supersecret",
      }
    );

    // http method should be used in order to make calls
    http(meetingCreateUrl).then((result) => {
      let moderatorUrl = api.administration.join(
        getUserData().first_name + " " + getUserData().last_name,
        meetingID,
        "supersecret"
      );

      setModeratorMeetingJoinURL(moderatorUrl);
      if (moderatorUrl !== null) {
        dispatch(
          alertActions.success(
            "Meeting created successfully. Now you can start meeting by click on start button."
          )
        );
        toast.success(
          "Meeting created successfully. Now you can start meeting by click on start button."
        );
      }

      let meetingEndUrl = api.administration.end("1", "supersecret");
    });
  };

  const handleStartMeeting = () => {
    if (moderatorMeetingJoinURL === null) {
      Swal.fire(
        "Warning",
        "Metting is not created yet having issues  in meeting ID.",
        "warning"
      );
    } else {
      window.open(moderatorMeetingJoinURL);
    }
  };

  const handleMeetingJoin = () => {
    const bbb = require("bigbluebutton-js");

    // BBB_URL and BBB_SECRET can be obtained
    // by running bbb-conf --secret on your BBB server
    // refer to Getting Started for more information
    let api = bbb.api(
      "https://axisclass.com/bigbluebutton/",
      "BVoHR2z2sq2C7DdkacfmLGrs22iPcy2fdzvtSuEA"
    );

    let http = bbb.http;
    // api module itslef is responsible for constructing URLs
    let meetingCreateUrl = api.administration.create(
      "One To One Conference",
      meetingID,
      {
        duration: 100,
        attendeePW: "secret",
        moderatorPW: "supersecret",
      }
    );

    // http method should be used in order to make calls
    http(meetingCreateUrl).then((result) => {
      let meetingStatus = api.monitoring.isMeetingRunning(meetingID);

      fetch(meetingStatus)
        .then((res) => res.text())
        .then((data) => {
          var xml = new XMLParser().parseFromString(data);
          if (
            xml.children[0].value === "SUCCESS" &&
            xml.children[1].value === "true"
          ) {
            let moderatorUrl = api.administration.join(
              getUserData().first_name + " " + getUserData().last_name,
              meetingID,
              "supersecret"
            );
            window.open(moderatorUrl);
          } else {
            dispatch(
              alertActions.error(
                "Meeting is not created yet by the moderator. Please ask him to create meeting first then you can able to join in this meeting."
              )
            );
            toast.error(
              "Meeting is not created yet by the moderator. Please ask him to create meeting first then you can able to join in this meeting."
            );
          }
        })
        .catch((err) => console.log(err));

      let meetingEndUrl = api.administration.end("1", "supersecret");
    });
  };

  const handleChange = (event) => {
    if (event.target.name === "join_or_create") {
      setMeetingType(event.target.value);
    }
  };

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <>
      <CustomAlertControl />
      <div style={{ textAlign: "center", paddingTop: "10%" }}></div>

      {/* Message Modal code  */}

      <CModal
        visible={createMeetingModal}
        size="lg"
        onDismiss={() => setCreateMeetingModal(false)}
      >
        <CModalHeader
          onDismiss={() => setCreateMeetingModal(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Create / Join Meeting</CModalTitle>
        </CModalHeader>
        <CModalBody className="ml-3 mr-3">
          <h4>Step 1 :- </h4>
          <CRow className="p-2">
            <CCol sm={8} md={8} lg={8} xl={8}>
              <FormControl>
                <FormLabel>Meeting Type</FormLabel>
                <RadioGroup
                  row
                  name="join_or_create"
                  defaultValue="Create Meeting"
                  onChange={(event) => handleChange(event)}
                >
                  <FormControlLabel
                    value="Create Meeting"
                    control={<Radio />}
                    label="Create Meeting"
                  />
                  <FormControlLabel
                    value="Join Meeting"
                    control={<Radio />}
                    label="Join Meeting"
                  />
                </RadioGroup>
              </FormControl>
            </CCol>
          </CRow>

          {meetingType === "Create Meeting" ? (
            <>
              <CRow className="p-2">
                <CCol sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    variant="outlined"
                    id="meeting_id"
                    name="meeting_id"
                    label="Meeting ID"
                    value={meetingID}
                    placeholder="Meeting ID"
                    inputProps={{ readOnly: true }}
                  />
                </CCol>
                <CCol sm={3} md={3} lg={3} xl={3}>
                  <Button
                    variant="contained"
                    className="mt-2 item-align-center"
                    style={{ backgroundColor: "#3f51b5", color: "#fff" }}
                    onClick={() => makeid()}
                  >
                    Generate ID
                  </Button>
                </CCol>
                <CCol sm={1} md={1} lg={1} xl={1}>
                  <IconButton aria-label="delete" size="large" className="mt-1">
                    <ContentCopyIcon
                      fontSize="inherit"
                      onClick={() => copyToClipBoard(meetingID)}
                    />
                  </IconButton>
                </CCol>
                <CCol sm={1} md={1} lg={1} xl={1}>
                  <p className="text-success mt-3">{copySuccess}</p>
                </CCol>
              </CRow>
              <h4 className="mt-1">Step 2 :- </h4>
              <CRow className="p-2">
                <CCol sm={4} md={4} lg={4} xl={4}>
                  <Button
                    variant="contained"
                    className="mt-4 mb-2"
                    style={{ backgroundColor: "#3f51b5", color: "#fff" }}
                    onClick={() => handleMeetingCreate()}
                  >
                    Create Meeting
                  </Button>
                </CCol>

                <CCol sm={4} md={4} lg={4} xl={4}>
                  <Button
                    variant="contained"
                    className="mt-4 mb-2"
                    style={{ backgroundColor: "#3f51b5", color: "#fff" }}
                    onClick={() => handleStartMeeting()}
                  >
                    Start Meeting
                  </Button>
                </CCol>
              </CRow>
              <CRow className="p-2">
                <CCol sm={10} md={10} lg={10} xl={10}>
                  <p className="text-danger">
                    Note:- Share this Meeting ID with your colleague to joint in
                    this meeting.
                  </p>
                </CCol>
              </CRow>
            </>
          ) : (
            <>
              <CRow className="p-2">
                <CCol sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    variant="outlined"
                    id="meeting_id"
                    name="meeting_id"
                    label="Enter Meeting ID here"
                    value={meetingID}
                    placeholder="Enter Meeting ID here"
                    onChange={(e) => setMeetingID(e.target.value)}
                  />
                </CCol>
                <CCol sm={3} md={3} lg={3} xl={3}>
                  <Button
                    variant="contained"
                    className="mt-2 item-align-center"
                    style={{ backgroundColor: "#3f51b5", color: "#fff" }}
                    onClick={() => handleMeetingJoin()}
                  >
                    Join In Meeting
                  </Button>
                </CCol>
              </CRow>
            </>
          )}
        </CModalBody>
      </CModal>
    </>
  );
};

export default Axis;
