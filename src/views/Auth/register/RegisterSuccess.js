import {
  CContainer,
  CImage,
  CRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import tutorParkWhiteLogo from '../../../assets/images/logo/TutorPark_logo_white.png'
import { Alert } from '@mui/material';

const RegisterSuccess = () => {

  return (
    <div className="loginpage min-vh-100 d-flex flex-row p-4">
      <CContainer>
        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 '>
          <div className='row'>
          <div className="col-12">
          <Link to="/login">
            <CImage fluid align="center" className="mb-3 img-fluid"  src={tutorParkWhiteLogo} hight="120px" width="350px" />
          </Link>

        </div>
        <CRow className="justify-content-center">
        <Alert variant="filled" severity="success">Please check your email and verify. <Link to="/login" className='text-white text-decoration-none'>Go to Login...</Link></Alert>
        </CRow>
        </div>
        </div>
      </CContainer>
    </div>
  )
}

export default RegisterSuccess
