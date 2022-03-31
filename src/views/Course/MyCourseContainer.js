import React from "react";
import UncompletedCourseList from "./UncompletedCourseList";
import CompletedCourseList from "./CompletedCourseList";
import AllMyCourseList from "./AllMyCourseList";

const MyCourseContainer = (Data) => {
  switch (Data.Data) {
    case "Completed":
      return (
        <div>
          <CompletedCourseList SearchData={Data.Search} />
        </div>
      );
    case "Uncompleted":
      return (
        <div>
          <UncompletedCourseList SearchData={Data.Search} />
        </div>
      );
    default:
      return (
        <div>
          <AllMyCourseList SearchData={Data.Search} />
        </div>
      );
      break;
  }
};
export default MyCourseContainer;
