import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormInput,
  CRow,
  CCol,
  CCard,
  CButton,
} from "@coreui/react";
import {
  syllabusListData,
} from "../../redux/actions/dropdowns/index";
import { getAllMyCourseList, storeMyCourse } from './MyCourseActions'
import { getAllTeachingMode } from "../../utility/utils";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import MyCourseContainer from './MyCourseContainer'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import Swal from 'sweetalert2'

// items for teaching mode radio button
const teachingTypeItems = [
  { id: "individual", title: "Individual" },
  { id: "group", title: "Group" },
];

const TopFilterCouse = () => {

  const dispatch = useDispatch()
  const [myCourseContainerID, setMyCourseContainerID] = useState('')
  const [subscribedBtn, setSubscribedBtn] = useState(false)
  const DropDown = useSelector((state) => state.dropdowns);
  const [visibleLg, setVisibleLg] = useState(false);
  const [searchcourse, setSearchCourse] = useState('');

  const setContainerId = (e) => {
    setMyCourseContainerID(e.target.id)
  }

  const allCourseClickedSetCOntainerID = (e) => {
    setMyCourseContainerID(e.target.id)
    setSubscribedBtn(false)
  }

  const setContainerIdSubscribed = (e) => {
    setMyCourseContainerID(e.target.id)
    setSubscribedBtn(true)
  }

  const validationSchema = yup.object({
    title: yup
      .string('Enter your course title')
      .required('course title is required'),
    type: yup
      .string('Select your type')
      .required('type is required'),
    syllabus_id: yup
      .string('Select your syllabus')
      .required('syllabus is required'),
    class_id: yup
      .string('Select your class')
      .required('class is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      type: 'individual',
      syllabus_id: '',
      class_id:'',
      last_name: '',
      phone: '',
      aadhar_id: '',
      email: '',
      nationality: 'Indian',
      date_of_birth: new Date(),
      address: '',
      // state: selectedState,
      // city: selectedCity,
      education: []
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // validation code start
  // const validate = (fieldValues = values) => {
  //   let temp = { ...errors };

  //   if ("title" in fieldValues)
  //     temp.title = fieldValues.title ? "" : "Please enter title.";

  //   if ("syllabus_id" in fieldValues)
  //     temp.syllabus_id = fieldValues.syllabus_id
  //       ? ""
  //       : "Please select syllabus.";

  //   if ("class_id" in fieldValues)
  //     temp.class_id = fieldValues.class_id ? "" : "Please select class.";

  //   if ("subject_id" in fieldValues)
  //     temp.subject_id = fieldValues.subject_id ? "" : "Please select subject.";

  //   if ("mode_of_teaching" in fieldValues)
  //     temp.mode_of_teaching = fieldValues.mode_of_teaching ? "" : "Please select mode of teaching.";

  //   if ("cost" in fieldValues)
  //     temp.cost = fieldValues.cost ? "" : "Please enter cost.";

  //   if ("topic" in fieldValues)
  //     temp.topic = fieldValues.topic ? "" : "Please enter topic's.";

  //   if ("description" in fieldValues)
  //     temp.description = fieldValues.description
  //       ? ""
  //       : "Pleasse add your description.";



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     dispatch(storeMyCourse(values));
  //     resetForm();
  //     setVisibleLg(false)
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Your Course has been added',
  //       showConfirmButton: false,
  //       timer: 4000
  //     })
  //   }
  // };

  useEffect(() => {
    dispatch(syllabusListData());

  }, []);
  return (
    <>
      <div>
        <CCard className="course-card-list-css">
          <CRow className="course-header">
            <CCol sm={12} md={12} lg={12} xl={12}>
              <CRow className="textbook-title-row-css d-flex">
                <div className="text-center col-12">
                  <div className="postsearchheader">
                    My Course
                    <CButton
                      className="d-inline textbook-add-button-css"
                      style={{ marginBottom: 8 }}
                      onClick={() => setVisibleLg(!visibleLg)}
                    >
                      Add
                    </CButton>
                  </div>
                </div>
              </CRow>
              <CRow className="mt-2">
                <CCol sm={1} md={3} lg={3} xl={3}></CCol>
                <CCol
                  className="d-flex position-relative text-center"
                  sm={10}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <CFormInput
                    className="searchinput rounded-pill pr-5"
                    onChange={(event) => setSearchCourse(event.target.value)}
                    placeholder="Enter subject,Title,Description etc."
                  ></CFormInput>
                  <CButton className="searchbutton position-absolute rounded-pill">
                    {" "}
                    <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                  </CButton>
                </CCol>
                <CCol sm={1} md={3} lg={3} xl={3}></CCol>
              </CRow>
              <CRow className="mt-2 mb-3 ">
                <CCol sm={1} md={1} lg={2} xl={2}></CCol>
                <CCol className="text-center" sm={10} md={8} lg={12} xl={12}>
                  <CButton className="groupbutton m-1" shape="rounded-pill" onClick={allCourseClickedSetCOntainerID} id='All'>
                    All Course
                  </CButton>
                  {
                    !subscribedBtn ? <CButton className="groupbutton m-1" shape="rounded-pill" onClick={setContainerIdSubscribed} id='Completed'>
                      Subscribed Course
                    </CButton> : ""
                  }

                  {
                    subscribedBtn ? <><CButton className="groupbutton m-1" shape="rounded-pill" onClick={setContainerId} id='Completed'>
                      Completed Course
                    </CButton>
                      <CButton className="groupbutton m-1" shape="rounded-pill" onClick={setContainerId} id='Uncompleted'>
                        Uncompleted Course
                      </CButton></> : ""
                  }

                </CCol>
                <CCol sm={1} md={2} lg={2} xl={2}></CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCard>
        <CModal size="lg" visible={visibleLg} onDismiss={() => setVisibleLg(false)}>
          <CModalHeader>
            <CModalTitle>Add Course</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <form onSubmit={formik.handleSubmit}>
              <CRow>
                <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                  <TextField
                    variant="outlined"
                    id="title"
                    name="title"
                    label="Title*"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </CCol>
                <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                  <FormControl>
                    <FormLabel>Type</FormLabel>
                    <MuiRadioGroup row
                      name='type'
                      id="type"
                      value={formik.values.type}
                      onChange={formik.handleChange}>
                      {
                        teachingTypeItems.map(
                            item => (
                                <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                            )
                        )
                      }
                    </MuiRadioGroup>
                  </FormControl>
                </CCol>
              </CRow>

              <CRow>
                <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">

                  <Controls.Select
                    name="syllabus_id"
                    label="Syllabus"
                    value={formik.syllabus_id}
                    onChange={formik.handleChange}
                    options={DropDown.syllabusList}
                    error={formik.touched.syllabus_id && Boolean(formik.errors.syllabus_id)}
                    // helperText={formik.touched.syllabus_id && formik.errors.syllabus_id}
                  />

                  {formik.errors.syllabus_id &&
                  formik.touched.syllabus_id &&
                  <helperText className="dropdown-input-feedback-error-message">
                    {formik.touched.syllabus_id && formik.errors.syllabus_id}
                  </helperText>}

                  {
                    formik.syllabus_id === 'other' ?
                      <Controls.Input
                        name="syllabus_other"
                        label="Other Syllabus"
                        value={formik.syllabus_other}
                        onChange={formik.handleChange}
                        error={formik.touched.syllabus_other && Boolean(formik.errors.syllabus_other)}
                        helperText={formik.touched.syllabus_other && formik.errors.syllabus_other}
                      />
                      :
                      ""
                  }

                </CCol>
                <CCol sm={6} md={6} lg={6} xl={6} className="mt-3">
                  <Controls.Select
                    name="class_id"
                    label="Class"
                    value={formik.class_id}
                    onChange={formik.handleChange}
                    options={DropDown.classList}
                    error={formik.touched.class_id && Boolean(formik.errors.class_id)}
                    helperText={formik.touched.class_id && formik.errors.class_id}
                  />

                  {formik.errors.class_id &&
                  formik.touched.class_id &&
                  <helperText className="dropdown-input-feedback-error-message">
                    {formik.touched.class_id && formik.errors.class_id}
                  </helperText>}

                  {
                    formik.class_id === 'other' ?
                      <Controls.Input
                        name="class_other"
                        label="Other Class"
                        value={formik.class_other}
                        onChange={formik.handleChange}
                        error={formik.touched.class_other && Boolean(formik.errors.class_other)}
                        helperText={formik.touched.class_other && formik.errors.class_other}
                      />
                      :
                      ""
                  }
                </CCol>
              </CRow>

              <CRow>
              <CCol sm={6} md={6} lg={6} xl={6} className="m-2">
                <div className="p-2 d-inline">
                  <Controls.Button type="submit" text="Submit" />
                </div>
                {/* <div className="p-2 d-inline">
                  <Controls.Button
                    text="Reset"
                    color="default"
                  />
                </div> */}
              </CCol>
            </CRow>
            </form>
          </CModalBody>
        </CModal>
        <MyCourseContainer Data={myCourseContainerID} Search={searchcourse} />
      </div>
    </>
  )
}
export default TopFilterCouse
