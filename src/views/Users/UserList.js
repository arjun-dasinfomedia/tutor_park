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
    getUserList,
    storeUser,
    deleteUser,
    getUserDropDown,
    getSchoolDropDown,
    schoolClassBySyllabus,
    schoolDivisionByClass,
} from "./userAction";
import { Autocomplete } from "@mui/material";
import {
    getAllRoles,
    getAllTeachingMode,
    getAllLanguages,
} from "../../utility/utils";
import { State, City } from "country-state-city";
import { TextField } from "@material-ui/core";
import moment from "moment";
import EditUser from "./EditUser";
import {
    syllabusListData,
} from "../../redux/actions/dropdowns/index";

const Gender = [
    { id: "Male", title: "Male" },
    { id: "Female", title: "Female" },
    { id: "Other", title: "Other" }
];

const SchoolType = [
    { id: "existing", title: "Existing" },
    { id: "new", title: "New" },
];

let errorMessageState = ""
let errorMessageCity = ""

// main User List Class
const UserList = () => {

    const dispatch = useDispatch();
    // Variable for city and state
    const [cityList, setCityList] = useState("");
    const stateList = State.getStatesOfCountry("IN");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    // Variable for Modal
    const [addUserModal, setAddUserModal] = useState(false);
    const userState = useSelector((state) => state.user);
    const [viewUserModal, setViewUserModal] = useState(false);
    const [viewUserData, setViewUserData] = useState(null);
    const [password, setPassword] = useState();
    // variable for loader
    const [isLoading, setLoading] = useState(true);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [editUserData, setEditUserData] = useState(null);
    const [editUserDataModal, setEditUserDataModal] = useState(false);
    const DropDown = useSelector((state) => state.dropdowns);
    const [syllabusID, setSyllabusId] = useState("");
    const [classId, setClassId] = useState("");
    let role_filter = []

    // console.log(getAllRoles())

    if (userState.userEditStatus = "sucess" || userState.userEditStatusSchool === "sucessschool") {
        setEditUserDataModal(false)
        userState.userEditStatus = ""
        userState.userEditStatusSchool = ""


    }

    // initial value for add new user
    const initialFValues = {
        role_name: '',
        first_name: '',
        last_name: '',
        email: '',
        gender: "Male",
        phone: '',
        topic: '',
        mode_of_teaching: '',
        cost: '',
        facebook: '',
        linkedin: '',
        twitter: '',
        instagram: '',
        language: '',
        address: '',
        pincode: '',
        state: '',
        city: '',
        aadhar_id: '',
        password_confirmation: '',
        password: '',
        birth_date: moment(),
        child_name: [],
        school_select: "",
        SchoolType: "existing",
        school_name: "",
        Reg_no: "",
        SchoolPincode: "",
        SchoolCity: "",
        SchoolMobile_no: "",
        SchoolPhone_no: "",
        SchoolEmail_id: "",
        image: "",
        image_name: "",
        attachment_name: "",
        attachment: "",
        principal: "",
        vice_principal: "",
        incharge: "",
        working_start_date: moment(),
        working_end_date: moment(),
        syllabus_id: "",
        school_class_id: "",
        school_class_division_id: "",
    };

    const schedulesToSave = [];

    // validation code start
    const validate = (fieldValues = values) => {

        let temp = { ...errors };

        if (values.role_name === "school-admin" || values.role_name === "school-tutor") {

            if (values.SchoolType === "existing") {

                if ("school_select" in fieldValues)
                    temp.school_select = fieldValues.school_select ? "" : "Please Select a School "
            }

            if (values.SchoolType === "new") {

                if ("attachment_name" in fieldValues) {
                    var imagePath = fieldValues.attachment_name;
                    var logo = ['jpeg', 'png', 'jpg', 'svg', 'pdf', ' bmp']
                    var extension = imagePath.substring(
                        imagePath.lastIndexOf(".") + 1,
                        imagePath.length
                    );
                    if (fieldValues.attachment_name) {
                        if (logo.includes(extension)) {
                            temp.attachment_name = "";
                        } else {
                            temp.attachment_name = "Only Jpg, png, jpg, svg, pdf and bmp  file is allowed.";
                        }
                    } else {
                        temp.attachment_name = "Please Upload School Usdise Form Number.";
                    }
                }

                if ("image_name" in fieldValues) {
                    var imagePath = fieldValues.image_name;
                    var logo = ['jpeg', 'png', 'jpg', 'svg', 'bmp']
                    var extension = imagePath.substring(
                        imagePath.lastIndexOf(".") + 1,
                        imagePath.length
                    );
                    if (fieldValues.image_name) {
                        if (logo.includes(extension)) {
                            temp.image_name = "";
                        } else {
                            temp.image_name = "Only Jpg, png, jpg, svg, and bmp  file is allowed.";
                        }
                    } else {
                        temp.image_name = "Please Upload School  Image.";
                    }
                }
                if ("SchoolEmail_id" in fieldValues)
                    if ("SchoolEmail_id" in fieldValues)
                        if (!fieldValues.SchoolEmail_id)
                            temp.SchoolEmail_id = "School Email iD is required.";
                        else if (!/$^|.+@.+..+/.test(fieldValues.SchoolEmail_id))
                            temp.SchoolEmail_id = "School Email is not valid.";
                        else temp.SchoolEmail_id = "";

                if ("SchoolMobile_no" in fieldValues)
                    if (fieldValues.SchoolMobile_no === "")
                        temp.SchoolMobile_no = "School Mobile number is required.";
                    else if (fieldValues.SchoolMobile_no.length > 10 || fieldValues.SchoolMobile_no.length < 10)
                        temp.SchoolMobile_no = "Please enter only 10 numbers.";
                    else if (!/^[0-9\b]+$/.test(fieldValues.SchoolMobile_no))
                        temp.SchoolMobile_no = "School Mobile number is not valid. Please enter 10 numbers.";
                    else temp.SchoolMobile_no = "";

                if ("SchoolPhone_no" in fieldValues)
                    if (fieldValues.SchoolPhone_no === "")
                        temp.SchoolPhone_no = "School Phone number is required.";
                    else if (fieldValues.SchoolPhone_no.length > 10 || fieldValues.SchoolPhone_no.length < 10)
                        temp.SchoolPhone_no = "Please enter only 10 numbers.";
                    else if (!/^[0-9\b]+$/.test(fieldValues.SchoolPhone_no))
                        temp.SchoolPhone_no = "School Phone number is not valid. Please enter 10 numbers.";
                    else temp.SchoolPhone_no = "";

                if ("school_name" in fieldValues)
                    temp.school_name = fieldValues.school_name ? "" : "School name is required."

                if ("principal" in fieldValues)
                    temp.principal = fieldValues.principal ? "" : "School Principal name is required."

                if ("vice_principal" in fieldValues)
                    temp.vice_principal = fieldValues.vice_principal ? "" : "School vice principal name is required."

                if ("incharge" in fieldValues)
                    temp.incharge = fieldValues.incharge ? "" : "School incharge name is required."

                if ("SchoolCity" in fieldValues)
                    temp.SchoolCity = fieldValues.SchoolCity ? "" : "School City is required."

                if ("Reg_no" in fieldValues)
                    if (fieldValues.Reg_no === "")
                        temp.Reg_no = "Registration number is required.";
                    else temp.Reg_no = "";

                if ("SchoolPincode" in fieldValues)
                    if (fieldValues.SchoolPincode === "")
                        temp.SchoolPincode = "Pincode number is required.";

                    else if (!/^[0-9\b]+$/.test(fieldValues.SchoolPincode))
                        temp.SchoolPincode = "Pincode Number is not valid.";
                    else temp.SchoolPincode = "";
            }

        }

        if ("first_name" in fieldValues)
            temp.first_name = fieldValues.first_name ? "" : "First name is required."

        if ("last_name" in fieldValues)
            temp.last_name = fieldValues.last_name ? "" : "Last name is required."

        if ("email" in fieldValues)
            if (!fieldValues.email)
                temp.email = "Email iD is required.";
            else if (!/$^|.+@.+..+/.test(fieldValues.email))
                temp.email = "Email is not valid.";
            else temp.email = "";

        if ("phone" in fieldValues)
            if (fieldValues.phone === "")
                temp.phone = "Mobile number is required.";
            else if (fieldValues.phone.length > 10 || fieldValues.phone.length < 10)
                temp.phone = "Please enter only 10 numbers.";
            else if (!/^[0-9\b]+$/.test(fieldValues.phone))
                temp.phone = "Mobile number is not valid. Please enter 10 numbers.";
            else temp.phone = "";

        if ("role_name" in fieldValues)
            temp.role_name = fieldValues.role_name ? "" : "Please select a role."

        if (values.role_name === "tutor") {

            if ("cost" in fieldValues)
                if (fieldValues.cost === "")
                    temp.cost = "Cost is required.";
                else if (!/^[0-9\b]+$/.test(fieldValues.cost))
                    temp.cost = "Cost is not valid. Please enter only numbers";
                else temp.cost = "";

            if ("topic" in fieldValues)
                temp.topic = fieldValues.topic ? "" : "Topic field is required."

            if ("language" in fieldValues)
                temp.language = fieldValues.language ? "" : "Please select a language field."

            if ("mode_of_teaching" in fieldValues)
                temp.mode_of_teaching = fieldValues.mode_of_teaching ? "" : "Please select a teaching mode."

        }

        if ("aadhar_id" in fieldValues)
            if (fieldValues.aadhar_id === "")
                temp.aadhar_id = "";
            else if (fieldValues.aadhar_id.length > 12 || fieldValues.aadhar_id.length < 12)
                temp.aadhar_id = "Please enter only 12 numbers.";
            else if (!/^[0-9\b]+$/.test(fieldValues.aadhar_id))
                temp.aadhar_id = "Aadhar id is not valid. Please enter 12 numbers.";
            else temp.aadhar_id = "";

        if ("address" in fieldValues)
            temp.address = fieldValues.address ? "" : "Address field is required."

        if ("password" in fieldValues)
            if (fieldValues.password === "") {
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
            if (fieldValues.password_confirmation === "") {
                temp.password_confirmation = "Please enter confirm password.";
            }
            else if (fieldValues.password_confirmation !== password) {
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
            if (fieldValues.pincode === "")
                temp.pincode = "Pincode is required.";
            else if (fieldValues.pincode.length > 8)
                temp.pincode = "Pincode should not be more than 8 digits";
            else if (!/^[0-9\b]+$/.test(fieldValues.pincode))
                temp.pincode = "Please enter only numbers";
            else temp.pincode = "";


        setErrors({
            ...temp,
        });

        if (fieldValues === values) return Object.values(temp).every((x) => x === "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);
    // Validation Code End

    useEffect(async () => {
        showLoader();
        await dispatch(getUserList());
        dispatch(getUserDropDown({ role: "student" }));
        dispatch(getSchoolDropDown())
        dispatch(syllabusListData());

        setLoading(false);
        hideLoader();
        stateList.forEach((state) => {
            if (state.name === selectedState) {
                setCityList(City.getCitiesOfState("IN", state.isoCode));
            }
        });


    }, []);
    getAllRoles().map(function (item, key) {


        if (item.name !== 'School Tutor' && item.name !== 'School Student') {

            role_filter.push({ id: item.id, name: item.name });

        }
    });


    // Handle Syllabus Select
    const handleSyllabusSelect = (id) => {
        if (id !== null) {
            setSyllabusId(id)
            dispatch(schoolClassBySyllabus({ syllabus_id: id }));
        }
    }

    // Handle Class Select
    const handleClassSelect = (id) => {
        if (id !== null) {
            setClassId(id)
            dispatch(schoolDivisionByClass({ class_id: id }));
        }
    }

    // start form handle Event
    const handleSubmit = (e) => {

        if (selectedState === "") {

            errorMessageState = "1";
        }
        if (selectedCity === "") {

            errorMessageCity = "1";
        }
        e.preventDefault();

        if (validate()) {

            let data = new FormData()
            data.append('role', values.role_name)
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

            if (values.role_name === 'parent') {
                schedulesToSave.push(values.child_name)
                data.append('childs[]', schedulesToSave);
            }

            if (values.role_name === "school-student") {
                data.append("syllabus_id", syllabusID);
                data.append("school_class_id", classId);
                data.append("school_type", "existing")
                data.append("school_id", values.school_select);
                data.append("school_class_division_id", values.school_class_division_id);
            }
            if (values.role_name === "school-admin" || values.role_name === "school-tutor") {
                if (values.SchoolType === "existing") {
                    data.append("school_type", values.SchoolType)
                    data.append("school_id", values.school_select);
                }

                if (values.SchoolType === "new") {

                    data.append("school_type", values.SchoolType);
                    data.append("school_name", values.school_name)
                    data.append("registration_no", values.Reg_no)
                    data.append("school_pincode", values.SchoolPincode)
                    data.append("school_city", values.SchoolCity)
                    data.append("school_mobile", values.SchoolMobile_no)
                    data.append("school_phone", values.SchoolPhone_no)
                    data.append("school_email", values.SchoolEmail_id)
                    data.append("school_image", values.image)
                    data.append("school_attachment", values.attachment)
                    data.append("principal", values.principal);
                    data.append("vice_principal", values.vice_principal);
                    data.append("incharge", values.incharge);
                    data.append("working_start_date", values.working_start_date);
                    data.append("working_end_date", values.working_end_date)

                }
            }

            if (values.role_name === 'tutor') {

                data.append('topic', values.topic);
                data.append('mode_of_classes', values.mode_of_teaching);
                data.append('online_cost_per_hour', values.cost);
                data.append('fb_url', values.facebook);
                data.append('li_url', values.linkedin);
                data.append('tw_url', values.twitter);
                data.append('insta_url', values.instagram);
                data.append('language', values.language);
            }

            dispatch(storeUser(data));
            resetForm();
            setAddUserModal(false);
        }
    }
    // End form Handle Event

    // Column For User List
    const columns = [
        {
            title: "TP_ID",
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
        {
            title: "Gender",
            field: "user_details.gender",
            render: rowData => rowData.user_details.gender.charAt(0).toUpperCase() + rowData.user_details.gender.slice(1)
        },
        {
            title: "Contact No",
            field: "user_details.phone",
        },
        {
            title: "DOB",
            field: "user_details.birth_date",
        },
        {
            title: "City",
            field: "user_details.city",
        },
        {
            title: "Role",
            field: "role_name",
            render: rowData => rowData.role_name === null ? "N/A" : rowData.role_name.charAt(0).toUpperCase() + rowData.role_name.slice(1),
            lookup: { tutor: 'Tutor', student: 'Student' },
        },
        {
            title: "Status",
            field: "is_verified",
            render: rowData => rowData.is_verified === 0 ? <CBadge color="danger">Not Verified</CBadge> : <CBadge color="primary">Verified</CBadge>
        },
    ];

    // View User
    const userView = (data) => {
        setViewUserModal(true);
        setViewUserData(data);
    }

    const ClearValues = () => {
        errors.school_name = ""
        errors.Reg_no = ""
        errors.SchoolPincode = ""
        errors.SchoolCity = ""
        errors.SchoolMobile_no = ""
        errors.SchoolPhone_no = ""
        errors.SchoolEmail_id = ""
        errors.image_name = ""
        errors.principal = ""
        errors.vice_principal = ""
        errors.incharge = ""
        errors.attachment_name = ""
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
                    Swal.fire("Success", "User Deleted Successfully", "success");
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

    // User Edit Data Modal Open
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
                            Manage User
                            <CButton
                                className="d-inline textbook-add-button-css w-auto "
                                onClick={() => setAddUserModal(!addUserModal)}
                            >
                                Add
                            </CButton>
                        </CCol>
                    </CRow>

                    <div className="p-3 text-center">
                        <MaterialTable
                            title=""
                            data={userState.userList}
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
                                },
                                {
                                    icon: 'delete',
                                    tooltip: 'Delete',
                                    onClick: (event, rowData) => handleConfirmCancel(rowData.id),
                                    position: "row",
                                    iconProps: { style: { color: '#c92020' } },
                                },
                            ]}
                        />
                    </div>

                    {/* Add User Modal  */}
                    <CModal visible={addUserModal} size="xl" onDismiss={() => setAddUserModal(false)} onClick={resetForm}>
                        <CModalHeader onDismiss={() => setAddUserModal(false)} className="tutorviewmodalheader" onClick={resetForm}>
                            <CModalTitle>Add User</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <Form onSubmit={handleSubmit}>
                                <CRow>
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Controls.Input
                                            name="first_name"
                                            label="First name *"
                                            value={values.first_name}
                                            onChange={handleInputChange}
                                            error={errors.first_name}
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
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
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Controls.Input
                                            name="aadhar_id"
                                            label="Aadhar Number"
                                            value={values.aadhar_id}
                                            onChange={handleInputChange}
                                            error={errors.aadhar_id}
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
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
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Controls.RadioGroup
                                            name="gender"
                                            label="Gender *"
                                            value={values.gender}
                                            onChange={handleInputChange}
                                            items={Gender}
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
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
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Controls.Select
                                            name="role_name"
                                            label="Select User Role *"
                                            value={values.role_name}
                                            options={role_filter}
                                            onChange={handleInputChange}
                                            error={errors.role_name}
                                        />
                                    </CCol>

                                    {values.role_name == "parent" ?
                                        <>
                                            <CCol xl={6} sm={6} className="mb-3">
                                                <Controls.Select
                                                    name="child_name"
                                                    label="Select Children *"
                                                    value={values.child_name}
                                                    options={userState.userListDropDown}
                                                    onChange={handleInputChange}
                                                    dropDownType="parent"
                                                />
                                            </CCol>
                                        </>
                                        :
                                        ""
                                    }

                                    {values.role_name == "tutor" ?
                                        <>
                                            <CCol xl={6} sm={6} className="mb-3">
                                                <Controls.Input
                                                    name="topic"
                                                    label="Topic's *"
                                                    value={values.topic}
                                                    onChange={handleInputChange}
                                                    error={errors.topic}
                                                />
                                            </CCol>
                                            <CCol xl={6} sm={6} className="mb-3">
                                                <Controls.Select
                                                    name="mode_of_teaching"
                                                    label="Mode of Teaching *"
                                                    value={values.mode_of_teaching}
                                                    options={getAllTeachingMode()}
                                                    onChange={handleInputChange}
                                                    error={errors.mode_of_teaching}
                                                />
                                            </CCol>
                                            <CCol xl={6} sm={6} className="mb-3">
                                                <Controls.Input
                                                    name="cost"
                                                    label="Cost Per Hour *"
                                                    value={values.cost}
                                                    onChange={handleInputChange}
                                                    error={errors.cost}
                                                />
                                            </CCol>
                                            <CCol xl={6} sm={6} className="mb-3">
                                                <Controls.Input
                                                    name="facebook"
                                                    label="FaceBook URL"
                                                    value={values.facebook}
                                                    onChange={handleInputChange}
                                                    error={errors.facebook}
                                                />
                                            </CCol>
                                            <CCol xl={6} sm={6} className="mb-3">
                                                <Controls.Input
                                                    name="linkedin"
                                                    label="Linkedin URL"
                                                    value={values.linkedin}
                                                    onChange={handleInputChange}
                                                    error={errors.linkedin}
                                                />
                                            </CCol>
                                            <CCol xl={6} sm={6} className="mb-3">
                                                <Controls.Input
                                                    name="twitter"
                                                    label="Twitter URL"
                                                    value={values.twitter}
                                                    onChange={handleInputChange}
                                                    error={errors.twitter}
                                                />
                                            </CCol>
                                            <CCol xl={6} sm={6} className="mb-3">
                                                <Controls.Input
                                                    name="instagram"
                                                    label="Instagram URL"
                                                    value={values.instagram}
                                                    onChange={handleInputChange}
                                                    error={errors.instagram}
                                                />
                                            </CCol>
                                            <CCol xl={6} sm={6} className="mb-3">
                                                <Controls.Select
                                                    name="language"
                                                    label="Languages *"
                                                    value={values.language}
                                                    options={getAllLanguages()}
                                                    onChange={handleInputChange}
                                                    error={errors.language}
                                                />
                                            </CCol>
                                        </>
                                        :
                                        ""
                                    }

                                    <CCol sm={6} md={6} lg={6} xl={6} className="mb-3">
                                        <Controls.DatePicker
                                            name="birth_date"
                                            label="Date Of Birth"
                                            value={values.birth_date}
                                            onChange={handleInputChange}
                                            // maxDate={new Date()}
                                            futureDateStatus={true}
                                        />
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Controls.Input
                                            name="password"
                                            label="Password *"
                                            value={values.password}
                                            onChange={handleInputChange}
                                            error={errors.password}
                                            type="password"
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
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
                                {values.role_name === "school-student" ?


                                    <>
                                        <div className="d-flex flex-row mt-3">
                                            <div className="p-2">
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>
                                            <div className="p-2">
                                                <div className="d-inline">School Details</div>
                                            </div>
                                        </div>

                                        <CRow>
                                            <CCol sm={6} md={6} lg={6} xl={6} className="mb-3">

                                                <Autocomplete
                                                    options={DropDown.syllabusList}
                                                    getOptionLabel={(option) => option.name}
                                                    name="syllabus_id"
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Syllabus *"
                                                            variant="outlined"
                                                            autoComplete='off'
                                                            fullWidth
                                                        />
                                                    )}
                                                    onChange={(event, value) => handleSyllabusSelect(value.id)}
                                                />
                                            </CCol>
                                            <CCol xl={6} sm={6} className="mb-3">
                                                <Autocomplete
                                                    options={userState.schoolClassList}
                                                    getOptionLabel={(option) => option.name}
                                                    name="school_class_id"
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Class *"
                                                            variant="outlined"
                                                            autoComplete='off'
                                                            fullWidth
                                                        />
                                                    )}
                                                    onChange={(event, value) => handleClassSelect(value.id)}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol sm={6} md={6} lg={6} xl={6} className="mb-3">
                                                <Controls.Select
                                                    name="school_class_division_id"
                                                    label="School Division *"
                                                    value={values.school_class_division_id}
                                                    options={userState.schoolDivisionList}
                                                    onChange={handleInputChange}
                                                    error={errors.school_class_division_id}
                                                />
                                            </CCol>
                                            <CCol xl={6} sm={6} className="mb-3">
                                                <Controls.Select
                                                    name="school_select"
                                                    label="Select School *"
                                                    value={values.school_select}
                                                    options={userState.schoolListDropDown}
                                                    onChange={handleInputChange}
                                                    error={errors.school_select}
                                                    dropDownType="other"
                                                />
                                            </CCol>
                                        </CRow>
                                    </>

                                    : ""}
                                {values.role_name === "school-admin" || values.role_name === "school-tutor" ?
                                    <>
                                        <div className="d-flex flex-row mt-3">
                                            <div className="p-2">
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>
                                            <div className="p-2">
                                                <div className="d-inline">School Details</div>
                                            </div>
                                        </div>

                                        <CDropdownDivider className="mb-2" />

                                        <CCol sm={6} md={6} lg={6} xl={6} className="mb-3">
                                            <Controls.RadioGroup
                                                name="SchoolType"
                                                label="School Type *"
                                                value={values.SchoolType}
                                                onChange={handleInputChange}
                                                items={SchoolType}
                                            />
                                        </CCol>

                                        {values.SchoolType === "existing" ?
                                            <>
                                                <CCol xl={6} sm={6} className="mb-3">
                                                    <Controls.Select
                                                        name="school_select"
                                                        label="Select School *"
                                                        value={values.school_select}
                                                        options={userState.schoolListDropDown}
                                                        onChange={handleInputChange}
                                                        error={errors.school_select}
                                                        dropDownType="other"
                                                    />
                                                </CCol>
                                            </>
                                            :
                                            ""
                                        }

                                        {values.SchoolType === "new" ?
                                            <>
                                                <CRow>
                                                    <CCol xl={6} sm={6} className="mb-3">
                                                        <Controls.Input
                                                            name="school_name"
                                                            label="School Name *"
                                                            value={values.school_name}
                                                            onChange={handleInputChange}
                                                            error={errors.school_name}
                                                        />
                                                    </CCol>
                                                    <CCol xl={6} sm={6}>
                                                        <Controls.Input
                                                            name="Reg_no"
                                                            label="Registration Number *"
                                                            value={values.Reg_no}
                                                            onChange={handleInputChange}
                                                            error={errors.Reg_no}
                                                        />
                                                    </CCol>
                                                </CRow>

                                                <CRow className="">
                                                    <CCol xl={6} sm={6}>
                                                        <Controls.Input
                                                            name="SchoolPincode"
                                                            label="School Pincode *"
                                                            value={values.SchoolPincode}
                                                            onChange={handleInputChange}
                                                            error={errors.SchoolPincode}
                                                        />
                                                    </CCol>
                                                    <CCol xl={6} sm={6}>
                                                        <Controls.Input
                                                            name="SchoolCity"
                                                            label="School City *"
                                                            value={values.SchoolCity}
                                                            onChange={handleInputChange}
                                                            error={errors.SchoolCity}
                                                        />
                                                    </CCol>
                                                </CRow>

                                                <CRow className="">
                                                    <CCol xl={6} sm={6}>
                                                        <Controls.Input
                                                            name="SchoolPhone_no"
                                                            label="School Phone No *"
                                                            value={values.SchoolPhone_no}
                                                            onChange={handleInputChange}
                                                            error={errors.SchoolPhone_no}
                                                        />
                                                    </CCol>
                                                    <CCol xl={6} sm={6}>
                                                        <Controls.Input
                                                            name="SchoolEmail_id"
                                                            label="School Email *"
                                                            value={values.SchoolEmail_id}
                                                            onChange={handleInputChange}
                                                            error={errors.SchoolEmail_id}
                                                        />
                                                    </CCol>
                                                </CRow>

                                                <CRow className="">
                                                    <CCol sm={6} md={6} lg={6} xl={6} className="mb-3">
                                                        <Controls.Input
                                                            name="SchoolMobile_no"
                                                            label="Mobile no *"
                                                            value={values.SchoolMobile_no}
                                                            onChange={handleInputChange}
                                                            error={errors.SchoolMobile_no}
                                                        />
                                                    </CCol>
                                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                                        <Controls.InputLabelShown
                                                            label="Attachment Udise *"
                                                            type="file"
                                                            name="attachment_name"
                                                            value={values.attachment_name}
                                                            onChange={handleInputChange}
                                                            error={errors.attachment_name}
                                                        />
                                                    </CCol>
                                                </CRow>

                                                <CRow>
                                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                                        <Controls.InputLabelShown
                                                            name="image_name"
                                                            label="School Image *"
                                                            type="file"
                                                            value={values.image_name}
                                                            onChange={handleInputChange}
                                                            error={errors.image_name}
                                                        />
                                                    </CCol>
                                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                                        <Controls.Input
                                                            name="principal"
                                                            label="Principal Name *"
                                                            value={values.principal}
                                                            onChange={handleInputChange}
                                                            error={errors.principal}
                                                        />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                                        <Controls.Input
                                                            name="vice_principal"
                                                            label="vice principal Name *"
                                                            value={values.vice_principal}
                                                            onChange={handleInputChange}
                                                            error={errors.vice_principal}
                                                        />
                                                    </CCol>

                                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                                        <Controls.Input
                                                            name="incharge"
                                                            label="incharge Name *"
                                                            value={values.incharge}
                                                            onChange={handleInputChange}
                                                            error={errors.incharge}
                                                        />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                                        <Controls.DatePicker
                                                            name="working_start_date"
                                                            label="Working Year Start Date *"
                                                            value={values.working_start_date}
                                                            onChange={handleInputChange}
                                                            futureDateStatus={true}
                                                        />
                                                    </CCol>

                                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                                        <Controls.DatePicker
                                                            name="working_end_date"
                                                            label="Working Year End Date *"
                                                            value={values.working_end_date}
                                                            onChange={handleInputChange}
                                                            futureDateStatus={true}
                                                        />
                                                    </CCol>
                                                </CRow>
                                            </>
                                            :
                                            errors.school_select = ""
                                        }
                                    </>
                                    :
                                    ""
                                }

                                <div className="d-flex flex-row mt-3">
                                    <div className="p-2">
                                        <FontAwesomeIcon icon={faAddressCard} />
                                    </div>
                                    <div className="p-2">
                                        <div className="d-inline">Address Details</div>
                                    </div>
                                </div>

                                <CDropdownDivider className="mb-2" />

                                <CRow className="mt-3">
                                    <CCol xl={12} sm={12} className="mb-3">
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
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Autocomplete
                                            // value="Gujarat"
                                            options={State.getStatesOfCountry('IN')}
                                            getOptionLabel={(option) => option.name}
                                            name="state"
                                            // style={{ width: 505 }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select State"
                                                    variant="outlined"
                                                    autoComplete='off'
                                                    fullWidth

                                                />
                                            )}
                                            onChange={(event, value) => handleStateChange(value)}
                                        />

                                        {errorMessageState === "" ?
                                            ""
                                            :
                                            <>
                                                <p className="adminusererromessage" >Please Select a State.</p>
                                            </>
                                        }
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
                                        {selectedState === "" ? "" :
                                            <>
                                                <Autocomplete

                                                    options={cityList}
                                                    getOptionLabel={(option) => option.name}
                                                    name="state"
                                                    // style={{ width: "50%" }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Select City"
                                                            variant="outlined"

                                                            fullWidth
                                                        />
                                                    )}
                                                    onChange={(event, value) => handleCitySelect(value)}
                                                />
                                                {errorMessageCity === "" ?
                                                    ""
                                                    :
                                                    <p className="adminusererromessage">Please Select a city.</p>
                                                }
                                            </>
                                        }
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xl={6} sm={6} className="mb-3">
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
                                            <Controls.Button type="submit" text="Add User" className="m-1" />
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
                                        <div className="card-title">
                                            User Details
                                        </div>
                                    </div>

                                    <div className="p-3">
                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                TP-ID {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.tp_id === null ? "N/A" : viewUserData && viewUserData.user_details.tp_id}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Name {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.first_name === null ? "N/A" : viewUserData && viewUserData.first_name}
                                                {viewUserData && viewUserData.last_name === null ? "N/A" : viewUserData && viewUserData.last_name}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Email {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.email === null ? "N/A" : viewUserData && viewUserData.email}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Gender {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.gender === null ? "N/A" : viewUserData && viewUserData.user_details.gender}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Contact No {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.phone === null ? "N/A" : viewUserData && viewUserData.user_details.phone}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                City {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.city === null ? "N/A" : viewUserData && viewUserData.user_details.city}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Role {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.role_name === null ? "N/A" : viewUserData && viewUserData.role_name}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Address {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.address === null ? "N/A" : viewUserData && viewUserData.user_details.address}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Area {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.area === null ? "N/A" : viewUserData && viewUserData.user_details.area}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Birth-Date {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.birth_date === null ? "N/A" : viewUserData && viewUserData.user_details.birth_date}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Country {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.country === null ? "N/A" : viewUserData && viewUserData.user_details.country}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Pincode {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.pincode === null ? "N/A" : viewUserData && viewUserData.user_details.pincode}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                State {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.user_details.state === null ? "N/A" : viewUserData && viewUserData.user_details.state}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Status {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewUserData && viewUserData.is_verified === 0 ?
                                                    <CBadge color="danger">Not Verified</CBadge>
                                                    :
                                                    <CBadge color="primary">Verified</CBadge>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {viewUserData && viewUserData.role_name === "tutor" ?
                                <div className="row mt-3">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        {viewUserData.user_details !== undefined &&
                                            viewUserData.user_details.education.length !== 0 ? (
                                            <>
                                                <CCardHeader className="card-title cardtitle font-weight-bold">
                                                    Education Details
                                                </CCardHeader>
                                                <CTable bordered responsive>
                                                    <CTableHead>
                                                        <CTableRow>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                Degree/Standard
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                College/School
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                Place
                                                            </CTableHeaderCell>
                                                        </CTableRow>
                                                    </CTableHead>
                                                    <CTableBody>
                                                        {viewUserData.user_details.education.map(
                                                            (educationData, index) => (
                                                                <CTableRow key="index">
                                                                    <CTableDataCell scope="row">
                                                                        {educationData.degree}
                                                                    </CTableDataCell>
                                                                    <CTableDataCell>
                                                                        {educationData.college}
                                                                    </CTableDataCell>
                                                                    <CTableDataCell>
                                                                        {educationData.place}
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                            )
                                                        )}
                                                    </CTableBody>
                                                </CTable>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" >
                                        {viewUserData.user_details !== undefined &&
                                            viewUserData.user_details.experience.length !== 0 ? (
                                            <>
                                                <CCardHeader className="card-title cardtitle fw-bold">
                                                    Experience Details
                                                </CCardHeader>
                                                <CTable bordered responsive>
                                                    <CTableHead>
                                                        <CTableRow>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                School/College Name
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                Designation
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                Experience in month
                                                            </CTableHeaderCell>
                                                        </CTableRow>
                                                    </CTableHead>
                                                    <CTableBody>
                                                        {viewUserData.user_details.experience.map(
                                                            (experienceData, index) => (
                                                                <CTableRow key="index">
                                                                    <CTableDataCell scope="row">
                                                                        {experienceData.organization}
                                                                    </CTableDataCell>
                                                                    <CTableDataCell>
                                                                        {experienceData.designation}
                                                                    </CTableDataCell>
                                                                    <CTableDataCell>
                                                                        {experienceData.experience_month}
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                            )
                                                        )}
                                                    </CTableBody>
                                                </CTable>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                :
                                ""
                            }
                            {viewUserData && viewUserData.role_name === "parent" ?

                                <div className="row mt-3">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        {viewUserData.user_details !== undefined &&
                                            viewUserData.childs.length !== 0 ? (
                                            <>
                                                <CCardHeader className="card-title cardtitle font-weight-bold">
                                                    Children Details
                                                </CCardHeader>
                                                <CTable bordered responsive>
                                                    <CTableHead>
                                                        <CTableRow>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                TP-ID
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                Name
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                Email
                                                            </CTableHeaderCell>
                                                        </CTableRow>
                                                    </CTableHead>
                                                    <CTableBody>

                                                        {viewUserData.childs.map(

                                                            (childs, index) => (
                                                                <CTableRow key="index">
                                                                    <CTableDataCell scope="row">
                                                                        {childs.tp_id}
                                                                    </CTableDataCell>
                                                                    <CTableDataCell>
                                                                        {childs.name}
                                                                    </CTableDataCell>
                                                                    <CTableDataCell>
                                                                        {childs.email}
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                            )
                                                        )}

                                                    </CTableBody>
                                                </CTable>
                                            </>
                                        ) :
                                            ""
                                        }
                                    </div>
                                </div>
                                :
                                ""
                            }

                            {viewUserData && viewUserData.role_name === "school-admin" || viewUserData && viewUserData.role_name === "school-tutor" || viewUserData && viewUserData.role_namee === "school-student" ?

                                <div className="row mt-3">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        {viewUserData.school !== undefined &&
                                            <>
                                                <CCardHeader className="card-title cardtitle font-weight-bold">
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
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                School Principal
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                School Vice Principal
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                School Incharge
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                School Working Year Start Date
                                                            </CTableHeaderCell>
                                                            <CTableHeaderCell
                                                                scope="col"
                                                                className="header-profile-table"
                                                            >
                                                                School Working End Date
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
                                                            <CTableDataCell>
                                                                {viewUserData.school.principal === null ? "N/A" : viewUserData.school.principal}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {viewUserData.school.vice_principal === null ? "N/A" : viewUserData.school.vice_principal}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {viewUserData.school.incharge === null ? "N/A" : viewUserData.school.incharge}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {viewUserData.school.working_start_date === null ? "N/A" : viewUserData.school.working_start_date}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {viewUserData.school.working_end_date === null ? "N/A" : viewUserData.school.working_end_date}
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

                    {/* Edit User Data Modal */}
                    {userState.userEditStatus !== false ? (

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
                                <EditUser data={editUserData} />
                            </CModalBody>
                        </CModal>

                    ) : (

                        <CModal
                            size="lg"
                            onDismiss={() => setEditUserDataModal(false)}
                        >
                            <CModalHeader
                                onDismiss={() => setEditUserDataModal(false)}
                                className="tutorviewmodalheader"
                            >
                                <CModalTitle>Edit User</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <EditUser data={editUserData} />
                            </CModalBody>
                        </CModal>
                    )}
                </div>
            }
        </>
    )
}

export default UserList
