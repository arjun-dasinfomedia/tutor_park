import React, { useState } from "react";
import {
  CRow,
  CCol,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import * as yup from "yup";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { inviteUser } from "./InviteFriendAction";

const InviteFriend = () => {
  const dispatch = useDispatch();
  const [invitevisible, setInviteVisible] = useState(false);
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

  const InvitationModal = () =>{
    setInviteVisible(true)
  }
  
  return (
    <>
      <CRow className="p-3 position-relative">
        <CCol
          sm={12}
          md={12}
          lg={12}
          xl={6}
          className="card-title font-weight-bold text-center text-sm-center text-md-center text-lg-start text-xl-start"
        >
          <CButton
            className="btn buynowbutton m-1 font-weight-bold text-center"
            onClick={() => InvitationModal()}
          >
            Invite
          </CButton>
        </CCol>
      </CRow>
      {/* Invite Modal code  */}

      <CModal visible={invitevisible} onDismiss={() => setInviteVisible(false)}>
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
            <CButton
              type="submit"
              className="mt-4 mb-2"
              style={{ backgroundColor: "#3f51b5", color: "#fff" }}
            >
              Invite
            </CButton>
          </form>
        </CModalBody>
      </CModal>
    </>
  );
};

export default InviteFriend;
