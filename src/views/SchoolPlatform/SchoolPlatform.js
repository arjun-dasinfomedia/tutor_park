import React, { useState, useEffect } from "react";
import {
    CRow,
    CCol,
    CBadge,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CCardImage,
} from "@coreui/react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import CustomAlertControl from "../AlertMessage"
import { getSchoolList, verifySchool } from "./SchoolPlatformAction";
import profile2 from "../../assets/images/FindTutor/unnamed.jpg";
import Swal from "sweetalert2";

// main User List Class
const SchoolPlatform = () => {

    const dispatch = useDispatch();
    const SchoolPlatform = useSelector((state) => state.SchoolPlatform);

    const [isLoading, setLoading] = useState(true);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [viewUserModal, setViewUserModal] = useState(false);
    const [viewUserData, setViewUserData] = useState(null);

    useEffect(async () => {
        showLoader();
        await dispatch(getSchoolList());
        setLoading(false);
        hideLoader();
    }, []);

    // School list Column
    const columns = [
        {
            title: "Name",
            field: "school_name"
        },
        {
            title: "Email",
            field: "email",

        },
        {
            title: "Mobile",
            field: "mobile"
        },
        {
            title: "Phone",
            field: "phone",
        },
        {
            title: "Pincode",
            field: "pincode",
        },
        {
            title: "City",
            field: "city",
        },
        {
            title: "Registration No",
            field: "registration_no",

        },
        {
            title: "Status",
            field: "is_verified",
            render: rowData => rowData.is_verified !== true ? <CBadge color="danger">Not Verified</CBadge> : <CBadge color="primary">Verified</CBadge>
        },
    ];

    // School View Modal Open
    const userView = (data) => {
        setViewUserModal(true);
        setViewUserData(data);
    }

    // School Verification
    const schoolVerification = (e, data) => {

        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Verify The School?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(verifySchool({ school_id: data.id }));
            }
        });
    }

    return (
        <>
            {isLoading ? (
                <>{loader}</>
            ) : <div>
                <CustomAlertControl />
                <CRow className="p-3">
                    <CCol xl={12} sm={12} className="card-title font-weight-bold">
                        Manage School

                    </CCol>
                </CRow>

                <div className="p-3 text-center">
                    <MaterialTable
                        title=""
                        data={SchoolPlatform.schoolList}
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
                        actions={[
                            {
                                icon: "visibilityicon",
                                tooltip: "View",
                                onClick: (event, rowData) => userView(rowData),
                                position: "row",
                                iconProps: { style: { color: '#321fdb' } },
                            },
                            {
                                icon: 'create',
                                tooltip: 'verify_school',
                                onClick: (event, rowData) => schoolVerification(event, rowData),
                                position: "row",
                                iconProps: { style: { color: '#e49e07' } },
                            },
                        ]}
                    />
                </div>

                <CModal visible={viewUserModal} size="lg" onDismiss={() => setViewUserModal(false)}>
                    <CModalHeader onDismiss={() => setViewUserModal(false)} className="tutorviewmodalheader">
                        <CModalTitle>View School</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <div className="row p-3 d-flex justify-content-around">
                            {viewUserData === null ? "" :
                                <>
                                    <div className="p-2 border tuitionimage h-50 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <CCardImage
                                            src={
                                                viewUserData.image !== null
                                                    ? viewUserData.image
                                                    : profile2
                                            }
                                            // style={{ height: 120, width: 120, borderRadius: 10 }}
                                            className="border viewcourselistmodalimage mx-auto d-flex "
                                        ></CCardImage>

                                    </div>
                                    <div className="m-2 border tuitionimage col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                        <div className="row border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                                            <div className="card-title">Course Details</div>
                                        </div>
                                        <div className="p-3">
                                            <div className="row ">
                                                <div className="col-4 font-weight-bold">
                                                    School Name{" "}
                                                </div>
                                                <div className="col-8">
                                                    {viewUserData.school_name !== null
                                                        ? viewUserData.school_name
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 font-weight-bold">Email</div>
                                                <div className="col-8">
                                                    {viewUserData.email !== null
                                                        ? viewUserData.email
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 font-weight-bold">Mobile</div>
                                                <div className="col-8">
                                                    {viewUserData.mobile !== null
                                                        ? viewUserData.mobile
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 font-weight-bold">Phone</div>
                                                <div className="col-8">
                                                    {viewUserData.phone !== null
                                                        ? viewUserData.phone
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 font-weight-bold">Pin Code</div>
                                                <div className="col-8">
                                                    {viewUserData.pincode !== null
                                                        ? viewUserData.pincode
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 font-weight-bold" >City </div>
                                                <div className="col-8" style={{ textTransform: 'capitalize' }}>
                                                    {viewUserData.city !== null
                                                        ? viewUserData.city
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 font-weight-bold">
                                                    Registration Number{" "}
                                                </div>
                                                <div className="col-8">
                                                    {viewUserData.registration_no !== null
                                                        ? viewUserData.registration_no
                                                        : "Not Available"}
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-4 font-weight-bold">
                                                    School Principal{" "}
                                                </div>
                                                <div className="col-8">
                                                    {viewUserData.principal !== null
                                                        ? viewUserData.principal
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 font-weight-bold">
                                                    School Vice Principal{" "}
                                                </div>
                                                <div className="col-8">
                                                    {viewUserData.vice_principal !== null
                                                        ? viewUserData.vice_principal
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 font-weight-bold">
                                                    School Incharge{" "}
                                                </div>
                                                <div className="col-8">
                                                    {viewUserData.incharge !== null
                                                        ? viewUserData.incharge
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 font-weight-bold">
                                                    School Working Year start Date{" "}
                                                </div>
                                                <div className="col-8">
                                                    {viewUserData.working_start_date !== null
                                                        ? viewUserData.working_start_date
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 font-weight-bold">
                                                    School Working Year End Date{" "}
                                                </div>
                                                <div className="col-8">
                                                    {viewUserData.working_end_date !== null
                                                        ? viewUserData.working_end_date
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 font-weight-bold">
                                                    Status{" "}
                                                </div>
                                                <div className="col-8">
                                                    {viewUserData.is_verified !== null
                                                        ?
                                                        viewUserData.is_verified === true ?
                                                            <CBadge color="primary">Verified</CBadge>
                                                            :
                                                            <CBadge color="danger">Not Verified</CBadge>
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </CModalBody>
                </CModal>
            </div>

            }
        </>
    )
}

export default SchoolPlatform
