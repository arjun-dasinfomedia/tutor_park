import React from 'react'
import MaterialTable from "material-table";
const TimeTable = () => {
	const TimeTableRow = [
		{
			Time: "09:00 To 10:00",
			Monday: "Maths",
			Tuesday: "",
			Wednesday: "Maths",
			Thursday: "",
			Friday: "Maths",
			Saturday: "",
			Sunday: "Maths",
		},
		{
			Time: "10:00 To 11:00",
			Monday: "",
			Tuesday: "Maths",
			Wednesday: "",
			Thursday: "Maths",
			Friday: "",
			Saturday: "Maths",
			Sunday: ""

		},
		{
			Time: "11:00 To 12:00",
			Monday: "Science",
			Tuesday: "",
			Wednesday: "Science",
			Thursday: "",
			Friday: "Science",
			Saturday: "",
			Sunday: "Science"
		},
		{
			Time: "12:00 To 01:00",
			Monday: "",
			Tuesday: "Science",
			Wednesday: "",
			Thursday: "Science",
			Friday: "",
			Saturday: "Science",
			Sunday: ""
		},
		{
			Time: "01:00 To 02:00",
			Monday: "English",
			Tuesday: "",
			Wednesday: "English",
			Thursday: "",
			Friday: "English",
			Saturday: "",
			Sunday: "English",
		},
		{
			Time: "02:00 To 03:00",
			Monday: "",
			Tuesday: "English",
			Wednesday: "",
			Thursday: "English",
			Friday: "",
			Saturday: "English",
			Sunday: "",
		},
		{
			Time: "03:00 To 04:00",
			Monday: "Hindi",
			Tuesday: "",
			Wednesday: "Hindi",
			Thursday: "",
			Friday: "Hindi",
			Saturday: "",
			Sunday: "Hindi"
		},
		{
			Time: "04:00 To 05:00",
			Monday: "",
			Tuesday: "Hindi",
			Wednesday: "",
			Thursday: "Hindi",
			Friday: "",
			Saturday: "Hindi",
			Sunday: ""
		},
		{
			Time: "05:00 To 06:00",
			Monday: "Technology",
			Tuesday: "",
			Wednesday: "Technology",
			Thursday: "",
			Friday: "Technology",
			Saturday: "",
			Sunday: "Technology",
		},
		{
			Time: "06:00 To 07:00",
			Monday: "",
			Tuesday: "Technology",
			Wednesday: "",
			Thursday: "Technology",
			Friday: "",
			Saturday: "Technology",
			Sunday: ""

		},
		{
			Time: "07:00 To 08:00",
			Monday: "Social Studies",
			Tuesday: "",
			Wednesday: "Social Studies",
			Thursday: "",
			Friday: "Social Studies",
			Saturday: "",
			Sunday: "Social Studies"
		},
		{
			Time: "08:00 To 09:00",
			Monday: "Computer",
			Tuesday: "Social Studies",
			Wednesday: "Computer",
			Thursday: "Social Studies",
			Friday: "Computer",
			Saturday: "Social Studies",
			Sunday: "Computer"
		},
	];
	const TimeTableColumn = [
		{
			title: "",
			field: "Time",
		},
		{
			title: "Monday, 08",
			field: "Monday",
		},
		{
			title: "Tuesday, 09",
			field: "Tuesday",
		},
		{
			title: "Wednesday, 10",
			field: "Wednesday",
		},
		{
			title: "Thursday, 11",
			field: "Thursday",
		},
		{
			title: "Friday, 12",
			field: "Friday",
		},
		{
			title: "Saturday, 13",
			field: "Saturday",
		},
		{
			title: "Sunday, 14",
			field: "Sunday",
		},
	];
	return (
		<>
			<div className="mt-3 p-2">
				<div className="p-3">
					<MaterialTable id="dynamicTable"
						title=""
						columns={TimeTableColumn}
						data={TimeTableRow}
						options={{
							search: true,
							selection: true,
							filtering: true,
							pageSize: 5,
							pageSizeOptions: [5,10,12],
							searchFieldAlignment: "right",
							// searchFieldStyle:{
							//     width:'50%',
							// },
							headerStyle: {
								backgroundColor: "#DEDDF4",
								color: "#444346",
								fontWeight: "600",
								fontSize: "15px"
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
			</div>
		</>
	)
}

export default TimeTable
