import React, { useEffect, useState } from "react";
import {
  CCard,
  CRow,
  CButton,
  CCol,
  CFormSelect,
  CFormInput,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { getUserRole } from "../../utility/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  addQuestion,
  getAllFilteredQuestionsList,
} from "./QuestionAnswersAction";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import {
  classListData,
  getSchoolUsersSubjectList,
  subjectListData,
  syllabusListData,
} from "../../redux/actions/dropdowns/index";
import QuestionAnswers from "./QuestionAnswers";
import Swal from "sweetalert2";
import CustomAlertControl from "../AlertMessage";
import { checkAccessPermission } from "src/utility/utils";

const TopFilter = () => {

  const dispatch = useDispatch();
  const DropDown = useSelector((state) => state.dropdowns);
  const [questionsearch, setQuestionSearch] = useState("");
  const [syllabusId, setSyllabusId] = useState("");
  const [classId, setClasssId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [visibleLg, setVisibleLg] = useState(false);

  useEffect(() => {
    if (
      getUserRole() === "school-tutor" ||
      getUserRole() === "school-student"
    ) {
      dispatch(getSchoolUsersSubjectList());
    } else {
      dispatch(syllabusListData());
    }
  }, []);

  var initialFValues = null;
  var validate = null;
  if (getUserRole() === "school-student" || getUserRole() === "school-tutor") {
    // schhol side initial Values for add
    initialFValues = {
      subject_id: "",
      topic_name: "",
      question: "",
    };

    // validation code start
    validate = (fieldValues = values) => {
      let temp = { ...errors };

      if ("subject_id" in fieldValues)
        temp.subject_id = fieldValues.subject_id
          ? ""
          : "Please select subject.";

      if ("topic_name" in fieldValues)
        temp.topic_name = fieldValues.topic_name ? "" : "Please enter topic's.";

      if ("question" in fieldValues)
        temp.question = fieldValues.question
          ? ""
          : "Pleasse add your question.";

      setErrors({
        ...temp,
      });
      if (fieldValues == values)
        return Object.values(temp).every((x) => x == "");
    };
  } else {
    initialFValues = {
      syllabus_id: "",
      syllabus_other: "",
      class_id: "",
      class_other: "",
      subject_id: "",
      subject_other: "",
      topic_name: "",
      question: "",
    };

    // validation code start
    validate = (fieldValues = values) => {
      let temp = { ...errors };

      if (values.syllabus_id == "other") {
        if ("syllabus_other" in fieldValues)
          temp.syllabus_other = fieldValues.syllabus_other
            ? ""
            : "Please enter Other Syllabus.";
      }

      if (values.class_id == "other") {
        if ("class_other" in fieldValues)
          temp.class_other = fieldValues.class_other
            ? ""
            : "Please enter Other Class.";
      }

      if (values.subject_id == "other") {
        if ("subject_other" in fieldValues)
          temp.subject_other = fieldValues.subject_other
            ? ""
            : "Please enter Other Subject.";
      }

      if ("syllabus_id" in fieldValues)
        temp.syllabus_id = fieldValues.syllabus_id
          ? ""
          : "Please select syllabus.";

      if ("class_id" in fieldValues)
        temp.class_id = fieldValues.class_id ? "" : "Please select class.";

      if ("subject_id" in fieldValues)
        temp.subject_id = fieldValues.subject_id
          ? ""
          : "Please select subject.";

      if ("topic_name" in fieldValues)
        temp.topic_name = fieldValues.topic_name ? "" : "Please enter topic's.";

      if ("question" in fieldValues)
        temp.question = fieldValues.question
          ? ""
          : "Pleasse add your question.";

      setErrors({
        ...temp,
      });
      if (fieldValues == values)
        return Object.values(temp).every((x) => x == "");
    };
  }

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {

      let data = new FormData();
      "subject_id,syllabus_id,class_id ,topic_id,question"
      data.append("syllabus_id", values.syllabus_id);
      data.append("subject_id", values.subject_id);
      data.append("class_id", values.class_id);

      if (values.syllabus_id == 'other') {
        data.append("syllabus_other", values.syllabus_other);
      }

      if (values.subject_id == 'other') {
        data.append("subject_other", values.subject_other);
      }

      if (values.class_id == 'other') {
        data.append("class_other", values.class_other);
      }

      data.append("topic_id", values.topic_id);
      data.append("question", values.question);

      dispatch(addQuestion(values));
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

  const handleFilterSubmit = async () => {
    await dispatch(
      getAllFilteredQuestionsList({
        syllabus_id: syllabusId,
        class_id: classId,
        subject_id: subjectId,
      })
    );
  };

  const QuestionSearchData = (e) => {
    setQuestionSearch(e.target.value)
  }

  return (
    <>
      <CustomAlertControl />
      <div className="tutorheader page-header-size">
        <CCard className="post-header-css ">
          <div className="postheader">
            <div className="mt-3">
              <div className="d-flex m-auto justify-content-center col-12">
                <p className="postsearchheader">
                  Ask a Question
                  {checkAccessPermission("question_and_answers_add") ? (
                    <CButton
                      className="d-inline textbook-add-button-css"
                      onClick={() => setVisibleLg(!visibleLg)}
                    >
                      Add
                    </CButton>
                  ) : null}
                </p>
              </div>
            </div>
            <div className="row mt-1 mb-1 ">
              <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
              <div className="search text-center col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                <CFormInput
                  onChange={(event) => QuestionSearchData(event)}
                  className="searchinput rounded-pill pr-5"
                  placeholder="Search for the Question"
                ></CFormInput>
                <CButton className="searchbutton rounded-pill">
                  {" "}
                  <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                </CButton>
              </div>
              <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
            </div>
            {getUserRole() === "school-tutor" ||
              getUserRole() === "school-student" ? (
              <div className="row textbook-search-menu-row-css mt-2 mb-3 d-flex justify-content-center">

                <div className="textbook-search-mobile-view-css col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">
                  <CFormSelect
                    aria-label="Default select example"
                    className="textbook-search-menu-css"
                    name="subject_id"
                    onChange={(value) => onDropDownValueChange(value)}
                  >
                    <option value="" disabled selected>
                      select Subject
                    </option>
                    {DropDown.schoolUsesSubjectListForDD.map((e) => {
                      return <option value={e.id}>{e.name}</option>;
                    })}
                  </CFormSelect>
                </div>
                <div className="textbook-search-mobile-view-css col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center justify-content-center">
                  <CButton
                    className="mt-1 textbook-add-button-css "
                    onClick={() => handleFilterSubmit()}
                  >
                    Go
                  </CButton>
                </div>
              </div>
            ) : (
              <div className="row textbook-search-menu-row-css mt-2 mb-3 d-flex justify-content-center">
                <div className="textbook-search-mobile-view-css col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">
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
                <div className="textbook-search-mobile-view-css col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">
                  <CFormSelect
                    aria-label="Default select example"
                    className="textbook-search-menu-css"
                    name="class_id"
                    onChange={(value) => onDropDownValueChange(value)}
                  >
                    <option value="" disabled selected>
                      select Class
                    </option>
                    {DropDown.classList.map((e) => {
                      return <option value={e.id}>{e.name}</option>;
                    })}
                  </CFormSelect>
                </div>
                <div className="textbook-search-mobile-view-css col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">
                  <CFormSelect
                    aria-label="Default select example"
                    className="textbook-search-menu-css"
                    name="subject_id"
                    onChange={(value) => onDropDownValueChange(value)}
                  >
                    <option value="" disabled selected>
                      select Subject
                    </option>
                    {DropDown.subjectList.map((e) => {
                      return <option value={e.id}>{e.name}</option>;
                    })}
                  </CFormSelect>
                </div>
                <div className="textbook-search-mobile-view-css col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center justify-content-center">
                  <CButton
                    className="mt-1 textbook-add-button-css "
                    onClick={() => handleFilterSubmit()}
                  >
                    Go
                  </CButton>
                </div>
              </div>
            )}
          </div>
        </CCard>
      </div>
      <QuestionAnswers searchData={questionsearch} />

      {/* add question modal   */}

      <CModal
        size="lg"
        visible={visibleLg}
        onDismiss={() => setVisibleLg(false)}
      >
        <CModalHeader
          className="tutorviewmodalheader"
          onDismiss={() => setVisibleLg(false)}
        >
          <CModalTitle>Add Question</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {getUserRole() === "school-student" ||
            getUserRole() === "school-tutor" ? (
            <>
              <Form onSubmit={handleSubmit}>
                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Select
                      name="subject_id"
                      label="Subject *"
                      value={values.subject_id}
                      onChange={handleInputChange}
                      options={DropDown.schoolUsesSubjectListForDD}
                      error={errors.subject_id}
                    />
                  </CCol>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Input
                      name="topic_name"
                      label="Topic's *"
                      value={values.topic_name}
                      onChange={handleInputChange}
                      error={errors.topic_name}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={12} md={12} lg={12} xl={12}>
                    <Controls.CustomTextArea
                      label="Question *"
                      rows={5}
                      name="question"
                      value={values.question}
                      onChange={handleInputChange}
                      error={errors.question}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
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
            </>
          ) : (
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
                      errors.syllabus_other = ""
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
                      errors.class_other = ""
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
                      errors.subject_other = ""
                    )}
                  </CCol>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Input
                      name="topic_name"
                      label="Topic's *"
                      value={values.topic_name}
                      onChange={handleInputChange}
                      error={errors.topic_name}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={12} md={12} lg={12} xl={12}>
                    <Controls.CustomTextArea
                      label="Question *"
                      rows={5}
                      name="question"
                      value={values.question}
                      onChange={handleInputChange}
                      error={errors.question}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
                    <div className="d-inline">
                      <Controls.Button
                        type="submit"
                        text="Submit"
                        className="m-1"
                      />
                    </div>
                    <div className="d-inline ">
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
          )}
        </CModalBody>
      </CModal>
    </>
  );
};
export default TopFilter;
