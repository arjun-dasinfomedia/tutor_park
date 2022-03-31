import React from "react";
import { checkAccessPermission } from "src/utility/utils";
import CustomAlertControl from "../AlertMessage";
import Page403 from "../pages/page403/Page403";
import InviteFriend from "./InviteFriend";

const InviteAFriend = () => {
  return (
    <>
      {checkAccessPermission("invite_user_view") &&
      checkAccessPermission("invite_user_add") ? (
        <>
          <CustomAlertControl />
          <InviteFriend />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default InviteAFriend;
