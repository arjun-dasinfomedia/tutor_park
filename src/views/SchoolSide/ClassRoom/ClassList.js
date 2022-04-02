import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  MenuItem,
  InputLabel,
  InputAdornment,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";
import {
  getUserRole,
} from "../../../utility/utils";
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import { TextField, Select } from "formik-material-ui";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
import Controls from "src/components/formControls/controls/Controls";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import {
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
  CCardImage,
  CCardText,
  CRow,
  CCol,
  CCard,
  CButton,
  CBadge,
} from "@coreui/react";
import {
  subjectListData
} from "../../../redux/actions/dropdowns/index";
import * as yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import NoDataContainer from "../../NoDataContainer/noDataContainer";
import { addSubjectLeader, RequsetAccessClass, addStudentInClassSection, enableDisableStudent, getAllTutorList, removeStudentInClassSection, schoolClassList, schoolStudentTeacherList, subjectTeacherStore, storeTimetable, timeTableList } from './SchoolClassAction'
import { useDispatch, useSelector } from 'react-redux';
import useFullPageLoader from "src/hooks/useFullPageLoader";
import CustomAlertControl from '../../AlertMessage'
import { Link } from 'react-router-dom';
import AttendanceClass from "./AttendaceClass"

const PER_PAGE = 10;

const ClassList = (Prop) => {

  const dispatch = useDispatch();
  const schoolClass = useSelector((state) => state.schoolClass);
  const DropDown = useSelector((state) => state.dropdowns);
  const [addteacher, setAddTeacher] = useState(false)
  const [addstudent, setAddStudent] = useState(false)
  const [studentData, setStudentData] = useState('')
  const [timeTable, setTimeTable] = useState(false)
  const [viewTimeTable, setViewTimeTable] = useState(false)
  const [viewTeacher, setViewTeacher] = useState(false)
  const [viewStudent, setViewStudent] = useState(false)
  const [teacherData, setTeacherData] = useState('')
  const [timeTableData, setTimeTableData] = useState('')
  const [viewTimeTableData, setViewTimeTableData] = useState('')
  const [studentViewData, setStudentViewData] = useState('')
  const [currentPage, setCurrentPage] = useState(0);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [isLoading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState(false)
  const [attendanceData, setAttendanceData] = useState("")
  const [copyTimeData, setCopyTimeData] = useState([])
  const makeTimeInputRequired = useRef(null);

  const [manageLeader, setManageLeader] = useState(false);
  const [updateManageLeader, setUpdateManageLeader] = useState(false);
  const [managerLeaderData, setManageLeaderData] = useState("");
  const [updateManageData, setUpdateManageLeaderData] = useState("");

  const emptytime = [{ Day: "Monday" },
  { Day: "Tuesday" },
  { Day: "Wednesday" },
  { Day: "Thursday" },
  { Day: "Friday" },
  { Day: "Saturday" }];

  // My object
  // AttendanceModal Open
  const AttendanceModal = (data) => {
    setAttendance(true);
    setAttendanceData(data)
  }

  // Manage Update Leader
  function UpdateLeaderModal(data) {
    setUpdateManageLeader(true);
    setUpdateManageLeaderData(data);

  }

  // Add Leader
  const AddLeaderModal = (data) => {
    setManageLeader(true);
    setManageLeaderData(data)
  }

  const initialTimeValues = {
    // Addtime: emptytime,
    Addtime: [],
    division_id: '',
    teacher_ids: [],
    subject_ids: [],
    days: [],
    start_time: [],
    end_time: [],

  }
  let leader_ids = [];

  const [visible, setVisible] = useState(false);

  const onAddingItem = (Day, TeacherID, event) => {

    if (event.target.checked === false) {

      const DayArray = {}

      Object.entries(copyTimeData).filter((Data) => {
        if (TeacherID == Data[0]) {
          var array = {}
          Object.entries(Data[1]).filter((Days) => {
            var Obj = {}
            var DayName = Days[0]
            var teacher_id = Data[0]
            var day_value = Days[1]
            if (Day !== Days[0]) {
              array[DayName] = day_value
            }
          })
          DayArray[Data[0]] = array
        } else {
          DayArray[Data[0]] = Data[1]
        }
      })
      setCopyTimeData(DayArray)
    } else { }
  };


  /* List APi */

  useEffect(async () => {
    showLoader();
    await dispatch(schoolClassList());
    await dispatch(subjectListData());
    await dispatch(getAllTutorList({ role: "school-tutor" }));
    setLoading(false);
    hideLoader();
  }, []);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const emptysection = { teachers: "", subjects: "" };
  const emptyLeader = { Leader: "", LeaderSubjects: "" };
  let emptyUpdateLeader = []
  if (updateManageData !== "") {
    emptyUpdateLeader = { UpdateLeader: "", subject_name: "" };
  }

  const initialValues = {
    Addsections: [emptysection],
    AddLeader: [emptyLeader],
    class_teacher: '',
    class_teacher_subject: '',
    ass_class_teacher: '',
    ass_class_teacher_subject: '',

  }

  let initialvaluesForUpdateLeader = []
  if (updateManageData !== "") {
    // console.log(emptyUpdateLeader)
    initialvaluesForUpdateLeader = {
      UpdateLeader:
        updateManageData.subjectLeaders.length === 0
          ?
          [emptyUpdateLeader]
          // console.log("name")
          : updateManageData.subjectLeaders,
    }
  }


  const validationSchema = yup.object({
    class_teacher: yup
      .string()
      .required("Please select class teacher."),
    class_teacher_subject: yup
      .string()
      .required("Please select teacher subject."),
    ass_class_teacher: yup
      .string()
      .required("Please select assistant teacher."),
    ass_class_teacher_subject: yup
      .string()
      .required("Please select assistant teacher subject."),

    Addsections: yup
      .array().of(
        yup.object().shape({
          teachers: yup.string().required("Please Select teachers"),
          subjects: yup.string().required("Please Select subjects"),
        })
      ),
  });
  const validationForLeader = yup.object({

    AddLeader: yup
      .array().of(
        yup.object().shape({
          Leader: yup.string().required("Please Select Leader"),
          LeaderSubjects: yup.string().required("Please Select subjects"),
        })
      ),

  });
  const validationForUpdateLeader = yup.object({

    UpdateLeader: yup.array().of(
      yup.object().shape({
        leader_id: yup.string().required("Please Select a Leader."),
        subject_id: yup.string().required("Please Select a Subject."),

      })
    ),


  });

  let validationSchemaForAddtoClassTeacher = null

  if (teacherData.have_class_teacher === 0 && teacherData.have_ass_class_teacher === 0) {

    validationSchemaForAddtoClassTeacher = yup.object({

      class_teacher: yup
        .string()
        .required("Please select class teacher."),
      class_teacher_subject: yup
        .string()
        .required("Please select teacher subject."),

      ass_class_teacher: yup
        .string()
        .required("Please select assistant teacher."),
      ass_class_teacher_subject: yup
        .string()
        .required("Please select assistant teacher subject."),

      Addsections: yup
        .array().of(
          yup.object().shape({
            teachers: yup.string().required("Please Select teachers"),
            subjects: yup.string().required("Please Select subjects"),
          })
        ),

    });
  } else if (teacherData.have_class_teacher === 0) {

    validationSchemaForAddtoClassTeacher = yup.object({

      class_teacher: yup
        .string()
        .required("Please select class teacher."),
      class_teacher_subject: yup
        .string()
        .required("Please select teacher subject."),

      Addsections: yup
        .array().of(
          yup.object().shape({
            teachers: yup.string().required("Please Select teachers"),
            subjects: yup.string().required("Please Select subjects"),
          })
        ),

    });
  } else if (teacherData.have_ass_class_teacher === 0) {

    validationSchemaForAddtoClassTeacher = yup.object({

      ass_class_teacher: yup
        .string()
        .required("Please select assistant teacher."),
      ass_class_teacher_subject: yup
        .string()
        .required("Please select assistant teacher subject."),

      Addsections: yup
        .array().of(
          yup.object().shape({
            teachers: yup.string().required("Please Select teachers"),
            subjects: yup.string().required("Please Select subjects"),
          })
        ),

    });

  } else {

    validationSchemaForAddtoClassTeacher = yup.object({

      Addsections: yup
        .array().of(
          yup.object().shape({
            teachers: yup.string().required("Please Select teachers"),
            subjects: yup.string().required("Please Select subjects"),
          })
        ),

    });

  }


  // Add TimeTable function modal open code
  const addTimeTable = (item) => {
    dispatch(timeTableList({ division_id: item.id }))
    setCopyTimeData(schoolClass.timeList)
    setTimeTableData(item)
    setTimeTable(!timeTable)
  }


  const viewTimeTableFunction = (item) => {

    setViewTimeTableData(item)
    setViewTimeTable(!viewTimeTable)

  }

  const ViewStudentModal = (data) => {
    setViewStudent(true)
    setStudentViewData(data)
  }

  const ViewTimeTableColumn = [
    {
      title: "Day",
      field: "day",
    },
    {
      title: "TP_ID",
      field: "teacher_tpid",
    },
    {
      title: "Teacher Name",
      field: "teacher_name",
    },
    {
      title: "Subject Name",
      field: "subject_name",
    },
    {
      title: "Time",
      field: "Start Time",
      render: rowData => rowData.start_time + " To " + rowData.end_time,
    },
  ]

  // Add Student function

  const studentAdd = (item) => {

    setStudentData(item),
      setAddStudent(!addstudent),
      dispatch(schoolStudentTeacherList({ division_id: item.id, role: "school-student" }))

  }


  const StudentAddcolumns = [
    // {
    //   title: "",
    //   field: "is_leader",
    //   render: (rowData) => (
    //     /* Checkbox Event Set */
    //     <Checkbox
    //       name="user_ids[]"
    //       value={rowData.id}
    //       onChange={handlechnagecheck}
    //       defaultChecked=""
    //     />
    //   ),
    // },
    {
      title: "TP ID",
      field: "tp_id",
    },
    {
      title: "Student Name",
      field: "name",
    },
  ];

  // Add Student in clss Section

  const addStudentAction = (data) => {
    const Student_ID = [];
    data.map(function (item) {
      Student_ID.push(item.id);
    });
    dispatch(addStudentInClassSection({ student_ids: Student_ID, division_id: studentData.id }));
    setAddStudent(false)
  }

  // Remove Student in clss Section

  const removeStudentAction = (data) => {
    const Student_ID = [];
    data.map(function (item) {
      Student_ID.push(item.id);
    });
    dispatch(removeStudentInClassSection({ user_ids: Student_ID, division_id: studentViewData.id }));
    setViewStudent(false)
  }

  const RequsetAccessToAdmin = (item) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You want to Access this Class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(RequsetAccessClass({ division_id: item.id }));
        // setViewStudent(false)
      }
    })
  }

  // Enable and Disable Student in class Section

  const enableDisableStudentHandle = (Data) => {
    {
      Data.status === 1 ? (
        Swal.fire({
          title: "Are you sure?",
          text: "You want to disable this student!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(enableDisableStudent({ division_id: studentViewData.id, user_id: Data.id }));
            setViewStudent(false)
          }
        })
      ) : (
        Swal.fire({
          title: "Are you sure?",
          text: "You want to enable this student!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(enableDisableStudent({ division_id: studentViewData.id, user_id: Data.id }));
            setViewStudent(false)

          }
        })
      )
    }

  };

  const ViewTeacherModal = (data) => {
    setViewTeacher(true);
    setStudentViewData(data)
  }

  // Add Teacher function

  const teacherAdd = (item) => {

    setTeacherData(item),
      setAddTeacher(!addteacher),
      dispatch(schoolStudentTeacherList({ division_id: item.id, role: "school-tutor" }))

  }


  // Enable and Disable Teacher in class Section

  const enableDisableTeacherHandle = (Data) => {
    {
      Data.status === 1 ? (
        Swal.fire({
          title: "Are you sure?",
          text: "You want to disable this Teacher!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(enableDisableStudent({ division_id: studentViewData.id, user_id: Data.teacher_id }));
            setViewTeacher(false)
          }
        })
      ) : (
        Swal.fire({
          title: "Are you sure?",
          text: "You want to enable this Teacher!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(enableDisableStudent({ division_id: studentViewData.id, user_id: Data.teacher_id }));
            setViewTeacher(false)

          }
        })
      )
    }

  };

  // Remove Teacher in class Section

  const removeTeacherAction = (data) => {
    const TEACHER_ID = [];
    data.map(function (item) {
      TEACHER_ID.push(item.teacher_id);
    });
    dispatch(removeStudentInClassSection({ user_ids: TEACHER_ID, division_id: studentViewData.id }));
    setViewTeacher(false)
  }

  const pageCount = Math.ceil(schoolClass.schoolClassData.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;
  const loadAllSchoolClassListData = schoolClass.schoolClassData.filter((item) => {

    if (Prop.searchData === "") {
      return item;
    } else if (
      item.standard === null ? "" :
        item.standard.toLowerCase().includes(Prop.searchData.toLowerCase())
    ) {
      return item;
    } else if (
      item.name === null ? "" : item.name.toLowerCase().includes(Prop.searchData.toLowerCase())
    ) {
      return item;
    }
    else if (
      item.class.syllabus === null ? "" : item.class.syllabus.toLowerCase().includes(Prop.searchData.toLowerCase())
    ) {
      return item;
    }
    else if (
      item.class.class_name === null ? "" : item.class.class_name.toLowerCase().includes(Prop.searchData.toLowerCase())
    ) {
      return item;
    } else if (
      item.class.description === null ? "" :
        item.class.description.toLowerCase().includes(Prop.searchData.toLowerCase())
    ) {
      return item;
    }
  })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      return (
        <CCol sm={12} md={12} lg={12} xl={12} key={key}>
          <CCard className="card p-3 friendcard mb-3 mt-3">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 ">
                <CCardImage
                  className="post-serch-userimage rounded img-fluid mx-auto d-flex"
                  orientation="top"
                  src={item.class.image !== null ? item.class.image : ""}
                />
              </div>

              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6 text-center text-sm-center text-md-start text-lg-start text-xl-start">
                <div className="row">

                  <div className="col-12">
                    <h5 className="d-inline card-title font-weight-bold text-xs-center ">
                      {item.standard} Class
                    </h5>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="infocircle1 m-1 normal-font"
                    />
                    <div className="d-inline normal-font">Section - {item.name}</div>
                  </div>

                  <div className="col-12">
                    <div className="d-inline normal-font">Syllabus - {item.class.syllabus}</div>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="infocircle1 m-1 normal-font"
                    />
                    <div className="d-inline normal-font">Class Name - {item.class.class_name}</div>
                  </div>

                  <div className="col-12">
                    <div className="d-inline normal-font">
                      Description - {item.class.description !== null ? item.class.description : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
              {item.is_disabled === false ?
                <>
                  <CCol className="  tuitioncardlast">
                    <CRow>
                      {getUserRole() === "school-student" ? "" :
                        <>

                          <CCol>
                            <CCardText>
                              <CButton className="detailbutton tuitionicon"
                                onClick={() => teacherAdd(item)}>
                                Add Teacher
                              </CButton>
                            </CCardText>
                          </CCol>

                          <CCol>
                            <CCardText>
                              <CButton className="detailbutton tuitionicon"
                                onClick={() => studentAdd(item)}>
                                Add Student
                              </CButton>
                            </CCardText>
                          </CCol>
                        </>
                      }

                    </CRow>

                    <CRow>

                      <CCol>
                        <CCardText>
                          <CButton
                            className="detailbutton tuitionicon"
                            onClick={() => ViewTeacherModal(item)}
                          >
                            View Teacher
                          </CButton>
                        </CCardText>
                      </CCol>

                      <CCol>
                        <CCardText>
                          <CButton
                            className="detailbutton tuitionicon"
                            onClick={() => ViewStudentModal(item)}
                          >
                            View Student
                          </CButton>
                        </CCardText>
                      </CCol>
                    </CRow>

                    <CRow>
                      {getUserRole() === "school-admin" ? (
                        <CCol>
                          <CCardText>
                            <CButton
                              className="detailbutton tuitionicon"
                              onClick={() => addTimeTable(item)}
                            >
                              Time Table
                            </CButton>
                          </CCardText>
                        </CCol>
                      ) : (
                        <CCol>
                          <CCardText>
                            <CButton
                              className="detailbutton tuitionicon"
                              onClick={() => viewTimeTableFunction(item)}
                            >
                              View Time Table
                            </CButton>
                          </CCardText>
                        </CCol>
                      )}
                      <CCol>
                        <CCardText>
                          <CButton className="detailbutton tuitionicon"
                            onClick={() => AttendanceModal(item)}
                          >
                            Attendance
                          </CButton>
                        </CCardText>
                      </CCol>
                    </CRow>

                    <CRow>

                      <CCol>
                        <Link to="/axis">
                          <CCardText>
                            <CButton
                              className="detailbutton tuitionicon"
                            >
                              Schdule Meet
                            </CButton>
                          </CCardText>
                        </Link>
                      </CCol>

                      <CCol>
                        <Link to="/messages">
                          <CCardText>
                            <CButton className="detailbutton tuitionicon">
                              Message
                            </CButton>
                          </CCardText>
                        </Link>
                      </CCol>
                    </CRow>

                    <CRow>
                      {getUserRole() == "school-student" ? "" :
                        <>
                          {item.subjectLeaders.length == 0 ?
                            <CCol>
                              <CCardText>
                                <CButton className="detailbutton tuitionicon"
                                  onClick={() => AddLeaderModal(item)}
                                >
                                  Manage Leaders
                                </CButton>
                              </CCardText>
                            </CCol>
                            :
                            <CCol>
                              <CCardText>
                                <CButton className="detailbutton tuitionicon"
                                  onClick={() =>
                                    UpdateLeaderModal(item)}
                                >
                                  Manage Leaders
                                </CButton>
                              </CCardText>
                            </CCol>
                          }
                        </>
                      }
                      <CCol>
                        {getUserRole() === "school-admin" ? (
                          <CCol>
                            <CCardText>
                              <CButton
                                className="detailbutton tuitionicon"
                                onClick={() => viewTimeTableFunction(item)}
                              >
                                View Time Table
                              </CButton>
                            </CCardText>
                          </CCol>
                        ) : ("")}
                      </CCol>
                    </CRow>

                  </CCol>
                </>
                :
                <>
                  <CCol className="tuitioncardlast">
                    <CRow>

                      <CCol>
                        <CCardText>
                          <CButton className="detailbutton tuitionicon"
                            onClick={() => RequsetAccessToAdmin(item)}>
                            Requset Admin to Give Access
                          </CButton>
                        </CCardText>
                      </CCol>
                    </CRow>
                  </CCol>

                </>
              }
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div>
                </div>
              </div>
            </div>
          </CCard>
        </CCol>
      );
    });

  const columnsTeacher = [
    {
      title: "TP ID",
      field: "tp_id",
    },
    {
      title: "Teacher Name",
      field: "teacher_name",
    },
    {
      title: "Subject Name",
      field: "subject_name",
    },
    {
      title: "Designation",
      render: data => data.is_class_teacher === true ? <CBadge color="primary">Class Teacher</CBadge> : data.is_ass_class_teacher === true ? <CBadge color="primary">Assistant Class Teacher</CBadge> : data.is_class_teacher !== true && data.is_ass_class_teacher !== true ? <CBadge color="primary">Teacher</CBadge> : "",
    },
    {
      title: "Status",
      render: data => data.status === 1 ? <CBadge color="primary">Enable</CBadge> : <CBadge color="danger">Disable</CBadge>,
    },
  ];

  const StudentViewcolumns = [
    // {
    //   title: "",
    //   field: "is_leader",
    //   render: (rowData) => (
    //     /* Checkbox Event Set */
    //     <Checkbox
    //       name="user_ids[]"
    //       value={rowData.id}
    //       onChange={handlechnagecheck}
    //       defaultChecked={
    //         rowData.is_leader == false ? false : true}

    //     />
    //   ),
    // },
    {
      title: "TP ID",
      field: "tp_id",
    },
    {
      title: "Student Name",
      field: "name",
    },
    {
      title: "Status",
      render: data => data.status === 1 ? <CBadge color="primary">Enable</CBadge> : <CBadge color="danger">Disable</CBadge>,
    },
    {
      title: "Class Leader Status",
      render: data => data.is_subject_leader === true ? <CBadge color="primary">Class Leader </CBadge> : "N/A",
    },
    {
      title: "Subject",
      // render: data => {data.subjectLeadership.map((item)=> {
      //   item.name +" "})},

      render: data => data.is_subject_leader === false ?
        "N/A" :
        data.subjectLeadership.map((item) => {
          return (
            item.name + ", "
          )
        })


    },

  ];

  return (

    <div>
      {isLoading ? (
        <>{loader}</>
      ) : loadAllSchoolClassListData.length !== 0 ? (

        <div>
          <CustomAlertControl />
          {loadAllSchoolClassListData}
          
          {/* pagination code start */}
          {schoolClass.schoolClassData.length > 10 ? (
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
          {/* pagination code end */}

        </div>
      ) : (
        <NoDataContainer module="Class List" />
      )}

      {/* class and section wise add subject and teacher modal */}

      <CModal size="lg" visible={addteacher} onDismiss={() => setAddTeacher(false)}>
        <CModalHeader onDismiss={() => setAddTeacher(false)} className="tutorviewmodalheader">
          {teacherData.total_subject_teacher === 0 ? (
            <CModalTitle>Add Teacher </CModalTitle>
          ) : (
            <CModalTitle>Add To Class Teacher</CModalTitle>
          )}
        </CModalHeader>
        <CModalBody>
          <div className="col-12 ml-3">
            <h5 className="d-inline card-title font-weight-bold text-xs-center ">
              Class - {teacherData.standard}{'  '}
            </h5>
            <h5 className="d-inline card-title font-weight-bold text-xs-center ">
              Section - {teacherData.name}
            </h5>
          </div>
          <div className="col-12 ml-3">
            <h5 className="d-inline card-title font-weight-bold text-xs-center ">
              Class Name - {teacherData && teacherData.class.class_name}{'  '}
            </h5>

          </div>

          {teacherData.total_subject_teacher === 0 ? (

            <div className="mt-1 pl-3 pr-3">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {

                  const teachersArray = [];
                  {
                    values.Addsections.map(function (item) {
                      teachersArray.push(item.teachers);
                    })
                  }
                  const subjectsArray = [];
                  {
                    values.Addsections.map(function (item) {
                      subjectsArray.push(item.subjects);
                    })
                  }

                  values.division_id = teacherData.id
                  values.teachers = teachersArray
                  values.subjects = subjectsArray

                  dispatch(subjectTeacherStore(values))
                  setAddTeacher(false)
                }}
              >
                {({ values, errors, isSubmitting, isValid }) => (
                  <div className="mb-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <Form>
                      <div className="row">
                        <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                          <FormControl variant="outlined">
                            <InputLabel>Class Teacher</InputLabel>
                            <Field
                              component={Select}
                              name="class_teacher"
                              label="Class Teacher"
                              variant="outlined"
                            >
                              <MenuItem value="">None</MenuItem>
                              {schoolClass.allTutorList.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Field>
                          </FormControl>
                        </div>

                        <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                          <FormControl variant="outlined">
                            <InputLabel>Class Teacher Subject</InputLabel>
                            <Field
                              component={Select}
                              name="class_teacher_subject"
                              label="Class Teacher Subject"
                            >
                              <MenuItem value="">None</MenuItem>
                              {DropDown.subjectList.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Field>
                          </FormControl>
                        </div>

                      </div>

                      <div className="row">
                        <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                          <FormControl variant="outlined">
                            <InputLabel>Assistant Class Teacher</InputLabel>
                            <Field
                              component={Select}
                              name="ass_class_teacher"
                              label="Assistant Class Teacher"
                              variant="outlined"
                            >
                              <MenuItem value="">None</MenuItem>
                              {schoolClass.allTutorList.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Field>
                          </FormControl>
                        </div>

                        <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                          <FormControl variant="outlined">
                            <InputLabel>Assistant Class Teacher Subject</InputLabel>
                            <Field
                              component={Select}
                              name="ass_class_teacher_subject"
                              label="Asssistant Class Teacher Subject"
                            >
                              <MenuItem value="">None</MenuItem>
                              {DropDown.subjectList.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Field>
                          </FormControl>
                        </div>

                      </div>

                      <div className="row">
                        <FieldArray name="Addsections">
                          {({ push, remove }) => (
                            <React.Fragment>
                              {values.Addsections.map((_, index) => (
                                <>
                                  <div className="mt-3 col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                    <div>
                                      <FormControl variant="outlined">
                                        <InputLabel>Add Teacher</InputLabel>
                                        <Field
                                          component={Select}
                                          name={`Addsections.${index}.teachers`}
                                          label="Add Teacher"
                                          variant="outlined"
                                        >
                                          <MenuItem value="">None</MenuItem>
                                          {schoolClass.allTutorList.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                              {item.name}
                                            </MenuItem>
                                          ))}
                                        </Field>
                                      </FormControl>
                                    </div>
                                  </div>

                                  <div className="mt-3 col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                    <div>
                                      <FormControl variant="outlined">
                                        <InputLabel>Subject</InputLabel>
                                        <Field
                                          component={Select}
                                          name={`Addsections.${index}.subjects`}
                                          label="Subject"
                                          variant="outlined"
                                        >
                                          <MenuItem value="">None</MenuItem>
                                          {DropDown.subjectList.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                              {item.name}
                                            </MenuItem>
                                          ))}
                                        </Field>
                                      </FormControl>

                                    </div>

                                  </div>

                                  <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 mt-3 d-flex align-items-center ">
                                    <div className="row">
                                      {values.Addsections.length - 1 === index && (
                                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                          <CButton
                                            disabled={isSubmitting}
                                            onClick={() => push(emptysection)}
                                            className="morequestons m-1"
                                            value="Add"
                                          >
                                            <FontAwesomeIcon
                                              value="Add"
                                              icon={faPlus}
                                              className="fa-sm "
                                            />
                                          </CButton>
                                        </div>
                                      )}

                                      {values.Addsections.length !== 1 && (
                                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" >
                                          <CButton
                                            disabled={values.Addsections.length === 1}

                                            onClick={() => remove(index)}
                                            className="morequestonsremove m-1"
                                            value="Remove"
                                          >
                                            <FontAwesomeIcon
                                              icon={faMinus}
                                              className="fa-sm "
                                            />
                                          </CButton>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                </>
                              ))}
                            </React.Fragment>
                          )}
                        </FieldArray>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div>
                            <Controls.Button
                              type="submit"
                              text="Submit"
                            />
                          </div>
                        </div>
                      </div>

                    </Form>
                  </div>
                )
                }

              </Formik>

            </div >

          ) : (
            <div>
              <div className="mt-1 pl-3 pr-3">

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchemaForAddtoClassTeacher}


                  onSubmit={async (values) => {

                    const teachersArray = [];
                    {
                      values.Addsections.map(function (item) {
                        teachersArray.push(item.teachers);
                      })
                    }

                    const subjectsArray = [];
                    {
                      values.Addsections.map(function (item) {
                        subjectsArray.push(item.subjects);
                      })
                    }

                    values.division_id = teacherData.id

                    if (values.class_teacher !== '') {
                      values.class_teacher
                    } else {
                      delete values.class_teacher
                    }

                    if (values.class_teacher_subject !== '') {
                      values.class_teacher_subject
                    } else {
                      delete values.class_teacher_subject
                    }

                    if (values.ass_class_teacher !== '') {
                      values.ass_class_teacher
                    } else {
                      delete values.ass_class_teacher
                    }

                    if (values.ass_class_teacher_subject !== '') {
                      values.ass_class_teacher_subject
                    } else {
                      delete values.ass_class_teacher_subject
                    }

                    if (values.Addsections.length !== 0) {
                      values.teachers = teachersArray
                    } else {
                      delete values.teachers
                    }

                    if (values.Addsections.length !== 0) {
                      values.subjects = subjectsArray
                    } else {
                      delete values.subjects
                    }

                    dispatch(subjectTeacherStore(values))
                    setAddTeacher(false)
                  }}
                >
                  {({ values, errors, isSubmitting, isValid }) => (
                    <div className="mb-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <Form>

                        {/* Class teacher and Assistant Teacher Data show in Add To class Teacher modal. */}

                        {/* Add Class Teacher and Assistant Class Teacher into class  */}

                        {teacherData.have_class_teacher === 0 ? (

                          <div className="row">
                            <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <FormControl variant="outlined">
                                <InputLabel>Class Teacher</InputLabel>
                                <Field
                                  component={Select}
                                  name="class_teacher"
                                  label="Class Teacher"
                                  variant="outlined"
                                >
                                  <MenuItem value="">None</MenuItem>
                                  {schoolClass.allTutorList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                                </Field>
                              </FormControl>
                            </div>

                            <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <FormControl variant="outlined">
                                <InputLabel>Class Teacher Subject</InputLabel>
                                <Field
                                  component={Select}
                                  name="class_teacher_subject"
                                  label="Class Teacher Subject"
                                >
                                  <MenuItem value="">None</MenuItem>
                                  {DropDown.subjectList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                                </Field>
                              </FormControl>
                            </div>

                          </div>

                        ) : ("")}

                        {teacherData.subject_teacher.map((item, index) => (
                          <>
                            {item.is_class_teacher === true ? (

                              <div className="row">
                                <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                  <div>
                                    Class teacher name - {item.teacher_name}{'  '}
                                  </div>
                                </div>
                                <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                  <div>
                                    Subject name - {item.subject_name}
                                  </div>
                                </div>
                              </div>
                            ) : ""}
                          </>
                        ))
                        }

                        {teacherData.have_ass_class_teacher === 0 ? (

                          <div className="row">
                            <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <FormControl variant="outlined">
                                <InputLabel>Assistant Class Teacher</InputLabel>
                                <Field
                                  component={Select}
                                  name="ass_class_teacher"
                                  label="Assistant Class Teacher"
                                  variant="outlined"
                                >
                                  <MenuItem value="">None</MenuItem>
                                  {schoolClass.allTutorList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                                </Field>
                              </FormControl>
                            </div>

                            <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <FormControl variant="outlined">
                                <InputLabel>Assistant Class Teacher Subject</InputLabel>
                                <Field
                                  component={Select}
                                  name="ass_class_teacher_subject"
                                  label="Asssistant Class Teacher Subject"
                                >
                                  <MenuItem value="">None</MenuItem>
                                  {DropDown.subjectList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                                </Field>
                              </FormControl>
                            </div>

                          </div>

                        ) : ("")}

                        {teacherData.subject_teacher.map((item, index) => (
                          <>
                            {item.is_ass_class_teacher === true ? (
                              <div className="row">
                                <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                  <div>
                                    Assistant Class teacher name - {item.teacher_name}{'  '}
                                  </div>
                                </div>
                                <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                  <div>
                                    Subject name - {item.subject_name}
                                  </div>
                                </div>
                              </div>
                            ) : ""}
                          </>
                        ))}


                        {/* Add multiple Teacher in Class */}

                        <div className="row">
                          <FieldArray name="Addsections">
                            {({ push, remove }) => (
                              <React.Fragment>
                                {values.Addsections.map((_, index) => (
                                  <>
                                    <div className="mt-3 col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                      <div>

                                        <FormControl variant="outlined">
                                          <InputLabel>Add Teacher</InputLabel>
                                          <Field
                                            className="form-select"
                                            component={Select}
                                            name={`Addsections.${index}.teachers`}
                                            label="Add Teacher"
                                            variant="outlined"
                                            size="small"
                                          >
                                            <MenuItem value="">None</MenuItem>
                                            {schoolClass.allStudentTeacherList.map((item) => (
                                              <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                              </MenuItem>
                                            ))}
                                          </Field>
                                        </FormControl>
                                      </div>
                                    </div>

                                    <div className="mt-3 col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                      <div>

                                        <FormControl variant="outlined">
                                          <InputLabel>Subject</InputLabel>
                                          <Field
                                            className="form-select"
                                            component={Select}
                                            name={`Addsections.${index}.subjects`}
                                            label="Subject"
                                            variant="outlined"
                                            size="small"
                                          >
                                            <MenuItem value="">None</MenuItem>
                                            {DropDown.subjectList.map((item) => (
                                              <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                              </MenuItem>
                                            ))}
                                          </Field>
                                        </FormControl>
                                      </div>

                                    </div>

                                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 mt-3 d-flex align-items-center ">
                                      <div className="row">

                                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                          <CButton
                                            disabled={isSubmitting}
                                            onClick={() => push(emptysection)}
                                            className="morequestons m-1"
                                            value="Add"
                                          >
                                            <FontAwesomeIcon
                                              value="Add"
                                              icon={faPlus}
                                              className="fa-sm "
                                            />
                                          </CButton>
                                        </div>

                                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" >
                                          <CButton
                                            disabled={isSubmitting}
                                            onClick={() => remove(index)}
                                            className="morequestonsremove m-1"
                                            value="Remove"
                                          >
                                            <FontAwesomeIcon
                                              icon={faMinus}
                                              className="fa-sm "
                                            />
                                          </CButton>
                                        </div>

                                      </div>
                                    </div>
                                  </>
                                ))}

                                {values.Addsections.length === 0 ? (
                                  <div className="mt-3 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <CButton
                                      disabled={isSubmitting}
                                      onClick={() => push(emptysection)}
                                      className="morequestons m-1"
                                      value="Add"
                                    >
                                      Add Teacher
                                    </CButton>
                                  </div>
                                ) : ("")}
                              </React.Fragment>
                            )}
                          </FieldArray>
                        </div>

                        <div className="row mt-4">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                            <div>
                              <Controls.Button
                                type="submit"
                                text="Submit"
                              />
                            </div>
                          </div>
                        </div>
                        {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                      </Form>
                    </div>
                  )
                  }

                </Formik>
              </div >

            </div>
          )
          }

        </CModalBody >
      </CModal >


      {/* View Teacher Class modal */}

      <CModal size="xl" visible={viewTeacher} onDismiss={() => setViewTeacher(false)}>
        <CModalHeader onDismiss={() => setViewTeacher(false)} className="tutorviewmodalheader">
          <CModalTitle>View Teacher Class</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="col-12 ml-3">
            <h5 className="d-inline card-title font-weight-bold text-xs-center ">
              Class - {studentViewData.standard}{'  '}
            </h5>
            <h5 className="d-inline card-title font-weight-bold text-xs-center ">
              Section - {studentViewData.name}
            </h5>
          </div>

          <div className='mt-3'>
            <h5 className="d-inline card-title font-weight-bold text-xs-center ml-3">
              List Of Teacher
            </h5>
            {getUserRole() == "school-student" ?
              <MaterialTable
                title=""
                columns={columnsTeacher}
                data={studentViewData.subject_teacher}
                options={{
                  actionsColumnIndex: -1,
                  search: true,
                  selection: false,
                  filtering: true,
                  searchFieldAlignment: "right",
                  pageSize: 5,
                  pageSizeOptions: [5, 10, 15],
                  headerStyle: {
                    backgroundColor: "#DEDDF4",
                    color: "#444346",
                    fontWeight: "600",
                    fontSize: "15px",
                  },
                  cellStyle: {
                    Width: "20px",
                    overflow: "Hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "50px",
                    whiteSpace: "nowrap",
                  },
                }}

              />
              :
              <MaterialTable
                title=""
                columns={columnsTeacher}
                data={studentViewData.subject_teacher}
                options={{
                  actionsColumnIndex: -1,
                  search: true,
                  selection: true,
                  filtering: true,
                  searchFieldAlignment: "right",
                  pageSize: 5,
                  pageSizeOptions: [5, 10, 15],
                  headerStyle: {
                    backgroundColor: "#DEDDF4",
                    color: "#444346",
                    fontWeight: "600",
                    fontSize: "15px",
                  },
                  cellStyle: {
                    Width: "20px",
                    overflow: "Hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "50px",
                    whiteSpace: "nowrap",
                  },
                }}
                actions={[
                  {
                    tooltip: "Remove Teacher in Section",
                    icon: "remove",
                    onClick: (evt, data) => removeTeacherAction(data, evt),
                  },
                  {
                    icon: "create",
                    tooltip: "Enable/Disable",
                    onClick: (event, rowData) => enableDisableTeacherHandle(rowData),
                    position: "row",
                  },
                ]}
              />
            }
          </div>
        </CModalBody>
      </CModal>


      {/* Add Studnet Class modal */}

      <CModal size="lg" visible={addstudent} onDismiss={() => setAddStudent(false)}>
        <CModalHeader onDismiss={() => setAddStudent(false)} className="tutorviewmodalheader">
          <CModalTitle>Add Student Class</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="col-12 ml-3">
            <h5 className="d-inline card-title font-weight-bold text-xs-center ">
              Class - {studentData.standard}{'  '}
            </h5>
            <h5 className="d-inline card-title font-weight-bold text-xs-center ">
              Section - {studentData.name}
            </h5>
          </div>

          <div className='mt-3'>
            <h5 className="d-inline card-title font-weight-bold text-xs-center ml-3">
              List Of Student
            </h5>
            <MaterialTable
              title=""
              columns={StudentAddcolumns}
              data={schoolClass.allStudentTeacherList}
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
                  tooltip: "Add Student in Section",
                  icon: "add",
                  onClick: (evt, data) => addStudentAction(data, evt),
                },
              ]}
            />
          </div>
        </CModalBody>
      </CModal>

      {/* View Student Class modal */}

      <CModal size="xl" visible={viewStudent} onDismiss={() => setViewStudent(false)}>
        <CModalHeader onDismiss={() => setViewStudent(false)} className="tutorviewmodalheader">
          <CModalTitle>View Student Class</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="col-12 ml-3">
            <h5 className="d-inline card-title font-weight-bold text-xs-center ">
              Class - {studentViewData.standard}{'  '}
            </h5>
            <h5 className="d-inline card-title font-weight-bold text-xs-center ">
              Section - {studentViewData.name}
            </h5>
          </div>

          <div className='mt-3'>
            <h5 className="d-inline card-title font-weight-bold text-xs-center ml-3">
              List Of Student
            </h5>
            {getUserRole() === "school-student" ?
              <MaterialTable
                title=""
                columns={StudentViewcolumns}
                data={studentViewData.students}
                options={{
                  actionsColumnIndex: -1,
                  search: true,
                  selection: false,
                  filtering: true,
                  searchFieldAlignment: "right",
                  pageSize: 5,
                  pageSizeOptions: [5, 10, 15],
                  headerStyle: {
                    backgroundColor: "#DEDDF4",
                    color: "#444346",
                    fontWeight: "600",
                    fontSize: "15px",
                  },
                  cellStyle: {
                    Width: "20px",
                    overflow: "Hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "50px",
                    whiteSpace: "nowrap",
                  },
                }}

              />
              :
              <MaterialTable
                title=""
                columns={StudentViewcolumns}
                data={studentViewData.students}
                options={{
                  actionsColumnIndex: -1,
                  search: true,
                  selection: true,
                  filtering: true,
                  searchFieldAlignment: "right",
                  pageSize: 5,
                  pageSizeOptions: [5, 10, 15],
                  headerStyle: {
                    backgroundColor: "#DEDDF4",
                    color: "#444346",
                    fontWeight: "600",
                    fontSize: "15px",
                  },
                  cellStyle: {
                    Width: "20px",
                    overflow: "Hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "50px",
                    whiteSpace: "nowrap",
                  },
                }}
                actions={[
                  {
                    tooltip: "Remove Student in Section",
                    icon: "remove",
                    onClick: (evt, data) => removeStudentAction(data, evt),
                  },
                  {
                    icon: "create",
                    tooltip: "Enable/Disable",
                    onClick: (event, rowData) => enableDisableStudentHandle(rowData),
                    position: "row",
                  },
                ]}
              />
            }
          </div>
        </CModalBody>
      </CModal>

      {/* Create Timetable */}
      <CModal size="lg" visible={timeTable} onDismiss={() => setTimeTable(false)}>
        {timeTableData.schedule !== undefined ? (
          <>
            {timeTableData.schedule.length === 0 ? (
              <>
                <CModalHeader onDismiss={() => setTimeTable(false)} className="tutorviewmodalheader">
                  <CModalTitle>Create Time Table</CModalTitle>

                </CModalHeader>
                <CModalBody>
                  <Formik
                    initialValues={initialTimeValues}
                    // validationSchema={validationSchemaForQuestion}
                    onSubmit={async (values) => {

                      // console.log("values")
                      // console.log(values)
                      const teacherIDArray1 = []
                      const subjectIDArray1 = []
                      const teacherIDArray = []
                      const subjectIDArray = []
                      const dayArray = []
                      const startTimeArray = []
                      const endTimeArray = []

                      values.division_id = timeTableData.id

                      values.Addtime.map((mainArrayAddtime, mainArrayAddtimeKey) => {

                        const dayArrayInner = []
                        const startTimeArrayInner = []
                        const endTimeArrayInner = []

                        timeTableData.subject_teacher &&
                          timeTableData.subject_teacher.map(function (
                            teacheSubjectData,
                            teacheSubjectDataKey
                          ) {
                            teacherIDArray1.push(teacheSubjectData.teacher_id)
                            subjectIDArray1.push(teacheSubjectData.subject_id)
                          })


                        if (mainArrayAddtime !== undefined) {
                          teacherIDArray[mainArrayAddtimeKey] = teacherIDArray1[mainArrayAddtimeKey]
                          subjectIDArray[mainArrayAddtimeKey] = subjectIDArray1[mainArrayAddtimeKey]

                          mainArrayAddtime.map((mainArrayInnerItem, mainArrayInnerItemKey) => {
                            if (mainArrayInnerItem !== undefined) {
                              startTimeArrayInner[mainArrayInnerItemKey] = mainArrayInnerItem.start_time
                              endTimeArrayInner[mainArrayInnerItemKey] = mainArrayInnerItem.end_time
                              if (mainArrayInnerItemKey === 0)
                                dayArrayInner[mainArrayInnerItemKey] = "Monday"
                              if (mainArrayInnerItemKey === 1)
                                dayArrayInner[mainArrayInnerItemKey] = "Tuesday"
                              if (mainArrayInnerItemKey === 2)
                                dayArrayInner[mainArrayInnerItemKey] = "Wednesday"
                              if (mainArrayInnerItemKey === 3)
                                dayArrayInner[mainArrayInnerItemKey] = "Thursday"
                              if (mainArrayInnerItemKey === 4)
                                dayArrayInner[mainArrayInnerItemKey] = "Friday"
                              if (mainArrayInnerItemKey === 5)
                                dayArrayInner[mainArrayInnerItemKey] = "Saturday"
                            }
                          })

                          dayArray[mainArrayAddtimeKey] = dayArrayInner.filter(function () {
                            return true;
                          });
                          startTimeArray[mainArrayAddtimeKey] = startTimeArrayInner.filter(function () {
                            return true;
                          });
                          endTimeArray[mainArrayAddtimeKey] = endTimeArrayInner.filter(function () {
                            return true;
                          });
                        }

                      })
                      var cleanTeacherArray =
                        teacherIDArray.filter(function () {
                          return true;
                        });
                      var cleanSubject =
                        subjectIDArray.filter(function () {
                          return true;
                        });
                      var cleanDay =
                        dayArray.filter(function () {
                          return true;
                        });
                      var cleanStartTime =
                        startTimeArray.filter(function () {
                          return true;
                        });
                      var cleanEndTime =
                        endTimeArray.filter(function () {
                          return true;
                        });

                      values.days = cleanDay
                      values.teacher_ids = cleanTeacherArray
                      values.subject_ids = cleanSubject
                      values.start_time = cleanStartTime
                      values.end_time = cleanEndTime

                      dispatch(storeTimetable(values))
                      setTimeTable(!timeTable)
                    }}
                  >
                    {({ values, errors, isSubmitting, isValid }) => (
                      <Form>
                        <div>
                          {timeTableData.subject_teacher !== undefined ?
                            (
                              <>
                                {timeTableData.subject_teacher.map((item, teacherkey) => (
                                  <div key={teacherkey}>
                                    {/* {console.log(item)} */}
                                    <Accordion
                                      className="mt-2 "
                                      style={{
                                        backgroundColor: "#F2F4F8",
                                        border: "1px solid #A8A6E1",
                                        borderRadius: "5px",
                                      }}
                                    >

                                      <AccordionSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        style={{ padding: "0px 16px", display: "flex", color: "black" }}
                                        expandIcon={
                                          visible === Prop.id ? <HorizontalRuleIcon /> : <AddIcon />
                                        }
                                      >
                                        <div className="row col-12">
                                          <Typography className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start align-items-center">
                                            <div>
                                              Teacher name : {item.teacher_name}
                                            </div>
                                          </Typography>
                                          <Typography className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start align-items-center">
                                            <div>
                                              Subject name : {item.subject_name}
                                            </div>
                                          </Typography>
                                        </div>
                                      </AccordionSummary>

                                      <AccordionDetails className="m-2">
                                        <Typography>
                                          <div>
                                            <div className="row tableheader text-center p-1">
                                              <div className="col-1 accessRights-normal-text">

                                              </div>
                                              <div className="col-3 accessRights-normal-text">
                                                Day
                                              </div>
                                              <div className="col-4 accessRights-normal-text">
                                                Start Time
                                              </div>
                                              <div className="col-4 accessRights-normal-text">
                                                End Time
                                              </div>

                                            </div>
                                            <FieldArray name={`Addtime.${teacherkey}`}>
                                              <React.Fragment>
                                                {emptytime.map((Data, timekey) => (
                                                  <div className="row m-2" key={timekey}>
                                                    {/* {console.log(Data.Day)} */}
                                                    <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center p-3">

                                                      <div className="checkbox checkbox-circle checkbox-color-scheme">
                                                        <FormControlLabel
                                                          className="checkboxCustomDesign"
                                                          style={{ marginTop: -7 }}
                                                          control={
                                                            <MuiCheckbox
                                                              color="primary"
                                                              // checked={checkbox.id}
                                                              // value={data.id}
                                                              // onChange={onAddingItem}
                                                              name={`Addtime.${teacherkey}.${timekey}.Day`}
                                                            // style={{
                                                            //   transform: "scale(1.3)",
                                                            // }}
                                                            />
                                                          }
                                                        />
                                                      </div>

                                                    </div>
                                                    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center p-3">
                                                      <h5>
                                                        {Data.Day}
                                                      </h5>
                                                    </div>
                                                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                      <Field
                                                        fullWidth
                                                        type="time"
                                                        name={`Addtime.[${teacherkey}].[${timekey}].start_time`}
                                                        component={TextField}
                                                        label="Start time"
                                                        variant="outlined"
                                                        id={`Addtime.${teacherkey}.${timekey}.start_time`}

                                                        InputProps={{
                                                          startAdornment: (
                                                            <InputAdornment position="start"></InputAdornment>
                                                          ),
                                                        }}
                                                      />
                                                    </div>
                                                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                      <Field
                                                        fullWidth
                                                        type="time"
                                                        name={`Addtime.[${teacherkey}].[${timekey}].end_time`}
                                                        component={TextField}
                                                        label="End time"
                                                        variant="outlined"
                                                        // ref={makeTimeInputRequired}
                                                        id={`Addtime.${teacherkey}.${timekey}.start_time`}
                                                        InputProps={{
                                                          startAdornment: (
                                                            <InputAdornment position="start"></InputAdornment>
                                                          ),
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                ))}
                                              </React.Fragment>
                                            </FieldArray>
                                          </div>
                                        </Typography>
                                      </AccordionDetails>
                                    </Accordion>
                                  </div>
                                ))}
                              </>
                            ) : ("")}

                        </div>

                        {timeTableData.subject_teacher.length !== 0 ? (
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                              <div className="p-2 d-inline ">
                                <Controls.Button
                                  type="submit"
                                  text="Add TimeTable"
                                  className="m-1"
                                />
                              </div>
                            </div>
                          </div>
                        ) : (<div className='text-danger'>
                          Notes : Please add teachers in this class section then after you can create a time table.
                        </div>)}
                        {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                      </Form>
                    )}
                  </Formik>
                </CModalBody>
              </>
            ) : (<>
              <CModalHeader onDismiss={() => setTimeTable(false)} className="tutorviewmodalheader">
                <CModalTitle>Update Time Table</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <Formik
                  initialValues={initialTimeValues}
                  // validationSchema={validationSchemaForQuestion}
                  onSubmit={async (values) => {

                    const teacherIDArray1 = []
                    const subjectIDArray1 = []
                    const teacherIDArray = []
                    const subjectIDArray = []
                    const dayArray = []
                    const startTimeArray = []
                    const endTimeArray = []

                    values.division_id = timeTableData.id

                    values.Addtime.map((mainArrayAddtime, mainArrayAddtimeKey) => {
                      const dayArrayInner = []
                      const startTimeArrayInner = []
                      const endTimeArrayInner = []

                      timeTableData.subject_teacher &&
                        timeTableData.subject_teacher.map(function (
                          teacheSubjectData,
                          teacheSubjectDataKey
                        ) {
                          teacherIDArray1.push(teacheSubjectData.teacher_id)
                          subjectIDArray1.push(teacheSubjectData.subject_id)
                        })

                      if (mainArrayAddtime !== undefined) {
                        teacherIDArray[mainArrayAddtimeKey] = teacherIDArray1[mainArrayAddtimeKey]
                        subjectIDArray[mainArrayAddtimeKey] = subjectIDArray1[mainArrayAddtimeKey]

                        mainArrayAddtime.map((mainArrayInnerItem, mainArrayInnerItemKey) => {
                          if (mainArrayInnerItem !== undefined) {
                            startTimeArrayInner[mainArrayInnerItemKey] = mainArrayInnerItem.start_time
                            endTimeArrayInner[mainArrayInnerItemKey] = mainArrayInnerItem.end_time
                            if (mainArrayInnerItemKey === 0)
                              dayArrayInner[mainArrayInnerItemKey] = "Monday"
                            if (mainArrayInnerItemKey === 1)
                              dayArrayInner[mainArrayInnerItemKey] = "Tuesday"
                            if (mainArrayInnerItemKey === 2)
                              dayArrayInner[mainArrayInnerItemKey] = "Wednesday"
                            if (mainArrayInnerItemKey === 3)
                              dayArrayInner[mainArrayInnerItemKey] = "Thursday"
                            if (mainArrayInnerItemKey === 4)
                              dayArrayInner[mainArrayInnerItemKey] = "Friday"
                            if (mainArrayInnerItemKey === 5)
                              dayArrayInner[mainArrayInnerItemKey] = "Saturday"
                          }
                        })

                        dayArray[mainArrayAddtimeKey] = dayArrayInner.filter(function () {
                          return true;
                        });
                        startTimeArray[mainArrayAddtimeKey] = startTimeArrayInner.filter(function () {
                          return true;
                        });
                        endTimeArray[mainArrayAddtimeKey] = endTimeArrayInner.filter(function () {
                          return true;
                        });
                      }

                    })

                    // updated time table data set in array

                    const updated_teacher_id = []
                    const updated_subject_id = []
                    const updated_day = []
                    const updated_end_time = []
                    const updated_start_time = []

                    timeTableData.subject_teacher.map((item) => {

                      const updated_inner_day = []
                      const updated_inner_start_time = []
                      const updated_inner_end_time = []

                      if (copyTimeData[item.teacher_id] !== undefined) {
                        if (copyTimeData[item.teacher_id]['Monday'] !== undefined) {
                          updated_teacher_id.push(copyTimeData[item.teacher_id]['Monday'][0].teacher_id)
                          updated_subject_id.push(copyTimeData[item.teacher_id]['Monday'][0].subject_id)
                          updated_inner_day.push(copyTimeData[item.teacher_id]['Monday'][0].day)
                          updated_inner_start_time.push(copyTimeData[item.teacher_id]['Monday'][0].start_time)
                          updated_inner_end_time.push(copyTimeData[item.teacher_id]['Monday'][0].end_time)
                        }
                        if (copyTimeData[item.teacher_id]['Tuesday'] !== undefined) {
                          updated_teacher_id.push(copyTimeData[item.teacher_id]['Tuesday'][0].teacher_id)
                          updated_subject_id.push(copyTimeData[item.teacher_id]['Tuesday'][0].subject_id)
                          updated_inner_day.push(copyTimeData[item.teacher_id]['Tuesday'][0].day)
                          updated_inner_start_time.push(copyTimeData[item.teacher_id]['Tuesday'][0].start_time)
                          updated_inner_end_time.push(copyTimeData[item.teacher_id]['Tuesday'][0].end_time)
                        }
                        if (copyTimeData[item.teacher_id]['Wednesday'] !== undefined) {
                          updated_teacher_id.push(copyTimeData[item.teacher_id]['Wednesday'][0].teacher_id)
                          updated_subject_id.push(copyTimeData[item.teacher_id]['Wednesday'][0].subject_id)
                          updated_inner_day.push(copyTimeData[item.teacher_id]['Wednesday'][0].day)
                          updated_inner_start_time.push(copyTimeData[item.teacher_id]['Wednesday'][0].start_time)
                          updated_inner_end_time.push(copyTimeData[item.teacher_id]['Wednesday'][0].end_time)
                        }
                        if (copyTimeData[item.teacher_id]['Thursday'] !== undefined) {
                          updated_teacher_id.push(copyTimeData[item.teacher_id]['Thursday'][0].teacher_id)
                          updated_subject_id.push(copyTimeData[item.teacher_id]['Thursday'][0].subject_id)
                          updated_inner_day.push(copyTimeData[item.teacher_id]['Thursday'][0].day)
                          updated_inner_start_time.push(copyTimeData[item.teacher_id]['Thursday'][0].start_time)
                          updated_inner_end_time.push(copyTimeData[item.teacher_id]['Thursday'][0].end_time)
                        }
                        if (copyTimeData[item.teacher_id]['Friday'] !== undefined) {
                          updated_teacher_id.push(copyTimeData[item.teacher_id]['Friday'][0].teacher_id)
                          updated_subject_id.push(copyTimeData[item.teacher_id]['Friday'][0].subject_id)
                          updated_inner_day.push(copyTimeData[item.teacher_id]['Friday'][0].day)
                          updated_inner_start_time.push(copyTimeData[item.teacher_id]['Friday'][0].start_time)
                          updated_inner_end_time.push(copyTimeData[item.teacher_id]['Friday'][0].end_time)
                        }
                        if (copyTimeData[item.teacher_id]['Saturday'] !== undefined) {
                          updated_teacher_id.push(copyTimeData[item.teacher_id]['Saturday'][0].teacher_id)
                          updated_subject_id.push(copyTimeData[item.teacher_id]['Saturday'][0].subject_id)
                          updated_inner_day.push(copyTimeData[item.teacher_id]['Saturday'][0].day)
                          updated_inner_start_time.push(copyTimeData[item.teacher_id]['Saturday'][0].start_time)
                          updated_inner_end_time.push(copyTimeData[item.teacher_id]['Saturday'][0].end_time)
                        }
                      }
                      // if (updated_inner_day.length !== 0) {
                      updated_day.push(updated_inner_day)
                      // }
                      // if (updated_inner_start_time.length !== 0) {
                      updated_start_time.push(updated_inner_start_time)
                      // }
                      // if (updated_inner_end_time.length !== 0) {
                      updated_end_time.push(updated_inner_end_time)
                      // }
                    })

                    var cleanTeacherArray =
                      teacherIDArray.filter(function () {
                        return true;
                      });
                    var cleanSubject =
                      subjectIDArray.filter(function () {
                        return true;
                      });
                    var cleanDay =
                      dayArray.filter(function () {
                        return true;
                      });
                    var cleanStartTime =
                      startTimeArray.filter(function () {
                        return true;
                      });
                    var cleanEndTime =
                      endTimeArray.filter(function () {
                        return true;
                      });

                    // new teacher ID data added in array 

                    teacherIDArray.map((itemTeacherID, teacherIDkey) => {
                      updated_teacher_id.splice(teacherIDkey, 0, itemTeacherID);
                    })

                    // new subject ID data added in array 

                    subjectIDArray.map((itemsubjectID, subjectIDkey) => {
                      updated_subject_id.splice(subjectIDkey, 0, itemsubjectID);
                    })

                    var Final_teacher_id = [];
                    var Final_teacher_id = updated_teacher_id.filter(function (item, id) {
                      return updated_teacher_id.indexOf(item) === id;
                    });

                    var Final_subject_id = [];
                    var Final_subject_id = updated_subject_id.filter(function (item, id) {
                      return updated_subject_id.indexOf(item) === id;
                    });

                    // new day data added in array 

                    dayArray.map((dayData, daykey) => {
                      dayData.map((itemDay) => {
                        updated_day[daykey].push(itemDay)
                      })
                    })

                    // new start time data added in array 

                    startTimeArray.map((startTimeData, startTimekey) => {
                      startTimeData.map((itemStartTime) => {
                        updated_start_time[startTimekey].push(itemStartTime)
                      })
                    })

                    // new end time data added array 

                    endTimeArray.map((endTimeData, endTimekey) => {
                      endTimeData.map((itemEndTime) => {
                        updated_end_time[endTimekey].push(itemEndTime)
                      })
                    })

                    // filter Day array 

                    var filtered_day = updated_day.filter(function (day) {
                      return day.length !== 0;
                    });

                    // filter start time array 

                    var filtered_start_time = updated_start_time.filter(function (startTime) {
                      return startTime.length !== 0;
                    });

                    // filter end time array 

                    var filtered_end_time = updated_end_time.filter(function (endTime) {
                      return endTime.length !== 0;
                    });

                    values.days = filtered_day
                    values.teacher_ids = Final_teacher_id
                    values.subject_ids = Final_subject_id
                    values.start_time = filtered_start_time
                    values.end_time = filtered_end_time

                    // return false

                    dispatch(storeTimetable(values))
                    setTimeTable(!timeTable)
                  }}
                >
                  {({ values, errors, isSubmitting, isValid }) => (
                    <Form>
                      <div>
                        {timeTableData.subject_teacher !== undefined ?
                          (
                            <>
                              {timeTableData.subject_teacher.map((item, teacherkey) => (
                                <div key={teacherkey}>
                                  {/* {console.log(item)} */}
                                  <Accordion
                                    className="mt-2 "
                                    style={{
                                      backgroundColor: "#F2F4F8",
                                      border: "1px solid #A8A6E1",
                                      borderRadius: "5px",
                                    }}
                                  >

                                    <AccordionSummary
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                      style={{ padding: "0px 16px", display: "flex", color: "black" }}
                                      expandIcon={
                                        visible === Prop.id ? <HorizontalRuleIcon /> : <AddIcon />
                                      }
                                    >
                                      <div className="row col-12">
                                        <Typography className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start align-items-center">
                                          <div>
                                            Teacher name : {item.teacher_name}
                                          </div>
                                        </Typography>
                                        <Typography className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start align-items-center">
                                          <div>
                                            Subject name : {item.subject_name}
                                          </div>
                                        </Typography>
                                      </div>
                                    </AccordionSummary>

                                    <AccordionDetails className="m-2">
                                      <Typography>
                                        <div>
                                          <div className="row tableheader text-center p-1">
                                            <div className="col-1 accessRights-normal-text">

                                            </div>
                                            <div className="col-3 accessRights-normal-text">
                                              Day
                                            </div>
                                            <div className="col-4 accessRights-normal-text">
                                              Start Time
                                            </div>
                                            <div className="col-4 accessRights-normal-text">
                                              End Time
                                            </div>

                                          </div>
                                          <FieldArray name={`Addtime.${teacherkey}`}>
                                            <React.Fragment>
                                              {emptytime.map((Data, timekey) => (
                                                <div className="row m-2" key={timekey}>

                                                  <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center p-3">
                                                    <div className="checkbox checkbox-circle checkbox-color-scheme">

                                                      <FormControlLabel
                                                        className="checkboxCustomDesign"
                                                        style={{ marginTop: -7 }}
                                                        control={
                                                          <MuiCheckbox
                                                            color="primary"
                                                            // checked={checkbox.id}
                                                            // value={data.id}
                                                            onClick={(event) => onAddingItem(Data.Day, item.teacher_id, event)}
                                                            defaultChecked={copyTimeData[item.teacher_id] !== undefined ? (copyTimeData[item.teacher_id][Data.Day] !== undefined) ? true : false : false}
                                                            name={`Addtime.${teacherkey}.${timekey}.Day`}
                                                          // style={{
                                                          //   transform: "scale(1.3)",
                                                          // }}
                                                          />
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center p-3">
                                                    <h5>
                                                      {Data.Day}
                                                    </h5>
                                                  </div>
                                                  <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                    <Field
                                                      fullWidth
                                                      type="time"
                                                      name={`Addtime.[${teacherkey}].[${timekey}].start_time`}
                                                      component={TextField}
                                                      label="Start time"
                                                      variant="outlined"
                                                      id={`Addtime.${teacherkey}.${timekey}.start_time`}
                                                      defaultValue={copyTimeData[item.teacher_id] !== undefined && copyTimeData[item.teacher_id] !== null ? (copyTimeData[item.teacher_id][Data.Day] !== undefined) ? copyTimeData[item.teacher_id][Data.Day][0].start_time : "" : ""}
                                                      InputProps={{
                                                        startAdornment: (
                                                          <InputAdornment position="start"></InputAdornment>
                                                        ),
                                                      }}
                                                    />
                                                  </div>
                                                  <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                    <Field
                                                      fullWidth
                                                      type="time"
                                                      name={`Addtime.[${teacherkey}].[${timekey}].end_time`}
                                                      component={TextField}
                                                      label="End time"
                                                      variant="outlined"
                                                      defaultValue={copyTimeData[item.teacher_id] !== undefined && copyTimeData[item.teacher_id] !== null ? (copyTimeData[item.teacher_id][Data.Day] !== undefined) ? copyTimeData[item.teacher_id][Data.Day][0].end_time : "" : ""}
                                                      // ref={makeTimeInputRequired}
                                                      id={`Addtime.${teacherkey}.${timekey}.start_time`}
                                                      InputProps={{
                                                        startAdornment: (
                                                          <InputAdornment position="start"></InputAdornment>
                                                        ),
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              ))}
                                            </React.Fragment>
                                          </FieldArray>
                                        </div>
                                      </Typography>
                                    </AccordionDetails>
                                  </Accordion>
                                </div>
                              ))}
                            </>
                          ) : ("")}

                      </div>

                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="p-2 d-inline ">
                            <Controls.Button
                              type="submit"
                              text="Update TimeTable"
                              className="m-1"
                            />
                          </div>
                        </div>
                      </div>
                      {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                    </Form>
                  )}
                </Formik>
              </CModalBody>
            </>
            )}
          </>
        ) : (<></>)}
      </CModal>

      {/* Take Attendance modal code */}

      <CModal size="lg" visible={attendance} onDismiss={() => setAttendance(false)}>
        <CModalHeader onDismiss={() => setAttendance(false)} className="tutorviewmodalheader">

          <CModalTitle>Take Attendance</CModalTitle>

        </CModalHeader>
        <CModalBody>
          <AttendanceClass data={attendanceData} />
        </CModalBody>
      </CModal>

      {/* View Time Table modal code */}

      <CModal size="xl" visible={viewTimeTable} onDismiss={() => setViewTimeTable(false)}>
        <CModalHeader onDismiss={() => setViewTimeTable(false)} className="tutorviewmodalheader">

          <CModalTitle>View Time Table</CModalTitle>

        </CModalHeader>
        <CModalBody>
          {/* {console.log(viewTimeTableData)} */}
          <MaterialTable

            title=""
            columns={ViewTimeTableColumn}
            data={viewTimeTableData.schedule}
            options={{
              search: true,
              selection: false,
              filtering: false,
              searchFieldAlignment: "right",
              pageSize: 5,
              pageSizeOptions: [5, 10, 15],
              headerStyle: {
                backgroundColor: "#DEDDF4",
                color: "#444346",
                fontWeight: "600",
                fontSize: "15px",
              },
              cellStyle: {
                Width: "20px",
                overflow: "Hidden",
                textOverflow: "ellipsis",
                maxWidth: "50px",
                whiteSpace: "nowrap",
              },
            }}
          />
        </CModalBody>
      </CModal>

      {/* Manage Leader Of Class */}

      <CModal size="lg" visible={manageLeader} onDismiss={() => setManageLeader(false)}>
        <CModalHeader onDismiss={() => setManageLeader(false)} className="tutorviewmodalheader">

          <CModalTitle>Add Leaders To Subject</CModalTitle>

        </CModalHeader>
        <CModalBody>

          <div className="mt-1 pl-3 pr-3">

            <Formik
              initialValues={initialValues}
              validationSchema={validationForLeader}
              onSubmit={async (values) => {

                const LeaderArray = [];
                {
                  values.AddLeader.map(function (item) {
                    LeaderArray.push(item.Leader);
                  })
                }

                const subjectArray = [];
                {
                  values.AddLeader.map(function (item) {
                    subjectArray.push(item.LeaderSubjects);
                  })
                }
                // console.log(LeaderArray)

                dispatch(addSubjectLeader({ division_id: managerLeaderData.id, leader_ids: LeaderArray, subject_ids: subjectArray }))
                setManageLeader(false)
              }}
            >
              {({ values, errors, isSubmitting, isValid }) => (
                <div className="mb-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <Form>

                    <div className="row">
                      <FieldArray name="AddLeader">
                        {({ push, remove }) => (
                          <React.Fragment>
                            {values.AddLeader.map((_, index) => (
                              <>
                                <div className="mt-3 col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                  <div>

                                    <FormControl variant="outlined">
                                      <InputLabel>Add Leader</InputLabel>
                                      <Field
                                        className="form-select"
                                        component={Select}
                                        name={`AddLeader.${index}.Leader`}
                                        label="Add Leader"
                                        variant="outlined"
                                        size="small"
                                      >
                                        <MenuItem value="">None</MenuItem>
                                        {managerLeaderData.students.map((item) => (
                                          <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                          </MenuItem>
                                        ))}
                                      </Field>
                                    </FormControl>
                                  </div>
                                </div>

                                <div className="mt-3 col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                  <div>

                                    <FormControl variant="outlined">
                                      <InputLabel>Subject</InputLabel>
                                      <Field
                                        className="form-select"
                                        component={Select}
                                        name={`AddLeader.${index}.LeaderSubjects`}
                                        label="Subject"
                                        variant="outlined"
                                        size="small"
                                      >
                                        <MenuItem value="">None</MenuItem>
                                        {DropDown.subjectList.map((item) => (
                                          <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                          </MenuItem>
                                        ))}
                                      </Field>
                                    </FormControl>
                                  </div>

                                </div>

                                <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 mt-3 d-flex align-items-center ">
                                  <div className="row">
                                    {values.AddLeader.length - 1 === index && (
                                      <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <CButton
                                          disabled={isSubmitting}
                                          onClick={() => push(emptyLeader)}
                                          className="morequestons m-1"
                                          value="Add"
                                        >
                                          <FontAwesomeIcon
                                            value="Add"
                                            icon={faPlus}
                                            className="fa-sm "
                                          />
                                        </CButton>
                                      </div>
                                    )}

                                    {values.AddLeader.length !== 1 && (
                                      <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" >
                                        <CButton
                                          disabled={values.AddLeader.length === 1}

                                          onClick={() => remove(index)}
                                          className="morequestonsremove m-1"
                                          value="Remove"
                                        >
                                          <FontAwesomeIcon
                                            icon={faMinus}
                                            className="fa-sm "
                                          />
                                        </CButton>
                                      </div>
                                    )}
                                  </div>
                                </div>

                              </>
                            ))}
                          </React.Fragment>
                        )}
                      </FieldArray>
                    </div>

                    <div className="row mt-4">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div>
                          <Controls.Button
                            type="submit"
                            text="Submit"
                          />
                        </div>
                      </div>
                    </div>

                  </Form>
                </div>
              )
              }

            </Formik>

          </div >
        </CModalBody>
      </CModal>

      {/* Manage Update leader of class */}

      <CModal size="lg" visible={updateManageLeader} onDismiss={() => setUpdateManageLeader(false)}>
        <CModalHeader onDismiss={() => setUpdateManageLeader(false)} className="tutorviewmodalheader">

          <CModalTitle>Update Leaders To Subject</CModalTitle>

        </CModalHeader>
        <CModalBody>

          <div className="mt-1 pl-3 pr-3">

            <Formik
              initialValues={initialvaluesForUpdateLeader}
              validationSchema={validationForUpdateLeader}
              onSubmit={async (values) => {


                const updateLeaderArray = [];
                {

                  values.UpdateLeader.map(function (item) {
                    updateLeaderArray.push(item.leader_id);
                  })
                }

                const updateSubjectArray = [];
                {
                  values.UpdateLeader.map(function (item) {
                    // console.log(item)
                    updateSubjectArray.push(item.subject_id);
                  })
                }
                dispatch(addSubjectLeader({ division_id: updateManageData.id, leader_ids: updateLeaderArray, subject_ids: updateSubjectArray }))
                setUpdateManageLeader(false)
              }}
            >
              {({ values, errors, isSubmitting, isValid }) => (
                <div className="mb-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <Form>
                    {/* {console.log(values.UpdateLeader)} */}

                    <div className="row">
                      <FieldArray name="UpdateLeader">
                        {({ push, remove }) => (
                          <React.Fragment>
                            {values.UpdateLeader.map((_, index) => (
                              <>

                                <div className="mt-3 col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                  <div>

                                    <FormControl variant="outlined">
                                      <InputLabel>Add Leader</InputLabel>
                                      <Field
                                        component={Select}
                                        name={`UpdateLeader[${index}].leader_id`}
                                        label="Add Leader"
                                      >
                                        <MenuItem value="">None</MenuItem>
                                        {updateManageData.students.map((item) => (
                                          <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                          </MenuItem>
                                        ))}

                                      </Field>
                                    </FormControl>
                                  </div>
                                </div>

                                <div className="mt-3 col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                  <div>

                                    <FormControl variant="outlined">
                                      <InputLabel>Subject</InputLabel>
                                      <Field

                                        component={Select}
                                        name={`UpdateLeader[${index}].subject_id`}
                                        label="Subject"

                                      >
                                        <MenuItem value="">None</MenuItem>
                                        {DropDown.subjectList.map((item) => (
                                          <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                          </MenuItem>
                                        ))}
                                      </Field>
                                    </FormControl>
                                  </div>

                                </div>

                                <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 mt-3 d-flex align-items-center ">
                                  <div className="row">
                                    {values.UpdateLeader.length - 1 === index && (
                                      <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <CButton
                                          disabled={isSubmitting}
                                          onClick={() => push(emptyUpdateLeader)}
                                          className="morequestons m-1"
                                          value="Add"
                                        >
                                          <FontAwesomeIcon
                                            value="Add"
                                            icon={faPlus}
                                            className="fa-sm "
                                          />
                                        </CButton>
                                      </div>
                                    )}

                                    {values.UpdateLeader.length !== 1 && (
                                      <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" >
                                        <CButton
                                          disabled={values.UpdateLeader.length === 1}

                                          onClick={() => remove(index)}
                                          className="morequestonsremove m-1"
                                          value="Remove"
                                        >
                                          <FontAwesomeIcon
                                            icon={faMinus}
                                            className="fa-sm "
                                          />
                                        </CButton>
                                      </div>
                                    )}
                                  </div>
                                </div>

                              </>
                            ))}
                          </React.Fragment>
                        )}
                      </FieldArray>
                    </div>

                    <div className="row mt-4">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div>
                          <Controls.Button
                            type="submit"
                            text="Submit"
                          />
                        </div>
                      </div>
                    </div>

                  </Form>
                </div>
              )
              }

            </Formik>

          </div >
        </CModalBody>
      </CModal>
    </div>
  )
}

export default ClassList
