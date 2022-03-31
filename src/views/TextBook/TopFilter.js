import {
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
  CCard,
  CRow,
  CCol,
  CButton,
  CFormSelect,
  CFormInput,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  retrieveTextBooksUsingFilter,
  storeTextBooks,
} from "./textBooksActions";
import {
  subjectListData,
  classListData,
} from "../../redux/actions/dropdowns/index";
import Swal from "sweetalert2";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { checkAccessPermission } from "src/utility/utils";

const resourcetypeItems = [
  { id: "external_link", title: "PDF Link" },
  { id: "attachment", title: "Attach PDF" },
];

const TextBook = () => {

  const dispatch = useDispatch();
  const [syllabusId, setSyllabusId] = useState("");
  const [classId, setClasssId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [bookName, setBookName] = useState("");
  const DropDown = useSelector((state) => state.dropdowns);
  const [visibleLg, setVisibleLg] = useState(false);

  useEffect(() => {
    dispatch(subjectListData());
  }, []);

  const initialFValues = {
    syllabus_id: "",
    class_id: "",
    subject_id: "",
    book_name: "",
    image: "",
    image_name: "",
    resource_type: "external_link",
    external_link: "",
    attachment: "",
    attachment_name: "",
    description: "",
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
          temp.image_name = "Only Jpg, png and Jpeg  file is allowed.";
        }
      } else {
        temp.image_name = "Please Upload Book Image.";
      }
    }

    if ("resource_type" in fieldValues) {
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
            temp.attachment_name = "Please Select attachment.";
          }
        }
      }
    }

    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Please add your description.";

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
      formData.append("syllabus_id", values.syllabus_id);
      formData.append("class_id", values.class_id);
      formData.append("subject_id", values.subject_id);
      formData.append("book_name", values.book_name);
      formData.append("image", values.image);
      formData.append("resource_type", values.resource_type);
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
      formData.append("description", values.description);
      dispatch(storeTextBooks(formData));
      
      resetForm();
      setVisibleLg(false);
    }
  };

  const onDropDownValueChange = (event) => {
    if (event.target.name == "syllabus_id") {
      setSyllabusId(event.target.value);
      dispatch(classListData({ syllabus_id: event.target.value }));
    } else if (event.target.name == "class_id") {
      setClasssId(event.target.value);
      dispatch(subjectListData({ class_id: event.target.value }));
    } else {
      setSubjectId(event.target.value);
    }
  };

  const handleOnInputChange = (e) => {
    setBookName(e.target.value);
  };

  const handleFilterSubmit = async () => {
    await dispatch(
      retrieveTextBooksUsingFilter({
        syllabus_id: syllabusId,
        class_id: classId,
        subject_id: subjectId,
        book_name: bookName,
      })
    );
  };

  return (
    <>
      <div>
        <CCard className="text-book-css">
          <div>
            <div className="col text-center mt-4">
              <h5 className="d-inline text-book-header">Text Book</h5>
              {checkAccessPermission("text_book_add") ? (
                <CButton
                  className="d-inline textbook-add-button-css"
                  style={{ marginBottom: 8 }}
                  onClick={() => setVisibleLg(!visibleLg)}
                >
                  Add
                </CButton>
              ) : null}
            </div>
          </div>

          <CModal
            size="lg"
            visible={visibleLg}
            onDismiss={() => setVisibleLg(false)}
            onClick={resetForm}
          >
            <CModalHeader
              onDismiss={() => setVisibleLg(false)}
              onClick={resetForm}
              className="tutorviewmodalheader"
            >
              <CModalTitle>Add Text Book</CModalTitle>
            </CModalHeader>
            <CModalBody>
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

                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.InputLabelShown
                      label="Book Image *"
                      name="image_name"
                      type="file"
                      value={values.image_name}
                      onChange={handleInputChange}
                      error={errors.image_name}
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
                      {values.external_link = ""}
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
            </CModalBody>
          </CModal>

          <div className="row textbook-search-menu-row-css mt-2 mb-3">
            <div className="col-1 col-sm-1"></div>
            <div className="row col-10 col-sm-10 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center">
              <div className="textbook-search-mobile-view-css col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <CFormSelect
                  aria-label="Default select example"
                  className="textbook-search-menu-css"
                  name="syllabus_id"
                  onChange={(value) => onDropDownValueChange(value)}
                >
                  <option value="" disabled selected>
                    Select Syllabus
                  </option>
                  {DropDown.syllabusList.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}
                </CFormSelect>
              </div>
              <div className="textbook-search-mobile-view-css col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <CFormSelect
                  aria-label="Default select example"
                  className="textbook-search-menu-css"
                  name="class_id"
                  onChange={(value) => onDropDownValueChange(value)}
                >
                  <option value="" disabled selected>
                    Select Class
                  </option>
                  {DropDown.classList.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}
                </CFormSelect>
              </div>
              <div className="textbook-search-mobile-view-css col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <CFormSelect
                  aria-label="Default select example"
                  className="textbook-search-menu-css"
                  name="subject_id"
                  onChange={(value) => onDropDownValueChange(value)}
                >
                  <option value="" disabled selected>
                    Select Subject
                  </option>
                  {DropDown.subjectList.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}
                </CFormSelect>
              </div>
              <div className="textbook-search-mobile-view-css col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <CFormInput
                  type="text"
                  name="BookName"
                  id="BookName"
                  placeholder="Enter Book Name"
                  className="textbook-search-menu-css"

                  onChange={(value) => handleOnInputChange(value)}
                />
              </div>
              <div className="textbook-search-mobile-view-css col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center">
                <CButton
                  className="textbook-add-button-css"
                  onClick={() => handleFilterSubmit()}
                >
                  Go
                </CButton>
              </div>
            </div>
            <div className="col-1 col-sm-1"></div>
          </div>
        </CCard>
      </div>
    </>
  );
};
export default TextBook;
