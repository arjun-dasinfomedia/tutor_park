import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CImage,
  CFormLabel,
  CFormFloating,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
  CLink,
} from '@coreui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye, faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import tutorParkWhiteLogo from '../../../assets/images/logo/TutorPark_logo_white.png'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogin } from '../../../redux/actions/auth/index'
import { isUserLoggedIn, getHomeRouteForLoggedInUser } from "../../../utility/utils";
import CustomAlertControl from 'src/views/AlertMessage';

const Login = props => {

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const { email, password } = inputs;
  const [submitted, setSubmitted] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [visible, setVisiblity] = useState(false);
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch()
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (email && password) {
      // get return url from location state or default to home page
      await dispatch(handleLogin({ email, password }));

      // window.location.reload();
      // console.log(isUserLoggedIn())
      if (isUserLoggedIn() !== null) {

        history.push(getHomeRouteForLoggedInUser("tutor"))
        window.location.reload();
      }

    }
  }

  function handlePasswordViewClick() {
    if (!visible)
      setVisiblity(true)
    else
      setVisiblity(false)

    if (passwordType == "password")
      setPasswordType("text")
    else
      setPasswordType("password")

  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  return (
    <div className="loginpage min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        {/* {alert.message &&
          <>
            <ToastContainer autoClose={5000} />
          </>
        } */}
        <CustomAlertControl />
        <div className='row'>
          <div className='col-2'></div>
          <div className='mt-3 col-8'>
            <Link>
              <CImage fluid align="center" className="mb-3 img-fluid" src={tutorParkWhiteLogo}
                hight="120px" width="350px"
              />
            </Link>
          </div>
          <div className='col-2'></div>
        </div>

        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard >
                <CCardBody className="p-4">
                  <CForm onSubmit={handleSubmit}>
                    <h1 className="text-center">Login</h1>
                    <p className="text-center text-medium-emphasis">Sign In to your account</p>
                    <div className="col-12">
                      <CFormFloating className="mb-3">
                        <CFormInput type="text" name="email" id="userNameInput"
                          placeholder="User Name" required value={email} onChange={handleChange} />
                        <CFormLabel htmlFor="userNameInput">Email</CFormLabel>
                        {submitted && !email &&
                          <div className="invalid-feedback">Username is required</div>
                        }
                      </CFormFloating>

                    </div>
                    <div className="col-12">
                      <CFormFloating className="mb-3">
                        <CFormInput type={passwordType} name="password" id="passwordInput"
                          placeholder="password" required value={password} onChange={handleChange} className="position-relative" />
                        <FontAwesomeIcon onClick={() => handlePasswordViewClick()} className="login-password-show-button position-absolute fa-1x" icon={visible ? faEyeSlash : faEye} />
                        <CFormLabel htmlFor="passwordInput">Password</CFormLabel>
                        {submitted && !password &&
                          <div className="invalid-feedback">Password is required</div>
                        }
                      </CFormFloating>
                    </div>
                    <div className="col-12 text-end">

                      <Link to={{
                        pathname: '/forget-password',
                        // aboutProps: values.email
                      }} style={{ textDecoration: 'none' }}>Forget Password
                      </Link>


                    </div>
                    <div className="row">
                      <div className="float-left col-6">
                        {/* <CFormCheck id="flexCheckDefault" label="Remember me" /> */}
                      </div>
                      <div className="col-6 float-right">
                        {/* <a className="forgot-password-link">
                          Forgot password?
                        </a> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-12 col-lg-12 col-xl-12">
                        <div className="d-grid">
                          <CButton className="mt-3 p-3 signup-color font-weight-bold" active type="submit">LOGIN</CButton>
                        </div>
                      </div>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary cust-color" style={{ width: '100%' }}>
                <CCardBody className="text-center p-5">
                  <div>
                    <h2>Register!</h2>
                    <p>
                      Signup with Tutorpark and explore the fun way of learning from celebrated tutors in your city.
                    </p>
                    <div className="col-12 justify-content-center">

                      {/* <CButton className="mt-3 p-2 signup-color" active tabIndex={-1}>
                        SIGN UP
                      </CButton> */}
                      <div className="col-12">
                        <Link to="/register" className="textDecorationNone">
                          <div className="text-center col-12">
                            <CButton className="col-12 mt-3 p-3 signup-color font-weight-bold" active type="submit">SIGN UP</CButton>
                          </div>
                        </Link>
                      </div>
                     
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div >
  )
}

export default Login
