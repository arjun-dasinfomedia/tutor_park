import {
  CContainer,
  CImage,
  CRow,
} from '@coreui/react'
import { Link, useHistory } from "react-router-dom";
import tutorParkWhiteLogo from '../../../assets/images/logo/TutorPark_logo_white.png'
import { Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleEmailVerification } from 'src/redux/actions/auth';
import { useEffect } from 'react';

const EmailVerification = () => {
  const { verify_token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(async () => {

    
    await dispatch(handleEmailVerification({verify_token:verify_token}));
    setTimeout(() => {
      history.push('/login');
     
    }, 5000);
    
    
  }, [])

  return (
    <div className="loginpage min-vh-100 d-flex flex-row ">
      <CContainer>
        <Link to="/login">
          <CImage fluid align="center" className="mb-3" src={tutorParkWhiteLogo} hight="120px" width="350px" />
        </Link>
        <CRow className="justify-content-center">
        <Alert variant="filled" severity="success">Greetings, Your account has been Verified successsfully. You will be redirect on login screen. For login you can use you emial ID and password</Alert>
        </CRow>
      </CContainer>
    </div>
  )
}

export default EmailVerification
