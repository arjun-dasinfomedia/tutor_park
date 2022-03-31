import React from 'react'
import InviteFriend from './InviteFriend'
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../../pages/page403/Page403";
import CustomAlertControl from 'src/views/AlertMessage';

const InviteUser = () => {

  return (
    <>
      {(checkAccessPermission("invite_user_view") && checkAccessPermission("invite_user_add")) ? (
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
  )
}

export default InviteUser

