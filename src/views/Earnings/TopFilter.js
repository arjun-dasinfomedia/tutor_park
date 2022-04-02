import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import Controls from "src/components/formControls/controls/Controls";
import CustomAlertControl from "../AlertMessage";
import { checkAccessPermission } from "src/utility/utils";
import { Form, useForm } from "src/components/formControls/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getSchoolDropDown,
  getUserDropDown,
  addInvoice,
} from "./earningsAction";
import moment from "moment";
import { currencySymbole } from "../../utility/utils";
import EarningContainer from "./EarningContainer";
import { getUserRole } from "../../utility/utils";

const BillUserType = [
  { id: "School", title: "School" },
  { id: "Tutor-park", title: "Tutor-park" },
];

const TopFliter = () => {

  const dispatch = useDispatch();
  const earnings = useSelector((state) => state.earnings);
  const [addVisible, setAddVisible] = useState(false);
  const [transferPointID, setTransferPointID] = useState("transaction");

  const status = [
    { id: "paid", name: "Paid" },
    { id: "unpaid", name: "UnPaid" },
  ];
  const mode = [
    { id: "offline", name: "Offline" },
    { id: "online", name: "online" },
    { id: "at_student_home", name: "At Student Home" },
    { id: "at_tutor_location", name: "At Tutor Location" },
  ];

  useEffect(() => {
    dispatch(getSchoolDropDown());
    dispatch(getUserDropDown());
  }, []);

  const initialFValues = {
    bill_type: "School",
    school_select: "",
    user_select: "",
    payment_method: "",
    payment_date: moment(),
    payment_status: "",
    transaction_id: "",
    Amount: "",
    mode_tution: "",
    course_tuition_name: "",
    take_session: "",
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (values.bill_type === "School") {
      if ("school_select" in fieldValues)
        temp.school_select = fieldValues.school_select
          ? ""
          : "Please select Schhol.";
    }
    if (values.bill_type === "Tutor-park") {
      if ("user_select" in fieldValues)
        temp.user_select = fieldValues.user_select ? "" : "Please select User.";
      if ("mode_tution" in fieldValues)
        temp.mode_tution = fieldValues.mode_tution
          ? ""
          : "Please select Mode Of Tuititon.";
      if ("course_tuition_name" in fieldValues)
        temp.course_tuition_name = fieldValues.course_tuition_name
          ? ""
          : "Please Enter Course tuition Name.";
      if ("take_session" in fieldValues)
        temp.take_session = fieldValues.take_session
          ? ""
          : "Please Enter Number Of session Taken.";
    }
    if ("payment_method" in fieldValues)
      temp.payment_method = fieldValues.payment_method
        ? ""
        : "Please Enter Payment Method.";

    if ("payment_status" in fieldValues)
      temp.payment_status = fieldValues.payment_status
        ? ""
        : "Please Select Payment Status.";

    if ("transaction_id" in fieldValues)
      temp.transaction_id = fieldValues.transaction_id
        ? ""
        : "Please Enter Transaction Id.";

    if ("Amount" in fieldValues) {
      if (fieldValues.Amount < 0) {
        temp.Amount = "Amount should be greater then 0";
      } else if (fieldValues.Amount === "") {
        temp.Amount = "Please enter Amount.";
      } else {
        temp.Amount = "";
      }
    }

    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const showOffline = (e) => {
    setTransferPointID(e.target.id);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      let data = new FormData();
      if (values.bill_type === "School") {
        data.append("invoice_for_id", values.school_select);
        data.append("invoice_for", "school");
      }
      if (values.bill_type === "Tutor-park") {
        data.append("invoice_for", "user");
        data.append("invoice_for_id", values.user_select);
        data.append("mode_of_tuition", values.mode_tution);
        data.append("course_tuition_name", values.course_tuition_name);
        data.append("session_taken", values.take_session);
      }
      data.append("payment_method", values.payment_method);
      data.append("date", moment(values.payment_date).format("YYYY-MM-DD"));
      data.append("payment_status", values.payment_status);
      data.append("transaction_id", values.transaction_id);
      data.append("amount", values.Amount);

      dispatch(addInvoice(data));
      resetForm();
      setAddVisible(false);
    }
  };

  return (
    <>
      <CustomAlertControl />
      <CModal
        size="lg"
        visible={addVisible}
        onDismiss={() => setAddVisible(false)}
      >
        <CModalHeader
          className="tutorviewmodalheader"
          onDismiss={() => setAddVisible(false)}
        >
          <CModalTitle>Add Bill</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Form onSubmit={handleSubmit}>
            <CRow>
              <CCol xl={6} sm={12} className="">
                <Controls.RadioGroup
                  name="bill_type"
                  label="Bill type *"
                  value={values.bill_type}
                  onChange={handleInputChange}
                  items={BillUserType}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol xl={6} sm={6} className="">
                {values.bill_type === "School" ? (
                  <>
                    <Controls.Select
                      name="school_select"
                      label="Select School *"
                      value={values.school_select}
                      options={earnings.schoolListDropDown}
                      onChange={handleInputChange}
                      error={errors.school_select}
                      dropDownType="other"
                    />
                  </>
                ) : (
                  ""
                )}
              </CCol>
            </CRow>

            {values.bill_type === "Tutor-park" ? (
              <>
                <CRow>
                  <CCol xl={6} sm={6} className="">
                    <Controls.Select
                      name="user_select"
                      label="Select User *"
                      value={values.user_select}
                      options={earnings.userListDropDown}
                      onChange={handleInputChange}
                      error={errors.user_select}
                      dropDownType="user_id"
                    />
                  </CCol>
                  <CCol xl={6} sm={6} className="">
                    <Controls.Select
                      name="mode_tution"
                      label="Mode Of Tutiton *"
                      value={values.mode_tution}
                      options={mode}
                      onChange={handleInputChange}
                      error={errors.mode_tution}
                      dropDownType="other"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xl={6} sm={6} className="">
                    <Controls.Input
                      name="course_tuition_name"
                      label="Course Tuition Name *"
                      value={values.course_tuition_name}
                      onChange={handleInputChange}
                      error={errors.course_tuition_name}
                    />
                  </CCol>
                  <CCol xl={6} sm={6} className="">
                    <Controls.Input
                      name="take_session"
                      label="Number Of Session *"
                      value={values.take_session}
                      onChange={handleInputChange}
                      error={errors.take_session}
                      type="number"
                    />
                  </CCol>
                </CRow>
              </>
            ) : (
              ""
            )}
            {/* </CCol> */}

            <CRow>
              <CCol xl={6} sm={6} className="">
                <Controls.Input
                  name="payment_method"
                  label="Payment Method *"
                  value={values.payment_method}
                  onChange={handleInputChange}
                  error={errors.payment_method}
                />
              </CCol>

              <CCol xl={6} sm={6}>
                <Controls.DatePicker
                  name="payment_date"
                  label="Payment Date *"
                  value={values.payment_date}
                  onChange={handleInputChange}
                  previousDateStatus={true}
                />
              </CCol>
            </CRow>

            <CRow className="">
              <CCol xl={6} sm={6} className="">
                <Controls.Select
                  name="payment_status"
                  label="Payment Status"
                  options={status}
                  value={values.payment_status}
                  onChange={handleInputChange}
                  error={errors.payment_status}
                />
              </CCol>
              <CCol xl={6} sm={6} className="">
                <Controls.Input
                  name="transaction_id"
                  label="Transaction Id *"
                  value={values.transaction_id}
                  onChange={handleInputChange}
                  error={errors.transaction_id}
                />
              </CCol>
            </CRow>

            <CRow className="">
              <CCol sm={6} md={6} lg={6} xl={6} className="">
                <Controls.Input
                  name="Amount"
                  label={"Amount (" + currencySymbole() + ")"}
                  type="number"
                  value={values.Amount}
                  onChange={handleInputChange}
                  error={errors.Amount}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
                <div className="d-inline">
                  <Controls.Button
                    type="submit"
                    text="Add To Bill"
                    className="m-1"
                  />
                </div>
                <div className="d-inline">
                  <Controls.Button
                    className="m-1"
                    text="Reset"
                    color="default"
                    onClick={resetForm}
                  />
                </div>
              </CCol>
            </CRow>
          </Form>
        </CModalBody>
      </CModal>
      <CCard className="course-card-list-css">
        <div className="row">
          <div className="col text-center mt-4">
            <h5 className="d-inline text-book-header">Earnings</h5>
            {checkAccessPermission("earnings_payments_add") ? (
              <>
              {getUserRole() === "admin" ? (
                <CButton
                  className="d-inline textbook-add-button-css ml-3"
                  onClick={() => setAddVisible(!addVisible)}
                >
                  Add
                </CButton>) : ""}
              </>
            ) : null}
          </div>
          {getUserRole() === "admin" ? (
            <>
              <div className="row mt-2 mb-3">
                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
                <div className="text-center col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">
                  <CButton
                    className={
                      transferPointID === "transaction"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    shape="rounded-pill"
                    onClick={showOffline}
                    id="transaction"
                  >
                    Transaction
                  </CButton>
                  <CButton
                    className={
                      transferPointID === "invoice"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    shape="rounded-pill"
                    onClick={showOffline}
                    id="invoice"
                  >
                    Invoice
                  </CButton>
                </div>
                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
              </div>
            </>
          ) : (
            ""
          )}
          <CCol
            className="text-center mt-2 mb-3"
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
          </CCol>
        </div>
      </CCard>
      <EarningContainer data={transferPointID} />
    </>
  );
};
export default TopFliter;
