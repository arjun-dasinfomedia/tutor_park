import React, { useEffect } from "react";
// ** Store & Actions
import { useDispatch } from "react-redux";
import { isUserLoggedIn } from "../../utility/utils";
import { handleLogout } from "../../redux/actions/auth/index";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      dispatch(handleLogout());
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.clear();

      history.push("/");

      window.location.reload();
    }
  }, []);

  return <></>;
};

export default Logout;