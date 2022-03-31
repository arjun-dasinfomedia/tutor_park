import React, { useEffect, useState } from "react"
import {
    CRow,
    CCol,
    CButton,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CBadge,
} from "@coreui/react";
import { useForm, Form } from "src/components/formControls/useForm";
import MaterialTable from "material-table";
import Controls from "src/components/formControls/controls/Controls";
import Swal from "sweetalert2";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { useDispatch, useSelector } from "react-redux";
import {
    classListData
} from "src/redux/actions/dropdowns";
import {
    getSubjectList,
    storeSubject,
    deleteSubject,
} from "./subjectAction";
import EditSubject from "./EditSubject";

const Status = [
    { id: 'yes', title: 'Active' },
    { id: 'no', title: 'Deactive' },
]

// main Subject class
const SubjectList = () => {

    const dispatch = useDispatch();
    const subjectState = useSelector((state) => state.subject);
    const DropDown = useSelector((state) => state.dropdowns);
    const [addSubjectModal, setAddSubjectModal] = useState(false);
    const [viewSubjectModal, setViewSubjectModal] = useState(false);
    const [editSubjectModal, setEditSubjectModal] = useState(false);
    const [viewSubjectData, setViewSubjectData] = useState(null);
    const [editSubjectData, setEditSubjectData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    useEffect(async () => {
        showLoader();
        await dispatch(getSubjectList());
        await dispatch(classListData());
        setLoading(false);
        hideLoader();
    }, []);

    // Column For List
    const columns = [
        {
            title: "Class",
            field: "classes[0].name",
        },
        {
            title: "Subject",
            field: "name",
        },
        {
            title: "Created Date",
            field: "created_at",
        },
        {
            title: "Description",
            field: "description",
            render: rowData => rowData.description == null ? "Not Added" : rowData.description
        },
        {
            title: "Status",
            field: "active",
            render: rowData => rowData.active == "no" ? <CBadge color="danger">Deactive</CBadge> : <CBadge color="primary">Active</CBadge>,
            lookup: { yes: 'Active', no: 'Deactive' },
        },
    ];

    // initial value for new subject
    const initialFValues =
    {
        name: "",
        class_id: "",
        Active: 'yes',
        description: "",
    };

    // Validation Codse Start
    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ("description" in fieldValues)
            temp.description = fieldValues.description
                ? ""
                : "Please Enter Subject Description.";

        if ("class_id" in fieldValues)
            temp.class_id = fieldValues.class_id
                ? ""
                : "Please Select a Class";
        if ("name" in fieldValues)
            temp.name = fieldValues.name ? "" : "Please Enter Subject Name.";

        setErrors({
            ...temp,
        });
        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);
    // Validation code end

    // add Subject
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {

            let formData = new FormData()
            formData.append('class_id', values.class_id)
            formData.append('name', values.name)
            formData.append('description', values.description)
            formData.append('active', values.Active);
            dispatch(storeSubject(formData));
            resetForm();
            setAddSubjectModal(false)
        }
    }

    // delete Subject
    const handleConfirmCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You Want to delete the Subject   !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteSubject({ id: id }))
                    Swal.fire("Success", "Subject Deleted Successfully", "success");
                }
            });
    };

    // Subject View Function
    const subjectView = (data) => {

        setViewSubjectData(data);
        setViewSubjectModal(true);
    };

    // Subject Edit Function
    const subjectEdit = (item) => {

        setEditSubjectData(item);
        setEditSubjectModal(true);
    };

    return (
        <>
            {isLoading ? (
                <>{loader}</>
            ) :
                <div>
                    <CRow className="p-3">
                        <CCol xl={12} sm={12} className="card-title font-weight-bold">
                            Manage Subject
                            <CButton
                                className="d-inline textbook-add-button-css w-auto "
                                onClick={() => setAddSubjectModal(!addSubjectModal)}
                            >
                                Add
                            </CButton>
                        </CCol>
                    </CRow>
                    <div className="p-3">
                        <MaterialTable
                            title=""
                            data={subjectState.subjectList}
                            columns={columns}
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
                                    whiteSpace: "nowrap"
                                },
                            }}
                            actions={[
                                {
                                    icon: "visibilityicon",
                                    tooltip: "View",
                                    onClick: (event, rowData) => subjectView(rowData),
                                    position: "row",
                                    iconProps: { style: { color: '#321fdb' } },
                                },
                                {
                                    icon: 'create',
                                    tooltip: 'Edit',
                                    onClick: (event, rowData) => subjectEdit(rowData),
                                    position: "row",
                                    iconProps: { style: { color: '#e49e07' } },
                                },
                                {
                                    icon: 'delete',
                                    tooltip: 'Delete',
                                    onClick: (event, rowData) => handleConfirmCancel(rowData.id),
                                    position: "row",
                                    iconProps: { style: { color: '#c92020' } },
                                },
                            ]}
                        />
                    </div>

                    {/* Add Subject Modal */}
                    <CModal visible={addSubjectModal} size="lg" onDismiss={() => setAddSubjectModal(false)}>
                        <CModalHeader onDismiss={() => setAddSubjectModal(false)} className="tutorviewmodalheader">
                            <CModalTitle>Add Subject</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <Form onSubmit={handleSubmit}>
                                <CRow>
                                    <CCol xl={6} sm={6} className="">
                                        <Controls.Select
                                            name="class_id"
                                            label="Class *"
                                            value={values.class_id}
                                            onChange={handleInputChange}
                                            options={DropDown.classList}
                                            error={errors.class_id}
                                            other="other"
                                        />
                                    </CCol>
                                    <CCol xl={6} sm={6} className="">
                                        <Controls.Input
                                            name="name"
                                            label="Name *"
                                            value={values.name}
                                            onChange={handleInputChange}
                                            error={errors.name}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xl={12} sm={12} className="">
                                        <Controls.RadioGroup
                                            name="Active"
                                            label="Select Type *"
                                            value={values.Active}
                                            onChange={handleInputChange}
                                            items={Status}
                                        />
                                    </CCol>
                                </CRow>

                                <CRow className="">
                                    <CCol xl={12} sm={12} className="">
                                        <Controls.CustomTextArea
                                            label="Description *"
                                            rows={2}
                                            name="description"
                                            value={values.description}
                                            onChange={handleInputChange}
                                            error={errors.description}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
                                        <div className="d-inline">
                                            <Controls.Button type="submit" text="Add Subject" className="m-1" />
                                        </div>
                                        <div className="d-inline">
                                            <Controls.Button
                                                className="m-1"
                                                text="Reset"
                                                color="default"
                                                onClick={resetForm}
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                            </Form>
                        </CModalBody>
                    </CModal>

                    {/* View Subject Modal */}
                    <CModal visible={viewSubjectModal} onDismiss={() => setViewSubjectModal(false)}>
                        <CModalHeader onDismiss={() => setViewSubjectModal(false)} className="tutorviewmodalheader">
                            <CModalTitle className="font-weight-bold">View Subject</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div className="row p-3 justify-content-around">
                                <div className="border tuitionimage my-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="row border viewmodalcolor font-weight-bold viewmodalcoursedaetail" >
                                        <div className="card-title">
                                            Subject Details
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Class {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewSubjectData && viewSubjectData.classes[0].name}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Subject {" "}
                                            </div>
                                            <div className="col-8">
                                                {viewSubjectData && viewSubjectData.name}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Created Date
                                            </div>
                                            <div className="col-8">
                                                {viewSubjectData && viewSubjectData.created_at}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Description
                                            </div>
                                            <div className="col-8">
                                                {viewSubjectData && viewSubjectData.description != null ? viewSubjectData.description : "Not Added"}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 font-weight-bold">
                                                Status
                                            </div>
                                            <div className="col-8">
                                                {viewSubjectData && viewSubjectData.active != "no" ?
                                                    <CBadge color="primary">Active</CBadge>
                                                    :
                                                    <CBadge color="danger">Deactive</CBadge>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </CModalBody>
                    </CModal>

                    {/* Subject Edit Modal */}
                    {subjectState.subjectEditStatus !== false ? (
                        <CModal visible={editSubjectModal} size="lg" onDismiss={() => setEditSubjectModal(false)}>
                            <CModalHeader onDismiss={() => setEditSubjectModal(false)} className="tutorviewmodalheader">
                                <CModalTitle>Edit Subject</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <EditSubject data={editSubjectData} />
                            </CModalBody>
                        </CModal>
                    ) : (
                        <CModal size="lg" onDismiss={() => setEditSubjectModal(false)}>
                            <CModalHeader onDismiss={() => setEditSubjectModal(false)} className="tutorviewmodalheader">
                                <CModalTitle>Edit Subject</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <EditSubject data={editSubjectData} />
                            </CModalBody>
                        </CModal>
                    )
                    }
                </div>
            }
        </>
    )
}
export default SubjectList
