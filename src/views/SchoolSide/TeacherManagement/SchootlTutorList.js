import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import {
    CRow,
    CCol,
    CButton,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CBadge,
    CDropdownDivider,
    CCardHeader,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
} from "@coreui/react";
import { useForm, Form } from "src/components/formControls/useForm";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import Controls from "src/components/formControls/controls/Controls";
import Swal from "sweetalert2";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import {
    schoolTutorList,
    getUserDropDown,
    getSchoolDropDown,
    storeUser,
    deleteUser,
} from "./SchoolTutorAction";
import SchoolTutorEdit from "./EditSchoolTutor"
import { Autocomplete } from "@mui/material";
import {
    checkAccessPermission,
} from "../../../utility/utils";
import { State, City } from "country-state-city";
import { TextField } from "@material-ui/core";
import moment from "moment";

const Gender = [
    { id: "Male", title: "Male" },
    { id: "Female", title: "Female" },
    { id: "Other", title: "Other" }
];

let errorMessageState = ""
let errorMessageCity = ""

// main User List Class
const SchoolTutorList = () => {

    const dispatch = useDispatch();
    // Variable for city and state
    const [cityList, setCityList] = useState("");
    const stateList = State.getStatesOfCountry("IN");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    // Variable for Modal
    const [addUserModal, setAddUserModal] = useState(false);
    const SchoolTutor = useSelector((state) => state.SchoolTutor);
    const [viewUserModal, setViewUserModal] = useState(false);
    const [viewUserData, setViewUserData] = useState(null);
    const [password, setPassword] = useState();
    // variable for loader
    const [isLoading, setLoading] = useState(true);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [editUserData, setEditUserData] = useState(null);
    const [editUserDataModal, setEditUserDataModal] = useState(false);

    if(SchoolTutor.userEditStatusSchool == "Sucess")
    {
        setEditUserDataModal(false);
        SchoolTutor.userEditStatusSchool = ""
    }

    
    useEffect(async () => {
        showLoader();
        await dispatch(schoolTutorList({ role: "school-tutor" }));
        dispatch(getUserDropDown());
        dispatch(getSchoolDropDown())
        setLoading(false);
        hideLoader();
    }, []);

    // Initial value for school-tutor
    const initialFValues = {
        first_name: '',
        last_name: '',
        email: '',
        gender: "Male",
        phone: '',
        address: '',
        pincode: '',
        state: '',
        city: '',
        aadhar_id: '',
        password_confirmation: '',
        password: '',
        school_select: "",
        Reg_no: "",
        SchoolPincode: "",
        SchoolCity: "",
        SchoolMobile_no: "",
        SchoolPhone_no: "",
        SchoolEmail_id: "",
    };

    const schedulesToSave = [];

    // validation code start
    const validate = (fieldValues = values) => {

        let temp = { ...errors };

        if ("first_name" in fieldValues)
            temp.first_name = fieldValues.first_name ? "" : "First name is required."

        if ("last_name" in fieldValues)
            temp.last_name = fieldValues.last_name ? "" : "Last name is required."

        if ("email" in fieldValues)
            if (!fieldValues.email)
                temp.email = "Email ID is required.";
            else if (!/$^|.+@.+..+/.test(fieldValues.email))
                temp.email = "Email ID is not valid.";
            else temp.email = "";

        if ("phone" in fieldValues)
            if (fieldValues.phone == "")
                temp.phone = "Mobile number is required.";
            else if (fieldValues.phone.length > 10 || fieldValues.phone.length < 10)
                temp.phone = "Please enter only 10 numbers.";
            else if (!/^[0-9\b]+$/.test(fieldValues.phone))
                temp.phone = "Mobile number is not valid. Please enter 10 numbers.";
            else temp.phone = "";

        if ("aadhar_id" in fieldValues)
            if (fieldValues.aadhar_id == "")
                temp.aadhar_id = "";
            else if (fieldValues.aadhar_id.length > 12 || fieldValues.aadhar_id.length < 12)
                temp.aadhar_id = "Please enter only 12 numbers.";
            else if (!/^[0-9\b]+$/.test(fieldValues.aadhar_id))
                temp.aadhar_id = "Aadhar id is not valid. Please enter 12 numbers.";
            else temp.aadhar_id = "";

        if ("address" in fieldValues)
            temp.address = fieldValues.address ? "" : "Address field is required."

        if ("password" in fieldValues)
            if (fieldValues.password == "") {
                temp.password = "Please enter password.";
            }
            else if (fieldValues.password.length < 8) {
                temp.password = "Password should be 8 character long.";
            } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(fieldValues.password)) {
                temp.password = "Password should be 8 character long and should have combination of capital, small alphabets and numbers";
            }
            else {
                temp.password = "";
                setPassword(fieldValues.password)
            }

        if ("password_confirmation" in fieldValues)
            if (fieldValues.password_confirmation == "") {
                temp.password_confirmation = "Please enter confirm password.";
            }
            else if (fieldValues.password_confirmation !== password) {
                //  alert(fieldValues.password_confirmation)
                temp.password_confirmation =
                    "Password and confirm password should be same.";
            }
            else if (fieldValues.password_confirmation === password) {
                temp.password_confirmation = "";
            }
            else {
                temp.password_confirmation = "";
            }

        if ("pincode" in fieldValues)
            if (fieldValues.pincode == "")
                temp.pincode = "Pincode is required.";
            else if (fieldValues.pincode.length > 8)
                temp.pincode = "Pincode should not be more than 8 digits";
            else if (!/^[0-9\b]+$/.test(fieldValues.pincode))
                temp.pincode = "Please enter only numbers";
            else temp.pincode = "";


        setErrors({
            ...temp,
        });

        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);

    // validation code complete

    // start form handle Event
    const handleSubmit = (e) => {

        if (selectedState == "") {
            errorMessageState = "1";
        }
        if (selectedCity == "") {
            errorMessageCity = "1";
        }

        e.preventDefault();

        if (validate()) {
            setLoading(true)
            let data = new FormData()
            data.append('role', "school-tutor")
            data.append('phone', values.phone)
            data.append('first_name', values.first_name)
            data.append('last_name', values.last_name)
            data.append('gender', values.gender);
            data.append('address', values.address);
            data.append('pincode', values.pincode);
            values.birth_date = moment(values.birth_date).format("YYYY-MM-DD")
            data.append('birth_date', values.birth_date);
            data.append('state', selectedState);
            data.append('city', selectedCity);
            data.append('aadhar_id', values.aadhar_id);
            data.append('password_confirmation', values.password_confirmation);
            data.append('password', values.password);
            data.append('email', values.email);

            data.append("Syllabus_id", values.Syllabus_id)
            data.append("class_id", values.class_id);
            data.append("section_id", values.section_id);

            setLoading(true);
            showLoader();
            dispatch(storeUser(data));
            resetForm();
            setAddUserModal(false);
            setLoading(false);
            hideLoader();

        }
    }
    // End form Handle Event

    // School-tutor list column
    const columns = [
        {
            title: "Tp Id",
            field: "user_details.tp_id"
        },
        {
            title: "Name",
            field: "name",
            render: rowData => rowData.first_name + " " + rowData.last_name
        },
        {
            title: "Email",
            field: "email"
        },
    ];

    // View User
    const userView = (data) => {
        setViewUserModal(true);
        setViewUserData(data);
    }

    // Delete User Event
    const handleConfirmCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You Want to delete the User!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteUser({ id: id }))

                }
            });
    };

    // handle state change
    const handleStateChange = (value) => {
        if (value !== null) {
            setCityList(City.getCitiesOfState('IN', value.isoCode))
            setSelectedState(value.name)
            errorMessageState = ""
        }
        else {
            errorMessageState = "1"
        }
    }

    // handle city Change
    function handleCitySelect(value) {
        if (value !== null) {
            setSelectedCity(value.name);
            errorMessageCity = ""
        }
        else {
            errorMessageCity = "1"
        }
    }

    // user Edit Data Modal open
    const userEditData = (item) => {
        setEditUserData(item);
        setEditUserDataModal(true);
    }

    return (
        <>
            {isLoading ? (
                <>{loader}</>
            ) :
                <div>
                    <CRow className="p-3">
                        <CCol xl={12} sm={12} className="card-title font-weight-bold">
                            Manage School Teacher
                            {
                                checkAccessPermission('user_add') ? <>
                                    <CButton
                                        className="d-inline textbook-add-button-css w-auto "
                                        onClick={() => setAddUserModal(!addUserModal)}
                                    >
                                        Add
                                    </CButton></> : null
                            }
                        </CCol>
                    </CRow>

                    <div className="p-3 text-center">
                        <MaterialTable
                            title=""
                            data={SchoolTutor.schoolTutorData}
                            columns={columns}
                            options={{
                                actionsColumnIndex: -1,
                                search: true,
                                selection: true,
                                filtering: true,
                                searchFieldAlignment: "right",
                                pageSize: 5,
                                pageSizeOptions: [5, 10, 15],
                                headerStyle: {
                                    backgroundColor: "#DEDDF4",
                                    color: "#444346",
                                    fontWeight: "600",
                                    fontSize: "15px",
                                },
                            }}
                            actions={[
                                {
                                    icon: "visibilityicon",
                                    tooltip: "View",
                                    onClick: (event, rowData) => userView(rowData),
                                    position: "row",
                                    iconProps: { style: { color: '#321fdb' } },
                                },
                                {
                                    icon: 'create',
                                    tooltip: 'Edit',
                                    onClick: (event, rowData) => userEditData(rowData),
                                    position: "row",
                                    iconProps: { style: { color: '#e49e07' } },
                                    disabled: !checkAccessPermission('user_edit')
                                },
                                {
                                    icon: 'delete',
                                    tooltip: 'Delete',
                                    onClick: (event, rowData) => handleConfirmCancel(rowData.id),
                                    position: "row",
                                    iconProps: { style: { color: '#c92020' } },
                                    disabled: !checkAccessPermission('user_delete')
                                },
                            ]}
                        />
                    </div>

                    {/* Add User Modal  */}
                    <CModal visible={addUserModal} size="xl" onDismiss={() => setAddUserModal(false)}>
                        <CModalHeader onDismiss={() => setAddUserModal(false)} className="tutorviewmodalheader">
                            <CModalTitle>Add Tutor</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <Form onSubmit={handleSubmit}>
                                <CRow>
                                    <CCol xl={6} sm={6} className="">
                                        <Controls.Input
                                            name="first_name"
                                            label="First name *"
                                            value={values.first_name}
                                            onChange={handleInputChange}
                                            error={errors.first_name}
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="">
                                        <Controls.Input
                                            name="last_name"
                                            label="Last Name *"
                                            value={values.last_name}
                                            onChange={handleInputChange}
                                            error={errors.last_name}
                                        />
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xl={6} sm={6} className="">
                                        <Controls.Input
                                            name="aadhar_id"
                                            label="Aadhar Number"
                                            value={values.aadhar_id}
                                            onChange={handleInputChange}
                                            error={errors.aadhar_id}
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="">
                                        <Controls.Input
                                            name="email"
                                            label="Email *"
                                            value={values.email}
                                            onChange={handleInputChange}
                                            error={errors.email}
                                        />
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xl={6} sm={6} className="">
                                        <Controls.RadioGroup
                                            name="gender"
                                            label="Gender *"
                                            value={values.gender}
                                            onChange={handleInputChange}
                                            items={Gender}
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="">
                                        <Controls.Input
                                            name="phone"
                                            label="Mobile No *"
                                            value={values.phone}
                                            onChange={handleInputChange}
                                            error={errors.phone}
                                        />
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol sm={6} md={6} lg={6} xl={6} className="">
                                        <Controls.DatePicker
                                            name="birth_date"
                                            label="Date Of Birth"
                                            value={values.birth_date}
                                            onChange={handleInputChange}
                                            // maxDate={new Date()}
                                            futureDateStatus={true}
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="">
                                        <Controls.Input
                                            name="password"
                                            label="Password *"
                                            value={values.password}
                                            onChange={handleInputChange}
                                            error={errors.password}
                                            type="password"
                                        />
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xl={6} sm={6} className="">
                                        <Controls.Input
                                            name="password_confirmation"
                                            label="Confirm Password*"
                                            value={values.password_confirmation}
                                            onChange={handleInputChange}
                                            error={errors.password_confirmation}
                                            type="password"
                                        />
                                    </CCol>
                                </CRow>

                                <div className="d-flex flex-row mt-3">
                                    <div className="p-2">
                                        <FontAwesomeIcon icon={faAddressCard} />
                                    </div>
                                    <div className="p-2">
                                        <div className="d-inline">Address Details</div>
                                    </div>
                                </div>

                                <CDropdownDivider className="" />

                                <CRow className="mt-3">
                                    <CCol xl={12} sm={12} className="">
                                        <Controls.CustomTextArea
                                            label="Address *"
                                            rows={2}
                                            name="address"
                                            value={values.address}
                                            onChange={handleInputChange}
                                            error={errors.address}
                                        />
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xl={6} sm={6} className="">
                                        <Autocomplete
                                            options={State.getStatesOfCountry('IN')}
                                            getOptionLabel={(option) => option.name}
                                            name="state"
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select State *"
                                                    variant="outlined"
                                                    autoComplete='off'
                                                    fullWidth
                                                />
                                            )}
                                            onChange={(event, value) => handleStateChange(value)}
                                        />
                                        {errorMessageState == "" ?
                                            ""
                                            :
                                            <>
                                                <p className="adminusererromessage" >Please Select a State.</p>
                                            </>
                                        }
                                    </CCol>
                                    <CCol xl={6} sm={6} className="">
                                        {selectedState == "" ? "" :
                                            <>
                                                <Autocomplete
                                                    options={cityList}
                                                    getOptionLabel={(option) => option.name}
                                                    name="city"
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Select City *"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    )}
                                                    onChange={(event, value) => handleCitySelect(value)}
                                                />
                                                {errorMessageCity == "" ?
                                                    ""
                                                    :
                                                    <p className="adminusererromessage">Please Select a city.</p>
                                                }
                                            </>
                                        }
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xl={6} sm={6} className="">
                                        <Controls.Input
                                            name="pincode"
                                            label="Pincode *"
                                            value={values.pincode}
                                            onChange={handleInputChange}
                                            error={errors.pincode}
                                        />
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
                                        <div className="d-inline">
                                            <Controls.Button type="submit" text="Add Tutor" className="m-1" />
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

                    {/* View User Modal */}
                    <CModal visible={viewUserModal} size="lg" onDismiss={() => setViewUserModal(false)}>
                        <CModalHeader onDismiss={() => setViewUserModal(false)} className="tutorviewmodalheader">
                            <CModalTitle>View User</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div className="row p-3 justify-content-around">
                                <div className="border tuitionimage my-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="row border viewmodalcolor font-weight-bold viewmodalcoursedaetail" >
                                        <CCardHeader style={{ fontSize: 18 }} className="card-title text-dark">User Details</CCardHeader>
                                    </div>

                                    <div className="p-3">
                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                TP-ID {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.tp_id == null ? "N/A" : viewUserData && viewUserData.user_details.tp_id}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Name {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.first_name == null ? "N/A" : viewUserData && viewUserData.first_name + " " + viewUserData.last_name}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Email {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.email == null ? "N/A" : viewUserData && viewUserData.email}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Gender {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.gender == null ? "N/A" : viewUserData && viewUserData.user_details.gender}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Contact No {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.phone == null ? "N/A" : viewUserData && viewUserData.user_details.phone}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                City {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.city == null ? "N/A" : viewUserData && viewUserData.user_details.city}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Role {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.role_name == null ? "N/A" : viewUserData && viewUserData.role_name}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Address {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.address == null ? "N/A" : viewUserData && viewUserData.user_details.address}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Area {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.area == null ? "N/A" : viewUserData && viewUserData.user_details.area}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Birth-Date {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.birth_date == null ? "N/A" : viewUserData && viewUserData.user_details.birth_date}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Country {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.country == null ? "N/A" : viewUserData && viewUserData.user_details.country}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Pincode {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.pincode == null ? "N/A" : viewUserData && viewUserData.user_details.pincode}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                State {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.state == null ? "N/A" : viewUserData && viewUserData.user_details.state}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Status {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.is_verified == 0 ?
                                                    <CBadge color="danger">Not Verified</CBadge>
                                                    :
                                                    <CBadge color="primary">Verified</CBadge>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {viewUserData && viewUserData.role_name == "school-tutor" ?

                                <div className="row mt-3">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        {viewUserData.school !== undefined &&
                                            <>
                                                <CCardHeader className="card-title cardtitle font-weight-bold card-title text-dark">
                                                    School Details
                                                </CCardHeader>
                                                <CTable bordered responsive>
                                                    <CTableHead>
                                                        <CTableRow>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                School-Name
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                Email
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                City
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                Registration Number
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                Mobile Number
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                Pincode
                                                            </CTableHeaderCell>
                                                        </CTableRow>
                                                    </CTableHead>

                                                    <CTableBody>
                                                        <CTableRow key="index">
                                                            <CTableDataCell scope="row">
                                                                {viewUserData.school.school_name}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {viewUserData.school.email}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {viewUserData.school.city}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {viewUserData.school.registration_no}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {viewUserData.school.mobile}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {viewUserData.school.pincode}
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                    </CTableBody>
                                                </CTable>
                                            </>
                                        }
                                    </div>
                                </div>
                                :
                                ""
                            }
                        </CModalBody>
                    </CModal>

                    {/* User Edit Data Modal */}

                        <CModal
                            visible={editUserDataModal}
                            size="xl"
                            onDismiss={() => setEditUserDataModal(false)}
                        >
                            <CModalHeader
                                onDismiss={() => setEditUserDataModal(false)}
                                className="tutorviewmodalheader"
                            >
                                <CModalTitle>Edit User</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <SchoolTutorEdit data={editUserData} />
                            </CModalBody>
                        </CModal>

                    
                </div>
            }
        </>
    )
}

export default SchoolTutorList
