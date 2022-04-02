import React from "react";
import MaterialTable from "material-table";

const CommentViewTimeLine = (data) => {


    const columns = [
        {
            title: "TP_ID",
            field: "TP_ID"
        },
        {
            title: "Commentor",
            field: "Commentor"
        },
        {
            title: "Description",
            field: "Description"
        },
    ]
    let value = [];

    if (data.data.comments === null) {
        value = []
    }
    else {

        data.data.comments.map(function (item) {

            value.push({

                TP_ID: item.commenter.tp_id === null ? "Not Addded" : item.commenter.tp_id,
                Commentor: item.commenter.name,
                Description: item.body,
            })
        });
    }

    return (
        <>
            <div className="p-3 text-center">
                <MaterialTable
                    title=""
                    data={value}
                    columns={columns}
                    options={{
                        filtering: true,
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

export default CommentViewTimeLine