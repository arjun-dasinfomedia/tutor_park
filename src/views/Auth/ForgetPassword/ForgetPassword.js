import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CImage,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import tutorParkWhiteLogo from "../../../assets/images/logo/TutorPark_logo_white.png";
import { useDispatch } from "react-redux";
import { handleForgetPassword } from "../../../redux/actions/auth/index";
import CustomAlertControl from "src/views/AlertMessage";
import { useForm, Form } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { useParams } from "react-router-dom";

const ForgetPassword = (props) => {
  const { token } = useParams();
  const { email } = useParams();
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [visible, setVisiblity] = useState(false);
  const [confirmVisible, setConfirmVisiblity] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState();
  

  const initialFValues = {
    email: email,
    password: "",
    password_confirm: "",
    token: token,
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      if (!fieldValues.email) temp.email = "Email iD is required.";
      else if (!/$^|.+@.+..+/.test(fieldValues.email))
        temp.email = "Email is not valid.";
      else temp.email = "";

    if ("password" in fieldValues)
      if (fieldValues.password === "") {
        temp.password = "Please enter password.";
      } else if (fieldValues.password.length < 8) {
        temp.password = "Password should be 8 character long.";
      } else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
          fieldValues.password
        )
      ) {
        temp.password =
          "Password should have combination of capital, small alphabets and numbers";
      } else {
        temp.password = "";
        setPassword(fieldValues.password);
      }

    if ("password_confirm" in fieldValues)
      if (fieldValues.password_confirm === "") {
        temp.password_confirm = "Please enter confirm password.";
      } else if (fieldValues.password_confirm !== password) {
        temp.password_confirm = "Password and confirm password should be same.";
      } else if (fieldValues.password_confirm === password) {
        temp.password_confirm = "";
      } else {
        temp.password_confirm = "";
      }

    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x == "");
  };
  function handlePasswordViewClick() {
    if (!visible) setVisiblity(true);
    else setVisiblity(false);

    if (passwordType === "password") setPasswordType("text");
    else setPasswordType("password");
  }

  function handlePasswordConfirmViewClick() {
    if (!confirmVisible) setConfirmVisiblity(true);
    else setConfirmVisiblity(false);

    if (confirmPasswordType === "password") setConfirmPasswordType("text");
    else setConfirmPasswordType("password");
  }

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  // console.log(values.token)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirm);
      formData.append("token", values.token);

      const status = dispatch(handleForgetPassword(formData));
      if (status !== false) {
        history.push("/");
      }
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  return (
    <div className="loginpage min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CustomAlertControl />
        <div className="row">
          <div className="col-2"></div>
          <div className="mt-3 col-8">
            <Link to="/">
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

        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard>
                <CCardBody className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <h3 className="text-center">Reset Password</h3>

                    <div className="col-12">
                      <CRow>
                        <CCol xl={12} sm={12} className="mb-3"></CCol>
                        <CCol xl={12} sm={12} className="mb-3 ">
                          <div className="position-relative">
                            <Controls.Input
                              name="password"
                              label="Password *"
                              value={values.password}
                              onChange={handleInputChange}
                              error={errors.password}
                              type={passwordType}
                            // className="position-relative"
                            />
                            <FontAwesomeIcon
                              onClick={() => handlePasswordViewClick()}
                              className={
                                values.password === ""
                                  ? "reset-password-show-button position-absolute fa-1x"
                                  : errors.password === "" ?
                                    "reset-enter-password-sucess-button position-absolute fa-1x" :
                                    "reset-enter-password-show-button position-absolute fa-1x"
                              }
                              icon={visible ? faEyeSlash : faEye}
                            />
                          </div>
                        </CCol>
                        <CCol
                          xl={12}
                          sm={12}
                          className="mb-3 position-relative"
                        >
                          <Controls.Input
                            name="password_confirm"
                            label="Confirm Password *"
                            value={values.password_confirm}
                            onChange={handleInputChange}
                            error={errors.password_confirm}
                            type={confirmPasswordType}
                          />
                          <FontAwesomeIcon
                            onClick={() => handlePasswordConfirmViewClick()}
                            className={
                              values.password_confirm === ""
                                ? "reset-password-confirm-show-button position-absolute fa-1x"
                                :
                                errors.password_confirm === "" ?
                                  "reset-enter-password-confirm-sucess-button position-absolute fa-1x" :
                                  "reset-enter-password-confirm-show-button position-absolute fa-1x"

                            }
                            icon={confirmVisible ? faEyeSlash : faEye}
                          />
                        </CCol>
                      </CRow>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 col-md-12 col-lg-12 col-xl-12">
                        <div className="d-grid">
                          <CButton
                            className="mt-3 p-3 signup-color font-weight-bold"
                            active
                            type="submit"
                          >
                            Reset Password
                          </CButton>
                        </div>
                      </div>
                    </div>
                  </Form>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ForgetPassword;
