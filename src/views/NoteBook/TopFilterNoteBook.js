import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CFormInput,
  CButton,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import NoteBookList from "./NoteBookList";
import { subjectListData } from "src/redux/actions/dropdowns";

const TopFilterNoteBook = () => {
  const dispatch = useDispatch();
  const [searchcAllNotebook, setSearchcAllNotebook] = useState('');


  const AddNoteBook = (e) => {
    e.preventDefault()
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    dispatch(subjectListData());
  }, []);

  return (
    <>
      <div style={{ marginTop: "15px" }}>
        <CRow>
          <CCol sm={12} md={12} lg={12} xl={12}>
            <CCard className="post-header-css">
              <div className="PostHeader">
                <CRow className="mt-3 d-flex">
                  <div className="text-center col-12">
                    <div className="page-header-size">
                      Notebook
                      <CButton
                        className="d-inline textbook-add-button-css"
                        onClick={(e) => AddNoteBook(e)}
                      >
                        Add
                      </CButton>
                    </div>
                  </div>
                </CRow>
                <div className="row mb-3">
                  <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                  <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 searchcourse text-center">
                    <CFormInput
                      onChange={(event) => setSearchcAllNotebook(event.target.value)}
                      className="notebooksearchcontrol rounded-pill m-2 pr-5"
                      placeholder="Search A Notebook"
                    />
                    <CButton className="notebooksearchbutton rounded-pill" >
                      <FontAwesomeIcon
                        className="serchingicon"
                        icon={faSearch}
                      />
                    </CButton>
                  </div>
                  <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                </div>
              </div>
            </CCard>
          </CCol>
        </CRow>
        <NoteBookList SearchData={searchcAllNotebook} />
      </div>
    </>
  );
};
export default TopFilterNoteBook;
