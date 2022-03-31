import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { earningsList } from "./earningsAction";
import { useSelector, useDispatch } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import NoDataContainer from "../NoDataContainer/noDataContainer";

const Earnings = () => {

  const dispatch = useDispatch();
  const earnings = useSelector((state) => state.earnings);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(async () => {
    showLoader();
    await dispatch(earningsList());
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
      field: "from_name",
    },
    {
      title: "ID*link",
      field: "id_link",
    },
    {
      title: "Email",
      field: "from_email",
    },
    {
      title: "Mode of Teaching",
      field: "teaching_mode",
    },
    {
      title: "Payment Mode",
      field: "payment_mode",
    },
    {
      title: "Transactions Id",
      field: "transaction_id",
    },
    {
      title: "Amount (Rs.)",
      field: "amount",
    },
    {
      title: "Tutor Park Fees",
      field: "tp_commission",
    },
    {
      title: "Total Amount (Rs.)",
      field: "final_amount",
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Purpose",
      field: "purpose",
    },
  ];

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : earnings.earningsData.length !== 0 ? (
        <div className="mb-3" style={{ textAlign: "center", paddingTop: "3%" }}>
          <MaterialTable
            title=""
            columns={columns}
            data={earnings.earningsData}
            options={{
              search: true,
              selection: true,
              filtering: true,
              searchFieldAlignment: "right",
              exportAllData: true,
              exportButton: {
                csv: true,
                pdf: true,
             },
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
        <NoDataContainer module="Earnings" />
      )}
    </div>
  );
};
export default Earnings;
