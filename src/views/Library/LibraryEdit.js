import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CRow, CCol } from "@coreui/react";
import {
  subjectListData,
  syllabusListData,
  classListData,
} from "../../redux/actions/dropdowns/index";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { updateMyLibrary } from "./LibraryActions";

const LibraryEdit = (Data) => {

  const dispatch = useDispatch();
  const DropDown = useSelector((state) => state.dropdowns);
  const [editvisible, setEditVisible] = useState(false);

  useEffect(async () => {
    await dispatch(syllabusListData());
    await dispatch(classListData());
    await dispatch(subjectListData());
  }, []);

  // initial value for update Library
  const initialFValues = {
    id: Data.Data.id,
    syllabus_id: Data.Data.syllabus_id,
    class_id: Data.Data.class_id,
    subject_id: Data.Data.subject_id,
    name: Data.Data.name,
    image: "",
    image_name: "",
    attachment: "",
    attachment_name: "",
    description: Data.Data.description,
    syllabus_other: "",
    subject_other: "",
    class_other: "",
  };

  // validation code start
  const validate = (fieldValues = values) => {

    let temp = { ...errors };

    if (values.syllabus_id == "other") {
      if ("syllabus_other" in fieldValues)
        temp.syllabus_other = fieldValues.syllabus_other ? "" : "Please enter other Syllabus.";
    }
    if (values.class_id == "other") {
      if ("class_other" in fieldValues)
        temp.class_other = fieldValues.class_other ? "" : "Please enter other Class.";
    }
    if (values.subject_id == "other") {
      if ("subject_other" in fieldValues)
        temp.subject_other = fieldValues.subject_other ? "" : "Please enter other Subject.";
    }


    if ("image_name" in fieldValues) {
      var imagePath = fieldValues.image_name;
      var logo = ['jpeg', 'png', 'jpg', 'bmp']
      var extension = imagePath.substring(
        imagePath.lastIndexOf(".") + 1,
        imagePath.length
      );

      if (fieldValues.image_name) {
        if (logo.includes(extension)) {
          temp.image_name = "";
        } else {
          temp.image_name = "Only Jpg, png ,bmp and jpg  file is allowed.";
        }
      } else {
        temp.image_name = "";
      }
    }
    if ("attachment_name" in fieldValues) {
      var imagePath = fieldValues.attachment_name;
      var logo = ['jpeg', 'png', 'jpg', 'bmp', 'svg', 'mp4', 'mp3', 'pdf', 'doc', 'csv', 'xlsx', 'xls', 'docx',
        'ppt', 'odt', 'ods', 'odp']
      var extension = imagePath.substring(
        imagePath.lastIndexOf(".") + 1,
        imagePath.length
      );

      if (fieldValues.attachment_name) {
        if (logo.includes(extension)) {
          temp.attachment_name = "";
        } else {
          temp.attachment_name = "Only Jpg, png and jpg jpg, bmp, png, jpeg, svg, mp4, mp3, pdf, doc, csv, xlsx, xls, docx, ppt, odt, ods, odp file is allowed.";
        }
      } else {
        temp.attachment_name = "";
      }
    }
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "Please enter title.";

    if ("syllabus_id" in fieldValues)
      temp.syllabus_id = fieldValues.syllabus_id
        ? ""
        : "Please select syllabus.";

    if ("class_id" in fieldValues)
      temp.class_id = fieldValues.class_id ? "" : "Please select class.";

    if ("subject_id" in fieldValues)
      temp.subject_id = fieldValues.subject_id ? "" : "Please select subject.";

    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Pleasse add your description.";

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
      delete values.image_name;
      delete values.attachment_name;

      let data = new FormData();
      
      if (values.syllabus_id == "other") {
        data.append("other_syllabus", values.syllabus_other)
      }

      if (values.class_id == "other") {
        data.append("other_class", values.class_other)
      }

      if (values.subject_id == "other") {
        data.append("other_subject", values.subject_other)
      }

      data.append("id", values.id);
      data.append("name", values.name);
      data.append("syllabus_id", values.syllabus_id);
      data.append("class_id", values.class_id);
      data.append("subject_id", values.subject_id);
      data.append("image", values.image);
      data.append("attachment", values.attachment);
      data.append("description", values.description);

      dispatch(updateMyLibrary(data));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <CRow>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Input
              name="name"
              label="Title"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
          </CCol>

          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Select
              name="syllabus_id"
              label="Syllabus"
              value={values.syllabus_id}
              onChange={handleInputChange}
              options={DropDown.syllabusList}
              error={errors.syllabus_id}
              other="other"
            />
            {values.syllabus_id == "other" ? (
              <Controls.Input
                name="syllabus_other"
                label="Other Syllabus"
                value={values.syllabus_other}
                onChange={handleInputChange}
                error={errors.syllabus_other}
              />
            ) : (
              errors.syllabus_other = ""
            )}
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Select
              name="class_id"
              label="Class"
              value={values.class_id}
              onChange={handleInputChange}
              options={DropDown.classList}
              error={errors.class_id}
              other="other"
            />
            {values.class_id == "other" ? (
              <Controls.Input
                name="class_other"
                label="Other Class"
                value={values.class_other}
                onChange={handleInputChange}
                error={errors.class_other}
              />
            ) : (
              errors.class_other = ""
            )}
          </CCol>

          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Select
              name="subject_id"
              label="Subject"
              value={values.subject_id}
              onChange={handleInputChange}
              options={DropDown.subjectList}
              error={errors.subject_id}
              other="other"
            />
            {values.subject_id == "other" ? (
              <Controls.Input
                name="subject_other"
                label="Other Subject"
                value={values.subject_other}
                onChange={handleInputChange}
                error={errors.subject_other}
              />
            ) : (
              errors.subject_other = ""
            )}
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.InputLabelShown
              name="attachment_name"
              label="Attachment (Max size 50MB)"
              type="file"
              value={values.attachment_name}
              onChange={handleInputChange}
              error={errors.attachment_name}
            />
          </CCol>
          <CCol sm={5} md={5} lg={5} xl={5}>
            <Controls.InputLabelShown
              name="image_name"
              label="Image"
              type="file"
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
        </CRow>
        <CRow>
          <CCol sm={12} md={12} lg={12} xl={12}>
            <Controls.CustomTextArea
              label="Description"
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
                className="m-1"
                type="submit"
                text="Submit"
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
export default LibraryEdit;
