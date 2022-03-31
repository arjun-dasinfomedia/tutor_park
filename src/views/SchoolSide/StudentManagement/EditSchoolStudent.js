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
import {
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    InputLabel,
    MenuItem,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import Controls from "src/components/formControls/controls/Controls";
import { State, City } from "country-state-city";
import { RadioGroup, TextField, Select } from "formik-material-ui";
import {
    updateOtherUser,
} from "./SchoolStudentAction";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import { Formik, Form, Field } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import * as yup from "yup";

const Gender = [
    { id: "Male", title: "Male" },
    { id: "Female", title: "Female" },
    { id: "Other", title: "Other" }
];


const SchoolStudentEdit = (data) => {

    const dispatch = useDispatch();
    const [selectedState, setSelectedState] = useState(data.data.user_details.state);

    const stateList = State.getStatesOfCountry("IN");
    const [cityList, setCityList] = useState([]);
    const [selectedCity, setSelectedCity] = useState(data.data.user_details.city);

    const [syllabusID, setSyllabusID] = useState(
        data.data.user_details.syllabus_id == "" ?
            ""
            :
            data.data.user_details.syllabus_id
    );
    const [classID, setClassID] = useState()
    const [divisionId, setDivisionId] = useState();
    const [birth_date, setBirthDate] = useState(
        data.data.user_details.birth_date ?? new Date()
    );

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    useEffect(() => {

        stateList.forEach((state) => {
            if (state.name == selectedState) {
                setCityList(City.getCitiesOfState("IN", state.isoCode));
            }
        });
    }, []);

    const initialValuesForStudent = {
        user_id: data.data.id,
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        phone: data.data.user_details.phone,
        aadhar_id: data.data.user_details.aadhar_id,
        gender: data.data.user_details.gender,
        nationality: "Indian",
        role: data.data.role_name,

        birth_date:
            data.data.user_details.birth_date == null
                ? new Date()
                : data.data.user_details.birth_date,

        address: data.data.user_details.address,
        state: selectedState,
        city: selectedCity,
        pincode: data.data.user_details.pincode,
    };

    const validationSchemaForStudent = yup.object({
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
            .matches(phoneRegExp, "Aadhar ID is not valid")
            .min(12, "Aadhar ID is to short")
            .max(12, "Aadhar ID is to long"),

        state: yup.string().required("please select state"),
        city: yup.string().required("please select city"),
        address: yup.string().required("Address is required"),
        pincode: yup.number().positive().required("Pincode is required"),
    });

    // Handle City Slect
    function handleCitySelect(event, value) {
        setSelectedCity(event.target.value);
    }

    // Handle State Change
    const handleStateChange = (event, value) => {
        if (event.target.value) {
            setCityList(City.getCitiesOfState("IN", value.props.isocode));
            setSelectedState(event.target.value);
        }
    };


    return (
        <>
            <Formik
                initialValues={initialValuesForStudent}
                validationSchema={validationSchemaForStudent}
                onSubmit={(values) => {
                    values.birth_date = moment(birth_date).format("YYYY-MM-DD");
                    values.state = selectedState;
                    values.city = selectedCity;

                    dispatch(updateOtherUser(values));
                }}

            >
                {({ values, errors, isSubmitting, isValid }) => (
                    <Form autoComplete="off">
                        <CRow>
                            <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                                <Field
                                    fullWidth
                                    name="first_name"
                                    component={TextField}
                                    variant="outlined"
                                    label="First Name"
                                />
                            </CCol>
                            <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
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
                            <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                                <Field
                                    fullWidth
                                    name="phone"
                                    component={TextField}
                                    variant="outlined"
                                    label="Mobile"
                                />
                            </CCol>
                            <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                                <Field
                                    fullWidth
                                    name="aadhar_id"
                                    component={TextField}
                                    variant="outlined"
                                    label="Aadhar ID"
                                />
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                                <Field
                                    label="Gender"
                                    component={RadioGroup}
                                    name="gender"
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
                            <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} libInstance={moment}>
                                    <KeyboardDatePicker
                                        disableFuture={true}
                                        maxDate={new Date()}
                                        id="date-picker-dialog"
                                        label="Birth Date"
                                        inputVariant="outlined"
                                        format="dd/MM/yyyy"
                                        value={birth_date}
                                        // onChange={value => props.setFieldValue("date", value)}
                                        onChange={(value) => setBirthDate(value)}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
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

                        <CDropdownDivider className="mb-2" />

                        <CRow>
                            <CCol sm={12} md={12} lg={12} xl={12} className="mt-3">
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
                            <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
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

                            <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
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
                            <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
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
                                <div className="p-2 d-inline">
                                    <Controls.Button type="submit" text="update User" />
                                </div>



                            </CCol>
                        </CRow>
                    </Form>
                )
                }
            </Formik>
        </>
    )
}

export default SchoolStudentEdit