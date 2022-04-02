import {
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
  CCard,
  CRow,
  CCol,
  CButton,
  CFormInput,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListPostAndSearchJob from "./ListPostAndSearchJob";
import { storePostAndSearchJob } from "./PostSearchActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { checkAccessPermission, getAllTeachingMode } from "../../utility/utils";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { syllabusListData } from "../../redux/actions/dropdowns/index";
import moment from "moment";

const TopFilterHeader = () => {

  // items for teaching mode radio button
  const teachingTypeItems = [
    { id: "individual", title: "Individual" },
    { id: "group", title: "Group" },
  ];
  const dispatch = useDispatch();
  const DropDown = useSelector((state) => state.dropdowns);
  const [visibleLg, setVisibleLg] = useState(false);
  const [postsearch, setPostSearch] = useState("");

  useEffect(() => {
    dispatch(syllabusListData());
  }, []);

  const initialFValues = {
    syllabus_id: "",
    class_id: "",
    subject_id: "",
    mode: "",
    start_time: new Date(),
    end_time: new Date(),
    type: "individual",
    topic: "",
    requirements: "",
    syllabus_other: "",
    subject_other: "",
    class_other: "",
  };

  // validation code start
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (values.syllabus_id === "other") {
      if ("syllabus_other" in fieldValues)
        temp.syllabus_other = fieldValues.syllabus_other
          ? ""
          : "Please Enter Other Syllabus.";
    }
    if (values.class_id === "other") {
      if ("class_other" in fieldValues)
        temp.class_other = fieldValues.class_other
          ? ""
          : "Please Enter Other Class.";
    }
    if (values.subject_id === "other") {
      if ("subject_other" in fieldValues)
        temp.subject_other = fieldValues.subject_other
          ? ""
          : "Please Enter Other syllabus.";
    }
    if ("syllabus_id" in fieldValues)
      temp.syllabus_id = fieldValues.syllabus_id
        ? ""
        : "Please select syllabus.";

    if ("class_id" in fieldValues)
      temp.class_id = fieldValues.class_id ? "" : "Please select class.";

    if ("subject_id" in fieldValues)
      temp.subject_id = fieldValues.subject_id ? "" : "Please select subject.";

    if ("mode" in fieldValues)
      temp.mode = fieldValues.mode ? "" : "Please select teaching mode.";

    if ("type" in fieldValues)
      temp.type = fieldValues.type ? "" : "Please select type.";

    if ("topic" in fieldValues)
      temp.topic = fieldValues.topic ? "" : "Please enter topic's.";

    if ("start_time" in fieldValues)
      temp.start_time = fieldValues.start_time
        ? ""
        : "Please enter start time.";

    if ("end_time" in fieldValues)
      temp.end_time = fieldValues.end_time ? "" : "Please enter end time.";

    if ("requirements" in fieldValues)
      if (fieldValues.requirements === "") {
        temp.requirements = "Please add your requirements.";
      } else if (fieldValues.requirements.length > 500) {
        temp.requirements = "You can not enter characters more then 500";
      } else {
        temp.requirements = "";
      }

    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let data = new FormData();
      data.append("syllabus_id", values.syllabus_id);
      if (values.syllabus_id === "other") {
        data.append("other_syllabus", values.syllabus_other)
      }

      if (values.class_id === "other") {
        data.append("other_class", values.class_other)
      }

      if (values.subject_id === "other") {
        data.append("other_subject", values.subject_other)
      }

      data.append("class_id", values.class_id);
      data.append("subject_id", values.subject_id);
      data.append("mode", values.mode);
      data.append("topic", values.topic);
      data.append("type", values.type);
      data.append("requirements", values.requirements);
      data.append("start_time", moment(values.start_time).format("hh:mm A"));
      data.append("end_time", moment(values.end_time).format("hh:mm A"));

      dispatch(storePostAndSearchJob(data));
      resetForm();

      setVisibleLg(false);
    }
  };

  const PostSearchData = (e) => {
    setPostSearch(e.target.value)
  }

  const AddPostAndJobSearch = () => {
    setVisibleLg(true)
  }

  return (
    <>
      <div className="mt-3">
        <CCard className="post-header-css">
          <div className="PostHeader">
            <div className="textbook-title-row-css d-flex">
              <div className="text-center mt-3 col-12">
                <div className="page-header-size">
                  Post & Search Job
                  {checkAccessPermission("Post_and_search_job_add") ? (
                    <CButton
                      className="d-inline textbook-add-button-css"
                      style={{ marginBottom: 8 }}
                      onClick={() => AddPostAndJobSearch(!visibleLg)}
                    >
                      Add
                    </CButton>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row mt-1 mb-3">
              <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
              <div className="searchcourse col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                <CFormInput
                  onChange={(event) => PostSearchData(event)}
                  className="searchinput rounded-pill"
                  placeholder="Search A Job"
                />
                <CButton className="searchbutton rounded-pill">
                  <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                </CButton>
              </div>
              <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
            </div>
          </div>
        </CCard>

        <ListPostAndSearchJob searchData={postsearch} />

        {/* Add Post and Job Search Modal */}
        <CModal
          size="lg"
          visible={visibleLg}
          onDismiss={() => setVisibleLg(false)}
        >
          <CModalHeader
            className="tutorviewmodalheader"
            onDismiss={() => setVisibleLg(false)}
          >
            <CModalTitle>Add Post</CModalTitle>
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
                </CCol>
                {values.syllabus_id === "other" ?
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Input
                      name="syllabus_other"
                      label="Other Syllabus *"
                      value={values.syllabus_other}
                      onChange={handleInputChange}
                      error={errors.syllabus_other}
                    />
                  </CCol>
                  :
                  errors.syllabus_other = ""
                }
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
                </CCol>
                {values.class_id === "other" ?
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Input
                      name="class_other"
                      label="Other Class *"
                      value={values.class_other}
                      onChange={handleInputChange}
                      error={errors.class_other}
                    />
                  </CCol>
                  :
                  errors.class_other = ""
                }
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
                </CCol>
                {values.subject_id === "other" ?
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Input
                      name="subject_other"
                      label="Other Subject *"
                      value={values.subject_other}
                      onChange={handleInputChange}
                      error={errors.subject_other}
                    />
                  </CCol>
                  :
                  errors.subject_other = ""
                }
                <CCol sm={6} md={6} lg={6} xl={6}>
                  <Controls.Select
                    name="mode"
                    label="Mode of teaching *"
                    value={values.mode}
                    onChange={handleInputChange}
                    options={getAllTeachingMode()}
                    error={errors.mode}
                  />
                </CCol>
              </CRow>

              <CRow>
                <CCol sm={6} md={6} lg={6} xl={6}>
                  <Controls.RadioGroup
                    name="type"
                    label="Teaching Type *"
                    value={values.type}
                    onChange={handleInputChange}
                    items={teachingTypeItems}
                    error={errors.type}
                  />
                </CCol>
                <CCol sm={6} md={6} lg={6} xl={6}>
                  <Controls.Input
                    name="topic"
                    label="Topic *"
                    value={values.topic}
                    onChange={handleInputChange}
                    error={errors.topic}
                  />
                </CCol>
              </CRow>

              <CRow>
                <CCol sm={6} md={6} lg={6} xl={6}>
                  <Controls.TimePicker
                    name="start_time"
                    label="Start Time *"
                    value={values.start_time}
                    onChange={handleInputChange}
                  />
                </CCol>

                <CCol sm={6} md={6} lg={6} xl={6}>
                  <Controls.TimePicker
                    name="end_time"
                    label="End Time *"
                    value={values.end_time}
                    minTime={values.start_time}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow>
                <CCol sm={12} md={12} lg={12} xl={12}>
                  <Controls.CustomTextArea
                    label="Requirements *"
                    rows={5}
                    name="requirements"
                    value={values.requirements}
                    onChange={handleInputChange}
                    error={errors.requirements}
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
      </div>
    </>
  );
};
export default TopFilterHeader;
