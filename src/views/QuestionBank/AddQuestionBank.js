import React, { useEffect, useState } from "react";
import TopFilterQuestionBank from "./TopFilterQuestionBank";
import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, FieldArray } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { TextField, Select } from "formik-material-ui";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import Controls from "src/components/formControls/controls/Controls";
import { FormControl, MenuItem, InputLabel } from "@material-ui/core";
import CustomAlertControl from "../AlertMessage";
import {
  syllabusListData,
  classListData,
  subjectListData,
  questionTypeData,
} from "../../redux/actions/dropdowns/index";
import { questionAdd } from "./QuestionBankAction";

const AddQuestionBank = () => {
  
  const dispatch = useDispatch();
  const DropDown = useSelector((state) => state.dropdowns);

  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const [syllabusID, setSyllabusID] = useState("");
  const [classID, setClassID] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [typeID, setTypeID] = useState("");
  const [option, setOption] = useState([]);

  const emptycomprehension = { question: "", answer: "" };

  const emptyQuestion = { question: "", answer: "" };

  const emptyFollowingQuestion = { question: "", answer: "" };

  const emptyBlankQuestion = { question: "", answer: "" };

  const emptyOption = { Option: "" };

  const emptycheckboxOption = { Option: "" };

  const initialValues = {
    syllabus_id: "",
    class_id: "",
    subject_id: "",
    type_id: "",
    comprehensionquestions: "",
    comprehensionMultiple: [emptycomprehension],
    questions: "",
    QuestionMultiple: [emptyQuestion],
    blanksquestions: "",
    filltheblankMultiple: [emptyBlankQuestion],
    followingquestions: "",
    QuestionFollowing: [emptyFollowingQuestion],
    matchoptions: "",
    mcqquestions: "",
    OptionMultiple: [emptyOption],
    checkboxquestions: "",
    checkboxOptionMultiple: [emptycheckboxOption],
  };

  const clearValues = () => {
    setSyllabusID("");
    setClassID("");
    setSubjectID("");
    setTypeID("");
    setOption("");
  };

  let validationSchemaForQuestion = null;

  if (typeID === "mcq") {
    validationSchemaForQuestion = yup.object({

      syllabus_id: yup
        .string()
        .required("Please select syllabus."),
      class_id: yup
        .string()
        .required("Please select class."),
      subject_id: yup
        .string()
        .required("Please select subject."),
      type_id: yup
        .string()
        .required("Please select question type."),

      mcqquestions: yup.string().required("Questions is required."),

      OptionMultiple: yup.array().of(
        yup.object().shape({
          Option: yup.string().required("Option is required"),
        })
      ),
    });
  } else if (typeID === "mcq_checkbox") {
    validationSchemaForQuestion = yup.object({

      syllabus_id: yup
        .string()
        .required("Please select syllabus."),
      class_id: yup
        .string()
        .required("Please select class."),
      subject_id: yup
        .string()
        .required("Please select subject."),
      type_id: yup
        .string()
        .required("Please select question type."),

      checkboxquestions: yup.string().required("Questions is required."),

      checkboxOptionMultiple: yup.array().of(
        yup.object().shape({
          Option: yup.string().required("Option is required"),
        })
      ),
    });
  } else if (typeID === "comprehension") {
    validationSchemaForQuestion = yup.object({

      syllabus_id: yup
        .string()
        .required("Please select syllabus."),
      class_id: yup
        .string()
        .required("Please select class."),
      subject_id: yup
        .string()
        .required("Please select subject."),
      type_id: yup
        .string()
        .required("Please select question type."),

      comprehensionquestions: yup.string().required("Questions is required."),

      comprehensionMultiple: yup.array().of(
        yup.object().shape({
          question: yup.string().required("Question is required"),
          answer: yup.string().required("Answer is required"),
        })
      ),
    });
  } else if (typeID === "match_following") {
    validationSchemaForQuestion = yup.object({

      syllabus_id: yup
        .string()
        .required("Please select syllabus."),
      class_id: yup
        .string()
        .required("Please select class."),
      subject_id: yup
        .string()
        .required("Please select subject."),
      type_id: yup
        .string()
        .required("Please select question type."),
        
      followingquestions: yup.string().required("Questions is required."),

      QuestionFollowing: yup.array().of(
        yup.object().shape({
          question: yup.string().required("Question is required"),
          answer: yup.string().required("Answer is required"),
        })
      ),
    });
  } else if (typeID === "q_a") {
    validationSchemaForQuestion = yup.object({

      syllabus_id: yup
        .string()
        .required("Please select syllabus."),
      class_id: yup
        .string()
        .required("Please select class."),
      subject_id: yup
        .string()
        .required("Please select subject."),
      type_id: yup
        .string()
        .required("Please select question type."),

      QuestionMultiple: yup.array().of(
        yup.object().shape({
          question: yup.string().required("Question is required"),
          answer: yup.string().required("Answer is required"),
        })
      ),
    });
  } else if (typeID === "blanks") {
    validationSchemaForQuestion = yup.object({

      syllabus_id: yup
        .string()
        .required("Please select syllabus."),
      class_id: yup
        .string()
        .required("Please select class."),
      subject_id: yup
        .string()
        .required("Please select subject."),
      type_id: yup
        .string()
        .required("Please select question type."),

      filltheblankMultiple: yup.array().of(
        yup.object().shape({
          question: yup.string().required("Question is required"),
          answer: yup.string().required("Answer is required"),
        })
      ),
    });
  } else {
    validationSchemaForQuestion = yup.object({

      syllabus_id: yup
        .string()
        .required("Please select syllabus."),
      class_id: yup
        .string()
        .required("Please select class."),
      subject_id: yup
        .string()
        .required("Please select subject."),
      type_id: yup
        .string()
        .required("Please select question type."),

    });
  }

  useEffect(async () => {
    showLoader();
    await dispatch(syllabusListData());
    await dispatch(questionTypeData());
  }, []);

  const onChangeSelectInputs = (e) => {
    if (e.target.name === "syllabus_id") {
      initialValues.syllabus_id = e.target.value;
      setSyllabusID(e.target.value);
      dispatch(classListData({ syllabus_id: e.target.value }));
    } else if (e.target.name === "class_id") {
      initialValues.class_id = e.target.value;
      setClassID(e.target.value);
      dispatch(subjectListData({ class_id: e.target.value }));
    } else if (e.target.name === "type_id") {
      initialValues.type_id = e.target.value;
      setTypeID(e.target.value);
    } else {
      initialValues.subject_id = e.target.value;
      setSubjectID(e.target.value);
    }
  };

  return (
    <>
      <div>
        <TopFilterQuestionBank />
        <CustomAlertControl />
        <div className="mt-3 pl-3 pr-3">
          <div className="row">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchemaForQuestion}
              onSubmit={async (values) => {
                // comprehension Question answer array

                const comprehensionquestionArray = [];
                {
                  values.comprehensionMultiple.map(function (item) {
                    comprehensionquestionArray.push(item.question);
                  });
                }
                const comprehensionanswerArray = [];
                {
                  values.comprehensionMultiple.map(function (item) {
                    comprehensionanswerArray.push(item.answer);
                  });
                }

                // Question answer array

                const questionArray = [];
                {
                  values.QuestionMultiple.map(function (item) {
                    questionArray.push(item.question);
                  });
                }
                const answerArray = [];
                {
                  values.QuestionMultiple.map(function (item) {
                    answerArray.push(item.answer);
                  });
                }

                // match the following Question answer array

                const followingquestionArray = [];
                {
                  values.QuestionFollowing.map(function (item) {
                    followingquestionArray.push(item.question);
                  });
                }
                const followinganswerArray = [];
                {
                  values.QuestionFollowing.map(function (item) {
                    followinganswerArray.push(item.answer);
                  });
                }

                // mcq array

                const optionArray = [];
                {
                  values.OptionMultiple.map(function (item) {
                    optionArray.push(item.Option);
                  });
                }

                // Fill the blanks Question answer array

                const blanksquestionArray = [];
                {
                  values.filltheblankMultiple.map(function (item) {
                    blanksquestionArray.push(item.question);
                  });
                }
                const blanksswerArray = [];
                {
                  values.filltheblankMultiple.map(function (item) {
                    blanksswerArray.push(item.answer);
                  });
                }

                values.syllabus_id = syllabusID;
                values.class_id = classID;
                values.subject_id = subjectID;
                values.type = typeID;

                if (typeID == "comprehension") {
                  values.comprehensive_questions = comprehensionquestionArray;
                  values.comprehensive_answers = comprehensionanswerArray;
                  values.questions = [values.comprehensionquestions];
                } else if (typeID == "q_a") {
                  values.questions = questionArray;
                  values.answers = answerArray;
                } else if (typeID == "mcq") {
                  values.options = [optionArray];
                  values.answers = [optionArray[option]];
                  values.questions = [values.mcqquestions];
                } else if (typeID == "blanks") {
                  values.questions = blanksquestionArray;
                  values.answers = blanksswerArray;
                  // values.questions = [values.blanksquestions];
                } else if (typeID == "match_following") {
                  values.matchoptions_left = followingquestionArray;
                  values.matchoptions_right = followinganswerArray;
                  values.questions = [values.followingquestions];
                }

                dispatch(questionAdd(values));
                values.questions = "";
                values.mcqquestions = "";
                values.comprehensionMultiple = [emptycomprehension];
                values.QuestionMultiple = [emptyQuestion];
                values.OptionMultiple = [emptyOption];

                values.followingquestions = [emptyFollowingQuestion];
                values.filltheblankMultiple = [emptyBlankQuestion];
                clearValues();
              }}
            >
              {({ values, errors, isSubmitting, isValid }) => (
                <div className="mb-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <Form>
                    <div className="row">
                      <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <FormControl variant="outlined">
                          {/* <InputLabel>Syllabus</InputLabel> */}
                          <Field
                            component={Select}
                            name="syllabus_id"
                            label="Syllabus *"
                            variant="outlined"
                            value={syllabusID}
                            onChange={(e) => onChangeSelectInputs(e)}
                          >
                            <MenuItem value="">None</MenuItem>
                            {DropDown.syllabusList.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </div>
                      <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <FormControl variant="outlined">
                          {/* <InputLabel>Class</InputLabel> */}
                          <Field
                            component={Select}
                            name="class_id"
                            label="Class *"
                            value={classID}
                            onChange={(e) => onChangeSelectInputs(e)}
                          >
                            <MenuItem value="">None</MenuItem>
                            {DropDown.classList.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </div>
                    </div>
                    <div className="row">
                      <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <FormControl variant="outlined">
                          {/* <InputLabel>Subject</InputLabel> */}
                          <Field
                            component={Select}
                            name="subject_id"
                            label="Subject *"
                            value={subjectID}
                            onChange={(e) => onChangeSelectInputs(e)}
                          >
                            <MenuItem value="">None</MenuItem>
                            {DropDown.subjectList.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </div>
                      <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <FormControl variant="outlined">
                          {/* <InputLabel>Type</InputLabel> */}
                          <Field
                            component={Select}
                            name="type_id"
                            label="Type *"
                            value={typeID}
                            onChange={(e) => onChangeSelectInputs(e)}
                          >
                            <MenuItem value="">None</MenuItem>
                            {DropDown.questionTypeList.map((item) => (
                              <MenuItem key={item.id} value={item.tag}>
                                {item.title}
                              </MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </div>
                    </div>
                    <hr className="dashed" />
                    {typeID === "comprehension" ? (
                      <div>
                        <h6 className="fw-bold ">Comprehension Question</h6>
                        <div className="row">
                          <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <FormControl variant="outlined">
                              <Field
                                multiline
                                variant="outlined"
                                component={TextField}
                                name="comprehensionquestions"
                                id="comprehensionquestions"
                                label="Question *"
                                rows="3"
                              />
                            </FormControl>
                          </div>
                        </div>

                        <div className="mt-3 mb-3">
                          <div className="">
                            <FieldArray name="comprehensionMultiple">
                              {({ push, remove }) => (
                                <React.Fragment>
                                  {values.comprehensionMultiple.map(
                                    (_, index) => (
                                      <div
                                        className="row assignment-card-accordion mt-2"
                                        key={index}
                                      >
                                        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                                          <div className="row mt-2">
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                              <Field
                                                fullWidth
                                                name={`comprehensionMultiple.${index}.question`}
                                                component={TextField}
                                                label="Question *"
                                                variant="outlined"
                                              />
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                              <Field
                                                fullWidth
                                                name={`comprehensionMultiple[${index}].answer`}
                                                component={TextField}
                                                label="Answer *"
                                                variant="outlined"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center ">
                                          <div className="row">
                                            {values.comprehensionMultiple
                                              .length -
                                              1 ===
                                              index && (
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                  <CButton
                                                    disabled={isSubmitting}
                                                    onClick={() =>
                                                      push(emptycomprehension)
                                                    }
                                                    className="morequestons m-1"
                                                    value="Add"
                                                  >
                                                    <FontAwesomeIcon
                                                      value="Add"
                                                      icon={faPlus}
                                                      className="fa-sm "
                                                    />
                                                  </CButton>
                                                </div>
                                              )}

                                            {values.comprehensionMultiple
                                              .length !== 1 && (
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                  <CButton
                                                    disabled={
                                                      values.comprehensionMultiple
                                                        .length === 1
                                                    }
                                                    // disabled={isSubmitting}
                                                    onClick={() => remove(index)}
                                                    className="morequestonsremove m-1"
                                                    value="Remove"
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faMinus}
                                                      className="fa-sm "
                                                    />
                                                  </CButton>
                                                </div>
                                              )}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </React.Fragment>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      </div>
                    ) : typeID === "q_a" ? (
                      <div>
                        <h6 className="fw-bold ">Question Answer</h6>

                        <div className="mt-3 mb-3">
                          <div className="">
                            <FieldArray name="QuestionMultiple">
                              {({ push, remove }) => (
                                <React.Fragment>
                                  {values.QuestionMultiple.map((_, index) => (
                                    <div
                                      className="row assignment-card-accordion mt-2"
                                      key={index}
                                    >
                                      <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                                        <div className="row mt-2">
                                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                            <Field
                                              fullWidth
                                              name={`QuestionMultiple.${index}.question`}
                                              component={TextField}
                                              label="Question *"
                                              variant="outlined"
                                            />
                                          </div>
                                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                            <Field
                                              fullWidth
                                              name={`QuestionMultiple[${index}].answer`}
                                              component={TextField}
                                              label="Answer *"
                                              variant="outlined"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center ">
                                        <div className="row">
                                          {values.QuestionMultiple.length -
                                            1 ===
                                            index && (
                                              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                <CButton
                                                  disabled={isSubmitting}
                                                  onClick={() =>
                                                    push(emptyQuestion)
                                                  }
                                                  className="morequestons m-1"
                                                  value="Add"
                                                >
                                                  <FontAwesomeIcon
                                                    value="Add"
                                                    icon={faPlus}
                                                    className="fa-sm "
                                                  />
                                                </CButton>
                                              </div>
                                            )}

                                          {values.QuestionMultiple.length !==
                                            1 && (
                                              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                <CButton
                                                  disabled={
                                                    values.QuestionMultiple
                                                      .length === 1
                                                  }
                                                  // disabled={isSubmitting}
                                                  onClick={() => remove(index)}
                                                  className="morequestonsremove m-1"
                                                  value="Remove"
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faMinus}
                                                    className="fa-sm "
                                                  />
                                                </CButton>
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </React.Fragment>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      </div>
                    ) : typeID === "mcq" ? (
                      <div>
                        <h6 className="fw-bold ">MCQ</h6>
                        <div className="row">
                          <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <FormControl variant="outlined">
                              <Field
                                multiline
                                component={TextField}
                                name="mcqquestions"
                                id="mcqquestions"
                                label="Question *"
                              />
                            </FormControl>
                          </div>
                        </div>

                        <div className="mt-3 mb-3">
                          <div className="">
                            <FieldArray name="OptionMultiple">
                              {({ push, remove }) => (
                                <React.Fragment>
                                  {values.OptionMultiple.map((_, index) => (
                                    <div
                                      className="row assignment-card-accordion mt-2"
                                      key={index}
                                    >
                                      <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                                        <div className="row mt-2">
                                          <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 mb-1 d-flex align-items-center">
                                            <input
                                              className="mcq-select-css"
                                              type="radio"
                                              value={index}
                                              onChange={(e) =>
                                                setOption(e.target.value)
                                              }
                                              name="option"
                                            />
                                          </div>
                                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                            <Field
                                              fullWidth
                                              name={`OptionMultiple.${index}.Option`}
                                              component={TextField}
                                              label="Option *"
                                              variant="outlined"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center ">
                                        <div className="row">
                                          {values.OptionMultiple.length - 1 ===
                                            index && (
                                              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                <CButton
                                                  disabled={isSubmitting}
                                                  onClick={() =>
                                                    push(emptyOption)
                                                  }
                                                  className="morequestons m-1"
                                                  value="Add"
                                                >
                                                  <FontAwesomeIcon
                                                    value="Add"
                                                    icon={faPlus}
                                                    className="fa-sm "
                                                  />
                                                </CButton>
                                              </div>
                                            )}

                                          {values.OptionMultiple.length !==
                                            1 && (
                                              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                <CButton
                                                  disabled={
                                                    values.OptionMultiple
                                                      .length === 1
                                                  }
                                                  // disabled={isSubmitting}
                                                  onClick={() => remove(index)}
                                                  className="morequestonsremove m-1"
                                                  value="Remove"
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faMinus}
                                                    className="fa-sm "
                                                  />
                                                </CButton>
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </React.Fragment>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      </div>
                    ) : typeID === "blanks" ? (
                      <div>
                        <h6 className="fw-bold ">Fill the blanks</h6>

                        <div className="mt-3 mb-3">
                          <div className="">
                            <FieldArray name="filltheblankMultiple">
                              {({ push, remove }) => (
                                <React.Fragment>
                                  {values.filltheblankMultiple.map(
                                    (_, index) => (
                                      <div
                                        className="row assignment-card-accordion mt-2"
                                        key={index}
                                      >
                                        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                                          <div className="row mt-2">
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                              <Field
                                                fullWidth
                                                name={`filltheblankMultiple.${index}.question`}
                                                component={TextField}
                                                label="Question *"
                                                variant="outlined"
                                              />
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                              <Field
                                                fullWidth
                                                name={`filltheblankMultiple[${index}].answer`}
                                                component={TextField}
                                                label="Answer *"
                                                variant="outlined"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center ">
                                          <div className="row">
                                            {values.filltheblankMultiple
                                              .length -
                                              1 ===
                                              index && (
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                  <CButton
                                                    disabled={isSubmitting}
                                                    onClick={() =>
                                                      push(emptyBlankQuestion)
                                                    }
                                                    className="morequestons m-1"
                                                    value="Add"
                                                  >
                                                    <FontAwesomeIcon
                                                      value="Add"
                                                      icon={faPlus}
                                                      className="fa-sm "
                                                    />
                                                  </CButton>
                                                </div>
                                              )}

                                            {values.filltheblankMultiple
                                              .length !== 1 && (
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                  <CButton
                                                    disabled={
                                                      values.filltheblankMultiple
                                                        .length === 1
                                                    }
                                                    onClick={() => remove(index)}
                                                    className="morequestonsremove m-1"
                                                    value="Remove"
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faMinus}
                                                      className="fa-sm "
                                                    />
                                                  </CButton>
                                                </div>
                                              )}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </React.Fragment>
                              )}
                            </FieldArray>
                          </div>
                          <p className="text-danger mt-3 ml-3">
                            {" "}
                            {`Please put this {blank} in instead of blank`}
                          </p>
                        </div>
                      </div>
                    ) : typeID === "match_following" ? (
                      <div>
                        <h6 className="fw-bold ">Match the Following</h6>
                        <div className="row">
                          <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <FormControl variant="outlined">
                              <Field
                                multiline
                                component={TextField}
                                name="followingquestions"
                                id="followingquestions"
                                label="Question *"
                              />
                            </FormControl>
                          </div>
                        </div>
                        <div className="mt-3 mb-3">
                          <div className="">
                            <FieldArray name="QuestionFollowing">
                              {({ push, remove }) => (
                                <React.Fragment>
                                  {values.QuestionFollowing.map((_, index) => (
                                    <div
                                      className="row assignment-card-accordion mt-2"
                                      key={index}
                                    >
                                      <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                                        <div className="row mt-2">
                                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                            <Field
                                              fullWidth
                                              name={`QuestionFollowing.${index}.question`}
                                              component={TextField}
                                              label="Question *"
                                              variant="outlined"
                                            />
                                          </div>
                                          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                            <Field
                                              fullWidth
                                              name={`QuestionFollowing[${index}].answer`}
                                              component={TextField}
                                              label="Answer *"
                                              variant="outlined"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center ">
                                        <div className="row">
                                          {values.QuestionFollowing.length -
                                            1 ===
                                            index && (
                                              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                <CButton
                                                  disabled={isSubmitting}
                                                  onClick={() =>
                                                    push(emptyFollowingQuestion)
                                                  }
                                                  className="morequestons m-1"
                                                  value="Add"
                                                >
                                                  <FontAwesomeIcon
                                                    value="Add"
                                                    icon={faPlus}
                                                    className="fa-sm "
                                                  />
                                                </CButton>
                                              </div>
                                            )}

                                          {values.QuestionFollowing.length !==
                                            1 && (
                                              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                <CButton
                                                  disabled={
                                                    values.QuestionFollowing
                                                      .length === 1
                                                  }
                                                  // disabled={isSubmitting}
                                                  onClick={() => remove(index)}
                                                  className="morequestonsremove m-1"
                                                  value="Remove"
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faMinus}
                                                    className="fa-sm "
                                                  />
                                                </CButton>
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </React.Fragment>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      </div>
                    ) : typeID === "mcq_checkbox" ? (
                      <div>
                        <h6 className="fw-bold ">Multiple Choice</h6>
                        <div className="row">
                          <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <FormControl variant="outlined">
                              <Field
                                multiline
                                component={TextField}
                                name="checkboxquestions"
                                id="checkboxquestions"
                                label="Question *"
                              />
                            </FormControl>
                          </div>
                        </div>

                        <div className="mt-3 mb-3">
                          <div className="">
                            <FieldArray name="checkboxOptionMultiple">
                              {({ push, remove }) => (
                                <React.Fragment>
                                  {values.checkboxOptionMultiple.map(
                                    (_, index) => (
                                      <div
                                        className="row assignment-card-accordion mt-2"
                                        key={index}
                                      >
                                        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                                          <div className="row mt-2">
                                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 mb-1 d-flex align-items-center">
                                              <input
                                                className="mcq-select-css"
                                                type="checkbox"
                                                value={index}
                                                onChange={(e) =>
                                                  setOption(e.target.value)
                                                }
                                                name="option"
                                              />
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                              <Field
                                                fullWidth
                                                name={`checkboxOptionMultiple.${index}.Option`}
                                                component={TextField}
                                                label="Option *"
                                                variant="outlined"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center ">
                                          <div className="row">
                                            {values.checkboxOptionMultiple
                                              .length -
                                              1 ===
                                              index && (
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                  <CButton
                                                    disabled={isSubmitting}
                                                    onClick={() =>
                                                      push(emptycheckboxOption)
                                                    }
                                                    className="morequestons m-1"
                                                    value="Add"
                                                  >
                                                    <FontAwesomeIcon
                                                      value="Add"
                                                      icon={faPlus}
                                                      className="fa-sm "
                                                    />
                                                  </CButton>
                                                </div>
                                              )}

                                            {values.checkboxOptionMultiple
                                              .length !== 1 && (
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                  <CButton
                                                    disabled={
                                                      values
                                                        .checkboxOptionMultiple
                                                        .length === 1
                                                    }
                                                    onClick={() => remove(index)}
                                                    className="morequestonsremove m-1"
                                                    value="Remove"
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faMinus}
                                                      className="fa-sm "
                                                    />
                                                  </CButton>
                                                </div>
                                              )}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </React.Fragment>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="p-2 d-inline ">
                          <Controls.Button
                            type="submit"
                            text="Add To Question"
                            className="m-1"
                          />
                        </div>
                        <div className="p-2 d-inline">
                          <Controls.Button
                            text="Reset"
                            color="default"
                            className="m-1"
                            onClick={() => clearValues()}
                          />
                        </div>
                      </div>
                    </div>
                    <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddQuestionBank;
