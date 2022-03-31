import React from "react";
import FilterTextBook from "./TopFilter";
import ListTextBook from "./ListTextBook";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const TextBook = () => {
  return (
    <>
      {checkAccessPermission("text_book_view") ? (
        <>
          <FilterTextBook />
          <ListTextBook />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};

export default TextBook;
