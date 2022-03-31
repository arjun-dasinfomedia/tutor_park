import React from "react";
import Earnings from "./Earnings";
import InvoiceList from "./InvoiceList";

const EarningContainer = (Data) => {
  switch (Data.data) {
    case "transaction":
      return (
        <div>
          <Earnings />
        </div>
      );
    case "invoice":
      return (
        <div>
          <InvoiceList />
        </div>
      );

    default:
      return (
        <div>
          <Earnings />
        </div>
      );
      break;
  }
};
export default EarningContainer;
