import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Controls from "src/components/formControls/controls/Controls";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import Swal from "sweetalert2";
import { Form, useForm } from "src/components/formControls/useForm";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CRow,
  CCol,
  CCard,
  CTooltip,
  CButton,
} from "@coreui/react";
import Editor from "react-quill";
import "react-quill/dist/quill.snow.css";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { useSelector, useDispatch } from "react-redux";
import {
  retrieveNoteBookList,
  retrieveNoteBookStore,
  deleteNoteBook,
} from "./notebookActions";
import { classListData, subjectListData, subjectTutorListData, syllabusListData } from "src/redux/actions/dropdowns";
import EditNoteBook from "./EditNoteBook";
import { checkAccessPermission } from "src/utility/utils";
import NoDataContainer from "../NoDataContainer/noDataContainer";

const NoteBook = (Data) => {
  const dispatch = useDispatch();
  const noteBookState = useSelector((state) => state.notebookReducer);

  const DropDown = useSelector((state) => state.dropdowns);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [text, setText] = useState("");
  const [editdata, setEditData] = useState();
  const [editvisible, setEditVisible] = useState(false);
  const [editorState, setEditorState] = useState(true);
  const [value, setValue] = useState("");
  const [loadarray, setLoadArray] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [visibleLg, setVisibleLg] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const initialFValues = {
    syllabus_id: "",
    class_id: "",
    subject_id: "",
    tutor_id: "",
    description: value,
  };

  // Set up your custom MUI theme here
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("syllabus_id" in fieldValues)
      temp.syllabus_id = fieldValues.syllabus_id
        ? ""
        : "Please select syllabus.";

    if ("class_id" in fieldValues)
      temp.class_id = fieldValues.class_id ? "" : "Please select class.";

    if ("subject_id" in fieldValues)
      temp.subject_id = fieldValues.subject_id ? "" : "Please select subject.";

    if ("tutor_id" in fieldValues)
      temp.tutor_id = fieldValues.tutor_id ? "" : "Please select tutor.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");

    if (value !== "" && value !== "<p><br></p>") {
      setEditorState(true);
    } else {
      setEditorState(false);
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const [texteditor, setTextEditor] = useState();

  const clearState = () => {
    setValue("");
    setEditorState(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "" && value !== "<p><br></p>") {
      setEditorState(true);
    } else {
      setEditorState(false);
    }
    if (validate()) {
      values.description = value;

      if (value !== "" && value !== "<p><br></p>") {
        setEditorState(true);
        dispatch(retrieveNoteBookStore(values));
        resetForm({ values: "" });
        clearState();
        setVisibleLg(false);
        //console.log(value)
      } else {
        setEditorState(false);
      }
    }
  };

  const editNoteBookData = (item) => {
    setEditData(item);
  };

  Editor.modules = {
    toolbar: [
      [
        { size: ["image"] },
        { header: [1, 2, 3, 4, 5, 6, false] },
        "bold",
        "italic",
        "underline",
        "strike",
        { align: [] },
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        "link",
        "image",
        { color: [] },
        { background: [] },
        "clean",
      ],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  useEffect(async () => {
    showLoader();
    await dispatch(syllabusListData());
    await dispatch(retrieveNoteBookList());
    await dispatch(subjectListData());
    await dispatch(classListData());
    await dispatch(subjectTutorListData());
    setLoading(false);
    hideLoader();
  }, []);

  const MyBlock = (props) => {
    return (
      <div
        style={{
          padding: 10,
          backgroundColor: "#ebebeb",
        }}
      >
        My Block content is:
        {props.children}
      </div>
    );
  };

  /*Delete Alert */
  const handleConfirmCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNoteBook({ id }));
      }
    });
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const loadNotenookDynamic = noteBookState.data
    .filter((item) => {
      if (Data.SearchData == "") {
        return item;
      } else if (
        item.subject == null ? "": item.subject.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.syllabus == null ? "": item.syllabus.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.class == null ? "" : item.class.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.tutor == null ? "": item.tutor.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.description == null ? "": item.description.toLowerCase().includes(Data.SearchData.toLowerCase())
      ) {
        return item;
      }
    })
    .map(function (item, key) {
      return (
        <>
          <div className="row p-2 mb-1" key={key}>
            <CCard className="friendcard notebook-card p-3">
              <div>
                <div className="row mb-3">
                  <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div className="d-inline font-weight-bold card-title">
                      {item.subject}
                    </div>
                    <span className="d-inline medium-text">
                      &nbsp;({item.class}) &nbsp;({item.syllabus})
                    </span>
                    <div className="d-inline normal-font">
                      &nbsp;{item.tutor}
                      {/* Stephan Stange */}
                    </div>
                    <div className="normal-font">
                      {item.created_at}
                      {/* 22-05-2021 . 11:20 PM */}
                    </div>
                  </div>
                  {checkAccessPermission("note_book_edit") ||
                    checkAccessPermission("note_book_delete") ? (
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex justify-content-end align-items-center">
                      {checkAccessPermission("note_book_edit") ? (
                        <CTooltip content="Edit" placement="bottom">
                          <CButton
                            className="rounded-pill m-1 notebook-runded-button"
                            onClick={() =>
                              setEditVisible(
                                !editvisible,
                                editNoteBookData(item)
                              )
                            }
                          >
                            <FontAwesomeIcon className="" icon={faEdit} />
                          </CButton>
                        </CTooltip>
                      ) : null}

                      {checkAccessPermission("note_book_delete") ? (
                        <CTooltip content="Delete" placement="bottom">
                          {noteBookState.DeleteNoteBookStatus !== false ? (
                            <CButton
                              className="rounded-pill m-1 notebook-runded-button"
                              onClick={() => handleConfirmCancel(item.id)}
                            >
                              <FontAwesomeIcon className="" icon={faTrashAlt} />
                            </CButton>
                          ) : (
                            <CButton
                              disabled
                              className="rounded-pill m-1 notebook-runded-button"
                              onClick={() => handleConfirmCancel(item.id)}
                            >
                              <FontAwesomeIcon className="" icon={faTrashAlt} />
                            </CButton>
                          )}


                        </CTooltip>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <div
                  className="normal-font col-12  "
                  style={{ width: "100%", maxHeight: 300, overflow: "auto" }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>
              </div>
            </CCard>
          </div>
        </>
      );
    });

  return (
    <>
      <div className="mb-2 p-2">
        {isLoading ? (
          <>{loader}</>
        ) : (
          <div>
            <CRow>
              <CCol>
                {loadNotenookDynamic.length !== 0 ? (
                  loadNotenookDynamic
                ) : (
                  <NoDataContainer module="Notebook" />
                )}

                {checkAccessPermission("note_book_add") ? (
                  <>
                    <div className="fw-bold mt-3 mb-3 ml-2 editerlink">
                      <a className="text-decoration-none ml-3">
                        Create Notebook
                      </a>
                    </div>
                    <CCard className="friendcard notebook-card p-3 mt-2">
                      <Form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Controls.Select
                              name="syllabus_id"
                              label="Syllabus *"
                              value={values.syllabus_id}
                              onChange={handleInputChange}
                              options={DropDown.syllabusList}
                              error={errors.syllabus_id}
                            />
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Controls.Select
                              name="class_id"
                              label="Class *"
                              value={values.class_id}
                              onChange={handleInputChange}
                              options={DropDown.classList}
                              error={errors.class_id}
                            />
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Controls.Select
                              name="subject_id"
                              label="Subject *"
                              value={values.subject_id}
                              onChange={handleInputChange}
                              options={DropDown.subjectList}
                              error={errors.subject_id}
                            />
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <Controls.Select
                              name="tutor_id"
                              label="Tutor *"
                              value={values.tutor_id}
                              onChange={handleInputChange}
                              options={DropDown.subjectTutorList}
                              error={errors.tutor_id}
                            />
                          </div>
                        </div>
                        <Editor
                          modules={Editor.modules}
                          className="ql-editor"
                          value={value}
                          onChange={setValue}
                        />
                        {(value == "" || value == "<p><br></p>") &&
                          !editorState ? (
                          <>
                            <span className="text-danger ml-3">
                              Please enter some description.
                            </span>
                          </>
                        ) : null}
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
                                onClick={() => {
                                  resetForm();
                                  clearState();
                                }}
                              />
                            </div>
                          </CCol>
                        </CRow>
                      </Form>
                    </CCard>
                  </>
                ) : null}
              </CCol>
            </CRow>
            {noteBookState.NotebookEditStatus !== false ? (
              <CModal
                size="lg"
                visible={editvisible}
                onDismiss={() => setEditVisible(false)}
              >
                <CModalHeader
                  onDismiss={() => setEditVisible(false)}
                  className="tutorviewmodalheader"
                >
                  <CModalTitle>Edit Note Book</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <EditNoteBook Data={editdata} />
                </CModalBody>
              </CModal>
            ) : (
              <CModal size="lg" onDismiss={() => setEditVisible(false)}>
                <CModalHeader
                  onDismiss={() => setEditVisible(false)}
                  className="tutorviewmodalheader"
                >
                  <CModalTitle>Edit Note Book</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <EditNoteBook Data={editdata} />
                </CModalBody>
              </CModal>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default NoteBook;
