import React from 'react'
import MaterialTable from "material-table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faMedal,
}from  "@fortawesome/free-solid-svg-icons";
const Students= () => {
  const data = [
    {
      Sno: "01",
      icon:faMedal,
      Name:"Shaman Purushotham",
      Id:"St12348765"

    },
    {
      Sno: "02",
      Name:"shree Dhana Purushotham",
      Id:"St12348766"

    },
    {
      Sno: "03",
      Name:"Naruto",
      Id:"St12348767"

    },
    {
      Sno: "04",
      Name:"Hinata",
      Id:"St12348768"

    },
    {
      Sno: "05",
      Name:"Sasuke",
      Id:"St12348769"
    },
    {
      Sno: "06",
      Name:"Shaman Purushotham",
      Id:"St12348765"

    },
    {
      Sno: "07",
      Name:"shree Dhana Purushotham",
      Id:"St12348766"

    },
    {
      Sno: "08",
      Name:"Naruto",
      Id:"St12348767"

    },
    {
      Sno: "09",
      Name:"Hinata",
      Id:"St12348768"

    },
    {
      Sno: "10",
      Name:"Sasuke",
      Id:"St12348769"
    },
    {
      Sno: "11",
      Name:"Shaman Purushotham",
      Id:"St12348765"

    },
    {
      Sno: "12",
      Name:"shree Dhana Purushotham",
      Id:"St12348766"

    },
    {
      Sno: "13",
      Name:"Naruto",
      Id:"St12348767"

    },
    {
      Sno: "14",
      Name:"Hinata",
      Id:"St12348768"

    },
    {
      Sno: "15",
      Name:"Sasuke",
      Id:"St12348769"
    },
  ];
  const columns = [
    {
      title: "S.no",
      field: "Sno",
    },
    {
      title: "Name",
      field: "Name",
    },
    {
      title: "Id",
      field: "Id",
    }
  ];



  return(
    <>
       <div className="mt-3 p-2">
       <div className="row ml-2">
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 d-inline">Class:10 B</div>
              <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 d-inline">Class Student: Kaushik Purushotham</div>
            </div>
      <div className="p-3">
        <MaterialTable id="dynamicTable"
        title=""
        columns={columns}
        data={data}
          options={{
            search: true,
            selection: true,
            filtering: true,
            pageSize:5,
            pageSizeOptions:[5,10,15,20],
            searchFieldAlignment: "right",
            // searchFieldStyle:{
            //     width:'50%',
            // },
            headerStyle: {
              backgroundColor: "#DEDDF4",
              color: "#444346",
              fontWeight:"600",
              fontSize:"15px"
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

export default Students
