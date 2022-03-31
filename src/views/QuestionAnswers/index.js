import React from "react";
import TopFilter from "./TopFilter";
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../pages/page403/Page403";

const QuestionAnswer = () => {
  return (
    <>
      {checkAccessPermission("question_and_answers_view") ? (
        <>
          <TopFilter />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  );
};
export default QuestionAnswer;
