import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CRow,
  CCol,
} from "@coreui/react";
import {
  subjectTutorListData,
} from "../../redux/actions/dropdowns/index";
import { noteBookUpdate } from "./notebookActions";
import { Form, useForm } from "src/components/formControls/useForm";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import Controls from "src/components/formControls/controls/Controls";
import Editor from "react-quill";

const EditNoteBook = (Data) => {
  const dispatch = useDispatch();
  const DropDown = useSelector((state) => state.dropdowns);
  const [editvisible, setEditVisible] = useState(false);
  const [value, setValue] = useState(Data.Data.description);
  const [editorState, setEditorState] = useState(true);

  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const initialFValues = {
    id: Data.Data.id,
    syllabus_id: Data.Data.syllabus_id,
    class_id: Data.Data.class_id,
    subject_id: Data.Data.subject_id,
    tutor_id: Data.Data.tutor_id,
    description: value,
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

    if ("tutor_id" in fieldValues)
      temp.tutor_id = fieldValues.tutor_id
        ? ""
        : "Please select subject tutor.";

    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Pleasse add your description.";

    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");

    if (value !== "" && value !== "<p><br></p>") {
      setEditorState(true);
    } else {
      setEditorState(false);
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "" && value !== "<p><br></p>") {
      setEditorState(true);
    } else {
      setEditorState(false);
    }
    if (validate()) {
      values.description = value;
      if (value !== "" && value !== "<p><br></p>") {
        setEditorState(true);
        dispatch(noteBookUpdate(values));
        resetForm;
      } else {
        setEditorState(false);
      }
    }
  };

  const clearState = () => {
    setValue("");
    setEditorState(true);
  };

  const resetTextEditor = () => {
    const qlEditor = document.getElementsByClassName("ql-editor");
    qlEditor[1].innerHTML = "";
  };


  Editor.modules = {
    toolbar: [
      [
        { header: [1, 2, 3, 4, 5, 6, false] },
        "bold",
        "italic",
        "underline",
        "strike",
        { align: [] },
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        "link",
        "image",
        { color: [] },
        { background: [] },
        "clean",
      ],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
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
            />
          </CCol>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Select
              name="class_id"
              label="Class *"
              value={values.class_id}
              onChange={handleInputChange}
              options={DropDown.classList}
              error={errors.class_id}
            />
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
            />
          </CCol>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Select
              name="tutor_id"
              label="Tutor *"
              value={values.tutor_id}
              onChange={handleInputChange}
              options={DropDown.subjectTutorList}
              error={errors.tutor_id}
            />
          </CCol>
        </CRow>
        <Editor
          modules={Editor.modules}
          className="ql-editor"
          theme="snow"
          value={value}
          onChange={(value) => setValue(value)}
        />
        {(value == "" || value == "<p><br></p>") && !editorState ? (
          <>
            <span className="text-danger ml-3">
              Please enter some description.
            </span>
          </>
        ) : null}
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
                onClick={() => {
                  resetForm();
                  clearState();
                  resetTextEditor();
                }}
              />
            </div>
          </CCol>
        </CRow>
      </Form>
    </>
  );
};
export default EditNoteBook;
