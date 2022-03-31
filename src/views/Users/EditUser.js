import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import {
    CRow,
    CCol,
    CDropdownDivider,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import Controls from "src/components/formControls/controls/Controls";
import {
    updateUser,
    updateOtherUser
} from "./userAction";
import {
    getAllTeachingMode,
    getAllLanguages,
} from "../../utility/utils";
import { State, City } from "country-state-city";
import {
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    InputLabel,
    MenuItem,
} from "@material-ui/core";
import moment from "moment";
import {
    syllabusListData,
    subjectListData,
    classListData,
} from "../../redux/actions/dropdowns/index";
import { Formik, Form, Field } from "formik";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { RadioGroup, TextField, Select } from "formik-material-ui";
import * as yup from "yup";
import { useDateValidation } from "@mui/lab/internal/pickers/hooks/useValidation";

const Gender = [
    { id: "Male", title: "Male" },
    { id: "Female", title: "Female" },
    { id: "Other", title: "Other" }
];

let initialValues = ""
let validationSchema = ""

const UserEdit = (data) => {
    
    const dispatch = useDispatch();
    const [editUserDataModal, setEditUserDataModal] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const stateList = State.getStatesOfCountry("IN");
    const [cityList, setCityList] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const userState = useSelector((state) => state.user);
    const DropDown = useSelector((state) => state.dropdowns);
    const [syllabusId, setSyllabusID] = useState("");
    const [classId, setClassID] = useState("");
    const [subjectId, setSubjectId] = useState("");

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


    const [birth_date, setBirthDate] = useState(
        data.data.user_details.birth_date ?? new Date()
    );

    useEffect(() => {

        dispatch(syllabusListData());
        dispatch(subjectListData());
        dispatch(classListData({ subject_id: data.data.user_details.subject_id }));
        stateList.forEach((state) => {
            if (state.name == data.data.user_details.state) {
                setCityList(City.getCitiesOfState("IN", state.isoCode));
                setSelectedCity(data.data.user_details.city)
                setSelectedState(data.data.user_details.state)
            }
        });
    }, []);

    // initial value for School-side user
    if (data.data.role_name == "school-admin" || data.data.role_name == "school-tutor" || data.data.role_name == "school-student") {
        initialValues = {
            user_id: data.data.id,
            first_name: data.data.first_name,
            last_name: data.data.last_name,
            phone: data.data.user_details.phone,
            aadhar_id: data.data.user_details.aadhar_id == "" ? "" : data.data.user_details.aadhar_id,

            birth_date:
                data.data.user_details.birth_date == null
                    ? new Date()
                    : data.data.user_details.birth_date,
            gender: data.data.user_details.gender,
            address: data.data.user_details.area,
            state: selectedState,
            city: selectedCity,
            pincode: data.data.user_details.pincode,
            role: data.data.role_name,

            school_name: data.data.school.school_name,
            Reg_no: data.data.school.registration_no,
            SchoolPincode: data.data.school.pincode,
            SchoolCity: data.data.school.city,
            SchoolMobile_no: data.data.school.mobile,
            SchoolPhone_no: data.data.school.phone,
            SchoolEmail_id: data.data.school.email,
            syllabus_id: data.data.user_details.syllabus_id == null ? syllabusId : data.data.user_details.syllabus_id,
            class_id: data.data.user_details.class_id == classId ? syllabusId : data.data.user_details.class_id,
            subject_id: data.data.user_details.subject_id == classId ? subjectId : data.data.user_details.subject_id,
        }
    }

    else {
        // initial value For Tutor park User
        initialValues = {
            user_id: data.data.id,
            first_name: data.data.first_name,
            Child: data.data.childs,
            last_name: data.data.last_name,
            phone: data.data.user_details.phone,
            aadhar_id: data.data.user_details.aadhar_id == "" ? "" : data.data.user_details.aadhar_id,

            birth_date:
                data.data.user_details.birth_date == null
                    ? new Date()
                    : data.data.user_details.birth_date,
            gender: data.data.user_details.gender,
            address: data.data.user_details.area,
            state: selectedState,
            city: selectedCity,
            pincode: data.data.user_details.pincode,
            role: data.data.role_name,
            // child: data.data.child,
            topic: data.data.user_details.topic,
            mode_of_teaching: data.data.user_details.mode_of_teaching,
            cost: data.data.user_details.online_cost_per_hour,
            facebook: data.data.user_details.fb_url,
            instgram: data.data.user_details.insta_url,
            twitter: data.data.user_details.twitter,
            linkedin: data.data.user_details.link_url,
            syllabus_id: syllabusId,
            class_id: classId,
            subject_id: subjectId,
        }
    }


    if (data.data.role_name == "school-admin" || data.data.role_name == "school-tutor" || data.data.role_name == "school-admin") {
        // Validation For school-side User
        validationSchema = yup.object({
            first_name: yup
                .string("Enter your first name")
                .required("First name is required"),
            last_name: yup
                .string("Enter your last name")
                .required("Last name is required"),
            phone: yup
                .string()
                .required("Phone number is required")
                .matches(phoneRegExp, "Phone number is not valid")
                .min(10, "Phone number is to short")
                .max(10, "Phone number is to long"),
            aadhar_id: yup
                .string()
                .required("Aadhar ID is required")
                .matches(phoneRegExp, "Aadhar ID is not valid")
                .min(12, "Aadhar ID is to short")
                .max(12, "Aadhar ID is to long"),
            state: yup.string().required("please select state"),
            city: yup.string().required("please select city"),
            address: yup.string().required("Address is required"),
            pincode: yup.number().positive().required("Pincode is required"),
            school_name: yup.string().required("Enter A School Name"),
            Reg_no: yup.string().required("Enter A School registration number"),
            school_pincode: yup.string().required("Enter A School PinCode"),
            school_city: yup.string().required("Enter A School City"),
            school_phone: yup.string().required("Enter A School Phone Number"),
            school_mobile: yup.string().required("Enter A School Mobile Number"),
            school_email: yup.string().required("Enter A School Email Address"),
        });
    }
    else {
        // Validation for Tutor Park User
        validationSchema = yup.object({
            first_name: yup
                .string("Enter your first name")
                .required("First name is required"),
            last_name: yup
                .string("Enter your last name")
                .required("Last name is required"),
            phone: yup
                .string()
                .required("Phone number is required")
                .matches(phoneRegExp, "Phone number is not valid")
                .min(10, "Phone number is to short")
                .max(10, "Phone number is to long"),
            aadhar_id: yup
                .string()
                .required("Aadhar ID is required")
                .matches(phoneRegExp, "Aadhar ID is not valid")
                .min(16, "Aadhar ID is to short")
                .max(16, "Aadhar ID is to long"),

            state: yup.string().required("please select state"),
            city: yup.string().required("please select city"),
            address: yup.string().required("Address is required"),
            pincode: yup.number().positive().required("Pincode is required"),
            child: yup.string().required("Please Select One Child"),
            topic: yup.string().required("Enter A Tutor Topic"),
            Mode: yup.string().required("Enter A Tutor Mode"),
            Cost: yup.string().required("Enter A Tutor Cost"),

        });

    }

    // Change City Select
    function handleCitySelect(value) {
        setSelectedCity(value.name);
    }

    // Change State Change
    const handleStateChange = (value) => {
        if (value !== null) {
            setCityList(City.getCitiesOfState('IN', value.isoCode))
            setSelectedState(value.name)
        }
    }

    // Input Change For Syllabus class and division
    const onChangeSelectInputs = (e) => {
        if (e.target.name == "syllabus_id") {
            initialValues.syllabus_id = e.target.value;
            setSyllabusID(e.target.value);
            // dispatch(schoolClassBySyllabus({ syllabus_id: e.target.value }));
        } else if (e.target.name == "class_id") {
            initialValues.class_id = e.target.value;
            setClassID(e.target.value);
            // dispatch(schoolDivisionByClass({ class_id: e.target.value }));
        } else {
            initialValues.subject_id = e.target.value;
            setSubjectId(e.target.value);
        }

    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={async (values) => {
                    values.birth_date = moment(birth_date).format("YYYY-MM-DD");
                    values.state = selectedState;
                    values.city = selectedCity;
                    values.syllabus_id = syllabusId;
                    values.class_id = classId;
                    values.subject_id = subjectId

                    if (data.data.role_name == "school-tutor" || data.data.role_name == "school-student" ||data.data.role_name == "school-admin") {
                        // Update User School-side
                        dispatch(updateOtherUser(values));
                    }
                    else {
                        // Update User For Tutor-park side
                        dispatch(updateUser(values));
                    }
                    setEditUserDataModal(false)
                }}
            >
                {({ values, errors, isSubmitting, isValid }) => (
                    <Form autoComplete="off">
                        <CRow>
                            <CCol xl={6} sm={6} className="mb-3">
                                <Field
                                    fullWidth
                                    name="first_name"
                                    component={TextField}
                                    variant="outlined"
                                    label="First Name *"
                                />
                            </CCol>
                            <CCol xl={6} sm={6} className="mb-3">
                                <Field
                                    fullWidth
                                    name="last_name"
                                    component={TextField}
                                    variant="outlined"
                                    label="Last Name"
                                />
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xl={6} sm={6} className="mb-3">
                                <Field
                                    fullWidth
                                    name="aadhar_id"
                                    component={TextField}
                                    variant="outlined"
                                    label="Aadhar ID"
                                />
                            </CCol>
                            <CCol xl={6} sm={6} className="mb-3">
                                <Field
                                    label="Gender"
                                    component={RadioGroup}
                                    name="gender"
                                    value={data.data.user_details.gender}
                                    row
                                >
                                    <FormLabel component="legend">Gender</FormLabel>
                                    {Gender.map((item) => (
                                        <FormControlLabel
                                            key={item.id}
                                            value={item.id}
                                            control={<Radio />}
                                            label={item.title}
                                        />
                                    ))}
                                </Field>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xl={6} sm={6} className="mb-3">
                                <Field
                                    fullWidth
                                    name="phone"
                                    component={TextField}
                                    variant="outlined"
                                    label="Mobile"
                                />
                            </CCol>

                            {data.data.role_name == "parent" ?
                                <>
                                    <CCol xl={6} sm={6} className="mb-3">

                                        <FormControl variant="outlined">
                                            <InputLabel>Children</InputLabel>
                                            <Field
                                                component={Select}
                                                name="child_name"
                                                label="Child 8"
                                                // value={Child}
                                            >
                                                <MenuItem value="">None</MenuItem>
                                                {userState.userListDropDown.map((item) => (
                                                    <MenuItem key={item.id} value={item.first_name + " "+ item.last_name}>
                                                        {item.first_name + " " + item.last_name}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </FormControl>
                                    </CCol>
                                </>
                                :
                                ""
                            }

                            {data.data.role_name == "tutor" ?

                                <>
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Field
                                            fullWidth
                                            name="topic"
                                            component={TextField}
                                            variant="outlined"
                                            label="Topic *"
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <FormControl variant="outlined">
                                            <InputLabel>Teaching Mode</InputLabel>
                                            <Field
                                                component={Select}
                                                name="mode_of_teaching"
                                                label="Mode of Teaching *"
                                            >
                                                <MenuItem value="">None</MenuItem>
                                                {getAllTeachingMode().map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </FormControl>
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Field
                                            fullWidth
                                            name="cost"
                                            component={TextField}
                                            variant="outlined"
                                            label="Cost Per Hour *"
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Field
                                            fullWidth
                                            name="facebook"
                                            component={TextField}
                                            variant="outlined"
                                            label="FaceBook URL"
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Field
                                            fullWidth
                                            name="linkedin"
                                            component={TextField}
                                            variant="outlined"
                                            label="Linkedin URL"
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Field
                                            fullWidth
                                            name="twitter"
                                            component={TextField}
                                            variant="outlined"
                                            label="Twitter URL"
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <Field
                                            fullWidth
                                            name="instagram"
                                            component={TextField}
                                            variant="outlined"
                                            label="Instagram URL"
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="mb-3">
                                        <FormControl variant="outlined">
                                            <InputLabel>Languages</InputLabel>
                                            <Field
                                                component={Select}
                                                name="languages"
                                                label="Languages"
                                            >
                                                {getAllLanguages().map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </FormControl>
                                    </CCol>
                                </>
                                :
                                ""
                            }

                            <CCol sm={6} md={6} lg={6} xl={6} className="mb-3">

                                <MuiPickersUtilsProvider utils={DateFnsUtils} libInstance={moment}>
                                    <KeyboardDatePicker
                                        disableFuture={true}
                                        maxDate={new Date()}
                                        id="date-picker-dialog"
                                        label="Date Of Birth"
                                        inputVariant="outlined"
                                        format="dd/MM/yyyy"
                                        value={birth_date}
                                        onChange={(value) => setBirthDate(value)}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </CCol>
                        </CRow>

                        {data.data.role_name == "school-student" || data.data.role_name == "school-admin" || data.data.role_name == "school-tutor" ?
                            ""
                            :

                            <>
                                <CRow>
                                    <CCol sm={6} md={6} lg={6} xl={6} className="mb-3">
                                        <FormControl variant="outlined">
                                            <InputLabel>Syllabus</InputLabel>
                                            <Field
                                                component={Select}
                                                name="syllabus_id"
                                                label="syllabus *"
                                                onChange={(e) => onChangeSelectInputs(e)}
                                                value={syllabusId}
                                            >
                                                {DropDown.syllabusList.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </FormControl>
                                    </CCol>

                                    <CCol sm={6} md={6} lg={6} xl={6} className="mb-3">
                                        <FormControl variant="outlined">
                                            <InputLabel>Class</InputLabel>
                                            <Field
                                                component={Select}
                                                name="class_id"
                                                label="Class *"
                                                onChange={(e) => onChangeSelectInputs(e)}
                                                value={classId}
                                            >
                                                {DropDown.classList.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </FormControl>
                                    </CCol>
                                </CRow>

                                <CCol sm={6} md={6} lg={6} xl={6} className="mb-3">
                                    <FormControl variant="outlined">
                                        <InputLabel>Subject</InputLabel>
                                        <Field
                                            component={Select}
                                            name="subject_id"
                                            label="Subject *"
                                            onChange={(e) => onChangeSelectInputs(e)}
                                            value={subjectId}
                                        >
                                            {DropDown.subjectList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </CCol>

                            </>}

                        {data.data.role_name == "school-admin" || data.data.role_name == "school-tutor" || data.data.role_name == "school-student" ?

                            <>

                                <CRow>
                                    <CCol xl={6} sm={6} className="mb-3">

                                        <FormControl variant="outlined">
                                            <InputLabel>Select School</InputLabel>
                                            <Field
                                                component={Select}
                                                name="school_name"
                                                label="Select School"
                                                value={values.school_name}

                                            >
                                                <MenuItem value="">None</MenuItem>
                                                {userState.schoolListDropDown.map((item) => (
                                                    <MenuItem
                                                        key={item.name}
                                                        value={item.name}
                                                        isocode={item.isoCode}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </FormControl>

                                    </CCol>


                                </CRow>


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
                                <Field
                                    multiline
                                    name="address"
                                    component={TextField}
                                    variant="outlined"
                                    label="Address *"
                                    rows="3"
                                />
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xl={6} sm={6} className="mb-3">

                                <FormControl variant="outlined">
                                    <InputLabel>Select State</InputLabel>
                                    <Field
                                        component={Select}
                                        name="state"
                                        label="Select State"
                                        value={selectedState}
                                        onChange={(e, value) => handleStateChange(e, value)}
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        {stateList.map((item) => (
                                            <MenuItem
                                                key={item.name}
                                                value={item.name}
                                                isocode={item.isoCode}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </FormControl>
                            </CCol>
                            <CCol xl={6} sm={6} className="mb-3">
                                <FormControl variant="outlined">
                                    <InputLabel>Select City</InputLabel>
                                    <Field
                                        component={Select}
                                        name="city"
                                        label="Select City"
                                        value={selectedCity}
                                        onChange={(e, value) => handleCitySelect(e, value)}
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        {cityList.map((item) => (
                                            <MenuItem
                                                key={item.name}
                                                value={item.name}
                                                isocode={item.isoCode}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </FormControl>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xl={6} sm={6} className="mb-3">
                                <Field
                                    fullWidth
                                    name="pincode"
                                    component={TextField}
                                    variant="outlined"
                                    label="Pincode *"
                                />
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol sm={6} md={6} lg={6} xl={6} className="m-2">
                                <div className="d-inline">
                                    <Controls.Button
                                        type="submit"
                                        text="update User"
                                        className="m-1"
                                        onClick={() => setEditUserDataModal(false)}
                                    />
                                </div>
                                <div className="p-2 d-inline">
                                </div>
                            </CCol>
                        </CRow>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default UserEdit
