import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { invoiceList } from "./paymentAction";
import { useSelector, useDispatch } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { getUserData } from "src/utility/utils";

const InvoiceList = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const payment = useSelector((state) => state.payment);

  useEffect(async () => {
    showLoader();
    await dispatch(invoiceList({ invoice_for_id: getUserData().school.id }));
    setLoading(false);
    hideLoader();
  }, []);

  const columns = [
    {
      title: "Date",
      field: "date",
    },
    {
      title: "Name",
      field: "name",
      render: (rowData) =>
        rowData.invoicable === null
          ? "N/A"
          : rowData.invoice_for === "school"
          ? rowData.invoicable.school_name
          : rowData.invoicable.name,
    },
    {
      title: "Type",
      field: "invoice_for",
    },
    {
      title: "Invoice Number",
      field: "invoice_no",
    },
    {
      title: "Payment Method",
      field: "payment_method",
    },
    {
      title: "Payment Status",
      field: "payment_status",
    },
    {
      title: "Transactions Id",
      field: "transaction_id",
    },
    {
      title: "Invoice Purpose",
      field: "purpose",
      render: (rowData) =>
        rowData.purpose === null ? "N/A" : rowData.purpose,
    },
    {
      title: "Amount (Rs.)",
      field: "amount",
    },
    {
      title: "Mode Of Tuition",
      field: "mode_of_tuition",
      render: (rowData) =>
        rowData.mode_of_tuition === null ? "N/A" : rowData.mode_of_tuition,
    },
    {
      title: "Course Tuition Name",
      field: "course_tuition_name",
      render: (rowData) =>
        rowData.course_tuition_name === null
          ? "N/A"
          : rowData.course_tuition_name,
    },
    {
      title: "Session Taken",
      field: "session_taken",
      render: (rowData) =>
        rowData.session_taken === null ? "N/A" : rowData.session_taken,
    },
  ];

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : payment.invoiceData.length !== 0 ? (
        <div className="mb-3" style={{ textAlign: "center", paddingTop: "3%" }}>
          <MaterialTable
            title=""
            columns={columns}
            data={payment.invoiceData}
            options={{
              search: true,
              selection: true,
              filtering: true,
              searchFieldAlignment: "right",
              headerStyle: {
                backgroundColor: "#DEDDF4",
                color: "#444346",
                fontWeight: "600",
                fontSize: "15px",
              },
            }}
          />
        </div>
      ) : (
        <NoDataContainer module="Invoice" />
      )}
    </div>
  );
};
export default InvoiceList;
