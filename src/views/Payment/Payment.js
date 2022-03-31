import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { expenseList } from "./paymentAction";
import { useSelector, useDispatch } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import NoDataContainer from "../NoDataContainer/noDataContainer";

const Payment = () => {
  
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.payment);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(async () => {
    showLoader();
    await dispatch(expenseList());
    setLoading(false);
    hideLoader();
  }, []);

  const columns = [
    {
      title: "S.no",
      field: "Sno",
    },
    {
      title: "Date",
      field: "date",
    },
    {
      title: "Name",
      field: "from_name",
    },
    {
      title: "Email",
      field: "from_email",
    },
    {
      title: "Purpose",
      field: "purpose",
    },
    {
      title: "Mode of teaching",
      field: "teaching_mode",
    },
    {
      title: "Payment mode",
      field: "payment_mode",
    },
    {
      title: "Transactions Id",
      field: "transaction_id",
    },
    {
      title: "Paid Amount",
      field: "amount",
    },
    {
      title: "Status",
      field: "status",
    },
  ];

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : payment.expenseData.length !== 0 ? (
        <div style={{ textAlign: "center", paddingTop: "3%" }}>
          <MaterialTable
            title=""
            columns={columns}
            data={payment.expenseData}
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
            actions={[
              {
                tooltip: "Remove All Selected Users",
                icon: "delete",
                onClick: (evt, data) =>
                  alert("You want to delete " + data.length + " rows"),
              },
            ]}
          />
        </div>
      ) : (
        <NoDataContainer module="Transactions" />
      )}
    </div>
  );
};
export default Payment;
