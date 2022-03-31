import React from "react";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";
import Messages from "./Messages";

const MessageIndex = () => {
  return (
    <>
      {checkAccessPermission("message_view") ? (
        <>
          <Messages />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default MessageIndex;
