import React, { useState, useEffect, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
  libraryListData,
  syllabusListData,
} from "../../redux/actions/dropdowns/index";
import { storeMyCourse } from "./MyCourseActions";
import {
  checkAccessPermission,
  currencySymbole,
  getAllTeachingMode,
} from "../../utility/utils";
import { useSelector, useDispatch } from "react-redux";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import MyCourseContainer from "./MyCourseContainer";
import moment from "moment";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import CustomAlertControl from "../AlertMessage";

// items for teaching mode radio button
const teachingTypeItems = [
  { id: "individual", title: "Individual" },
  { id: "group", title: "Group" },
];

// items for course type radio button
const courseTypeItem = [
  { id: "Live", title: "Live" },
  { id: "Recorded", title: "Recorded" },
];

const TopFilterCouse = () => {
  const dispatch = useDispatch();
  const [myCourseContainerID, setMyCourseContainerID] = useState("All");
  const store = useSelector((state) => state.myCourse);
  const [courseListLength, setcourseListLength] = useState();
  const [subscribedBtn, setSubscribedBtn] = useState(false);
  const DropDown = useSelector((state) => state.dropdowns);
  const [visibleLg, setVisibleLg] = useState(false);
  const [searchcourse, setSearchCourse] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const setContainerId = (e) => {
    setMyCourseContainerID(e.target.id);
  };

  const allCourseClickedSetCOntainerID = (e) => {
    setMyCourseContainerID(e.target.id);
    setSubscribedBtn(false);
  };

  const setContainerIdSubscribed = (e) => {
    setMyCourseContainerID(e.target.id);
    setSubscribedBtn(true);
  };

  const initialFValues = {
    title: "",
    syllabus_id: "",
    class_id: "",
    class_other: "",
    subject_id: "",
    subject_other: "",
    mode_of_teaching: "",
    start_date: new Date(),
    end_date: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    cost: "0",
    type: "individual",
    course_type: "Live",
    sample_images_name: "",
    syllabus_other: "",
    sample_images: "",
    logo: "",
    logo_name: "",
    demo_video: "",
    demo_video_name: "",
    course_video: "",
    course_video_name: "",
    description: "",
    number_of_videos: "1",
    number_of_assignments: "1",
    course_topics: "",
    number_of_people_attending: "1",
    library_id: "",
  };



  // validation code start
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : "Please enter title.";

    if ("syllabus_id" in fieldValues)
      temp.syllabus_id = fieldValues.syllabus_id
        ? ""
        : "Please select syllabus.";

    if ("class_id" in fieldValues)
      temp.class_id = fieldValues.class_id ? "" : "Please select class.";

    if ("subject_id" in fieldValues)
      temp.subject_id = fieldValues.subject_id ? "" : "Please select subject.";

    if ("mode_of_teaching" in fieldValues)
      temp.mode_of_teaching = fieldValues.mode_of_teaching
        ? ""
        : "Please select mode of teaching.";

    if ("cost" in fieldValues) {
      if (fieldValues.cost < 0) {
        temp.cost = "Cost should be greater then 0";
      } else if (fieldValues.cost === "") {
        temp.cost = "Please enter cost.";
      } else {
        temp.cost = "";
      }
    }

    if ("number_of_videos" in fieldValues) {
      if (fieldValues.number_of_videos < 0) {
        temp.number_of_videos = "Number of videos should be greater then 0";
      } else if (fieldValues.number_of_videos === "") {
        temp.number_of_videos = "Please enter number of videos.";
      } else {
        temp.number_of_videos = "";
      }
    }

    if ("number_of_assignments" in fieldValues) {
      if (fieldValues.number_of_assignments < 0) {
        temp.number_of_assignments =
          "Number of assignments should be greater then 0";
      } else if (fieldValues.number_of_assignments === "") {
        temp.number_of_assignments = "Please enter number of assignments.";
      } else {
        temp.number_of_assignments = "";
      }
    }

    if ("number_of_people_attending" in fieldValues) {
      if (fieldValues.number_of_people_attending < 0) {
        temp.number_of_people_attending =
          "Number of people attending course should be greater then 0";
      } else if (fieldValues.number_of_people_attending === "") {
        temp.number_of_people_attending =
          "Please enter number of people attending course.";
      } else {
        temp.number_of_people_attending = "";
      }
    }
    if ("sample_images_name" in fieldValues) {
      var imagePath = fieldValues.sample_images_name;
      var logo = ['jpeg', 'png', 'jpg']
      var extension = imagePath.substring(
        imagePath.lastIndexOf(".") + 1,
        imagePath.length
      );
      if (fieldValues.sample_images_name) {
        if (logo.includes(extension)) {
          temp.sample_images_name = "";
        } else {
          temp.sample_images_name = "Only Jpg, png and jpg  file is allowed.";
        }
      } else {
        temp.sample_images_name = "";
      }
    }

    if ("logo_name" in fieldValues) {
      var imagePath = fieldValues.logo_name;
      var logo = ['jpeg', 'png', 'jpg']
      var extension = imagePath.substring(
        imagePath.lastIndexOf(".") + 1,
        imagePath.length
      );
      if (fieldValues.logo_name) {
        if (logo.includes(extension)) {
          temp.logo_name = "";
        } else {
          temp.logo_name = "Only Jpg, png and jpg  file is allowed.";
        }
      } else {
        temp.logo_name = "Please Upload Course Logo.";
      }
    }

    if ("demo_video_name" in fieldValues) {
      var imagePath = fieldValues.demo_video_name;
      var logo = ['mp4', 'mov', 'wmv', 'mkv', 'avi']
      var extension = imagePath.substring(
        imagePath.lastIndexOf(".") + 1,
        imagePath.length
      );
      if (fieldValues.demo_video_name) {
        if (logo.includes(extension)) {

          temp.demo_video_name = "";
        } else {

          temp.demo_video_name = "Only mp4, mov, wmv, mkv and avi  file is allowed.";
        }
      } else {
        temp.demo_video_name = "";
      }
    }


    if ("course_type" in fieldValues) {
      if (fieldValues.course_type === "Recorded") {
        if ("course_video_name" in fieldValues) {
          var imagePath = fieldValues.course_video_name;
          var logo = ['mp4', 'mov', 'wmv', 'mkv', 'avi']
          var extension = imagePath.substring(
            imagePath.lastIndexOf(".") + 1,
            imagePath.length
          );
          if (fieldValues.course_video_name) {
            if (logo.includes(extension)) {

              temp.course_video_name = "";
            } else {

              temp.course_video_name = "Only mp4, mov, wmv, mkv and avi  file is allowed.";
            }
          } else {
            temp.course_video_name = "";
          }
        }
      }
    }

    if ("course_topics" in fieldValues)
      temp.course_topics = fieldValues.course_topics
        ? ""
        : "Please enter course topics.";

    if ("description" in fieldValues)
      if (fieldValues.description === "")
        temp.description = "Please Add Your Description.";
      else if (fieldValues.description.length > 500)
        temp.description = "Please enter only 500 Characters.";
      else temp.description = "";

    if (values.syllabus_id === "other") {
      if ("syllabus_other" in fieldValues)
        temp.syllabus_other = fieldValues.syllabus_other
          ? ""
          : "Please enter other Syllabus.";
    }
    if (values.class_id === "other") {
      if ("class_other" in fieldValues)
        temp.class_other = fieldValues.class_other
          ? ""
          : "Please enter other Class.";
    }
    if (values.subject_id === "other") {
      if ("subject_other" in fieldValues)
        temp.subject_other = fieldValues.subject_other
          ? ""
          : "Please enter other Subject.";
    }

    setErrors({
      ...temp,
    });
    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values)
    // console.log(errors)
    if (validate()) {
      setLoading(true);
      delete values.demo_video_name;
      delete values.sample_images_name;
      delete values.logo_name;
      delete values.course_video_name;

      let data = new FormData();
      data.append("title", values.title);
      data.append("mode_of_teaching", values.mode_of_teaching);
      data.append("start_date", moment(values.start_date).format("YYYY-MM-DD"));
      data.append(
        "end_date",
        values.end_date && moment(values.end_date).format("YYYY-MM-DD")
      );

      if (values.syllabus_id === "other") {
        data.append("other_syllabus", values.syllabus_other)
      }
      else {
        data.append("syllabus_id", values.syllabus_id);
      }

      if (values.subject_id === "other") {
        data.append("other_subject", values.subject_other)
      }
      else {
        data.append("subject_id", values.subject_id);
      }

      if (values.class_id === "other") {
        data.append("other_class", values.class_other)
      }
      else {
        data.append("class_id", values.class_id);
      }

      data.append("start_time", moment(values.start_time).format("hh:mm A"));
      data.append("end_time", moment(values.end_time).format("hh:mm A"));

      data.append("cost", values.cost);
      data.append("type", values.type);

      data.append("sample_images", values.sample_images);
      data.append("logo", values.logo);
      data.append("demo_video", values.demo_video);
      if (values.course_type === "course_type") {

        data.append("course_video", values.course_video);
      }

      data.append("number_of_videos", values.number_of_videos);
      data.append("number_of_assignments", values.number_of_assignments);
      data.append(
        "number_of_people_attending",
        values.number_of_people_attending
      );
      data.append("course_topics", values.course_topics);
      {
        values.library_id === "" ? "" : data.append("library_id", values.library_id);
      }
      data.append("course_type", values.course_type);
      data.append("description", values.description);

      // for (var pair of data.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      // return false;
      setLoading(true);
      showLoader();
      await dispatch(storeMyCourse(data));
      resetForm();
      setVisibleLg(false);
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    dispatch(syllabusListData());
    dispatch(libraryListData());
  }, []);

  return (
    <>
      <div>
        <CustomAlertControl />
        <CCard className="course-card-list-css">
          <div className="course-header">
            <div className="col-12">
              <div className="row d-flex mt-3">
                <div className="col-12 text-center page-header-size">
                  My Courses
                  {checkAccessPermission("course_add") ? (
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
              <div className="mt-1 row">
                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 d-flex position-relative text-center">
                  <CFormInput
                    className="searchinput rounded-pill pr-5"
                    onChange={(event) => setSearchCourse(event.target.value)}
                    placeholder="Enter subject,Title,Description etc."
                  ></CFormInput>
                  <CButton className="searchbutton position-absolute rounded-pill">
                    {" "}
                    <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                  </CButton>
                </div>
                <div sm={1} md={3} lg={3} xl={3}></div>
              </div>
              <div className="row mt-2 mb-3 ">
                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
                <div className="text-center col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">
                  <CButton
                    className={
                      myCourseContainerID === "All"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    shape="rounded-pill"
                    onClick={allCourseClickedSetCOntainerID}
                    id="All"
                  >
                    All Courses
                  </CButton>
                  {!subscribedBtn ? (
                    <CButton
                      className={
                        myCourseContainerID === "Completed"
                          ? "groupbutton-active m-1"
                          : "groupbutton m-1"
                      }
                      shape="rounded-pill"
                      onClick={setContainerIdSubscribed}
                      id="Completed"
                    >
                      Subscribed Courses
                    </CButton>
                  ) : (
                    ""
                  )}

                  {subscribedBtn ? (
                    <>
                      <CButton
                        className={
                          myCourseContainerID === "Completed"
                            ? "groupbutton-active m-1"
                            : "groupbutton m-1"
                        }
                        shape="rounded-pill"
                        onClick={setContainerId}
                        id="Completed"
                      >
                        Completed Courses
                      </CButton>
                      <CButton
                        className={
                          myCourseContainerID === "Uncompleted"
                            ? "groupbutton-active m-1"
                            : "groupbutton m-1"
                        }
                        shape="rounded-pill"
                        onClick={setContainerId}
                        id="Uncompleted"
                      >
                        In-Progress Courses
                      </CButton>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
              </div>
            </div>
          </div>
        </CCard>
        <CModal
          size="lg"
          visible={visibleLg}
          onDismiss={() => setVisibleLg(false, errors !== null ? setErrors([]) :
            resetForm())}
          onClick={resetForm}
        >
          <CModalHeader
            className="tutorviewmodalheader"
            onDismiss={() => setVisibleLg(false
              , errors !== null ? setErrors([]) :
                resetForm())}
            onClick={resetForm}
          >
            <CModalTitle>Add Course</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {isLoading ? (
              <>{loader}</>
            ) : (
              <Form onSubmit={handleSubmit}>
                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Input
                      name="title"
                      label="Title *"
                      value={values.title}
                      onChange={handleInputChange}
                      error={errors.title}
                    />
                  </CCol>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.RadioGroup
                      name="type"
                      label="Teaching Type *"
                      value={values.type}
                      onChange={handleInputChange}
                      items={teachingTypeItems}
                    />
                  </CCol>
                </CRow>
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
                    {values.syllabus_id === "other" ? (
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
                    {values.class_id === "other" ? (
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
                    {values.subject_id === "other" ? (
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
                    <Controls.Select
                      name="mode_of_teaching"
                      label="Mode of Teaching *"
                      value={values.mode_of_teaching}
                      onChange={handleInputChange}
                      options={getAllTeachingMode()}
                      error={errors.mode_of_teaching}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Input
                      name="cost"
                      label={
                        "Cost (" +
                        currencySymbole() +
                        ") (keep 0 in cost if course is free) *"
                      }
                      type="number"
                      value={values.cost}
                      onChange={handleInputChange}
                      error={errors.cost}
                    />
                  </CCol>

                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.DatePicker
                      name="start_date"
                      label="Start Date"
                      value={values.start_date}
                      onChange={handleInputChange}
                      previousDateStatus={true}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.DatePicker
                      name="end_date"
                      label="End Date"
                      value={values.end_date}
                      minDate={values.start_date}
                      onChange={handleInputChange}
                      previousDateStatus={true}
                    />
                  </CCol>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.TimePicker
                      name="start_time"
                      label="Start Time *"
                      value={values.start_time}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.TimePicker
                      name="end_time"
                      label="End Time *"
                      value={values.end_time}
                      minTime={values.start_time}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.InputLabelShown
                      name="sample_images_name"
                      label="Sample Image"
                      type="file"
                      value={values.sample_images_name}
                      onChange={handleInputChange}
                      error={errors.sample_images_name}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.InputLabelShown
                      name="demo_video_name"
                      label="Demo Video (Max size 50MB) *"
                      type="file"
                      value={values.demo_video_name}
                      onChange={handleInputChange}
                      error={errors.demo_video_name}
                    />
                  </CCol>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.InputLabelShown
                      name="logo_name"
                      label="Logo *"
                      type="file"
                      value={values.logo_name}
                      onChange={handleInputChange}
                      error={errors.logo_name}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Input
                      name="number_of_videos"
                      label="Number of Videos *"
                      type="number"
                      value={values.number_of_videos}
                      onChange={handleInputChange}
                      error={errors.number_of_videos}
                    />
                  </CCol>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Input
                      name="number_of_assignments"
                      label="Number of Assignements *"
                      type="number"
                      value={values.number_of_assignments}
                      onChange={handleInputChange}
                      error={errors.number_of_assignments}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Input
                      name="number_of_people_attending"
                      label="Number of People Attending *"
                      type="number"
                      value={values.number_of_people_attending}
                      onChange={handleInputChange}
                      error={errors.number_of_people_attending}
                    />
                  </CCol>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.Input
                      name="course_topics"
                      label="Course Topics *"
                      value={values.course_topics}
                      onChange={handleInputChange}
                      error={errors.course_topics}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>

                    <Controls.Select
                      name="library_id"
                      label="Library Item "
                      value={values.library_id}
                      onChange={handleInputChange}
                      options={DropDown.libraryList}

                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.RadioGroup
                      name="course_type"
                      label="Course Type *"
                      value={values.course_type}
                      onChange={handleInputChange}
                      items={courseTypeItem}
                    />
                  </CCol>

                  {values.course_type === "Recorded" ? (
                    <CCol sm={6} md={6} lg={6} xl={6}>
                      <Controls.InputLabelShown
                        name="course_video_name"
                        label="Course Video (Max size 100MB) *"
                        type="file"
                        value={values.course_video_name}
                        onChange={handleInputChange}
                        error={errors.course_video_name}
                      />
                    </CCol>
                  ) : (
                    values.course_video_name = ""
                  )}
                </CRow>
                <CRow>
                  <CCol sm={12} md={12} lg={12} xl={12}>
                    <Controls.CustomTextArea
                      // <TextField
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
            )}
          </CModalBody>
        </CModal>
        <MyCourseContainer Data={myCourseContainerID} Search={searchcourse} />
      </div>
    </>
  );
};
export default TopFilterCouse;
