import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEllipsisV,
  faShareAlt,
  faPaperPlane,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  CRow,
  CCol,
  CCard,
  CButton,
  CCardImage,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CCardText,
  CLink,
} from "@coreui/react";
import {
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {
  deleteMyLibrary,
  getAllMyLibraryList,
  shareLibraryWithFriend,
  addLibraryComments,
  postLibraryItemOnTimeline,
  shareWithFriendLibrary,
} from "./LibraryActions";
import * as yup from "yup";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import LibraryEdit from "./LibraryEdit";
import { useHistory } from "react-router";
import CardText from "reactstrap/lib/CardText";
import CommentLibrary from "./viewLibraryComment";
import { checkAccessPermission } from "src/utility/utils";
import MaterialTable from "material-table";
import Controls from "src/components/formControls/controls/Controls";
import { Formik, Form, Field, FieldArray } from "formik";

const PER_PAGE = 10;

const LibraryList = (props) => {

  const dispatch = useDispatch();
  const store = useSelector((state) => state.library);
  const history = useHistory();
  const [editvisible, setEditVisible] = useState(false);
  const [viewvisible, setViewVisible] = useState(false);
  const [viewData, setViewData] = useState("");
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [callvisible, setCallVisible] = useState(false);
  const [sharevisible, setShareVisible] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [editdata, setEditData] = useState();
  const [mobileNumber, setMobileNumber] = useState("");
  const [commentLibraryData, setCommentLibraryData] = useState();
  const [libraryId, setLibraryId] = useState("");
  const user_ids = [];

  if(store.libraryEditStatus == "sucess") 
  {
    setEditVisible(false)
    store.libraryEditStatus = ""
  }

  useEffect(async () => {
    showLoader();
    await dispatch(getAllMyLibraryList());
    await dispatch(shareLibraryWithFriend());
    setLoading(false);
    hideLoader();
  }, []);

  // open Library Share Modal
  const openShareModal = (library_Id) => {
    setLibraryId(library_Id);
    setShareVisible(true);
  };

  // Share Library for Create Array Function
  const handleSharedLibrary = (item) => {
    for (let SharedLibraryAll of Object.values(item)) {
      user_ids.push(SharedLibraryAll.id);
    }
  };

  // Share Library To firends Function
  const ShareLibraryToFriends = () => {
    if (user_ids.length !== 0) {
      let data = new FormData();
      data.append("library_id", libraryId);
      data.append("user_ids[]", user_ids);
      dispatch(shareWithFriendLibrary(data));
      resetForm();
      setShareVisible(false);
    } else {
      Swal.fire("Error", "Please Select Atleast One Friend from List", "Error");
    }
  };

  // Delete a Library
  const libraryDelete = (id) => {
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
        dispatch(deleteMyLibrary({ id }));
      }
    });
  };

  // Library Share With Friend Column
  const libraryShareUser = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Email",
      field: "email",
    },
  ];

  // Comment List Modal
  const listCommentTimeLine = (id) => {
    setCommentsVisible(true);
    setCommentLibraryData(id);
  };

  // Edit Library Modal
  const editLibraryData = (item) => {
    setEditData(item);
    setEditVisible(!editvisible);
  };

  // Handle View Library
  const handleViewLibrary = (item) => {
    setViewData(item);
    setViewVisible(!viewvisible);
  };

  // handle post library item on timeline
  const handlePostOnTimeline = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Post it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          postLibraryItemOnTimeline({ type_id: item.id, type: "library" })
        );
      }
    });
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  // Comment COde Start
  const emptysection = { comment: "" };

  const initialValues = {
    Addsections: [emptysection],
  }
  const validationSchema = yup.object({

    Addsections: yup
      .array().of(
        yup.object().shape({
          comment: yup.string().required("Please Enter Commments"),

        })
      ),
  });
  // Library Comment Code End

  const handleCallModal = (data) => {

    setCallVisible(true)
    setMobileNumber(data)
  }

  const pageCount = Math.ceil(store.allLibraryList.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const loadAllMyLibraryListData = store.allLibraryList
    .filter((item) => {
      if (props.searchKeyword == "") {
        return item;
      } else if (
        item.subject_name
          .toLowerCase()
          .includes(props.searchKeyword.toLowerCase())
      ) {
        return item;
      }
      else if (
        item.class_name == null ? "" : item.class_name
          .toLowerCase()
          .includes(props.searchKeyword.toLowerCase())
      ) {
        return item;
      }
      else if (
        item.syllabus_name
          .toLowerCase()
          .includes(props.searchKeyword.toLowerCase())
      ) {
        return item;
      } else if (
        item.name.toLowerCase().includes(props.searchKeyword.toLowerCase())
      ) {
        return item;
      } else if (
        item.description
          .toLowerCase()
          .includes(props.searchKeyword.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      const toShowDescription = item.description.substring(0, 50) + "...";
      return (
        <CRow className="mt-3 mb-3">
          <CCol>
            <CCard className="card p-3 friendcard ">
              <div className="text-right d-sm-none position-absolute ellipsisbutton">
                <CDropdown
                  variant="nav-item"
                  className="marker-remove-textbook-css d-inline m-2"
                >
                  <CDropdownToggle
                    placement="bottom-end"
                    className="py-0 menu-css d-inline "
                    caret={false}
                  >
                    <FontAwesomeIcon
                      className="d-inline ellipsis"
                      icon={faEllipsisV}
                      id=""
                    />
                  </CDropdownToggle>
                  <CDropdownMenu
                    className="pt-0 course-action-dropdown-menu-css m-2"
                    placement="bottom-end"
                  >
                    <CDropdownItem onClick={() => editLibraryData(item)}>
                      Edit
                    </CDropdownItem>
                    <CDropdownItem onClick={() => libraryDelete(item.id)}>
                      Delete
                    </CDropdownItem>
                    <CDropdownItem onClick={() => handleViewLibrary(item)}>
                      View
                    </CDropdownItem>
                    <CDropdownItem onClick={() => handlePostOnTimeline(item)}>
                      Post On Timeline
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div className="row d-flex align-items-center justify-content-sm-center">
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-2">
                  <CCardImage
                    src={item.image}
                    className="img-fluid rounded course-image mx-auto d-flex"
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-7 text-center text-sm-center text-md-center text-lg-center text-xl-start">
                  <div className="d-inline font-weight-bold card-title">
                    {item.name}
                  </div>
                  <div className="d-sm-inline  d-none ml-3">
                    <CDropdown
                      variant="nav-item"
                      className="marker-remove-textbook-css d-inline m-2"
                    >
                      <CDropdownToggle
                        placement="bottom-end"
                        className="py-0 menu-css d-inline "
                        caret={false}
                      >
                        <FontAwesomeIcon
                          className="course-buttonellipsis d-inline "
                          icon={faEllipsisV}
                          id=""
                        />
                      </CDropdownToggle>
                      <CDropdownMenu
                        className="pt-0 pb-0 courses-dropdown-menu course-action-dropdown-menu-css m-2"
                        placement="bottom-end"
                      >
                        {checkAccessPermission("library_edit") ? (
                          <CDropdownItem onClick={() => editLibraryData(item)}>
                            Edit
                          </CDropdownItem>
                        ) : null}
                        {checkAccessPermission("library_delete") ? (
                          <CDropdownItem onClick={() => libraryDelete(item.id)}>
                            Delete
                          </CDropdownItem>
                        ) : null}
                        {checkAccessPermission("library_view") ? (
                          <CDropdownItem
                            onClick={() => handleViewLibrary(item)}
                          >
                            View
                          </CDropdownItem>
                        ) : null}
                        {checkAccessPermission("library_view") ? (
                          <CDropdownItem
                            onClick={() => handlePostOnTimeline(item)}
                          >
                            Post On Timeline
                          </CDropdownItem>
                        ) : null}
                      </CDropdownMenu>
                    </CDropdown>
                  </div>
                  <div className="medium-text">{toShowDescription}</div>
                  <div className="normal-font">
                    {item.syllabus_name} | {item.class_name} |{" "}
                    {item.subject_name}
                  </div>
                  <div className="mt-4 pb-1 comment-input-div ">
                    <Formik
                      initialValues={initialValues}
                      // validationSchema={validationSchema}
                      onSubmit={async (values) => {

                        const data = values.Addsections[1].comment;

                        let formdata = new FormData();
                        formdata.append("id", item.id);
                        formdata.append("comment", data);


                        dispatch(addLibraryComments(formdata));

                        values.Addsections[1].comment = ""


                      }}
                    >
                      {({ values, errors, isSubmitting, isValid }) => (
                        <div className="mb-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Form>


                            <FieldArray name="Addsections">
                              {({ push, remove }) => (
                                <React.Fragment>

                                  <div className="mt-3 ">
                                    <div>

                                      <FormControl variant="outlined">
                                        <InputLabel className=""></InputLabel>
                                        <Field
                                          className="comments-message-control pl-2 rounded-pill pr-5"
                                          placeholder="Write Comment"
                                          name={`Addsections.${1}.comment`}
                                          label="Add Comment"
                                          variant="outlined"
                                          autoComplete="off"
                                        // size="small"
                                        >

                                        </Field>
                                      </FormControl>
                                    </div>
                                  </div>
                                </React.Fragment>
                              )}
                            </FieldArray>


                            <div className="row mt-4">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                <div>
                                  <CButton
                                    className="library-comments-button rounded-pill position-absolute"
                                    id="commentbutton"
                                    type="submit"
                                  >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                  </CButton>
                                </div>
                              </div>
                            </div>

                          </Form>
                        </div>
                      )
                      }

                    </Formik>

                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-start">

                  <CButton
                    className="btn rounded-circle m-1 roundshap-button"
                    onClick={() => history.push("/messages")}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </CButton>
                  <CButton
                    className="btn rounded-circle m-1 roundshap-button"
                    onClick={() => handleCallModal(item.creator_mobile_number)}
                  >
                    <FontAwesomeIcon icon={faPhoneAlt} />
                  </CButton>
                  <CButton
                    className="btn rounded-circle m-1 roundshap-button"
                    onClick={() => openShareModal(item.id)}
                  >
                    <FontAwesomeIcon icon={faShareAlt} />
                  </CButton>
                  <CButton
                    className="btn rounded-circle m-1 roundshap-button"
                    onClick={() => listCommentTimeLine(item)}
                  >
                    <FontAwesomeIcon icon={faCommentAlt} />
                  </CButton>
                </div>
              </div>
            </CCard>
          </CCol>
        </CRow>
      );
    });

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : loadAllMyLibraryListData.length !== 0 ? (
        <div>
          {loadAllMyLibraryListData}
          
          {/* pagination code start */}
          {store.allLibraryList.length > 10 ? (
            <div className="mt-4 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center">
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                activeClassName={"active"}
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageClassName={"page-item"}
                nextLinkClassName={"page-link"}
                nextClassName={"page-item next"}
                previousClassName={"page-item prev"}
                previousLinkClassName={"page-link"}
                pageLinkClassName={"page-link"}
                containerClassName={
                  "pagination react-paginate col-12 col-sm-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center"
                }
              />
            </div>
          ) : (
            ""
          )}
          {/* pagination code end */}

          {/* edit Library modal */}
          {store.libraryEditStatus !== false ? (
            <CModal
              size="lg"
              visible={editvisible}
              onDismiss={() => setEditVisible(false)}
            >
              <CModalHeader
                onDismiss={() => setEditVisible(false)}
                className="tutorviewmodalheader"
              >
                <CModalTitle>Edit Library</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <LibraryEdit Data={editdata} />
              </CModalBody>
            </CModal>
          ) : (
            <CModal size="lg" onDismiss={() => setEditVisible(false)}>
              <CModalHeader
                onDismiss={() => setEditVisible(false)}
                className="tutorviewmodalheader"
              >
                <CModalTitle>Edit Library</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <LibraryEdit Data={editdata} />
              </CModalBody>
            </CModal>
          )}

          <div style={{ marginTop: "15px" }}></div>

          {/* view library modal */}

          <CModal
            size="lg"
            visible={viewvisible}
            onDismiss={() => setViewVisible(false)}
          >
            <CModalHeader
              visible={viewvisible}
              onDismiss={() => setViewVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle className="">View Library</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow>
                <CCol
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  style={{ maxWidth: 20 }}
                ></CCol>
                <CCol
                  className=" border tuitionimage p-0 my-2 "
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                >
                  <CCardImage
                    src={viewData.image}
                    className="border viewcourselistmodalimage"
                  ></CCardImage>
                  <div>
                    <div className="pl-2 pb-2 ">{viewData.description}</div>
                  </div>
                </CCol>
                <CCol
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  style={{ maxWidth: 20 }}
                ></CCol>
                <CCol className="border tuitionimage my-2">
                  <CRow className="border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                    <CCol>
                      <CCardText
                        style={{ fontSize: 18 }}
                        className="p-2 text-dark"
                      >
                        Library Details
                      </CCardText>
                    </CCol>
                  </CRow>
                  <CRow className="pt-2 pl-2">
                    <CCol>
                      <CCardText style={{ fontSize: 18 }}>Title </CCardText>
                    </CCol>
                    <CCol className="p-0">
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.name}
                      </CCardText>
                    </CCol>
                  </CRow>
                  <CRow className="pl-2">
                    <CCol>
                      <CCardText style={{ fontSize: 18 }}>Subject</CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.subject_name}
                      </CCardText>
                    </CCol>
                  </CRow>
                  <CRow className="pl-2">
                    <CCol>
                      <CCardText style={{ fontSize: 18 }}>Syllabus</CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.syllabus_name}
                      </CCardText>
                    </CCol>
                  </CRow>
                  <CRow className="pl-2">
                    <CCol>
                      <CCardText style={{ fontSize: 18 }}>Class</CCardText>
                    </CCol>
                    <CCol>
                      <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                        {viewData.class_name}
                      </CCardText>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CCardText style={{ fontSize: 18 }} className="pl-2">
                        Attachment
                      </CCardText>
                    </CCol>
                    <CCol>
                      <CLink href={viewData.attachment} target="_blank" rel="noopener noreferrer">
                        {viewData.attachment &&
                          viewData.attachment.slice(0, 20) + "..."}

                      </CLink>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  style={{ maxWidth: 20 }}
                ></CCol>
              </CRow>
            </CModalBody>
          </CModal>

          {/* Library Comment Modal */}
          <CModal
            visible={commentsVisible}
            onDismiss={() => setCommentsVisible(false)}
            size="xl"
          >
            <CModalHeader
              onDismiss={() => setCommentsVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle>Comment List</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CommentLibrary data={commentLibraryData} />
            </CModalBody>
          </CModal>

          {/* call modal */}
          <CModal visible={callvisible} onDismiss={() => setCallVisible(false)}>
            <CModalHeader
              onDismiss={() => setCallVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle>Call </CModalTitle>
            </CModalHeader>
            <CModalBody className="ml-3 mr-3 text-center">
              <CRow>
                <CCol className="text-start">
                  <CardText style={{ fontSize: 20 }}>Mobile Number </CardText>
                </CCol>
                <CCol className="text-start">
                  {mobileNumber !== "" ? (
                    <a
                      style={{ fontSize: 20, textDecoration: "none" }}
                      href={"tel:+91" + mobileNumber}
                    >
                      {mobileNumber}
                    </a>
                  ) : (
                    <CardText>Mobile number is not available.</CardText>
                  )}
                </CCol>
              </CRow>
            </CModalBody>
          </CModal>

          {/* Library Share Modal */}
          <CModal
            size="lg"
            visible={sharevisible}
            onDismiss={() => setShareVisible(false)}
          >
            <CModalHeader
              onDismiss={() => setShareVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle>library Share Page </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <MaterialTable
                title=""
                columns={libraryShareUser}
                data={store.sharedWithFriend}
                options={{
                  search: true,
                  selection: true,
                  filtering: true,
                  searchFieldAlignment: "right",
                  headerStyle: {
                    backgroundColor: "#DEDDF4",
                    color: "#444346",
                    fontWeight: "600",
                    fontSize: "15px",
                  },
                }}
                onSelectionChange={handleSharedLibrary}
              />

              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-Start">
                <div className="p-2 d-inline">
                  <Controls.Button
                    onClick={() => ShareLibraryToFriends()}
                    text="Share Library"
                    className="rounded-pill button-color-rounded-pill"
                  />
                </div>
              </div>
            </CModalBody>
          </CModal>
        </div>
      ) : (
        <NoDataContainer module="Library" />
      )}
    </div>
  );
};
export default LibraryList;
