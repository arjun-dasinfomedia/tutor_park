import React from "react";
import NetworkList from "./NetworkList";
import NetworkMyStudent from "./NetworkMyStudent";
import NetworkRequest from "./NetworkRequest";
import NetworkStudent from "./NetworkStudent";
import NetworkTeachers from "./NetworkTeachers";

const NetworkContainer = (Data) => {
  switch (Data.Data) {

    // All Page
    case "All":
      return (
        <div>
          <NetworkList SearchData={Data.SearchAll} />
        </div>
      );

    // Teacher Page
    case "Teachers":
      return (
        <div>
          <NetworkTeachers SearchData={Data.SearchAll} />
        </div>
      );

    // Student Page
    case "Student":
      return (
        <div>
          <NetworkStudent SearchData={Data.SearchAll} />
        </div>
      );

    // My Student Page
    case "MyStudent":
      return (
        <div>
          <NetworkMyStudent SearchData={Data.SearchAll} />
        </div>
      );

    // Request Page
    case "Request":
      return (
        <div>
          <NetworkRequest SearchData={Data.SearchAll} />
        </div>
      );

      // Default Page
    default:
      return (
        <div>
          <NetworkList SearchData={Data.SearchAll} />
        </div>
      );
      break;
  }
};
export default NetworkContainer;
