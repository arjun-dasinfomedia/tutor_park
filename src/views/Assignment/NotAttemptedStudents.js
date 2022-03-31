import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotAttemptedStudentAssignmetList } from "./AssignmentAction";
import MaterialTable from "material-table";

const NotAttemptedStudent = (data) => {

    const assignmentState = useSelector((state) => state.Assignment);

    const columns = [
        {
            title: "TP_ID",
            field: "tp_id"
        },
        {
            title: "Name",
            field: "name",
        },
        {
            title: "email",
            field: "email"
        },

    ];
    let values = [];
    const dispatch = useDispatch();

    useEffect(async () => {
        
        await dispatch(getNotAttemptedStudentAssignmetList({ assignment_id: data.id }));
        
    }, []);

    if (assignmentState.NotAttemptedStudent == null)
    {
        values = [];
    }
    else    
    {
        values= assignmentState.NotAttemptedStudent;
    }

    return (
        <>
            <div className="text-center">
               
                <MaterialTable
                    title=""
                    data={values}
                    columns={columns}
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
                    }}
                />
            </div>
        </>
    )
}

export default NotAttemptedStudent