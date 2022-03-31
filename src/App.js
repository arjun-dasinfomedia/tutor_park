import React, { Component, Suspense, useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { isUserLoggedIn } from "../src/utility/utils";
import { useSelector, useDispatch } from "react-redux";

import "./scss/style.scss";
import useFullPageLoader from "./hooks/useFullPageLoader";
import { handleLogout } from "./redux/actions/auth";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Auth/login/Login"));
const EmailVerification = React.lazy(() =>
  import("./views/Auth/login/EmailVerification")
);
const Register = React.lazy(() => import("./views/Auth/register/Register"));
const SuccessMessageAfterRegister = React.lazy(() =>
  import("./views/Auth/register/RegisterSuccess")
);
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const ResetPassword = React.lazy(() =>
  import("./views/Auth/ForgetPassword/ResetPassword")
);
const ForgetPassword = React.lazy(() =>
  import("./views/Auth/ForgetPassword/ForgetPassword")
);

const App = () => {
  const store = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  // autologout code
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      var expireTime = localStorage.getItem('expires_in');
      var timer = null;
      
      if(expireTime !== null) {
          timer = setTimeout(() => {
            dispatch(handleLogout());
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
            localStorage.clear();
            let url = window.location.href;
            var rest = url.substring(0, url.lastIndexOf("/") + 1);
            window.location.href = rest
            window.location.reload()
        }, expireTime * 1000);
      }
    }
    return () => clearTimeout(timer);
  }, []);

  return (
    <HashRouter>
      {/* <Suspense fallback={loading}> */}
      <Suspense fallback={<>{loader}</>}>
        <Switch>
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/register-success"
            name="Register Success Page"
            render={(props) => <SuccessMessageAfterRegister {...props} />}
          />
          <Route
            exact
            path="/account-verification/:verify_token"
            name="Account Verification Page"
            render={(props) => <EmailVerification {...props} />}
          />
          <Route
            exact
            path="/reset-password/:token/:email"
            name="Account Verification Page"
            render={(props) => <ForgetPassword {...props} />}
          />
          <Route
            exact
            path="/forget-password/"
            name="Reset The Password"
            render={(props) => <ResetPassword {...props} />}
          />

          {/* {true ? ( */}
          {isUserLoggedIn() ? (
            <Route
              path="/"
              name="home"
              render={(props) => <DefaultLayout {...props} />}
              component={DefaultLayout}
            />
          ) : (
            <>
              <Route exact path="/" name="login page" component={Login} />

              <Route exact path="/login" name="login page" component={Login} />
            </>
          )}

          {/* NotFound Error page */}
          <Route path="*" component={Page404} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
};

export default App;
