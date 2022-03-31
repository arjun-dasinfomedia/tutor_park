import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import useFullPageLoader from "../hooks/useFullPageLoader";
import { isUserLoggedIn } from "../utility/utils";

// routes config
import routes from "../routes";

// Pages
const Login = React.lazy(() => import("../views/Auth/login/Login"));
const Register = React.lazy(() => import("../views/Auth/register/Register"));
const Page404 = React.lazy(() => import("../views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("../views/pages/page500/Page500"));
// localStorage.clear();

const AppContent = () => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const store = useSelector((state) => state.authReducer);
  const alert = useSelector((state) => state.alert);

  return (
    <CContainer className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12">
      {store.logoutStatus === false ? (
        <Suspense fallback={<>{loader}</>}>
          {/* <Suspense> */}
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <>
                        <route.component {...props} />
                      </>
                    )}
                  />
                )
              );
            })}
            {/* <Redirect from="/login" to="/home" /> */}

            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            {isUserLoggedIn() === null ? (
              <Route
                exact
                path="/login"
                name="login page"
                // render={(props) => <Login {...props} />}
                component={Login}
              />
            ) : (
              ""
            )}

            {/* NotFound Error page */}
            <Route path="*" component={Page404} />
          </Switch>
        </Suspense>
      ) : (
        ""
      )}
    </CContainer>
  );
};

export default React.memo(AppContent);
