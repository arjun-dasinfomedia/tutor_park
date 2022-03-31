import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  CFormSelect,
  CRow,
  CCol,
  CCard,
  CFormInput,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  classListData,
  subjectListData,
  syllabusListData,
} from "src/redux/actions/dropdowns";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { getFilterLibraryList, storeMyLibrary } from "./LibraryActions";
import { checkAccessPermission } from "src/utility/utils";
import LibraryContainer from "./LibraryContainer";

const TopFilterLibrary = () => {

  const dispatch = useDispatch();
  const [searchLibrary, setSearchLibrary] = useState("");
  const [syllabusId, setSyllabusId] = useState("");
  const [classId, setClasssId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const DropDown = useSelector((state) => state.dropdowns);
  const [addLibraryModalStatus, setAddLibraryModalStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [transferPointID, setTransferPointID] = useState("library");

  useEffect(async () => {
    await dispatch(syllabusListData());
  }, []);

  // Drop Down Value Change
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

  // Handle Button Value
  const showOffline = (e) => {
    setTransferPointID(e.target.id);
  };

  // Intial Value For Add New Library
  const initialFValues = {
    title: "",
    syllabus_id: "",
    syllabus_other: "",
    class_id: "",
    class_other: "",
    subject_id: "",
    subject_other: "",
    image: "",
    image_name: "",
    attachment: "",
    attachment_name: "",
    description: "",
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

    if (values.syllabus_id == 'other') {
      if ("syllabus_other" in fieldValues)
        temp.syllabus_other = fieldValues.syllabus_other ? "" : "Please enter other syllabus.";
    }
    if (values.class_id == 'other') {
      if ("class_other" in fieldValues)
        temp.class_other = fieldValues.class_other ? "" : "Please enter other Class.";
    }
    if (values.subject_id == 'other') {
      if ("subject_other" in fieldValues)
        temp.subject_other = fieldValues.subject_other ? "" : "Please enter other Subject.";
    }
    if ("image_name" in fieldValues) {
      var imagePath = fieldValues.image_name;
      var logo = ['jpeg', 'png', 'jpg', 'bmp', 'svg']
      var extension = imagePath.substring(
        imagePath.lastIndexOf(".") + 1,
        imagePath.length
      );
      if (fieldValues.image_name) {
        if (logo.includes(extension)) {
          temp.image_name = "";
        } else {
          temp.image_name = "Only Jpg, png, jpg, bmd and svg  file is allowed.";
        }
      } else {
        temp.image_name = "Please Upload Library Image.";
      }
    }

    if ("description" in fieldValues)
      if (fieldValues.description == "")
        temp.description = "Description  is required.";
      else if (fieldValues.description.length <= 10)
        temp.description = "Please Enter Description Minimum 10 Characters.";
      else if (fieldValues.description.length > 500)
        temp.description = "Please Enter Description maximum 500 Characters.";

      else temp.description = "";

    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
  // Validation Code End

  // Handle Submit Event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      delete values.image_name;
      delete values.attachment_name;

      let data = new FormData();

      if (values.syllabus_id == "other") {
        data.append("other_syllabus", values.syllabus_other)
      }

      if (values.class_id == "other") {
        data.append("other_class", values.class_other)
      }

      if (values.subject_id == "other") {
        data.append("other_subject", values.subject_other)
      }

      data.append("name", values.title);
      data.append("syllabus_id", values.syllabus_id);
      data.append("class_id", values.class_id);
      data.append("subject_id", values.subject_id);
      data.append("image", values.image);
      data.append("attachment", values.attachment);
      data.append("description", values.description);
      
      // setLoading(true);
      // showLoader();
      await dispatch(storeMyLibrary(data));
      resetForm();
      setAddLibraryModalStatus(false);
      // setLoading(false);
      // hideLoader();
    }
  };

  // Hanlde Filter Submit
  const handleFilterSubmit = async () => {
    await dispatch(
      getFilterLibraryList({
        syllabus_id: syllabusId,
        class_id: classId,
        subject_id: subjectId,
      })
    );
  };

  const LibrarySearchData = (e) => {
    setSearchLibrary(e.target.value)
  }

  return (
    <>
      <div style={{ marginTop: "15px" }}>
        <div className="row">
          <div className="col-12 ">
            <CCard className="timeline-header-css">
              <div className="PostHeader row mt-3">
                <div className="text-center">
                  <div className="page-header-size">
                    Library
                    {checkAccessPermission("library_add") ? (
                      <CButton
                        className="d-inline textbook-add-button-css"
                        style={{ marginBottom: 8 }}
                        onClick={() =>
                          setAddLibraryModalStatus(!addLibraryModalStatus)
                        }
                      >
                        Add
                      </CButton>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row mb-1">
                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 searchcourse text-center">
                  <CFormInput
                    onChange={(event) => LibrarySearchData(event)}
                    className="notebooksearchcontrol rounded-pill m-2 pr-5"
                    placeholder="Enter Library Title, Syllabus, Course, Subject"
                  />
                  <CButton className="notebooksearchbutton rounded-pill">
                    <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                  </CButton>
                </div>
                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
              </div>
              <div className="row textbook-search-menu-row-css mb-3">
                <CCol className="textbook-search-mobile-view-css" xl={2} sm={2}>
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
                </CCol>
                <CCol className="textbook-search-mobile-view-css" xl={2} sm={2}>
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
                </CCol>
                <CCol className="textbook-search-mobile-view-css" xl={2} sm={2}>
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
                </CCol>
                <CCol
                  className="textbook-search-mobile-view-css text-center"
                  xl={1}
                  sm={3}
                >
                  <CButton
                    className="mt-1 textbook-add-button-css "
                    onClick={() => handleFilterSubmit()}
                  >
                    Go
                  </CButton>
                </CCol>
              </div>
              <div className="row mt-2 mb-3">
                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
                <div className="text-center col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">
                  <CButton
                    className={
                      transferPointID === "library"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    shape="rounded-pill"
                    onClick={showOffline}
                    id="library"
                  >
                    Library
                  </CButton>
                  <CButton
                    className={
                      transferPointID === "sharedlibrary"
                        ? "groupbutton-active m-1"
                        : "groupbutton m-1"
                    }
                    shape="rounded-pill"
                    onClick={showOffline}
                    id="sharedlibrary"
                  >
                    Shared Library
                  </CButton>
                </div>
                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
              </div>
            </CCard>
          </div>
        </div>

        {/* Add Library Modal */}
        <CModal
          size="lg"
          visible={addLibraryModalStatus}
          onDismiss={() => setAddLibraryModalStatus(false,
            errors !== null ? setErrors([]) : resetForm())
          }
        >
          <CModalHeader
            className="tutorviewmodalheader"
            onDismiss={() => setAddLibraryModalStatus(false
              , errors !== null ? setErrors([]) : resetForm()

            )}
          >
            <CModalTitle>Add Library</CModalTitle>
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
                        label="Other Syllabus"
                        value={values.syllabus_other}
                        onChange={handleInputChange}
                        error={errors.syllabus_other}
                      />
                    ) : (
                      errors.syllabus_other = ""
                    )}
                  </CCol>
                </CRow>
                <CRow>
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
                        label="Other Class"
                        value={values.class_other}
                        onChange={handleInputChange}
                        error={errors.class_other}
                        other="other"
                      />
                    ) : (
                      errors.class_other = ""
                    )}
                  </CCol>

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
                        label="Other Subject"
                        value={values.subject_other}
                        onChange={handleInputChange}
                        error={errors.subject_other}
                      />
                    ) : (
                      errors.subject_other = ""
                    )}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.InputLabelShown
                      name="attachment_name"
                      label="Attachment (Max size 50MB) "
                      type="file"
                      value={values.attachment_name}
                      onChange={handleInputChange}
                      error={errors.attachment_name}
                    />
                  </CCol>
                  <CCol sm={6} md={6} lg={6} xl={6}>
                    <Controls.InputLabelShown
                      name="image_name"
                      label="Image *"
                      type="file"
                      value={values.image_name}
                      onChange={handleInputChange}
                      error={errors.image_name}
                    />
                  </CCol>
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
        <LibraryContainer
          Data={transferPointID}
          searchKeyword={searchLibrary}
        />
      </div>
    </>
  );
};
export default TopFilterLibrary;
