import React, { useEffect, useState } from "react";
import { useForm } from "src/components/formControls/useForm";
import MaterialTable from "material-table";
import Controls from "src/components/formControls/controls/Controls";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import EditClass from "./EditClass";
import { getClassList, deleteClasses, classStore } from "./ClassAction";
import { syllabusListData, levelListData } from "src/redux/actions/dropdowns";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CRow,
  CCol,
  CButton,
  CForm,
  CBadge,
  CCardHeader,
} from "@coreui/react";


const ClassTabledata = () => {

  const DropDown = useSelector((state) => state.dropdowns);
  const status = [
    { id: "active", title: "Active" },
    { id: "deactive", title: "Deactive" },
  ];
  const classesState = useSelector((state) => state.classReducer);
  const [addClass, setAddClass] = useState(false);
  const [viewClass, setViewClass] = useState(false);
  const [editClass, setEditClass] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [viewClassData, setViewClassData] = useState(null);
  const [editClassData, setEditClassData] = useState(null);

  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const dispatch = useDispatch();

  if (classesState.classUpdate === "sucess") {
    setEditClass(false)
    classesState.classUpdate = ""
  }
  /* List APi */
  useEffect(async () => {
    showLoader();
    await dispatch(getClassList());
    await dispatch(levelListData());
    await dispatch(syllabusListData());
    setLoading(false);
    hideLoader();
  }, []);

  // Class List column
  const columns = [
    {
      title: "Syllabus",
      field: "syllabus_name.name",
    },
    {
      title: "Class",
      field: "name",
    },
    {
      title: "Created By",
      field: "created_by",
    },
    {
      title: "Created Date",
      field: "created_at",
    },
    {
      title: "Description",
      field: "description",
    },
    {
      title: "Level",
      field: "level_name.name",
    },
    {
      title: "Status",
      field: "status",
      render: (rowData) =>
        rowData.status === "deactive" ? (
          <CBadge color="danger">Deactive</CBadge>
        ) : (
          <CBadge color="primary">Active</CBadge>
        ),
      lookup: { active: 'Active', dective: 'Deactive' },
    },
  ];

  // initial value for Add New Class
  const initialFValues = {
    name: "",
    syllabus_dropdown: "",
    level_id: "",
    description: "",
    status: "active",
    other_syllabus: "",
  };

  /* Form validation */
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("syllabus_dropdown" in fieldValues)
      temp.syllabus_dropdown = fieldValues.syllabus_dropdown ? "" : "Please select syllabus.";
    if (values.other_syllabus == "other")
      if ("other_syllabus" in fieldValues)
        temp.other_syllabus = fieldValues.other_syllabus ? "" : "Please Enter Other Syllabus.";
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "Please Enter Class Name.";
    if ("level_id" in fieldValues)
      temp.level_id = fieldValues.level_id ? "" : "Please select Level.";
    if ("description" in fieldValues)
      temp.description = fieldValues.description ? "" : "Please Enter Description.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  /*Add Module open and Submit Data*/

  const addClassModalOpen = () => {
    setAddClass(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let formData = new FormData();
      alert("hello")
      formData.append('id', values.id);
      if (values.syllabus_dropdown == "other") {


        formData.append("other_syllabus", values.other_syllabus)
      }
      else {
        formData.append("syllabus_id", values.syllabus_dropdown);
      }

      formData.append("level_id", values.level_id);
      formData.append("name", values.name);
      formData.append("status", values.status);
      formData.append("description", values.description);

      dispatch(classStore(formData));
      resetForm();
      setAddClass(false);
    }
  };

  /*View Module open*/
  const handleView = (data) => {
    setViewClass(true);
    setViewClassData(data);
  };

  /*Update Module open */
  const handleEdit = (item) => {
    setEditClass(true);
    setEditClassData(item);
  };

  /* Delete Module Open Record Delete */
  const handleConfirmCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to delete the Class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteClasses({ id: id }));
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : (
        <div className="p-3">
          <CRow className="p-3">
            <CCol xl={12} sm={12} className="card-title font-weight-bold">
              Manage Class
              <CButton
                className="d-inline textbook-add-button-css w-auto "
                onClick={addClassModalOpen}
              >
                Add
              </CButton>
            </CCol>
          </CRow>
          <div>
            <div style={{ textAlign: "center", paddingTop: "3%" }}>
              <MaterialTable
                title=""
                data={classesState.classData}
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
                    whiteSpace: "nowrap",
                  },
                }}
                actions={[
                  {
                    icon: "visibilityicon",
                    tooltip: "View",
                    onClick: (event, rowData) => handleView(rowData),
                    position: "row",
                    iconProps: { style: { color: "#321fdb" } },
                  },
                  {
                    icon: "create",
                    tooltip: "Edit",
                    onClick: (event, rowData) => handleEdit(rowData),
                    position: "row",
                    iconProps: { style: { color: "#e49e07" } },
                  },
                  {
                    icon: "delete",
                    tooltip: "Delete",
                    onClick: (event, rowData) =>
                      handleConfirmCancel(rowData.id),
                    position: "row",
                    iconProps: { style: { color: "#c92020" } },
                  },
                ]}
              />
            </div>

            {/* Add Page Design*/}
            <CModal
              visible={addClass}
              size="lg"
              onDismiss={() => setAddClass(false)}
            >
              <CModalHeader
                onDismiss={() => setAddClass(false)}
                className="tutorviewmodalheader"
              >
                <CModalTitle>Add Class</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm>
                  <CRow>
                    <CCol xl={6} sm={6} className="mb-3">
                      <Controls.Select
                        name="syllabus_dropdown"
                        label="Syllabus *"
                        onChange={handleInputChange}
                        value={values.syllabus_dropdown}
                        options={DropDown.syllabusList}
                        error={errors.syllabus_dropdown}
                        other="other"

                      />
                    </CCol>
                    {values.syllabus_dropdown !== "other" ? errors.other_syllabus = "" :
                      <CCol xl={6} sm={6} className="mb-3">

                        <Controls.Input
                          name="other_syllabus"
                          onChange={handleInputChange}
                          error={errors.other_syllabus}
                          label="Other Syllabus *"
                          value={values.other_syllabus}
                        />
                      </CCol>}
                    <CCol xl={6} sm={6} className="mb-3">
                      <Controls.Input
                        name="name"
                        id="classes_name"
                        onChange={handleInputChange}
                        error={errors.name}
                        label="Class Name *"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xl={6} sm={12} className="mb-3">
                      <Controls.Select
                        name="level_id"
                        label="Level *"
                        onChange={handleInputChange}
                        value={values.level_id}
                        options={DropDown.levelList}
                        error={errors.level_id}
                      //other="other"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xl={6} sm={12} className="">
                      <Controls.RadioGroup
                        name="status"
                        label="Status *"
                        value={values.status}
                        onChange={handleInputChange}
                        items={status}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mt-3">
                    <CCol xl={12} sm={12} className="">
                      <Controls.CustomTextArea
                        label="Description *"
                        rows={2}
                        name="description"
                        onChange={handleInputChange}
                        error={errors.description}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={12} md={12} lg={12} xl={12} className="m-2">
                      <div className="d-inline">
                        <Controls.Button
                          className="m-1"
                          type="submit"
                          onClick={handleSubmit}
                          text="Add Class"
                        />
                      </div>
                      <div className="d-inline">
                        <Controls.Button
                          text="Reset"
                          color="default"
                          className="m-1"
                          onClick={resetForm}
                        />
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
              </CModalBody>
            </CModal>

            {/* View Page Design*/}
            <CModal visible={viewClass} onDismiss={() => setViewClass(false)}>
              <CModalHeader
                onDismiss={() => setViewClass(false)}
                className="tutorviewmodalheader"
              >
                <CModalTitle>View Class</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="row p-3 justify-content-around">
                  <div className="border tuitionimage my-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="row border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                      <CCardHeader style={{ fontSize: 18 }} className="card-title text-dark">Class Details</CCardHeader>
                    </div>
                    <div class="p-3">
                      <div className="row">
                        <div className="col-4 font-weight-bold">Syllabus </div>
                        <div className="col-8">
                          {viewClassData && viewClassData.syllabus_name.name}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 font-weight-bold">Class</div>
                        <div className="col-8">
                          {viewClassData && viewClassData.name}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 font-weight-bold">Level</div>
                        <div className="col-8">
                          {viewClassData && viewClassData.level_name.name}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 font-weight-bold">Created By</div>
                        <div className="col-8">
                          {viewClassData && viewClassData.created_by}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 font-weight-bold">
                          Created Date
                        </div>
                        <div className="col-8">
                          {viewClassData && viewClassData.created_at}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 font-weight-bold">
                          Description
                        </div>
                        <div className="col-8">
                          {viewClassData && viewClassData.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CModalBody>
            </CModal>

            {/* Edit Page Design*/}
            {classesState.classUpdate !== false ? (
              <CModal
                visible={editClass}
                size="lg"
                onDismiss={() => setEditClass(false)}
              >
                <CModalHeader
                  onDismiss={() => setEditClass(false)}
                  className="tutorviewmodalheader"
                >
                  <CModalTitle>Edit Syllabus</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <EditClass data={editClassData} />
                </CModalBody>
              </CModal>
            ) : (
              <CModal size="lg" onDismiss={() => setEditClass(false)}>
                <CModalHeader
                  onDismiss={() => setEditClass(false)}
                  className="tutorviewmodalheader"
                >
                  <CModalTitle>Edit Syllabus</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <EditClass data={editClassData} />
                </CModalBody>
              </CModal>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ClassTabledata;
