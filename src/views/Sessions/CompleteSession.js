import React, { useEffect, useState } from "react";
import {
  CCard,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CCardImage,
  CBadge,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "@mui/material/Checkbox";
import MaterialTable from "material-table";
import Controls from "src/components/formControls/controls/Controls";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { useSelector, useDispatch } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import profile4 from "../../assets/images/My_Tuition/Teacher.png";
import { getUserRole } from "../../utility/utils";
import {
  completedSessionList,
  studentattendanceList,
  addattendance,
} from "./sessionsActions";
import ReactPaginate from "react-paginate";
const PER_PAGE = 10;

const CompleteSession = (props) => {
  /*Array Set Empty */
  let student_idss = [];
  const StudentAttendanceList = [
    {
      title: "",
      field: "status",
      render: (rowData) => (
        /* Checkbox Event Set */
        <Checkbox
          name="student_id[]"
          value={rowData.id}
          onChange={handlechnagecheck}
          defaultChecked={student_idss.includes(rowData.id) ? true : false}
        />
      ),
    },
    {
      title: "Tp Id",
      field: "tp_id",
    },
    {
      title: "Name",
      field: "name",
    },
  ];
  const dispatch = useDispatch();

  /*State */
  const [attendance, setAttendance] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const sessions = useSelector((state) => state.sessions);
  const [currentPage, setCurrentPage] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  /*Complete Session List */
  useEffect(async () => {
    showLoader();
    await dispatch(completedSessionList());
    setLoading(false);
    hideLoader();
  }, []);

  /*Student Attendance List Module open */
  const openAttendanceModul = async (session_id) => {
    setSessionId(session_id);
    await dispatch(studentattendanceList({ session_id }));
    setAttendance(true);
  };

  /* Attendence List Get */
  const assignedState = sessions.attendancelist ? sessions.attendancelist : {};
  /*Status Loop  and  array push Student id*/
  assignedState.map((student, idx) =>
    student.status == "present" ? student_idss.push(student.id) : ""
  );

  /*Checkbox Click Value Get */
  const handlechnagecheck = (item) => {
    const isChecked = item.target.checked;
    const value = item.target.value;
    if (isChecked) {
      student_idss.push(value);
    } else {
      const index = student_idss.indexOf(value);
      if (index > -1) {
        student_idss.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  };

  /*Set Unique Value */
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  /*Add Attendance  */
  const addAttendanceData = (item) => {
    var unique_student = student_idss.filter(onlyUnique);
    dispatch(
      addattendance({ session_id: sessionId, student_ids: unique_student })
    );

    student_idss = [];
    setAttendance(false);
    // window.location.reload();
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const pageCount = Math.ceil(sessions.completesessiondata.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;

  /* completesession List */
  const loadSessionsDynamic = sessions.completesessiondata
    .filter((item) => {
      if (props.SearchData == "") {
        return item;
      } else if (
        item.tuition_title == null ? "" : item.tuition_title
          .toLowerCase()
          .includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.tutor_name == null ? "" : item.tutor_name.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      return (
        <div key={key}>
          <CCard className="p-3 assigncard mt-1 mb-2">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-2">
                <CCardImage
                  src={item.tuition_image}
                  className="img-fluid rounded mx-auto d-flex serchcourse-image"
                />
              </div>
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-7 text-center text-sm-center text-md-start text-lg-start text-xl-start">
                <div className="row m-2">
                  <div className="Tuitionsub ">
                    <div className="">
                      <h6 className="card-title d-inline font-weight-bold">
                        {item.tuition_title}
                      </h6>
                    </div>
                  </div>

                  <div className="col-12 ">
                    <div className="">
                      <img
                        src={profile4}
                        className="tuitionteacher normal-font mr-1"
                      />
                      {item.tutor_name}
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />{" "}
                      {item.schedule_date}{" "}
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />{" "}
                      {item.from_time} To {item.end_time}{" "}
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="normal-font">
                      {item.total_students} Students
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />{" "}
                      {item.total_videos} Videos{" "}
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1 d-inline"
                      />
                      <p className="d-inline totalassign">
                        {item.total_assignments} Assignments
                      </p>{" "}
                      {/* Student Side Status Badge */}
                      {getUserRole() === "student" ? (
                        <div className="d-inline">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="infocircle1 m-1"
                          />
                          {item.attendance_status !== null ? (
                            <CBadge color="success p-1">Present</CBadge>
                          ) : (
                            <CBadge color="danger p-1">Absant</CBadge>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 d-flex justify-content-center align-items-center">
                {/* Module Open Attendance Student List */}
                {getUserRole() === "tutor" ? (
                  <CButton
                    className="btn buynowbutton m-1 font-weight-bold text-center"
                    onClick={() => openAttendanceModul(item.session_id)}
                  >
                    Attendance
                  </CButton>
                ) : (
                  ""
                )}
              </div>
            </div>
          </CCard>
        </div>
      );
    });
  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : loadSessionsDynamic.length !== 0 ? (
        <div className="mt-3">
          <CRow>
            {loadSessionsDynamic}
            
            {/* pagination code start */}
            {sessions.completesessiondata.length > 10 ? (
              <div className="mt-4 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center">
                <ReactPaginate
                  previousLabel={"<<"}
                  nextLabel={">>"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={1}
                  onPageChange={handlePageClick}
                  activeClassName={"active"}
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  pageClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  nextClassName={"page-item next"}
                  previousClassName={"page-item prev"}
                  previousLinkClassName={"page-link"}
                  pageLinkClassName={"page-link"}
                  containerClassName={
                    "pagination react-paginate col-12 col-sm-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center"
                  }
                />
              </div>
            ) : (
              ""
            )}

            {/* Module Student List Open */}
            <CModal
              visible={attendance}
              size="lg"
              onDismiss={() => setAttendance(false)}
            >
              <CModalHeader
                onDismiss={() => setAttendance(false)}
                className="tutorviewmodalheader"
              >
                <CModalTitle>Add Attendance</CModalTitle>
              </CModalHeader>
              <CModalBody>
                {/* Material Table */}
                <MaterialTable
                  columns={StudentAttendanceList}
                  data={sessions.attendancelist}
                  options={{
                    search: true,
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

                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-Start">
                  <div className="p-2 d-inline">
                    {/* Add Attendence button */}
                    <Controls.Button
                      onClick={(item) => addAttendanceData(item)}
                      text="Add Attendance"
                      className="rounded-pill button-color-rounded-pill"
                    />
                  </div>
                </div>
              </CModalBody>
            </CModal>
            {/* pagination code end */}
          </CRow>
        </div>
      ) : (
        <NoDataContainer module="Completed sessions" />
      )}
    </>
  );
};
export default CompleteSession;
