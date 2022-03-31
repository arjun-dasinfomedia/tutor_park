import {
  LOGIN,
  LOGOUT,
  REGISTER,
  EMAIL_VERIFICATION,
  RESET_PASSWORD,
  FORGET_PASSWORD,
} from "../types";
import RestClientServices from "../restClient/client";
import { alertActions } from "../alertMessage";
import { toast } from "react-toastify";

// ** Handle User Login
export const handleLogin = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(LOGIN, data);
    if (response.data.error) {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
      return false;
    } else {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message);
      // ** Add to user, accessToken & refreshToken to localStorage
      localStorage.setItem("userData", JSON.stringify(response.data.data));
      localStorage.setItem(
        "permissions",
        JSON.stringify(response.data.permissions)
      );

      localStorage.setItem("token", JSON.stringify(response.data.access_token));
      localStorage.setItem("existing_user_id", null);
      localStorage.setItem("impersonateStatus", false);
      localStorage.setItem("impersonateStatusSchool", false);
      localStorage.setItem("expires_in", JSON.stringify(response.data.expires_in));

      dispatch({
        type: LOGIN,
        userData: response.data.data,
      });
    }
  } catch (err) {
    // console.log(err)
  }
};

// ** Handle User Logout
export const handleLogout = () => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithoutData(LOGOUT);
    if (response.data.error) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
    } else {
      dispatch({
        type: LOGOUT,
        logoutStatus: true,
      });
    }
  } catch (err) {
    // console.log(err)
  }
};

// ** Handle User signup
export const handleSignup = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(REGISTER, data);
    if (response.data.error) {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
      return false;
    } else {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

// ** Handle User signup
export const handleEmailVerification = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      EMAIL_VERIFICATION,
      data
    );
    if (response.data.error) {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
      return false;
    } else {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: EMAIL_VERIFICATION,
      });
    }
  } catch (err) {
    // console.log(err)
  }
};

export const handleResetPassword = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      RESET_PASSWORD,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));

      toast.success(response.data.message.toString());
      dispatch({
        type: RESET_PASSWORD,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleForgetPassword = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      FORGET_PASSWORD,
      data
    );

    if (response.data.error) {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
      return false;
    } else {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: FORGET_PASSWORD,
      });
    }
  } catch (err) {
    // console.log(err)
  }
};
