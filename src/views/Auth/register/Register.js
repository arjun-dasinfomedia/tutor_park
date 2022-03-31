import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CImage,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import tutorParkWhiteLogo from "../../../assets/images/logo/TutorPark_logo_white.png";
import { useForm, Form } from "../../../components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { useDispatch } from "react-redux";
import { handleSignup } from "../../../redux/actions/auth/index";
import { TextField } from "@material-ui/core";
import moment from "moment";
import CustomAlertControl from '../../AlertMessage';
import { State, City } from "country-state-city";
import { Autocomplete } from "@mui/material";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { alertActions } from "src/redux/actions/alertMessage";
import {
  getAllRoles,
} from "../../../utility/utils";

// items for gender radio button
const genderItems = [
  { id: "Male", title: "Male" },
  { id: "Female", title: "Female" },
  { id: "Other", title: "Other" },
];

let role_filter = []

const Register = () => {
  /*State use City and State */
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmpasswordType, setConfirmPasswordType] = useState("password");
  const [password, setPassword] = useState();

  const [cityList, setCityList] = useState(City.getCitiesOfState('IN', 'GJ'));
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const initialFValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    aadhar_id: "",
    password: "",
    password_confirmation: "",
    gender: "Male",
    role: "",
    address: "",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    nationality: "Indian",
    pincode: "",
    birth_date: moment(),
  };

  /* City Value Get */
  function handleCitySelect(value) {
    setSelectedCity(value.name);
  }
  const handleAddressChnage = (e) => {
    setAddress(e.target.value);
  };

  useEffect(async () => {
    showLoader();
    getAllRoles().map(function (item, key) {

      if (item.name !== 'Parent' && item.name !== "School Student" && item.name !== 'School Tutor' && item.name !== "Admin" && item.name !== "School Admin") {
        role_filter.push({ id: item.id, name: item.name });

      }
    });
    setLoading(false);
    hideLoader();

  }, []);

  // validation code start
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("first_name" in fieldValues)
      temp.first_name = fieldValues.first_name ? "" : "First name is required.";

    if ("last_name" in fieldValues)
      temp.last_name = fieldValues.last_name ? "" : "Last name is required.";

    if ("role" in fieldValues)
      temp.role = fieldValues.role ? "" : "Please Select a Role.";

    if ("email" in fieldValues)
      if (!fieldValues.email) temp.email = "Email ID is required.";
      else if (!/$^|.+@.+..+/.test(fieldValues.email))
        temp.email = "Email is not valid.";
      else temp.email = "";

    if ("phone" in fieldValues)
      if (fieldValues.phone == "") temp.phone = "Mobile number is required.";
      else if (fieldValues.phone.length > 10 || fieldValues.phone.length < 10)
        temp.phone = "Please enter only 10 numbers.";
      else if (!/^[0-9\b]+$/.test(fieldValues.phone))
        temp.phone = "Mobile number is not valid. Please enter 10 numbers.";
      else temp.phone = "";

    if ("aadhar_id" in fieldValues)
      if (fieldValues.aadhar_id == "")
        temp.aadhar_id = "Aadhar Card number is required.";
      else if (
        fieldValues.aadhar_id.length > 12 ||
        fieldValues.aadhar_id.length < 12
      )
        temp.aadhar_id = "Please enter only 12 numbers.";
      else if (!/^[0-9\b]+$/.test(fieldValues.aadhar_id))
        temp.aadhar_id =
          "Aadhar Card number is not valid. Please enter 12 numbers.";
      else temp.aadhar_id = "";



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

    // if ("password" in fieldValues)
    //   if (fieldValues.password == "") {
    //     temp.password = "Please enter password.";
    //   }
    //   else if (fieldValues.password.length < 8) {

    //     temp.password = "Password should be 8 character long.";
    //   }
    //   else {
    //     temp.password = "";
    //     setPassword(fieldValues.password)
    //   }

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
      if (fieldValues.pincode == "") temp.pincode = "Picode is required.";
      else if (fieldValues.pincode.length > 8)
        temp.pincode = "Pincode should not be more than 8 digits";
      else if (!/^[0-9\b]+$/.test(fieldValues.pincode))
        temp.pincode = "Please enter only numbers";
      else temp.pincode = "";

    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Address is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  // var cityList = City.getCitiesOfState('IN', 'GJ');
  const handleStateChange = (value) => {
    if (value) {
      setCityList(City.getCitiesOfState('IN', value.isoCode))
      // console.log(cityList)
      setSelectedState(value.name)
    }
    // console.log(cityList)

  }
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  // validation code end

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      values.city = selectedCity;
      values.state = selectedState;
      values.birth_date = moment(values.birth_date).format("YYYY-MM-DD")

      const status = await dispatch(handleSignup(values));

      if (status !== false) {

        alertActions.clear()
        history.push('/register-success');
      }
    }
  };

  function handlePasswordViewClick() {
    if (passwordType == "password") setPasswordType("text");
    else setPasswordType("password");
  }

  function handleConfirmPasswordViewClick() {
    if (confirmpasswordType == "password") setConfirmPasswordType("text");
    else setConfirmPasswordType("password");
  }

  return (
    // <div className="bg-light min-vh-100 d-flex flex-row align-items-center">


    <div>

      {isLoading ? (
        <>{loader}</>
      ) : (<div className="rigistonpage min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CustomAlertControl />
          <CRow className="justify-content-center pt-5 pb-5">
            <CCol sm={12} md={12} lg={12} xl={12}>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                  <Link to="/login">
                    <CImage
                      fluid
                      align="center"
                      className="mb-3 img-fluid"
                      src={tutorParkWhiteLogo}
                      hight="120px"
                      width="350px"
                    />
                  </Link>
                </div>
                <div className="col-2"></div>
              </div>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <h2 className="text-center registertext mb-3 mt-3">
                      Register
                    </h2>
                    <div className="d-flex">
                      <FontAwesomeIcon icon={faUser} className="ml-2 fa-2x" />
                      <div className="iconstyle">Personal information</div>
                    </div>
                    <hr className="dashed" />
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <Controls.Input
                          name="first_name"
                          label="First Name *"
                          value={values.first_name}
                          onChange={handleInputChange}
                          error={errors.first_name}
                        />
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <Controls.Input
                          name="last_name"
                          label="Last Name *"
                          value={values.last_name}
                          onChange={handleInputChange}
                          error={errors.last_name}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <Controls.Input
                          name="email"
                          label="Email *"
                          value={values.email}
                          onChange={handleInputChange}
                          error={errors.email}
                        />
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <Controls.Input
                          name="phone"
                          label="Mobile *"
                          value={values.phone}
                          onChange={handleInputChange}
                          error={errors.phone}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        {/* <CFormFloating className="mb-3">
                          <CFormSelect id="genderInput" name="gender">
                            <option>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </CFormSelect>
                          <CFormLabel htmlFor="genderInput">Gender</CFormLabel>
                          <CFormFeedback invalid>Please Select Gender</CFormFeedback>
                        </CFormFloating> */}
                        <Controls.RadioGroup
                          name="gender"
                          label="Gender"
                          value={values.gender}
                          onChange={handleInputChange}
                          items={genderItems}
                        />
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <Controls.DatePicker
                          name="birth_date"
                          label="Date Of Birth"
                          value={values.birth_date}
                          onChange={handleInputChange}
                          // maxDate={new Date()}
                          futureDateStatus={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <Controls.Input
                          name="aadhar_id"
                          label="Aadhar Number *"
                          value={values.aadhar_id}
                          onChange={handleInputChange}
                          error={errors.aadhar_id}
                        />
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <Controls.Select
                          name="role"
                          label="Role *"
                          onChange={handleInputChange}
                          value={values.role}
                          options={role_filter}
                          error={errors.role}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="position-relative">
                          <Controls.Input
                            name="password"
                            label="Password *"
                            value={values.password}
                            type={passwordType}
                            onChange={handleInputChange}
                            error={errors.password}
                          />
                          <div className="">
                            {/* <FontAwesomeIcon onClick={() => handlePasswordViewClick() } className="password-show" icon={faEye} /> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="position-relative">
                          <Controls.Input
                            name="password_confirmation"
                            label="Confirm Password *"
                            value={values.password_confirmation}
                            type={confirmpasswordType}
                            onChange={handleInputChange}
                            error={errors.password_confirmation}
                            className="position-relative"
                          />
                          {/* <FontAwesomeIcon className="password-show-button  position-absolute" icon={faEye} onClick={() => handleConfirmPasswordViewClick() } /> */}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="d-flex">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="ml-2 fa-2x"
                        />
                        <div className="iconstyle">Address Details</div>
                      </div>
                    </div>
                    <hr className="dashed" />
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <Controls.CustomTextArea
                          label="Address *"
                          rows={3}
                          name="address"
                          value={values.address}
                          onChange={handleInputChange}
                          error={errors.address}
                        />
                      </div>

                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">

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
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
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
                      </div>
                    </div>

                    <div className="row">
                      {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <CFormFloating className="mb-3">
                          <CFormSelect
                            id="cityInput"
                            name="city"
                            onChange={(e) => handleCitySelect(e)}
                            value={selectedCity}
                          >
                            <option value="">Please Select City</option>
                            {cities.map((city, key) => (
                              <option key={key} value={city}>
                                {city}
                              </option>
                            ))}
                          </CFormSelect>
                          <CFormLabel htmlFor="cityInput">City</CFormLabel>
                          <CFormFeedback invalid>
                            Please Select City
                          </CFormFeedback>
                        </CFormFloating>
                      </div> */}
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <Controls.Input
                          name="pincode"
                          label="Pincode *"
                          value={values.pincode}
                          onChange={handleInputChange}
                          error={errors.pincode}
                        />
                      </div>

                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="d-grid">
                          <CButton
                            className="mt-3 p-3 signup-color"
                            type="submit"
                          >
                            SIGN UP
                          </CButton>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <h6 className="liginlink">
                          Already have an account?
                          <Link to="/login" className="textDecorationNone">
                            {" "}
                            Login{" "}
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </Form>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>)
      }
    </div>
  );
};

export default Register;
