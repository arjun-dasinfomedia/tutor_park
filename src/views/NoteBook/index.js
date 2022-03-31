import React from "react";
import TopFilterNoteBook from "./TopFilterNoteBook";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";
import CustomAlertControl from "../AlertMessage";

const NoteBook = () => {
  return (
    <>
      {checkAccessPermission("note_book_view") ? (
        <>
          <CustomAlertControl />
          <div style={{ marginTop: "15px" }}>
            <TopFilterNoteBook />
          </div>
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default NoteBook;
