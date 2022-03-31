import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { CRow, CCol } from "@coreui/react";

import { updateTextBooks } from "./textBooksActions";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";

const resourcetypeItems = [
  { id: "external_link", title: "PDF Link" },
  { id: "attachment", title: "Attach PDF" },
];

const EditTextBook = (Data) => {
  const dispatch = useDispatch();
  const DropDown = useSelector((state) => state.dropdowns);
  const [editvisible, setEditVisible] = useState(false);

  const initialFValues = {
    id: Data.Data.id,
    syllabus_id: Data.Data.syllabus_id,
    class_id: Data.Data.class_id,
    subject_id: Data.Data.subject_id,
    book_name: Data.Data.book_name,
    image: "",
    image_name: "",
    resource_type: Data.Data.resource_type,
    external_link: Data.Data.external_link,
    attachment: "",
    attachment_name: "",
    description: Data.Data.description,
  };

  // validation code start
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("syllabus_id" in fieldValues)
      temp.syllabus_id = fieldValues.syllabus_id
        ? ""
        : "Please select syllabus.";

    if ("class_id" in fieldValues)
      temp.class_id = fieldValues.class_id ? "" : "Please select class.";

    if ("subject_id" in fieldValues)
      temp.subject_id = fieldValues.subject_id ? "" : "Please select subject.";

    if ("book_name" in fieldValues)
      temp.book_name = fieldValues.book_name ? "" : "Enter book name.";


    if ("image_name" in fieldValues) {
      var imagePath = fieldValues.image_name;
      var logo = ['jpeg', 'png', 'jpg']
      var extension = imagePath.substring(
        imagePath.lastIndexOf(".") + 1,
        imagePath.length
      );

      if (fieldValues.image_name) {
        if (logo.includes(extension)) {
          temp.image_name = "";
        } else {
          temp.image_name = "Only Jpg, png and jpg  file is allowed.";
        }
      } else {
        temp.image_name = "";
      }
    }
    if ("resource_type" in fieldValues) {
      if (Data.Data.resource_type !== fieldValues.resource_type)
        if (fieldValues.resource_type == "external_link") {
          if ("external_link" in fieldValues)
            temp.external_link = fieldValues.external_link
              ? ""
              : "Please Select external link.";
        } else {
          if ("attachment_name" in fieldValues) {

            var imagePath = fieldValues.attachment_name;

            var extension = imagePath.substring(
              imagePath.lastIndexOf(".") + 1,
              imagePath.length
            );

            if (fieldValues.attachment_name) {
              if (extension === "pdf") {
                temp.attachment_name = "";
              } else {
                temp.attachment_name = "Only PDF file is allowed.";
              }
            } else {
              temp.attachment_name = "Attachemnt Fied is Required";
            }
          }
        }
    }


    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let formData = new FormData();

      formData.append("id", values.id);
      formData.append("syllabus_id", values.syllabus_id);
      formData.append("class_id", values.class_id);
      formData.append("subject_id", values.subject_id);
      formData.append("book_name", values.book_name);
      if (values.image_name !== "") {
        formData.append("image", values.image);
      }
      formData.append("resource_type", values.resource_type);
      if (Data.Data.resource_type !== values.resource_type) {


        {
          values.external_link !== null
            ? formData.append("external_link", values.external_link)
            : "";
        }

        {
          values.attachment !== null
            ? formData.append("attachment", values.attachment)
            : "";
        }
      }
      formData.append("description", values.description);
      dispatch(updateTextBooks(formData));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <CRow>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Select
              name="syllabus_id"
              label="Syllabus *"
              value={values.syllabus_id}
              onChange={handleInputChange}
              options={DropDown.syllabusList}
              error={errors.syllabus_id}
              other="other"
            />
            {values.syllabus_id == "other" ? (
              <Controls.Input
                name="syllabus_other"
                label="Other Syllabus *"
                value={values.syllabus_other}
                onChange={handleInputChange}
                error={errors.syllabus_other}
              />
            ) : (
              ""
            )}
          </CCol>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Select
              name="class_id"
              label="Class *"
              value={values.class_id}
              onChange={handleInputChange}
              options={DropDown.classList}
              error={errors.class_id}
              other="other"
            />
            {values.class_id == "other" ? (
              <Controls.Input
                name="class_other"
                label="Other Class *"
                value={values.class_other}
                onChange={handleInputChange}
                error={errors.class_other}
              />
            ) : (
              ""
            )}
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Select
              name="subject_id"
              label="Subject *"
              value={values.subject_id}
              onChange={handleInputChange}
              options={DropDown.subjectList}
              error={errors.subject_id}
              other="other"
            />
            {values.subject_id == "other" ? (
              <Controls.Input
                name="subject_other"
                label="Other Subject *"
                value={values.subject_other}
                onChange={handleInputChange}
                error={errors.subject_other}
              />
            ) : (
              ""
            )}
          </CCol>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Input
              name="book_name"
              label="Book name *"
              value={values.book_name}
              onChange={handleInputChange}
              error={errors.book_name}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <Controls.RadioGroup
              name="resource_type"
              label="Resource type *"
              value={values.resource_type}
              onChange={handleInputChange}
              items={resourcetypeItems}
            />
          </CCol>

          <CCol sm={5} md={5} lg={5} xl={5}>
            <Controls.InputLabelShown
              label="Book Image *"
              type="file"
              name="image_name"
              value={values.image_name}
              onChange={handleInputChange}
              error={errors.image_name}
            />
          </CCol>
          <CCol sm={1} md={1} lg={1} xl={1}>
            <img
              style={{ margin: "10px 5px 8px -15px", borderRadius: "30px" }}
              src={Data.Data.image}
              height="50"
              width="50"
            />
          </CCol>

          {values.resource_type == "external_link" ? (
            <CCol sm={6} md={6} lg={6} xl={6}>
              <Controls.Input
                label="External Link *"
                rows={5}
                name="external_link"
                value={values.external_link}
                onChange={handleInputChange}
                error={errors.external_link}
              />
              {values.attachment_name = ""}
            </CCol>
          ) : (
            <CCol sm={6} md={6} lg={6} xl={6}>
              <Controls.InputLabelShown
                label="Attach PDF *"
                type="file"
                name="attachment_name"
                value={values.attachment_name}
                onChange={handleInputChange}
                error={errors.attachment_name}
              />

            </CCol>
          )}
        </CRow>
        <CRow>
          <CCol sm={12} md={12} lg={12} xl={12}>
            <Controls.CustomTextArea
              label="Description *"
              rows={5}
              name="description"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={12} md={12} lg={4} xl={4} className="m-2">
            <div className="d-inline">
              <Controls.Button
                type="submit"
                text="Submit"
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
export default EditTextBook;
