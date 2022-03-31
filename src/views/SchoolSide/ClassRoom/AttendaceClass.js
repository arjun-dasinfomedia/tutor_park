import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
    CCol,
    CRow,
    CBadge,
} from "@coreui/react";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import { TakeAttendanceList, TakeAttendanceListByDate } from "./SchoolClassAction"
import {
    getUserRole,
} from "../../../utility/utils";

const AttendanceClass = (data) => {

    const dispatch = useDispatch();
    const schoolClass = useSelector((state) => state.schoolClass);
    let user_ids = [];
    const [attendaceDate, setAttendanceDate] = useState(new Date());
    let AttendanceColumn = ""
    let AttendanceColumnforTaken = ""
    let AttendanceColumnforStudent = ""
    let AttendanceColumnPreviousforTaken = ""

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const ChangeAttendDate = (value) => {


        setAttendanceDate(value)
        let formdata = new FormData();

        formdata.append("date", moment(value).format("YYYY-MM-DD"));
        formdata.append("division_id", data.data.id);
        for (var pair of formdata.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        dispatch(TakeAttendanceListByDate(formdata));
    }

    if (data.data.attendance.length !== 0) {
        data.data.attendance.map((student) =>
            student.attendance_status == "present" ? user_ids.push(student.id) : "",
        );
    }

    if (data.data.attendance.length == 0) {
        AttendanceColumn = [
            {
                title: "",
                field: "attend",
                render: (rowData) => (
                    /* Checkbox Event Set */
                    <Checkbox
                        name="user_ids[]"
                        value={rowData.id}
                        onChange={handlechnagecheck}
                        defaultChecked=""
                    />
                ),
            },
            {
                title: "TP_ID",
                field: "tp_id",
            },
            {
                title: "Name",
                field: "name",
            },
            {
                title: "status",
                field: "attendance_status",
                render: rowData => rowData.value = "Not Taken",
            },
        ]
    }

    if (data.data.attendance.length !== 0) {
        AttendanceColumnforTaken = [
            {
                title: "",
                field: "attend",
                render: (rowData) => (
                    /* Checkbox Event Set */
                    <Checkbox
                        name="user_ids[]"
                        value={rowData.id}
                        onChange={handlechnagecheck}
                        defaultChecked={
                            rowData.attendance_status == "absent" ? false :
                                user_ids.includes(rowData.id) ? true : false}
                    />
                ),
            },
            {
                title: "TP_ID",
                field: "tp_id",
            },
            {
                title: "Name",
                field: "name",
            },
            {
                title: "status",
                field: "attendance_status",
                render: rowData => rowData.attendance_status == "absent" ? <CBadge color="danger">Absent</CBadge> : <CBadge color="primary">Present</CBadge>,
            },
        ]
    }
    if (schoolClass.attendancelist.attendance == undefined) {

        AttendanceColumnPreviousforTaken = [
            {
                title: "",
                field: "attend",
                render: (rowData) => (
                    /* Checkbox Event Set */
                    <Checkbox
                        name="user_ids[]"
                        value={rowData.id}
                        onChange={handlechnagecheck}
                        defaultChecked=""
                    />
                ),
            },
            {
                title: "TP_ID",
                field: "tp_id",
            },
            {
                title: "Name",
                field: "name",
            },
            {
                title: "Status",
                field: "attendance_status",
                render: rowData => rowData.value = "Not Taken",
            },
        ]
    }
    else {
        AttendanceColumnPreviousforTaken = [
            {
                title: "",
                field: "attend",
                render: (rowData) => (
                    /* Checkbox Event Set */
                    <Checkbox
                        name="user_ids[]"
                        value={rowData.id}
                        onChange={handlechnagecheck}
                        defaultChecked={
                            rowData.attendance_status == "absent" ? false : true}

                    />
                ),
            },
            {
                title: "TP_ID",
                field: "tp_id",
            },
            {
                title: "Name",
                field: "name",
            },
            {
                title: "Status",
                field: "attendance_status",
                render: rowData => rowData.attendance_status == "absent" ? <CBadge color="danger">Absent</CBadge> : <CBadge color="primary">Present</CBadge>,
            },
        ]


    }

    const handlechnagecheck = (item) => {

        const isChecked = item.target.checked;
        const value = item.target.value;

        if (isChecked) {
            user_ids.push(value);

        }
        else {
            const index = user_ids.indexOf(value);
            if (index > -1) {
                user_ids.splice(index, 1);

            }
        }
    };

    if (data.data.attendance.length !== 0) {
        AttendanceColumnforStudent = [
            {
                title: "TP_ID",
                field: "tp_id"
            },
            {
                title: "Name",
                field: "name",
            },
            {
                title: "Status",
                field: "attendance_status",
                render: rowData => rowData.attendance_status == "present" ? <CBadge color="primary">Present</CBadge> : <CBadge color="danger">Absent</CBadge>
            }
        ]
    }
    else {
        AttendanceColumnforStudent = [
            {
                title: "TP_ID",
                field: "tp_id",
            },
            {
                title: "Name",
                field: "name",
            },
            {
                title: "Status",
                field: "attendance_status",
                render: rowData => rowData = "Not Taken",
            }
        ]
    }

    const TakeAttendance = (item) => {

        dispatch(TakeAttendanceList({ date: moment(attendaceDate).format("YYYY-MM-DD"), student_ids: user_ids, division_id: data.data.id }))
        user_ids = [];

    }

    return (
        <>
            <div className="mt-3">
                <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="mb-3">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} libInstance={moment}>
                            <KeyboardDatePicker
                                disableFuture={true}
                                maxDate={new Date()}
                                id="date-picker-dialog"
                                label="Attedance Date *"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                value={attendaceDate}
                                onChange={(value) => ChangeAttendDate(value)}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </CCol>
                </CRow>

                {getUserRole() == "school-student" ?
                    <>
                        <MaterialTable
                            title=""

                            columns={AttendanceColumnforStudent}
                            data={data.data.attendance}
                            options={{
                                search: true,
                                // selection: true,
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
                    </>
                    :
                    <>
                        {moment(attendaceDate).format("YYYY-MM-DD") == moment(new Date()).format("YYYY-MM-DD") ?
                            <>
                                {data.data.attendance.length == 0 ?
                                    <MaterialTable
                                        title=""

                                        columns={AttendanceColumn}
                                        data={data.data.students}
                                        options={{
                                            search: true,
                                            // selection: true,
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
                                                tooltip: "Add Attendance",
                                                icon: "add",
                                                onClick: (item) => TakeAttendance(item),
                                                position: "toolbar"
                                            },

                                        ]}

                                    />
                                    :
                                    ""
                                }

                                {data.data.attendance.length !== 0 ?
                                    <>
                                        
                                        <div className="mb-3">
                                            <h6 className="text-danger d-inline font-weight-bold">Note:-</h6>

                                            <CBadge color="primary" className="d-inline">Total Students:- {data.data.total_student}</CBadge>{" "}
                                            <CBadge color="success" className="d-inline">Total Present:- {data.data.total_present}</CBadge>{" "}
                                            <CBadge color="danger" className="d-inline">Total Absent:- {data.data.total_absent}</CBadge>{" "}

                                        </div>
                                        <MaterialTable
                                            title=""

                                            columns={AttendanceColumnforTaken}
                                            data={data.data.attendance}
                                            options={{
                                                search: true,
                                                // selection: true,
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
                                                    tooltip: "Add Attendance",
                                                    icon: "add",
                                                    onClick: (item) => TakeAttendance(item),
                                                    position: "toolbar"
                                                },

                                            ]}
                                        />
                                    </>
                                    :
                                    ""
                                }
                            </>
                            : ""
                        }
                        {moment(attendaceDate).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD") ?

                            <>
                                {schoolClass.attendancelist.attendance == undefined ?
                                    <>

                                        <MaterialTable
                                            title=""

                                            columns={AttendanceColumnPreviousforTaken}
                                            // {...schoolClass.attendancelist}
                                            data={schoolClass.attendancelist}
                                            options={{
                                                search: true,
                                                // selection: true,
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
                                                    tooltip: "Add Attendance",
                                                    icon: "add",
                                                    onClick: (item) => TakeAttendance(item),
                                                    position: "toolbar"
                                                },

                                            ]}
                                        />
                                    </>
                                    :
                                    <>
                                        <div className="mb-3">
                                            <h6 className="text-danger d-inline font-weight-bold">Note:-</h6>

                                            <CBadge color="primary" className="d-inline">Total Students:- {schoolClass.attendancelist.total_student}</CBadge>{" "}
                                            <CBadge color="success" className="d-inline">Total Present:- {schoolClass.attendancelist.total_present}</CBadge>{" "}
                                            <CBadge color="danger" className="d-inline">Total Absent:- {schoolClass.attendancelist.total_absent}</CBadge>{" "}

                                        </div>
                                        <MaterialTable
                                            title=""

                                            columns={AttendanceColumnPreviousforTaken}
                                            data={schoolClass.attendancelist.attendance}
                                            options={{
                                                search: true,
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
                                                    tooltip: "Add Attendance",
                                                    icon: "add",
                                                    onClick: (item) => TakeAttendance(item),
                                                    position: "toolbar"
                                                },

                                            ]}
                                        />
                                    </>}

                            </>
                            :
                            ""
                        }

                    </>
                }

            </div>
        </>
    )
}

export default AttendanceClass
