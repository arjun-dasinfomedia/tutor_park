import React from "react";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";
import Chat from "./Chat";

const ChatIndex = () => {
  return (
    <>
      {checkAccessPermission("chat_view") ? (
        <>
          <Chat />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default ChatIndex;
