import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CBadge,
  CCardHeader,
} from "@coreui/react";
import { useForm, Form } from "src/components/formControls/useForm";
import MaterialTable from "material-table";
import Controls from "src/components/formControls/controls/Controls";
import Swal from "sweetalert2";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { useDispatch, useSelector } from "react-redux";
import { getLevelList, storeLevel, deleteLevel } from "./levelAction";
import EditLevel from "./EditLevel";

const active = [
  { id: "yes", title: "Active" },
  { id: "no", title: "Deactive" },
];

// main level function start
const Level = () => {
  
  const dispatch = useDispatch();
  const levelState = useSelector((state) => state.level);

  const columns = [
    {
      title: "Name",
      field: "name",
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
      title: "Status",
      field: "active",
      render: (rowData) =>
        rowData.active === "no" ? (
          <CBadge color="danger">Deactive</CBadge>
        ) : (
          <CBadge color="primary">Active</CBadge>
        ),
      lookup: { yes: "Active", no: "Deactive" },
    },
  ];

  const [addLevelModal, setaddLevelModal] = useState(false);
  const [viewLevelModal, setViewLevelModal] = useState(false);
  const [editLevelsModal, setEditLevelModal] = useState(false);
  const [viewLevelData, setViewLevelData] = useState(null);
  const [editLevelData, setEditLevelData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(async () => {
    showLoader();
    await dispatch(getLevelList());
    setLoading(false);
    hideLoader();
  }, []);

  // validation code start
  const initialFValues = {
    description: "",
    active: "yes",
    name: "",
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Please Enter Level Description.";

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "Please Enter Level Name.";

    setErrors({
      ...temp,
    });
    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  // Handle Submit Form for add
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("active", values.active);
      dispatch(storeLevel(formData));
      resetForm();
      setaddLevelModal(false);
    }
  };

  // level Delete Function
  const handleConfirmCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the Level!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLevel({ id: id }));
      }
    });
  };

  // level View Function
  const levelView = (data) => {
    setViewLevelModal(true);
    setViewLevelData(data);
  };

  // level Edit Function
  const levelEdit = (item) => {
    setEditLevelModal(true);
    setEditLevelData(item);
    // setViewSyllabusModal(false);
  };

  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : (
        <div>
          <CRow className="p-3">
            <CCol xl={12} sm={12} className="card-title font-weight-bold">
              Manage Levels
              <CButton
                className="d-inline textbook-add-button-css w-auto"
                onClick={() => setaddLevelModal(!addLevelModal)}
              >
                Add
              </CButton>
            </CCol>
          </CRow>
          <div className="p-3">
            <MaterialTable
              title=""
              data={levelState.levelList}
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
                  onClick: (event, rowData) => levelView(rowData),
                  position: "row",
                  iconProps: { style: { color: "#321fdb" } },
                },
                {
                  icon: "create",
                  tooltip: "Edit",
                  onClick: (event, rowData) => levelEdit(rowData),
                  position: "row",
                  iconProps: { style: { color: "#e49e07" } },
                },
                {
                  icon: "delete",
                  tooltip: "Delete",
                  onClick: (event, rowData) => handleConfirmCancel(rowData.id),
                  position: "row",
                  iconProps: { style: { color: "#c92020" } },
                },
              ]}
            />
          </div>

          {/* Add level Modal */}
          <CModal
            visible={addLevelModal}
            size="lg"
            onDismiss={() => setaddLevelModal(false)}
          >
            <CModalHeader
              onDismiss={() => setaddLevelModal(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle>Add Level</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <Form onSubmit={handleSubmit}>
                <CRow>
                  <CCol xl={6} sm={6} className="">
                    <Controls.Input
                      name="name"
                      label="Level Name *"
                      value={values.name}
                      error={errors.name}
                      onChange={handleInputChange}
                    />
                  </CCol>

                  <CCol xl={6} sm={6} className="">
                    <Controls.RadioGroup
                      name="active"
                      label="Select Type *"
                      value={values.active}
                      onChange={handleInputChange}
                      items={active}
                    />
                  </CCol>
                </CRow>

                <CRow className="">
                  <CCol xl={12} sm={12} className="">
                    <Controls.CustomTextArea
                      label="Description *"
                      rows={2}
                      value={values.description}
                      name="description"
                      error={errors.description}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
                    <div className="d-inline">
                      <Controls.Button
                        type="submit"
                        text="Add level"
                        className="m-1"
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
              </Form>
            </CModalBody>
          </CModal>

          {/* View Level Modal */}
          <CModal
            visible={viewLevelModal}
            onDismiss={() => setViewLevelModal(false)}
          >
            <CModalHeader
              onDismiss={() => setViewLevelModal(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle className="">View Level</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className="row p-3 justify-content-around">
                <div className="border tuitionimage my-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="row border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                    <CCardHeader
                      style={{ fontSize: 18 }}
                      className="card-title text-dark"
                    >
                      Level Details
                    </CCardHeader>
                  </div>
                  <div className="p-3">
                    <div className="row">
                      <div className="col-4 font-weight-bold">Level Name </div>
                      <div className="col-8">
                        {viewLevelData && viewLevelData.name}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Created</div>
                      <div className="col-8">
                        {viewLevelData && viewLevelData.created_at}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Description</div>
                      <div className="col-8">
                        {viewLevelData && viewLevelData.description !== null
                          ? viewLevelData.description
                          : "Not Added"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Status</div>
                      <div className="col-8">
                        {viewLevelData && viewLevelData.active !== "no" ? (
                          <CBadge color="primary">Active</CBadge>
                        ) : (
                          <CBadge color="danger">Deactive</CBadge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CModalBody>
          </CModal>

          {/* update level Modal */}
          {levelState.LevelEditStatus !== false ? (
            <CModal
              visible={editLevelsModal}
              size="lg"
              onDismiss={() => setEditLevelModal(false)}
            >
              <CModalHeader
                onDismiss={() => setEditLevelModal(false)}
                className="tutorviewmodalheader"
              >
                <CModalTitle>Edit Level</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <EditLevel data={editLevelData} />
              </CModalBody>
            </CModal>
          ) : (
            <CModal size="lg" onDismiss={() => setEditLevelModal(false)}>
              <CModalHeader
                onDismiss={() => setEditLevelModal(false)}
                className="tutorviewmodalheader"
              >
                <CModalTitle>Edit Level</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <EditLevel data={editLevelData} />
              </CModalBody>
            </CModal>
          )}
        </div>
      )}
    </>
  );
};
export default Level;
