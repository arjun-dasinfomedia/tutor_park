import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@material-ui/core";
import { requestForAccessRights } from "./AccessRequestAction";
import { useDispatch } from "react-redux";

const Page403 = () => {
  const dispatch = useDispatch();
  const [feedbackvisible, setFeedbackVisible] = useState(false);

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  const validationSchema = yup.object({
    description: yup.string().required("Decription is required"),
  });

  const formikfeedback = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(requestForAccessRights(values));
      resetForm({ values: "" });

      setFeedbackVisible(false);
    },
  });

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  return (
    <div
      style={{ minHeight: screenSize.dynamicHeight - 176 }}
      className=" d-flex flex-row align-items-center"
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">403</h1>
              <h4 className="pt-3">
                Oops! You don't have the access for this page.
              </h4>
              <p className="text-medium-emphasis float-start">
                <CButton
                  onClick={() => setFeedbackVisible(!feedbackvisible)}
                  color="info"
                >
                  Contact Administrator.
                </CButton>
              </p>
            </div>
          </CCol>

          <CModal
            visible={feedbackvisible}
            onDismiss={() => setFeedbackVisible(false)}
          >
            <CModalHeader
              className="tutorviewmodalheader"
              onDismiss={() => setFeedbackVisible(false)}
            >
              <CModalTitle>Detail Description</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <form onSubmit={formikfeedback.handleSubmit}>
                <TextField
                  className="mb-3"
                  variant="outlined"
                  id="description"
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  rowsMax={4}
                  value={formikfeedback.values.description}
                  onChange={formikfeedback.handleChange}
                  error={
                    formikfeedback.touched.description &&
                    Boolean(formikfeedback.errors.description)
                  }
                  helperText={
                    formikfeedback.touched.description &&
                    formikfeedback.errors.description
                  }
                />

                <Button
                  type="submit"
                  variant="contained"
                  className="mt-4 mb-2"
                  style={{ backgroundColor: "#3f51b5", color: "#fff" }}
                >
                  Submit
                </Button>
              </form>
            </CModalBody>
          </CModal>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Page403;
