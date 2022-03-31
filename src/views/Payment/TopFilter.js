import React from "react";
import { CCard } from "@coreui/react";
import Payment from "./Payment";
import { getUserRole } from "../../utility/utils";
import InvoiceList from "./InvoiceList";

const TopFliter = () => {
  return (
    <>
      <CCard className="course-card-list-css">
        <div className="row">
          <div className="col text-center mt-5 mb-5">
            <h5 className="d-inline text-book-header">My Transactions</h5>
          </div>
        </div>
      </CCard>
      {getUserRole() == "school-admin" ?
        <InvoiceList />
        :
        <Payment />
      }
    </>
  );
};
export default TopFliter;
