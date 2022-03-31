import { IMPERSONATE_SCHOOL } from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// Impersonate user to School
export const userImpersonateSchoolSide = (tag) => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(IMPERSONATE_SCHOOL).then(
      (responseJson) => {
        if (responseJson.data.error === false) {
          dispatch({
            type: IMPERSONATE_SCHOOL,
          });

          // localStorage.setItem('token', JSON.stringify(responseJson.data.data.auth_token))
          if (tag === "impersonate") {
            localStorage.setItem("impersonateStatusSchool", true);
          } else {
            localStorage.setItem("impersonateStatusSchool", false);
          }

          localStorage.setItem(
            "userData",
            JSON.stringify(responseJson.data.data)
          );
          localStorage.setItem(
            "permissions",
            JSON.stringify(responseJson.data.permissions)
          );

          localStorage.setItem(
            "token",
            JSON.stringify(responseJson.data.access_token)
          );
          localStorage.setItem(
            "expires_in",
            JSON.stringify(response.data.expires_in)
          );

          window.location.reload();
        } else {
          dispatch(alertActions.error(responseJson.data.message.toString()));
          toast.error(responseJson.data.message.toString());
        }
      }
    );
  } catch (err) {
    // console.log(err)
  }
};
