import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CModal, CModalBody, CModalHeader, CModalTitle, CButton, CForm, CCardText } from "@coreui/react";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import TopFilterAssignment from "./TopFilterAssignment";
import {
  syllabusListData,
  classListData,
  subjectListData,
  questionTypeData,
  questionSectionData,
} from "../../redux/actions/dropdowns/index";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  FormControl,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  InputLabel,
  InputAdornment
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CustomAlertControl from "../AlertMessage";
import { TextField, Select } from "formik-material-ui";
import Controls from "src/components/formControls/controls/Controls";
import { addAssignment, filterQuestionList } from "./AssignmentAction";


const AddAssignment = () => {

  const [viewVisible, setviewVisible] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const assignmentState = useSelector((state) => state.Assignment);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [syllabusID, setSyllabusID] = useState('');
  const [classID, setClassID] = useState('');
  const [subjectID, setSubjectID] = useState('');
  const [typeID, setTypeID] = useState('');
  const [addQuestion, setAddQuestion] = useState([]);
  const [question, setQuestion] = useState([]);
  const [marks, setMarks] = useState();
  const [assignmentImage, setAssignmentImage] = useState("");
  const [assignmentImageName, setAssignmentImageName] = useState("");
  const DropDown = useSelector((state) => state.dropdowns);
  const Assignment = useSelector((state) => state.Assignment);
  const emptysection = { id: "", section_description: "" };

  const emptyQuestionMarks = { Marks: '' };

  // initial value for Create new Assignment
  const initialValues = {
    syllabus_id: '',
    class_id: '',
    subject_id: '',
    section_id: '',
    type_id: '',
    title: '',
    description: '',
    Addsections: [emptysection],
    addQuestion: [emptyQuestionMarks],
  }

  function handleImage(event) {
    setAssignmentImageName(event.currentTarget.files[0].name)
    setAssignmentImage(event.currentTarget.files[0])
  }

  // Check the validation for syllabus class and subject
  const handleLink = () => {
    if (syllabusID && classID && subjectID !== "") {
      setviewVisible(!viewVisible);
    } else {
      Swal.fire({
        title: "warning",
        text: "First Select syllabus, class, subject to add section",
        icon: "warning",
        cancelButtonColor: "#d33",
        cancelButtonText: "OK",
      })
    }
  }

  let validationSchema = ""
  // validation Scheme For Create new Assignment
  if (addQuestion.length === 0) {
    validationSchema = yup.object({
      syllabus_id: yup
        .string()
        .required("Please select syllabus"),
      class_id: yup
        .string()
        .required("Please select class"),
      subject_id: yup
        .string()
        .required("Please select subject"),
      description: yup
        .string()
        .required("Description is required"),
      title: yup
        .string()
        .required("Title is required"),

      Addsections: yup
        .array().of(
          yup.object().shape({
            id: yup.string().required("required"),
            section_description: yup.string().required("required"),
          })
        ),

      addQuestion: yup
        .array().of(
          yup.object().shape({
            Marks: yup.string().required("required"),
          })
        ),

    });
  }
  else {
    validationSchema = yup.object({
      syllabus_id: yup
        .string()
        .required("Please select syllabus"),
      class_id: yup
        .string()
        .required("Please select class"),
      subject_id: yup
        .string()
        .required("Please select subject"),
      description: yup
        .string()
        .required("Description is required"),
      title: yup
        .string()
        .required("Title is required"),

      Addsections: yup
        .array().of(
          yup.object().shape({
            id: yup.string().required("required"),
            section_description: yup.string().required("required"),
          })
        ),

      addQuestion: yup
        .array().of(
          yup.object().shape({
            Marks: yup.string().required("required"),
          })
        ),
    });
  }


  useEffect(async () => {
    showLoader();
    await dispatch(syllabusListData());
    await dispatch(questionTypeData());
    await dispatch(questionSectionData());
    setLoading(false);
    hideLoader();
  }, []);

  // onchange selection class syllabus and subject dropdown
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
      dispatch(filterQuestionList({ syllabus_id: syllabusID, class_id: classID, subject_id: subjectID, type_id: e.target.value }));
    } else {
      initialValues.subject_id = e.target.value;
      setSubjectID(e.target.value);
    }
  };

  // set selected Qestion Data in array 
  const questionArray = (item) => {

    if (addQuestion.includes(item)) {
      setAddQuestion(addQuestion.filter((question) => question.id !== item.id))
    } else {
      setAddQuestion([...addQuestion, item])
      setQuestion([...question, item.id])
    }
  }

  // Add Section in create assignment
  const addSection = () => {
    if (addQuestion.length === 0) {
      setviewVisible(true);
    } else {
      setviewVisible(false);
    }
  }

  // Set Initaial values
  const clearValues = () => {
    setSyllabusID("")
    setClassID("")
    setSubjectID("")
    setTypeID("")
    setQuestion([])
    setAddQuestion([])
    setAssignmentImage("")
  }

  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : (
        <div>
          <TopFilterAssignment />
          <CustomAlertControl />
          {/* Assignment Add  */}

          <div className="mt-3 pl-3 pr-3">

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}

              onSubmit={async (values) => {
                console.log(addQuestion.length)

                const SectionID = []
                values.Addsections.map(item => {
                  SectionID.push(item.id)
                })
                values.sections = SectionID;

                const SectionDescription = []
                values.Addsections.map(item => {
                  SectionDescription.push(item.section_description)
                })
                values.section_description = SectionDescription;
                values.section_type = [typeID];
                values.questions = [question];
                // values.image = assignmentImage;

                const data = values.addQuestion
                let result = data.map(i => Number(i.Marks));
                const totalMarks = result.reduce((a, v) => a = a + v, 0)

                values.section_mark = [totalMarks]
                values.total_mark = totalMarks
                values.question_mark = [result]

                values.syllabus_id = syllabusID
                values.class_id = classID
                values.subject_id = subjectID
                values.section_type = [typeID]


                dispatch(addAssignment(values))

                assignmentState.assignmentStatus === "sucess" ?
                  <>
                    {clearValues()}
                    {values.title = ""}
                    {values.description = ""}
                    {values.Addsections = [emptysection]}
                    {values.addQuestion = [emptyQuestionMarks]}
                    {history.push('/assignment')}
                  </>
                  :
                  ""


              }}
            >


              {({ values, errors, isSubmitting, isValid }) => (
                <div className="mb-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <Form>
                    <div className="row">
                      <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <FormControl variant="outlined">
                          <InputLabel>Syllabus</InputLabel>
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
                          <InputLabel>Class</InputLabel>
                          <Field
                            component={Select}
                            name="class_id"
                            label="Class *"
                            variant="outlined"
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
                          <InputLabel>Subject</InputLabel>
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

                      {/* <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <FormControl variant="outlined">
                          <Field
                            component={TextField}
                            variant="outlined"
                            name="image"
                            label="Image"
                            type="file"
                            onChange={(event)=>{handleImage(event)}}
                            onChange={(event) => {
                              setAssignmentImage(event.currentTarget.files[0]);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                </InputAdornment>
                              )
                            }}
                          />
                        </FormControl>
                      </div> */}
                      <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <FormControl variant="outlined">
                          <Field
                            component={TextField}
                            variant="outlined"
                            name="title"
                            label="Title *"
                          />
                        </FormControl>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <FormControl variant="outlined">
                          <Field
                            component={TextField}
                            variant="outlined"
                            name="description"
                            label="Description *"
                          />
                        </FormControl>
                      </div>
                    </div>

                    {/* section accordion  */}

                    <div className="mt-3">
                      <div className="">
                        <FieldArray name="Addsections">
                          {/* {({ push, remove }) => ( */}
                          <React.Fragment>
                            {values.Addsections.map((_, index) => (
                              <div className="col-12" key={index}>
                                <Accordion
                                  className="assignment-card-accordion"
                                  style={{ borderRadius: "15px" }}
                                >
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ padding: "0px 16px", display: "flex" }}
                                  >
                                    <div className="row col-12 ">
                                      <Typography className="fw-bold assignment-link col-12 col-sm-12 col-md-2 col-lg-2 col-xl-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start align-items-center mr-3">
                                        <div className="fw-bold assignment-question-section-font">
                                          Section
                                        </div>
                                      </Typography>
                                      <Typography className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-2  justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start align-items-center">
                                        <div className="">
                                          <FormControl variant="outlined">
                                            <InputLabel>Section</InputLabel>
                                            <Field
                                              component={Select}
                                              name={`Addsections.${index}.id`}
                                              label="Section *"

                                            >
                                              <MenuItem value="">None</MenuItem>
                                              {DropDown.questionSectionList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                  {item.name}
                                                </MenuItem>
                                              ))}
                                            </Field>
                                          </FormControl>
                                        </div>
                                      </Typography>
                                      <Typography className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start align-items-center">
                                        <div className="col-12 col-xl-12 m-1">
                                          <Field
                                            fullWidth
                                            name={`Addsections.${index}.section_description`}
                                            component={TextField}
                                            label="Description *"
                                            variant="outlined"
                                            size="small"
                                          />
                                        </div>
                                      </Typography>
                                      <Typography className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-5 d-flex d-flex justify-content-center justify-content-sm-center justify-content-md-end justify-content-lg-end justify-content-xl-end align-items-center">
                                        <div className="assignment-normal-font">
                                          {" "}
                                          {/* Total Marks: 03{" "} */}
                                        </div>
                                      </Typography>

                                      <Typography>
                                        <div className="row">
                                          <div className="col-12 assignment-link p-2">
                                            <a
                                              className="assignment-page-like assignment-cursor-pointer"
                                              onClick={() => handleLink()}
                                            >
                                              Click here to Select Questions from Question bank
                                            </a>
                                          </div>
                                        </div>
                                      </Typography>
                                    </div>
                                  </AccordionSummary>
                                  <hr className="m-0 assignment-line-accordion"></hr>
                                  <AccordionDetails className="">
                                    <div>
                                      {addQuestion.length !== 0 ? (
                                        <div>
                                          {addQuestion.map((item, key) => (
                                            <div className="row">
                                              {item.type.tag === "q_a" ? (
                                                <div className="row">
                                                  <div className="col-10">
                                                    <div className="p-3 mb-3 mt-3 assignment-card-accordion">
                                                      <div className="assignment-link">{key + 1}) {item.question}</div>
                                                    </div>
                                                  </div>
                                                  <div className="col-2">
                                                    <div className="p-3 mb-3 mt-3">
                                                      <Field
                                                        name={`addQuestion.${key}.Marks`}
                                                        component={TextField}
                                                        label="Marks *"
                                                        variant="outlined"
                                                        size="small"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : item.type.tag === "blanks" ? (
                                                <div className="row">
                                                  <div className="col-10">
                                                    <div className="p-3 mb-2 mt-2 assignment-card-accordion">
                                                      <div className="assignment-link">{key + 1}) {item.question}</div>
                                                    </div>
                                                  </div>
                                                  <div className="col-2 mb-3 mt-3">
                                                    <div>
                                                      <Field
                                                        name={`addQuestion.${key}.Marks`}
                                                        component={TextField}
                                                        label="Marks *"
                                                        variant="outlined"
                                                        size="small"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : item.type.tag === "mcq" ? (
                                                <div className="row">
                                                  <div className="col-10">
                                                    <div className="p-3 mb-2 mt-2 assignment-card-accordion">
                                                      <div className="assignment-link">{key + 1}) {item.question}</div>
                                                      {item.options.map((mcq) => (
                                                        <div className="assignment-link">
                                                          {mcq.name}
                                                        </div>
                                                      ))}
                                                    </div>
                                                  </div>
                                                  <div className="col-2 mb-3 mt-3">
                                                    <div>
                                                      <Field
                                                        name={`addQuestion.${key}.Marks`}
                                                        component={TextField}
                                                        label="Marks *"
                                                        variant="outlined"
                                                        size="small"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : ("")}
                                            </div>
                                          ))}
                                        </div>
                                      ) : ("")}
                                    </div>

                                  </AccordionDetails>
                                </Accordion>

                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-1 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
                                    <div className="m-2 ">
                                      {values.Addsections.length - 1 === index && (
                                        <CButton
                                          text="Add Section"
                                          className="rounded-pill"
                                          style={{ padding: "8px 44px", backgroundColor: "#4540BA", color: "#FFFFFF" }}
                                          onClick={() => push(emptysection)}
                                        >Add Section
                                        </CButton>
                                      )}

                                    </div>
                                    <div className="m-2 ">
                                      {values.Addsections.length !== 1 && (
                                        <CButton
                                          text="Remove Section"
                                          className="rounded-pill morequestonsremove"
                                          style={{ padding: "8px 44px", color: "#FFFFFF" }}
                                          onClick={() => remove(index)}
                                        >Remove Section</CButton>
                                      )}
                                    </div>
                                  </div> */}

                              </div>
                            ))}
                          </React.Fragment>
                          {/* )} */}
                        </FieldArray>
                      </div>
                    </div>
                    {addQuestion.length === 0 ? (
                      <div>
                        <p className="text-danger ml-3">please select at least one question From Question Bank.</p>
                      </div>
                    ) : ("")}
                    <div className="row mb-3">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-12  d-flex justify-content-center justify-content-sm-center justify-content-md-end justify-content-lg-end justify-content-xl-end">
                        <div className="p-2 d-inline">
                          <Controls.Button
                            type="submit"
                            text="Add Question to Paper"
                            className="rounded-pill"
                            style={{ padding: "8px 44px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                  </Form>
                </div >
              )}
            </Formik >
          </div>

          {/* Add Question Paper in section modal */}

          <CModal
            visible={viewVisible}
            size="lg"
            onDismiss={() => setviewVisible(false)}
          >
            <CModalHeader
              onDismiss={() => setviewVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle>Add Question to Paper</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div>
                <Formik
                  initialValues={initialValues}
                >
                  {({ values, errors, isSubmitting, isValid }) => (
                    <Form>
                      <div className="mb-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="row">
                          <div className="mt-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <FormControl variant="outlined">
                              <InputLabel>Type</InputLabel>
                              <Field
                                component={Select}
                                name="type_id"
                                label="Type"
                                value={typeID}
                                variant="outlined"
                                onChange={(e) => onChangeSelectInputs(e)}
                              >
                                <MenuItem value="">None</MenuItem>
                                {DropDown.questionTypeList.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.title}
                                  </MenuItem>
                                ))}
                              </Field>
                            </FormControl>
                          </div>
                        </div>

                        {/* selected type wise question select and add in Assignment section*/}

                        {typeID === "" ? (
                          <div className="m-5">
                            <CCardText className="text-center">Please Select Question Type...</CCardText>
                          </div>
                        ) : (
                          <div>
                            {Assignment.filterQuestionData.length === 0 ? (
                              <div>
                                <div className="m-5">
                                  <CCardText className="text-center">Question Data is not available</CCardText>
                                </div>
                              </div>
                            ) : (
                              <div>
                                {Assignment.filterQuestionData.map((item, key) => (
                                  <div>
                                    {item.type.tag === "q_a" ? (
                                      <div className="friendcard p-3 mb-3 mt-3 assignment-card-accordion">
                                        <div className="row">
                                          <div className="col-10 assignment-link">{key + 1}) {item.question}</div>
                                          <div className="col-2 ">
                                            <input type="checkbox" className="question-add-checkbox-css float-end" onClick={() => questionArray(item)} />
                                          </div>
                                        </div>
                                        <hr className="assignment-line-accordion "></hr>
                                        <div className="row assignment-normal-font ">
                                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            {item.answer.answer}
                                          </div>
                                        </div>
                                      </div>
                                    ) : item.type.tag === "blanks" ? (
                                      <div className="friendcard p-3 mb-3 mt-3 assignment-card-accordion">
                                        <div className="row">
                                          <div className="col-10 assignment-link">{key + 1}) {item.question}</div>
                                          <div className="col-2 ">
                                            <input type="checkbox" className="question-add-checkbox-css float-end" onClick={() => questionArray(item)} />
                                          </div>
                                        </div>
                                        <hr className="assignment-line-accordion "></hr>
                                        <div className="row assignment-normal-font ">
                                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            {item.answer.answer}
                                          </div>
                                        </div>
                                      </div>
                                    ) : item.type.tag === "mcq" ? (
                                      <div className="friendcard p-3 mb-3 mt-3 assignment-card-accordion">
                                        <div className="row">
                                          <div className="col-10 assignment-link">{key + 1}) {item.question}</div>
                                          <div className="col-2 ">
                                            <input type="checkbox" className="question-add-checkbox-css float-end" onClick={() => questionArray(item)} />
                                          </div>
                                        </div>
                                        <hr className="assignment-line-accordion "></hr>
                                        <div className="row assignment-normal-font ">
                                          {item.options.map((mcq) => (
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                              {mcq.name}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ) : ("")}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Add Question to section save code */}

                        <>
                          {typeID !== "" && Assignment.filterQuestionData.length !== 0 ? (
                            <div className="row mb-2 mt-2">
                              {addQuestion.length === 0 ? (
                                <div>
                                  <p className="text-danger ml-3">please select at least one question</p>
                                </div>
                              ) : ("")}
                              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-Start">
                                <div className="p-2 d-inline">
                                  <Controls.Button
                                    onClick={() => addSection()}
                                    text="Add Question to Section"
                                    className="rounded-pill button-color-rounded-pill"
                                    style={{ padding: "8px 44px" }}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : ("")}</>

                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </CModalBody>
          </CModal>
        </div >
      )
      }
    </>
  );
};
export default AddAssignment;
