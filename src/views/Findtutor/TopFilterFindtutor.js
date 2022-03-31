import React, { useEffect, useState } from "react";
import {
  CCard,
  CRow,
  CCol,
  CButton,
  CFormSelect,
  CFormInput,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  subjectListData,
  syllabusListData,
  classListData,
} from "../../redux/actions/dropdowns/index";

const TopFilterFindtutor = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.dropdowns);
  const [tutorsearch, setTutorSearch] = useState("");


  const TutorSearchData = (e) => {
    setTutorSearch(e.targe.value)
  }
  useEffect(() => {
    dispatch(subjectListData());
    dispatch(syllabusListData());
    dispatch(classListData());
  }, []);

  return (
    <>
      <div className="tutorheader page-header-size">
        <CCard className="post-header-css  ">
          <div className="postheader  row ">
            <CRow className="tutor-title-row-css d-flex ">
              <div className="text-center col-12">
                <p className="postsearchheader">Find a Tutor</p>
              </div>
            </CRow>

            <CRow className="mt-1 mb-1">
              <CCol sm={1} md={2} lg={2} xl={2}></CCol>
              <CCol className="search " sm={10} md={8} lg={8} xl={8}>
                <CFormInput
                  onChange={(event) => TutorSearchData(event)}
                  className="searchinput rounded-pill pr-5"
                  placeholder="Enter Course,subject, Standard etc."
                ></CFormInput>
                <CButton className="searchbutton rounded-pill">
                  {" "}
                  <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                </CButton>
              </CCol>
              <CCol sm={1} md={2} lg={2} xl={2}></CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol
                className="textbook-search-mobile-view-css ml-auto"
                sm={2}
                md={2}
                lg={2}
                xl={2}
              >
                <CFormSelect
                  aria-label="Default select example"
                  className="textbook-search-menu-css CFormSelect1 "
                >
                  <option value="">Hydrabad</option>
                </CFormSelect>
              </CCol>
              <CCol className="textbook-search-mobile-view-css ">
                <CFormSelect
                  aria-label="Default select example"
                  className="position-relative textbook-search-menu-css CFormSelect1"
                >
                  <option value="" disabled selected>
                    Select Syllabus
                  </option>
                  {filter.syllabusList.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}
                </CFormSelect>
              </CCol>
              <CCol className="textbook-search-mobile-view-css ">
                <CFormSelect
                  aria-label="Default select example"
                  className="textbook-search-menu-css CFormSelect1"
                >
                  <option value="" disabled selected>
                    Select Class
                  </option>
                  {filter.classList.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}
                </CFormSelect>
              </CCol>
              <CCol className="textbook-search-mobile-view-css ">
                <CFormSelect
                  aria-label="Default select example"
                  className="textbook-search-menu-css CFormSelect1"
                >
                  <option value="" disabled selected>
                    Select Subject
                  </option>
                  {filter.subjectList.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}
                </CFormSelect>
              </CCol>
              <CCol className="textbook-search-mobile-view-css ">
                <CFormSelect
                  aria-label="Default select example"
                  className="textbook-search-menu-css CFormSelect1"
                >
                  <option value=""> Mode</option>
                </CFormSelect>
              </CCol>
              <CCol className="textbook-search-mobile-view-css ">
                <CFormSelect
                  aria-label="Default select example"
                  className="textbook-search-menu-css CFormSelect1"
                >
                  <option value=""> Type</option>
                </CFormSelect>
              </CCol>
              <CCol className="textbook-search-mobile-view-css ">
                <CFormSelect
                  aria-label="Default select example"
                  className="textbook-search-menu-css CFormSelect1"
                >
                  <option value=""> Gender</option>
                </CFormSelect>
              </CCol>
              <CCol className="textbook-search-mobile-view-css mr-3 ">
                <CFormSelect
                  aria-label="Default select example"
                  className="textbook-search-menu-css CFormSelect1"
                >
                  <option value=""> Number Of years</option>
                </CFormSelect>
              </CCol>
            </CRow>
          </div>
        </CCard>
      </div>
    </>
  );
};
export default TopFilterFindtutor;
