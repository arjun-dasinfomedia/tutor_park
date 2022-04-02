import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faVihara } from "@fortawesome/free-solid-svg-icons";
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
  CCardText,
  CDropdownDivider,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import {
  libraryListData,
  syllabusListData,
} from "../../redux/actions/dropdowns/index";
import {
  checkAccessPermission,
  getAllTeachingMode,
  getUserData,
  getUserRole,
} from "../../utility/utils";
import { useSelector, useDispatch } from "react-redux";
import { Autocomplete } from "@mui/material";
import { TextField } from "@material-ui/core";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import MyTutionContainer from "./MyTutionContainer";
import Swal from "sweetalert2";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";
import moment from "moment";
import { storeMyTuition } from "../Tutions/TuitionActions";
import CustomAlertControl from "../AlertMessage";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { currencySymbole } from "../../utility/utils";

// items for teaching mode radio button
const teachingTypeItems = [
  { id: "individual", title: "Individual" },
  { id: "group", title: "Group" },
];

const TopHeader = () => {


  const dispatch = useDispatch();
  const [myCourseContainerID, setMyTutionContainerID] = useState("All");
  const DropDown = useSelector((state) => state.dropdowns);
  const [visibleLg, setVisibleLg] = useState(false);
  const [selectedLibrary, setSelectedLibrary] = useState("");
  const [searchcourse, setSearchCourse] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [schdeuleData, setSchdeuleData] = useState([]);
  const [schdeuleStatus, setSchdeuleStatus] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const store = useSelector((state) => state.TuitionReducer);
  const [tutorListLength, setTutorListLength] = useState();

  const allCourseClickedSetCOntainerID = (e) => {
    setMyTutionContainerID(e.target.id);
  };

  useEffect(() => {
    if (getUserRole() === "tutor") {
      setMyTutionContainerID("All_Tutor");
    }

    dispatch(syllabusListData());
    dispatch(libraryListData());
  }, []);


  const initialFValues = {
    title: "",
    syllabus_id: "",
    syllabus_other: "",
    class_id: "",
    class_other: "",
    subject_id: "",
    mode_of_teaching: "",
    start_date: moment(),
    end_date: moment(),
    cost: "",
    type: "individual",
    image_name: "",
    image: "",
    demo_video: "",
    demo_video_name: "",
    description: "",
    library_id: "",
    subject_other: "",
  };
  const schedulesToSave = [];
  // validation code start
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : "Please enter title.";

    if ("syllabus_id" in fieldValues)
      temp.syllabus_id = fieldValues.syllabus_id
        ? ""
        : "Please select syllabus.";

    if (values.class_id === "other") {
      if ("class_other" in fieldValues)
        temp.class_other = fieldValues.class_other ? "" : "Please Enter Other class.";
    }

    if ("class_id" in fieldValues)
      temp.class_id = fieldValues.class_id ? "" : "Please select class.";

    if (values.syllabus_id === "other") {
      if ("syllabus_other" in fieldValues)
        temp.syllabus_other = fieldValues.syllabus_other ? "" : "Please Enter Other Syllabus.";
    }

    if ("subject_id" in fieldValues)
      temp.subject_id = fieldValues.subject_id ? "" : "Please select subject.";

    if (values.subject_id === "other") {
      if ("subject_other" in fieldValues)
        temp.subject_other = fieldValues.subject_other ? "" : "Please Enter Other Subject.";
    }

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
          temp.image_name = "Only Jpg, png and jpg  file is allowed.";
        }
      } else {
        temp.image_name = "Please Upload Tuition  Image.";
      }
    }

    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Please add your description.";

    setErrors({
      ...temp,
    });
    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      

      delete values.demo_video_name;
      delete values.image_name;

      let formData = new FormData();
      formData.append("title", values.title);
      formData.append("syllabus_id", values.syllabus_id);

      if (values.syllabus_id === "other") {
        formData.append("syllabus_other", values.syllabus_other);
      }

      formData.append("class_id", values.class_id);

      if (values.class_id === "other") {
        formData.append("class_other", values.class_other);
      }

      formData.append("subject_id", values.subject_id);

      if (values.subject_id === "other") {
        formData.append("subject_other", values.subject_other);
      }

      formData.append("mode_of_teaching", values.mode_of_teaching);
      formData.append(
        "start_date",
        moment(values.start_date).format("YYYY-MM-DD")
      );

      formData.append("end_date", moment(values.end_date).format("YYYY-MM-DD"));
      formData.append("cost", values.cost);
      formData.append("type", values.type);
      formData.append("image", values.image);
      formData.append("demo_video", values.demo_video);
      formData.append("description", values.description);
      if (values.library_id !== "") {
        formData.append("library_id", values.library_id);
      }
       
      schedulesToSave.forEach((item) => {
        formData.append("schedule_id[]", item);
      });

      if (schedulesToSave.length !== 0) {
        setSchdeuleStatus(true);

      } else {
        // console.log("in else")
        setVisibleLg(true);
        setLoading(false);
        return false;
      }
      // console.log(schedulesToSave)
      setLoading(true);
      showLoader();
      await dispatch(storeMyTuition(formData))
      resetForm();
      setVisibleLg(false);
      setLoading(false);
      hideLoader();
    }
  };

  // Library item dropdown

  function handleLibrarySelect(value) {
    {
      value !== null && setSelectedLibrary(value.id);
    }
  }

  const TuitionSearchData = (e) => {
    setSearchCourse(e.target.value)
  }

  const onAddingItem = (item) => {
    const isChecked = item.target.checked;
    const value = item.target.value;

    if (isChecked) {
      schedulesToSave.push(value);
      schdeuleData.push(value);
    } else {
      schedulesToSave.pop(value);
      schdeuleData.pop(value);
    }
  };

  const schedule_list = Object.entries(getUserData().availability_group).map(
    (item, i) => (
      <CTableRow>
        <CTableDataCell className="tabelCellCustomDesign text-center">
          {item[0].toUpperCase()}
        </CTableDataCell>
        <CTableDataCell>
          {item[1].map((data, index) => (
            <CRow>
              <CCol sm={12} xl={6} lg={6} md={6}>
                <div className="labelDesignScheduleMainDiv m-1">
                  <li>
                    <div className="checkbox checkbox-circle checkbox-color-scheme">
                      <FormControlLabel
                        className="checkboxCustomDesign"
                        control={
                          <MuiCheckbox
                            color="primary"
                            value={data.id}
                            onChange={onAddingItem}
                            style={{
                              transform: "scale(1.3)",
                            }}
                          />
                        }
                      />
                    </div>
                  </li>
                  <li>
                    <a className="labelDesignScheduleStart">
                      {data.start_time}
                    </a>
                  </li>
                  <li>
                    <a className="labelDesignScheduleEnd">{data.end_time}</a>
                  </li>
                </div>
              </CCol>
            </CRow>
          ))}
        </CTableDataCell>
      </CTableRow>
    )
  );

  return (
    <>
      <div>
        <CustomAlertControl />
        <CRow>
          <CCol sm={12} lg={12} md={12} xs={12}>
            <CCard className="searchcourse-card-list-css ">
              <div className="mt-3">
                <div
                  className="d-flex m-auto justify-content-center"
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <div className="searchcourse-header">My Tuition</div>
                  {getUserRole() === "tutor" &&
                    checkAccessPermission("tuition_add") ? (
                    <CButton
                      className="d-inline textbook-add-button-css"
                      style={{ marginBottom: 8 }}
                      onClick={() => setVisibleLg(!visibleLg)}
                    >
                      Add
                    </CButton>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                <div className="d-flex position-relative text-center col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                  <CFormInput
                    className="searchinput rounded-pill pr-5"
                    onChange={(event) => TuitionSearchData(event)}
                    placeholder="Enter subject,Title,Description etc."
                  ></CFormInput>
                  <CButton className="searchbutton position-absolute rounded-pill">
                    {" "}
                    <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                  </CButton>
                </div>
                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
              </div>
              <div className="row mt-2 mb-3">
                <div className="text-center col-2 col-sm-2 col-md-1 col-lg-1 col-xl-1"></div>
                <div className="col-8 col-sm-8 col-md-10 col-lg-10 col-xl-10 text-center">
                  {getUserRole() === "tutor" ? (
                    ""
                  ) : (
                    <>
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
                        My Tuition
                      </CButton>
                      <CButton
                        className={
                          myCourseContainerID === "Find_Tution"
                            ? "groupbutton-active m-1"
                            : "groupbutton m-1"
                        }
                        shape="rounded-pill"
                        onClick={allCourseClickedSetCOntainerID}
                        id="Find_Tution"
                      >
                        Find Tuition
                      </CButton>
                    </>
                  )}
                </div>
                <div className="col-2 col-sm-2 col-md-1 col-lg-1 col-xl-1"></div>
              </div>
            </CCard>
          </CCol>
        </CRow>

        {/* Add tution modal */}
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
            <CModalTitle>Add Tuition</CModalTitle>
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
                      label="Tuition name*"
                      value={values.title}
                      labelShow={true}
                      onChange={handleInputChange}
                      error={errors.title}
                    />
                  </CCol>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.RadioGroup
                      name="type"
                      label="Type"
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
                      label="Mode *"
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
                      label={"Cost (" + currencySymbole() + ")"}
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
                      minDate={values.start_date}
                      value={values.end_date}
                      onChange={handleInputChange}
                      previousDateStatus={true}
                    />
                  </CCol>

                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.InputLabelShown
                      name="image_name"
                      label="Image *"
                      value={values.image_name}
                      type="file"
                      onChange={handleInputChange}
                      error={errors.image_name}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.InputLabelShown
                      name="demo_video_name"
                      label="Demo Video"
                      value={values.demo_video_name}
                      type="file"
                      onChange={handleInputChange}
                      error={errors.demo_video_name}
                    />
                  </CCol>

                  <CCol sm={6} md={6} lg={6} xl={6}>
                    {/* <Autocomplete
                      options={DropDown.libraryList}
                      getOptionLabel={(option) => option.name}
                      name="library_id"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Library Item"
                          variant="outlined"
                          autoComplete="off"
                          fullWidth
                        />
                      )}
                      onChange={(event, value) => handleLibrarySelect(value)}
                    /> */}
                    <Controls.Select
                      name="library_id"
                      label="Library Item"
                      value={values.library_id}
                      onChange={handleInputChange}
                      options={DropDown.libraryList}

                    />
                  </CCol>
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

                <div className="d-flex flex-row mt-3">
                  <div className="p-2">
                    <FontAwesomeIcon icon={faVihara} />
                  </div>
                  <div className="p-2">
                    <CCardText className="d-inline">Schedule Details</CCardText>
                  </div>
                </div>

                <CDropdownDivider className="mb-4" />
                <CRow>
                  <div>
                    <CTable style={{ backgroundColor: "#efefef" }}>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell
                            width="20%"
                            scope="col"
                            className="text-center tabelCellCustomDesignHeader"
                          >
                            Day
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col" className="text-center">
                            Schedule
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>{schedule_list}</CTableBody>
                    </CTable>
                  </div>
                </CRow>
                {schdeuleData.length === 0 && !schdeuleStatus ? (
                  <>
                    <CRow>
                      <span className="text-danger">
                        {" "}
                        Please select Schedule.
                      </span>
                    </CRow>
                  </>
                ) : (
                  <></>
                )}
                <CRow></CRow>
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
        <MyTutionContainer Data={myCourseContainerID} Search={searchcourse} />
      </div>
    </>
  );
};
export default TopHeader;
