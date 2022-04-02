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
import tutorParkWhiteLogo from "../../../assets/images/logo/TutorPark_logo_white.png";
import { useDispatch } from "react-redux";
import { handleResetPassword } from "../../../redux/actions/auth/index";
import CustomAlertControl from "src/views/AlertMessage";
import { useForm, Form } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";

const ResetPassword = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const dispatch = useDispatch();
  const history = useHistory();
  const initialFValues = {
    email: "",
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("email" in fieldValues)
      if (!fieldValues.email) temp.email = "Email iD is required.";
      else if (!/$^|.+@.+..+/.test(fieldValues.email))
        temp.email = "Email is not valid.";
      else temp.email = "";

    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const status = dispatch(handleResetPassword({ email: values.email }));
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
                        <CCol xl={12} sm={12} className="mb-3">
                          <Controls.Input
                            name="email"
                            label="Email *"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email}
                          />
                        </CCol>
                      </CRow>
                    </div>

                    <div className="row">
                      <div className="float-left col-6"></div>
                      <div className="col-6 float-right"></div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div className="d-grid">
                          <CButton
                            className="mt-3 p-3 signup-color font-weight-bold"
                            active
                            type="submit"
                          >
                            Reset
                          </CButton>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div className="d-grid">
                          <Link to="/" className="">
                            <CButton className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-3 p-3 signup-color font-weight-bold">
                              Back To login
                            </CButton>
                          </Link>
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

export default ResetPassword;
