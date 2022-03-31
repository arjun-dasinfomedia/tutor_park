import React from "react";
import AssignmentList from "../Assignment/AssignmentList";
import QuestionBank from "./QuestionBankList";

const QuestionBankContainer = (Data) => {
  switch (Data.Data) {
    case "Assignment":
      return (
        <div>
          <AssignmentList />
        </div>
      );
    case "Question Bank":
      return (
        <div>
          <QuestionBank />
        </div>
      );
    default:
      return (
        <div>
          <QuestionBank />
        </div>
      );
      break;
  }
};
export default QuestionBankContainer;
