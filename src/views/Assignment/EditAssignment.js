import React, {  useState } from "react";
import {  CForm } from "@coreui/react";
import Controls from "src/components/formControls/controls/Controls";
import {  useForm } from "src/components/formControls/useForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faStar } from "@fortawesome/free-solid-svg-icons";

const EditAssignment = () => {
  const [viewVisible, setviewVisible] = useState(false);
  const initialFValues = {
    id: "",
    syllabus_id: "",
    class_id: "",
    subject_id: "",
    image_name: "",
    title: "",
    description: "",
    section_id: "",
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("syllabus_id" in fieldValues)
      temp.syllabus_id = fieldValues.syllabus_id
        ? ""
        : "Please select syllabus.";
    if ("class_id" in fieldValues)
      temp.class_id = fieldValues.class_id ? "" : "Please select Class.";
    if ("subject_id" in fieldValues)
      temp.subject_id = fieldValues.subject_id ? "" : "Please select Subject.";
    if ("image_name" in fieldValues)
      temp.image_name = fieldValues.image_name ? "" : "Please select Image.";
    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : "Please Enter Title.";
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Please Enter Description.";
    if ("section_id" in fieldValues)
      temp.section_id = fieldValues.section_id
        ? ""
        : "Please Enter Description.";

    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const Syllbus = [
    { id: "1", name: "CBSE" },
    { id: "2", name: "SSC" },
    { id: "3", name: "ICSE" },
    { id: "4", name: "OTHER" },
  ];
  const Class = [
    { id: "1", name: "8Th" },
    { id: "2", name: "9Th" },
    { id: "3", name: "10TH" },
    { id: "4", name: "OTHER" },
  ];
  const Subject = [
    { id: "1", name: "Hindi" },
    { id: "2", name: "Telugu" },
    { id: "3", name: "English" },
    { id: "4", name: "OTHER" },
  ];
  const Question = [
    { id: "1", name: "Q & A" },
    { id: "2", name: "Multiple Choice" },
    { id: "3", name: "Fill Up Blanks" },
    { id: "4", name: "Match of Following" },
    { id: "5", name: "Comperhension" },
  ];
  const handleSubmit = (e) => {
    if (validate()) {
    }
  };


  return (
    <>
    <div>
    <CForm onSubmit={handleSubmit}>
     <div className="row">
            <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Controls.Select
                name="syllabus_id"
                label="Syallbus"
                options={Syllbus}
                error={errors.syllabus_id}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Controls.Select
                name="class_id"
                label="Class"
                options={Class}
                error={errors.class_id}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Controls.Select
                name="subject_id"
                label="Subject"
                options={Subject}
                error={errors.subject_id}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Controls.InputLabelShown
                name="image_name"
                label="Image"
                type="file"
                error={errors.image_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <Controls.Input name="title" label="title" error={errors.title}
                onChange={handleInputChange}/>
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <Controls.CustomTextArea
                label="Description"
                rows={2}
                name="description"
                error={errors.title}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="p-2 d-inline">
                <Controls.Button type="submit" text="Update To Assignment" />
              </div>
              <div className="p-2 d-inline">
                <Controls.Button text="Reset" color="default" />
              </div>
            </div>
          </div>
          </CForm>
          
      </div>
    </>
  )

}
export default EditAssignment
