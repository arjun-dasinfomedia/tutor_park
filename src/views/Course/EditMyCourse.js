import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  syllabusListData,
  libraryListData,
} from "../../redux/actions/dropdowns/index";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { CCol, CRow } from "@coreui/react";
import { currencySymbole, getAllTeachingMode } from "src/utility/utils";
import moment from "moment";
import { updateCourse } from "./MyCourseActions";

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

const EditMyCourse = (Data) => {


  useEffect(() => {
    dispatch(syllabusListData());
    dispatch(libraryListData());
    if (Data.Data.library !== null) {
      setLibraryId(Data.Data.library.id)
    }
  }, []);
  const dispatch = useDispatch();
  const DropDown = useSelector((state) => state.dropdowns);
  const [libraryId, setLibraryId] = useState("")


  const initialFValues = {
    id: Data.Data.id,
    title: Data.Data.title,
    syllabus_id: Data.Data.syllabus_id,
    class_id: Data.Data.class_id,
    subject_id: Data.Data.subject_id,
    mode_of_teaching: Data.Data.mode_of_teaching,
    start_date: Data.Data.start_date,
    end_date: Data.Data.end_date,
    start_time: Data.Data.start_time_original,
    end_time: Data.Data.end_time_original,
    cost: Data.Data.cost,
    type: Data.Data.type,
    logo: "",
    logo_name: "",
    syllabus_other: "",
    class_other: "",
    subject_other: "",
    demo_video: "",
    demo_video_name: "",
    course_video: "",
    course_video_name: "",
    description: Data.Data.description,
    number_of_videos: Data.Data.total_videos,
    number_of_assignments: Data.Data.total_assignments,
    course_type: Data.Data.course_type,
    course_topics: Data.Data.course_topics,
    number_of_people_attending: Data.Data.number_of_people_attending,
    library_id: libraryId,
  };

  console.log(Data)
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

    if ("cost" in fieldValues)
      temp.cost = fieldValues.cost ? "" : "Please enter cost.";

    if ("topic" in fieldValues)
      temp.topic = fieldValues.topic ? "" : "Please enter topic's.";

    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Pleasse add your description.";

    if ("course_topics" in fieldValues)
      temp.course_topics = fieldValues.course_topics
        ? ""
        : "Please enter course topics.";
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

    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      delete values.demo_video_name;
      delete values.logo_name;
      delete values.course_video_name;

      let data = new FormData();
      data.append("id", values.id);
      data.append("title", values.title);
      data.append("syllabus_id", values.syllabus_id);
      if (values.syllabus_id == "other") {
        data.append("syllabus_other", values.syllabus_other);
      }
      if (values.subject_id == "other") {
        data.append("subject_other", values.subject_other);
      }
      if (values.class_id == "other") {
        data.append("class_other", values.class_other);
      }
      data.append("class_id", values.class_id);
      data.append("subject_id", values.subject_id);
      data.append("mode_of_teaching", values.mode_of_teaching);
      data.append("start_date", moment(values.start_date).format("YYYY-MM-DD"));
      data.append(
        "end_date",
        values.end_date && moment(values.end_date).format("YYYY-MM-DD")
      );
      data.append("start_time", values.start_time);
      data.append("end_time", values.end_time);
      data.append("cost", values.cost);
      data.append("type", values.type);

      data.append("logo", values.logo);
      data.append("demo_video", values.demo_video);

      data.append("number_of_videos", values.number_of_videos);
      data.append("number_of_assignments", values.number_of_assignments);
      data.append(
        "number_of_people_attending",
        values.number_of_people_attending
      );
      data.append("course_topics", values.course_topics);
      {
        values.library_id !== null
          ? data.append("library_id", values.library_id)
          : "";
      }

      if (values.course_type == "Recorded") {
        data.append("course_video", values.course_video);
      }
      data.append("course_type", values.course_type);
      data.append("description", values.description);

      // for (var pair of data.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      // return false

      await dispatch(updateCourse(data));
      resetForm();
    }
  };



  return (
    <>
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
              label="Type *"
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
            <Controls.Select
              name="mode_of_teaching"
              label="Mode of teaching *"
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
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.DatePicker
              name="end_date"
              label="End Date"
              value={values.end_date}
              onChange={handleInputChange}
            />
          </CCol>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Input
              name="start_time"
              label="Start Time"
              type="time"
              value={values.start_time}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Input
              name="end_time"
              label="End Time"
              type="time"
              value={values.end_time}
              onChange={handleInputChange}
            />
          </CCol>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.InputLabelShown
              name="demo_video_name"
              label="Demo Video (Max size 50MB) *"
              value={values.demo_video_name}
              type="file"
              onChange={handleInputChange}
              error={errors.demo_video_name}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={5} md={5} lg={5} xl={5}>
            <Controls.InputLabelShown
              name="logo_name"
              label="Logo *"
              value={values.logo_name}
              type="file"
              onChange={handleInputChange}
              error={errors.logo_name}
            />
          </CCol>
          <CCol sm={1} md={1} lg={1} xl={1}>
            <img
              style={{ margin: "10px 5px 8px -15px", borderRadius: "30px" }}
              src={Data.Data.logo}
              height="50"
              width="50"
            />
          </CCol>
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
        </CRow>

        <CRow>
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
        </CRow>

        <CRow>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Input
              name="course_topics"
              label="Course Topics *"
              value={values.course_topics}
              onChange={handleInputChange}
              error={errors.course_topics}
            />
          </CCol>
          <CCol sm={6} md={6} lg={6} xl={6}>
            <Controls.Select
              name="library_id"
              label="Library Item"
              value={values.library_id}
              onChange={handleInputChange}
              options={DropDown.libraryList}
              error={errors.library_id}
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

          {values.course_type == "Recorded" ? (
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
        <CRow></CRow>
        <CRow>
          <CCol sm={12} md={12} lg={4} xl={4} className="m-2">
            <div className="d-inline">
              <Controls.Button type="submit" text="Submit" className="m-1" />
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
export default EditMyCourse;
