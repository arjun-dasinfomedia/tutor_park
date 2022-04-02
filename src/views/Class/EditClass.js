import React, { useEffect } from "react";
import { useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { useDispatch, useSelector } from "react-redux";
import {
  CRow,
  CCol,
  CForm
} from "@coreui/react";
import {
  updateClass
} from "./ClassAction";
import {
  syllabusListData,
  levelListData
} from "src/redux/actions/dropdowns";

const EditClass = (data) => {

  /*State */
  const status = [
    { id: "active", title: "Active" },
    { id: "deactive", title: "Deactive" },
  ];

  const dispatch = useDispatch();
  const DropDown = useSelector((state) => state.dropdowns);

  useEffect(async () => {
    await dispatch(syllabusListData());
    await dispatch(levelListData());
  }, []);

  // initial value for update a class
  const initialFValues = {
    id: data.data.id,
    name: data.data.name,
    syllabus_dropdown: data.data.syllabus_name.id,
    level_id: data.data.level_name.id,
    status: data.data.status,
    description: data.data.description,
    other_syllabus: data.data.syllabus_name.name,
  };

  /* Validation */
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("syllabus_dropdown" in fieldValues)
      temp.syllabus_dropdown = fieldValues.syllabus_dropdown ? "" : "Please select syllabus.";

    if (values.syllabus_dropdown === "other") {
      if ("other_syllabus" in fieldValues)
        temp.other_syllabus = fieldValues.other_syllabus ? "" : "Please Enter Other Syllabus.";
    }
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "Please Enter Class Name.";
    if ("level_id" in fieldValues)
      temp.level_id = fieldValues.level_id ? "" : "Please select Level.";
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Please Enter Description.";

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
      formData.append('id', values.id);
      alert(values.syllabus_dropdown)
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
      dispatch(updateClass(formData));
    }
  };

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol xl={6} sm={6} className="mb-3">
            <Controls.Select
              name="syllabus_dropdown"
              label="Syllabus Name"
              value={values.syllabus_dropdown}
              options={DropDown.syllabusList}
              error={errors.syllabus_dropdown}
              onChange={handleInputChange}
              other="other"
            />
          </CCol>
          {values.syllabus_dropdown == "other" ?
            <CCol xl={6} sm={6} className="mb-3">
              <Controls.Input
                name="other_syllabus"
                value={values.other_syllabus}
                label="Other Syllabus *"
                error={errors.other_syllabus}
                onChange={handleInputChange}
              />
            </CCol>
            :
            ""
          }
          <CCol xl={6} sm={6} className="mb-3">
            <Controls.Input
              name="name"
              value={values.name}
              label="Class Name"
              error={errors.name}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol xl={6} sm={6} className="mb-3">
            <Controls.Select
              name="level_id"
              label="Level Name"
              value={values.level_id}
              options={DropDown.levelList}
              error={errors.level_id}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol xl={6} sm={6} className="mb-3">
            <Controls.RadioGroup
              name="status"
              label="Status"
              value={values.status}
              onChange={handleInputChange}
              items={status}
            />
          </CCol>
        </CRow>
        <CRow className="">
          <CCol xl={12} sm={12} className="mb-3">
            <Controls.CustomTextArea
              name="description"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
              label="Description"
              rows={2}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={12} md={12} lg={12} xl={12} className="m-2">
            <div className="d-inline">
              <Controls.Button
                className="m-1"
                type="submit"
                text="update"
                onDismiss={() => setEditVisible(false)}
              />
            </div>
            <div className="d-inline">
              <Controls.Button text="Reset" color="default" className="m-1" onClick={resetForm} />
            </div>
          </CCol>
        </CRow>
      </CForm>
    </>
  );
};
export default EditClass;
