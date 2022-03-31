import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  CFormInput,
  CRow,
  CCol,
  CCard,
  CButton,
  CFormSelect,
} from "@coreui/react";
import CourseList from "./CourseList";
import { useDispatch, useSelector } from "react-redux";
import {
  classListData,
  subjectListData,
  syllabusListData,
} from "src/redux/actions/dropdowns";
import { getAllCourseListSearch } from "./SearchCourseActions";

const TopFilterHeader = () => {
  const dispatch = useDispatch();
  const [searchcourse, setSearchCourse] = useState("");
  const [syllabusId, setSyllabusId] = useState("");
  const [classId, setClasssId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const DropDown = useSelector((state) => state.dropdowns);

  useEffect(() => {
    dispatch(syllabusListData());
  }, []);

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
      getAllCourseListSearch({
        syllabus_id: syllabusId,
        class_id: classId,
        subject_id: subjectId,
      })
    );
  };

  const SearchCourseData = (e) => {
    setSearchCourse(e.target.value)
  }

  return (
    <>
      <div>
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
                  <div className="searchcourse-header">Course Market</div>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                <div className="d-flex position-relative text-center col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                  <CFormInput
                    className="searchinput rounded-pill pr-5"
                    onChange={(event) => SearchCourseData(event)}
                    placeholder="Enter Course, subject, Standard, syllabus etc."
                  ></CFormInput>
                  <CButton className="searchbutton position-absolute rounded-pill">
                    {" "}
                    <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                  </CButton>
                </div>
                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
              </div>
              <CRow className="mt-2">
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
                  <div className="col-1 col-sm-1"></div>
                </div>
              </CRow>
            </CCard>
          </CCol>
        </CRow>
        <CourseList Data={searchcourse} />
      </div>
    </>
  );
};
export default TopFilterHeader;
