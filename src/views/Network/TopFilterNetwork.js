import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormInput,
  CRow,
  CCol,
  CCard,
  CButton,
} from "@coreui/react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { checkAccessPermission, getUserData } from "src/utility/utils";
import NetworkContainer from "./NetworkContainer";
import * as yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { inviteUser, friendData, sendRequest } from "./NetworkAction";
import { useDispatch, useSelector } from "react-redux";
import CustomAlertControl from "../AlertMessage";

const TopFilterNetwork = () => {

  const dispatch = useDispatch();
  const [myfriendID, setMyFriendID] = useState("All");
  const [invitevisible, setInviteVisible] = useState(false);
  const [searchcAllRequest, setSearchcAllRequest] = useState("");
  const [requestvisible, setRequestVisible] = useState(false);
  const friend = useSelector((state) => state.network);

  var array = friend.friendData;

  var anotherOne = [getUserData().email];

  var filteredArray = array.filter(function (array_el) {
    return (
      anotherOne.filter(function (anotherOne_el) {
        return anotherOne_el === array_el.email;
      }).length === 0
    );
  });

  const SearchNetworkData = (e) => {
    setSearchcAllRequest(e.target.value)
  }

  const requsetSend = () => {
    setRequestVisible(true)
  }

  const showOffline = (e) => {
    setMyFriendID(e.target.id);
  };

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const formikfeedback = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(inviteUser(values));
      resetForm({ values: "" });
      setInviteVisible(false);
    },
  });

  const sendRequestAction = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to send a friend request this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          sendRequest({ to: email, message: "Hi, Add me as a friend." })
        );
        setRequestVisible(false);
      }
    });
  };

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
    {
      title: "Tp Id",
      field: "tp_id",
    },
  ];
  useEffect(async () => {
    await dispatch(friendData());
  }, []);

  return (
    <>
      <div>
        <CustomAlertControl />
        <CCard className="network-card-list-css">
          <CRow>
            <CCol sm={12} md={12} lg={12} xl={12}>
              <div>
                <div className="col text-center mt-4">
                  <h5 className="d-inline text-book-header">My Friends</h5>
                  {checkAccessPermission("network_add") ? (
                    <CButton
                      className="d-inline textbook-add-button-css"
                      style={{ marginBottom: 8 }}
                      onClick={() => requsetSend()}
                    >
                      Add
                    </CButton>
                  ) : null}
                </div>
              </div>
              <div className="row mt-2 d-flex justify-content-center">
                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                <div className="text-center position-relative col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                  <CFormInput
                    onChange={(event) =>
                      SearchNetworkData(event)
                    }
                    className="searchinput rounded-pill pr-5"
                    placeholder="Enter name, description."
                  ></CFormInput>
                  <CButton className="searchbutton position-absolute rounded-pill ">
                    {" "}
                    <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                  </CButton>
                </div>
                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
              </div>
              <CRow className="mt-2 mb-3">
                <CCol className="text-center" sm={12} md={12} lg={12} xl={12}>
                  <CButton
                    className={
                      myfriendID === "All"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    shape="rounded-pill"
                    onClick={showOffline}
                    id="All"
                  >
                    All
                  </CButton>
                  <CButton
                    className={
                      myfriendID === "Teachers"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    shape="rounded-pill"
                    onClick={showOffline}
                    id="Teachers"
                  >
                    Teachers
                  </CButton>
                  <CButton
                    className={
                      myfriendID === "Student"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    shape="rounded-pill"
                    onClick={showOffline}
                    id="Student"
                  >
                    Student
                  </CButton>
                  <CButton
                    className={
                      myfriendID === "MyStudent"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    shape="rounded-pill"
                    onClick={showOffline}
                    id="MyStudent"
                  >
                    My Student
                  </CButton>
                  <CButton
                    className={
                      myfriendID === "Request"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    shape="rounded-pill"
                    onClick={showOffline}
                    id="Request"
                  >
                    Request
                  </CButton>
                  {checkAccessPermission("network_add") ? (
                    <>
                      <CButton
                        className="groupbutton"
                        shape="rounded-pill"
                        onClick={() => setInviteVisible(!invitevisible)}
                      >
                        Invite
                      </CButton>
                    </>
                  ) : null}
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCard>

        {/* Invite Modal code  */}

        <CModal
          visible={invitevisible}
          onDismiss={() => setInviteVisible(false)}
        >
          <CModalHeader
            onDismiss={() => setInviteVisible(false)}
            className="tutorviewmodalheader"
          >
            <CModalTitle>Invite Student</CModalTitle>
          </CModalHeader>
          <CModalBody className="ml-3 mr-3 text-center">
            <form onSubmit={formikfeedback.handleSubmit}>
              <TextField
                className="mb-3"
                variant="outlined"
                id="email"
                name="email"
                label="Email"
                placeholder="Enter email"
                value={formikfeedback.values.email}
                onChange={formikfeedback.handleChange}
                error={
                  formikfeedback.touched.email &&
                  Boolean(formikfeedback.errors.email)
                }
                helperText={
                  formikfeedback.touched.email && formikfeedback.errors.email
                }
              />
              <Button
                type="submit"
                variant="contained"
                className="mt-4 mb-2"
                style={{ backgroundColor: "#3f51b5", color: "#fff" }}
              >
                Invite
              </Button>
            </form>
          </CModalBody>
        </CModal>

        <NetworkContainer Data={myfriendID} SearchAll={searchcAllRequest} />
      </div>

      {/* Request send friend list  */}

      <CModal
        size="lg"
        visible={requestvisible}
        onDismiss={() => setRequestVisible(false)}
      >
        <CModalHeader
          onDismiss={() => setRequestVisible(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Friend List</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <MaterialTable
            title=""
            columns={columns}
            data={filteredArray}
            actions={[
              {
                icon: "add",
                tooltip: "Request Send",
                onClick: (event, rowData) => sendRequestAction(rowData.email),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              filtering: true,
              headerStyle: {
                backgroundColor: "#DEDDF4",
                color: "#444346",
                fontWeight: "600",
                fontSize: "15px",
              },
            }}
          />
        </CModalBody>
      </CModal>
    </>
  );
};
export default TopFilterNetwork;
