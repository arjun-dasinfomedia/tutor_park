import React from "react";
import AccessRightsList from "./AccessRightsList";

const Course = () => {
  return (
    <>
      <div className="p-2">
        <div className="mb-4 mt-2 accessRights-medium-text fw-bold">
          Access Rights
        </div>
        <AccessRightsList />
      </div>
    </>
  );
};
export default Course;
