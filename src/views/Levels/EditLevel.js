import React, { Component, useEffect, useState } from "react";
import { CRow, CCol } from "@coreui/react";
import { updateLevel } from "./levelAction";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { useDispatch } from "react-redux";

const active = [
  { id: "yes", title: "Active" },
  { id: "no", title: "Deactive" },
];

// main Edit level
const EditLevel = (data) => {

  const dispatch = useDispatch();
  
  const initialFValues = {
    id: data.data.id,
    name: data.data.name,
    active: data.data.active,
    description: data.data.description,
  };

  // console.log(data)
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

  // handle Submit Form for update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let formData = new FormData();
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("active", values.active);
      formData.append("description", values.description);
      dispatch(updateLevel(formData));
    }
  };
  return (
    <>
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
              name="description"
              value={values.description}
              error={errors.description}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6} md={6} lg={6} xl={6} className="m-2">
            <div className="d-inline">
              <Controls.Button
                type="submit"
                text="Update"
                className="m-1"
                onDismiss={() => setEditVisible(false)}
              />
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
    </>
  );
};

export default EditLevel;
