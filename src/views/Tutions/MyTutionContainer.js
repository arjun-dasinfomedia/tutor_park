import React from "react";
import AllMyTutionList from "./AllMyTutionList";
import FindTutionList from "./FindTutionList";
import AllTutionListForTutor from "./AllTutionListForTutor";

const MyCourseContainer = (Data) => {
  switch (Data.Data) {
    case "All":
      return (
        <div>
          <AllMyTutionList SearchData={Data.Search} />
        </div>
      );
    case "Find_Tution":
      return (
        <div>
          <FindTutionList SearchData={Data.Search} />
        </div>
      );
    case "All_Tutor":
      return (
        <div>
          <AllTutionListForTutor SearchData={Data.Search} />
        </div>
      );
    default:
      return (
        <div>
          <AllMyTutionList SearchData={Data.Search} />
        </div>
      );
  }
};
export default MyCourseContainer;
