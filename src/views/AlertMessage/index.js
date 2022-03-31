import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const CustomAlertControl = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const type = alert.type;
  return (
    <>
      {alert.message && (
        <>
          {/* <ToastContainer autoClose={type === "error" ? "-1" : "6000"} /> */}
          <ToastContainer autoClose="8000" />
        </>
      )}
    </>
  );
};

export default CustomAlertControl;
