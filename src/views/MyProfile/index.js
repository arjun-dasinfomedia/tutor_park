import React from "react";
import MyProfile from "./MyProfile";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const Profile = () => {
  return (
    <>
      {checkAccessPermission("profile_view") ? (
        <>
          <MyProfile />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default Profile;
