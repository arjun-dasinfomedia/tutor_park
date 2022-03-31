import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <CFooter>
      <div>
        <span className="ms-1">
          Copyright &copy; {currentYear} TutorPark Company | All rights
          reserved.
        </span>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
