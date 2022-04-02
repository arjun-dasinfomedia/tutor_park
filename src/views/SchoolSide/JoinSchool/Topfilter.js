import React, { useState } from 'react'
import {
    CCard,
    CButton,
    CFormInput,
    CRow,
    CCol,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from 'src/components/formControls/controls/Controls'
import CustomAlertControl from '../../AlertMessage'
import JoinSchool from "./JoinSchool"
import { storeMySchool } from "./JoinSchoolAction"
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
    getUserRole,
    getUserData,
} from "src/utility/utils";


const TopFilter = () => {

    const dispatch = useDispatch();
    const [addVisible, setAddVisible] = useState(false);
    const [searchJoinSchool, setSearchJoinSchool] = useState("");


    const JoinSchoolData = (e) => {
        setSearchJoinSchool(e.target.value)
    }

    const AddSchool = (e) => {
        e.preventDefault();
        if (getUserData().linked_email === null) {
            setAddVisible(true)
        }
        else {
            if (getUserRole() === "tutor") {
                setAddVisible(true)
            }
            else {
                Swal.fire({
                    title: "warning",
                    text: "You have already Joined School!",
                    icon: "warning",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "OK",
                })
            }
        }
    }

    // initial value for add new school
    const initialFValues = {
        school_name: '',
        reg_no: '',
        pincode: '',
        school_city: '',
        school_phone_no: '',
        school_email: '',
        school_mobile_no: "",
        school_udise_no: "",
        school_image_file: "",
        school_udise: "",
        school_image: "",
        principal: "",
        vice_principal: "",
        incharge: "",

    };

    // validation code start
    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ("school_udise_no" in fieldValues) {
            var imagePath = fieldValues.school_udise_no;
            var logo = ['jpeg', 'png', 'jpg', 'svg', 'pdf', ' bmp']
            var extension = imagePath.substring(
                imagePath.lastIndexOf(".") + 1,
                imagePath.length
            );
            if (fieldValues.school_udise_no) {
                if (logo.includes(extension)) {
                    temp.school_udise_no = "";
                } else {
                    temp.school_udise_no = "Only Jpg, png, jpg, svg, pdf and bmp  file is allowed.";
                }
            } else {
                temp.school_udise_no = "Please Upload School Usdise Form Number.";
            }
        }

        if ("school_image_file" in fieldValues) {
            var imagePath = fieldValues.school_image_file;
            var logo = ['jpeg', 'png', 'jpg', 'svg', 'bmp']
            var extension = imagePath.substring(
                imagePath.lastIndexOf(".") + 1,
                imagePath.length
            );
            if (fieldValues.school_image_file) {
                if (logo.includes(extension)) {
                    temp.school_image_file = "";
                } else {
                    temp.school_image_file = "Only Jpg, png, jpg, svg, and bmp  file is allowed.";
                }
            } else {
                temp.school_image_file = "Please Upload School  Image.";
            }
        }
        if ("school_name" in fieldValues)
            temp.school_name = fieldValues.school_name
                ? ""
                : "Please Enter School Name.";

        if ("reg_no" in fieldValues)
            temp.reg_no = fieldValues.reg_no
                ? ""
                : "Please Enter School Registration Number.";

        if ("pincode" in fieldValues)
            temp.pincode = fieldValues.pincode
                ? ""
                : "Please Enter Pincode Number.";

        if ("school_city" in fieldValues)
            temp.school_city = fieldValues.school_city
                ? ""
                : "Please Enter School City.";

        if ("school_phone_no" in fieldValues)
            temp.school_phone_no = fieldValues.school_phone_no
                ? ""
                : "Please Enter School Phone number.";

        if ("school_email" in fieldValues)
            temp.school_email = fieldValues.school_email
                ? ""
                : "Please Enter School Email Id.";

        if ("school_mobile_no" in fieldValues)
            temp.school_mobile_no = fieldValues.school_mobile_no
                ? ""
                : "Please Enter School Mobile Number.";

        if ("principal" in fieldValues)
            temp.principal = fieldValues.principal
                ? ""
                : "Please Enter School Principal.";

        if ("vice_principal" in fieldValues)
            temp.vice_principal = fieldValues.vice_principal
                ? ""
                : "Please Enter School Vice Principal.";

        if ("incharge" in fieldValues)
            temp.incharge = fieldValues.incharge
                ? ""
                : "Please Enter School incharge.";

        setErrors({
            ...temp,
        });

        if (fieldValues === values) return Object.values(temp).every((x) => x === "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);

    // Add School Form Submit
    const handleSubmit = (e) => {

        e.preventDefault();

        if (validate()) {

            let data = new FormData();

            data.append("school_name", values.school_name)
            data.append("registration_no", values.reg_no)
            data.append("school_pincode", values.pincode)
            data.append("school_city", values.school_city)
            data.append("school_phone", values.school_phone_no)
            data.append("school_email", values.school_email)
            data.append("school_mobile", values.school_mobile_no)
            data.append("principal", values.principal)
            data.append("vice_principal", values.vice_principal)
            data.append("incharge", values.incharge)
            if (values.working_start_date === "") {

                data.append("working_start_date", values.working_start_date)
            }
            if (values.working_end_date === "") {

                data.append("working_end_date", values.working_end_date)
            }


            data.append("school_attachment", values.school_udise)


            data.append("school_image", values.school_image)

            dispatch(storeMySchool(data))
            resetForm();
            setAddVisible(false)
        }
    }

    return (
        <>
            <CModal visible={addVisible} size="lg" onDismiss={() => setAddVisible(false)}>
                <CModalHeader onDismiss={() => setAddVisible(false)} className="tutorviewmodalheader">
                    <CModalTitle>Add School </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Form onSubmit={handleSubmit}>
                        <CRow>
                            <CCol xl={6} sm={6} >
                                <Controls.Input
                                    name="school_name"
                                    label="School Name *"
                                    onChange={handleInputChange}
                                    value={values.school_name}
                                    error={errors.school_name}
                                />
                            </CCol>
                            <CCol xl={6} sm={6}>
                                <Controls.Input
                                    name="reg_no"
                                    label="Registration Number *"
                                    onChange={handleInputChange}
                                    value={values.reg_no}
                                    error={errors.reg_no}
                                />
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xl={6} sm={6}>
                                <Controls.Input
                                    name="pincode"
                                    label="Pincode Number *"
                                    onChange={handleInputChange}
                                    value={values.pincode}
                                    error={errors.pincode}
                                />
                            </CCol>
                            <CCol xl={6} sm={6}>
                                <Controls.Input
                                    name="school_city"
                                    label="School City *"
                                    onChange={handleInputChange}
                                    value={values.school_city}
                                    error={errors.school_city}
                                />
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xl={6} sm={6}>
                                <Controls.Input
                                    name="school_phone_no"
                                    label="School Phone No *"
                                    onChange={handleInputChange}
                                    value={values.school_phone_no}
                                    error={errors.school_phone_no}
                                />
                            </CCol>
                            <CCol xl={6} sm={6}>
                                <Controls.Input
                                    name="school_email"
                                    label="School Email *"
                                    onChange={handleInputChange}
                                    value={values.school_email}
                                    error={errors.school_email}
                                />
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol sm={6} md={6} lg={6} xl={6}>
                                <Controls.Input
                                    name="school_mobile_no"
                                    label="School Mobile no *"
                                    onChange={handleInputChange}
                                    value={values.school_mobile_no}
                                    error={errors.school_mobile_no}
                                />
                            </CCol>

                            <CCol sm={6} md={6} lg={6} xl={6}>
                                <Controls.InputLabelShown
                                    name="school_udise_no"
                                    label="School Udise Form *"
                                    type="file"
                                    onChange={handleInputChange}
                                    value={values.school_udise_no}
                                    error={errors.school_udise_no}
                                />
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol sm={6} md={6} lg={6} xl={6} >
                                <Controls.InputLabelShown
                                    name="school_image_file"
                                    label="School Image *"
                                    type="file"
                                    onChange={handleInputChange}
                                    value={values.school_image_file}
                                    error={errors.school_image_file}
                                />
                            </CCol>
                            <CCol sm={6} md={6} lg={6} xl={6} >
                                <Controls.Input
                                    name="principal"
                                    label="School Principal *"
                                    onChange={handleInputChange}
                                    value={values.principal}
                                    error={errors.principal}
                                />
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol sm={6} md={6} lg={6} xl={6} >
                                <Controls.Input
                                    name="vice_principal"
                                    label="School Vice Principal *"
                                    onChange={handleInputChange}
                                    value={values.vice_principal}
                                    error={errors.vice_principal}
                                />
                            </CCol>
                            <CCol sm={6} md={6} lg={6} xl={6} >
                                <Controls.Input
                                    name="incharge"
                                    label="School Incharge *"
                                    onChange={handleInputChange}
                                    value={values.incharge}
                                    error={errors.incharge}
                                />
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
                                <div className="d-inline">
                                    <Controls.Button type="submit" text="Add School" className="m-1" />
                                </div>
                                <div className="d-inline">
                                    <Controls.Button
                                        className="m-1"
                                        text="reset"
                                        color="default"
                                        onClick={resetForm}
                                    />
                                </div>
                            </CCol>
                        </CRow>
                    </Form>
                </CModalBody>
            </CModal>

            <CCard className="course-card-list-css page-header-size">
                <CustomAlertControl />
                <div className="course-header">
                    <div className="col-12">
                        <div className="row mt-3 d-flex">
                            <div className="text-center col-12">
                                <div className="postsearchheader">
                                    Join School
                                    <CButton
                                        className="d-inline join-school-add-button-css"
                                        onClick={(e) => AddSchool(e)}
                                    >
                                        Add
                                    </CButton>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 row mb-3">
                            <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                            <div
                                className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 d-flex position-relative text-center"
                            >
                                <CFormInput
                                    className="searchinput rounded-pill pr-5"
                                    onChange={(event) => JoinSchoolData(event)}
                                    placeholder="Search School"
                                ></CFormInput>
                                <CButton className="searchbutton position-absolute rounded-pill">
                                    {" "}
                                    <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                                </CButton>
                            </div>
                            <div sm={1} md={3} lg={3} xl={3}></div>
                        </div>
                    </div>
                </div>
            </CCard>
            <JoinSchool search={searchJoinSchool} />
        </>

    )
}

export default TopFilter
