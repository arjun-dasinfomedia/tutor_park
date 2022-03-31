import React, { useEffect, useState } from "react";
import {
  retrieveTextBooks,
  deleteTextBook,
  viewTextBooks,
} from "./textBooksActions";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCard,
  CCardText,
  CCardImage,
  CRow,
  CCol,
  CLink,
} from "@coreui/react";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
import DontMenuIcon from "../../assets/images/TextBook_Images/DontMenu.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  subjectListData,
  syllabusListData,
  classListData,
} from "../../redux/actions/dropdowns/index";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import EditTextBook from "./EditTextBook";
import CustomAlertControl from "../AlertMessage";
import { checkAccessPermission } from "src/utility/utils";
import { Button } from "@material-ui/core";
const MySwal = withReactContent(Swal);
// textbook link line count
const PER_PAGE = 12;

const ListTextBook = (props) => {
  // Create new plugin instance

  const dispatch = useDispatch();
  const store = useSelector((state) => state.textBooks);
  const DropDown = useSelector((state) => state.dropdowns);

  const [editvisible, setEditVisible] = useState(false);
  const [editid, setEditId] = useState(true);
  const [viewvisible, setViewVisible] = useState(false);
  const [pdflinkdata, setPdfLinkData] = useState("");
  const [externallink, setExternalLink] = useState("");
  const [visible, setVisible] = useState(false);
  const [pdfVisible, setpdfVisible] = useState(false);
  const [editdata, setEditData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  // Delete Action
  const [currentPage, setCurrentPage] = useState(0);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const [renderNavButtons, setRenderNavButtons] = useState(false);
  const onSuccess = (sample) => {
    alert('PDF document loaded successfully!');
    setPageNumber(1);
    setRenderNavButtons(true);
  }

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  const previousPage = () => { changePage(-1); }
  const nextPage = () => { changePage(+1); }

  const TextBookPDFView = (data) => {

    setpdfVisible(true)

    setPdfLinkData(data.attachment),
      setExternalLink(data.external_link)

  }

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
        dispatch(deleteTextBook({ id }));
      }
    });
  };

  useEffect(async () => {
    showLoader();
    await dispatch(retrieveTextBooks());
    await dispatch(syllabusListData());
    await dispatch(subjectListData());
    await dispatch(classListData());
    setLoading(false);
    hideLoader();
  }, []);

  const viewTextBookData = (id) => {
    setViewVisible(true)
    dispatch(viewTextBooks({ id }));
  };

  const editTextBookData = (item) => {
    setEditVisible(true)
    setEditData(item);
    setEditId(item.id)
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const pageCount = Math.ceil(store.data.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const loadTextBookDynamic = store.data
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      return (
        <CCol
          className="position-relative text-center"
          lg={2}
          sm={4}
          xs={6}
          key={key}
        >
          <CCard className="textbook-card-list-css">
            <CDropdown
              variant="nav-item"
              className="marker-remove-textbook-css"
            >
              <CDropdownToggle
                placement="bottom-end"
                className="py-0 menu-css"
                caret={false}
              >
                <CCardImage
                  src={DontMenuIcon}
                  className="textbook-card-list-action-menu-css position-absolute"
                />
              </CDropdownToggle>
              <CDropdownMenu
                className="pt-0 textbook-action-dropdown-menu-css"
                placement="bottom-end"
              >
                {checkAccessPermission("text_book_edit") ? (
                  <CDropdownItem
                    onClick={() => editTextBookData(item)}
                  >
                    Edit
                  </CDropdownItem>
                ) : null}
                {checkAccessPermission("text_book_delete") ? (
                  <CDropdownItem onClick={() => handleConfirmCancel(item.id)}>
                    Delete
                  </CDropdownItem>
                ) : null}

                <CDropdownItem
                  onClick={() => viewTextBookData(item.id)}
                >
                  View
                </CDropdownItem>
                <CDropdownItem
                  onClick={() => TextBookPDFView(item)}
                >
                  PDF View
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CCardImage
              src={item.image}
              className="text-book-card-list-css cursor-css"
              onClick={() => TextBookPDFView(item)}
            />
            <CCardText
              style={{ fontWeight: "bold", fontSize: 16 }}
              className="cursor-css"

              onClick={() => TextBookPDFView(item)}
            >
              {item.book_name}
            </CCardText>
          </CCard>
        </CCol>
      );
    });

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : loadTextBookDynamic.length !== 0 ? (
        <div className="m-4 mt-5">
          <CustomAlertControl />
          <CRow>
            {loadTextBookDynamic}
            
            {/* pagination code start */}
            {store.data.length > 12 ? (
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

            {/* edit textbook modal */}
            {store.TextbookEditStatus !== false ? (
              <CModal
                size="lg"
                visible={editvisible}
                onDismiss={() => setEditVisible(false)}
              >
                <CModalHeader
                  onDismiss={() => setEditVisible(false)}
                  className="tutorviewmodalheader"
                >
                  <CModalTitle>Edit Text Book</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <EditTextBook Data={editdata} />
                </CModalBody>
              </CModal>
            ) : (
              <CModal size="lg" onDismiss={() => setEditVisible(false)}>
                <CModalHeader
                  onDismiss={() => setEditVisible(false)}
                  className="tutorviewmodalheader"
                >
                  <CModalTitle>Edit Text Book</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <EditTextBook Data={editdata} />
                </CModalBody>
              </CModal>
            )}

            {/* view textbook modal */}

            <CModal
              visible={viewvisible}
              size="xl"
              onDismiss={() => setViewVisible(false)}
            >
              <CModalHeader
                onDismiss={() => setViewVisible(false)}
                className="tutorviewmodalheader"
              >
                <CModalTitle className="">View Text Book</CModalTitle>
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
                      src={
                        store.selectedTextbook !== null
                          ? store.selectedTextbook.image
                          : ""
                      }
                      className="border viewcourselistmodalimage"
                    ></CCardImage>
                    <div>
                      <div className="pl-2 pb-2 ">
                        {store.selectedTextbook.description}
                      </div>
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
                          Text Book Details
                        </CCardText>
                      </CCol>
                    </CRow>
                    <CRow className="pt-2 pl-2">
                      <CCol>
                        <CCardText style={{ fontSize: 18 }}>
                          Book Name{" "}
                        </CCardText>
                      </CCol>
                      <CCol className="p-0">
                        <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                          {store.selectedTextbook !== null
                            ? store.selectedTextbook.book_name
                            : ""}
                        </CCardText>
                      </CCol>
                    </CRow>
                    <CRow className="pl-2">
                      <CCol>
                        <CCardText style={{ fontSize: 18 }}>Subject</CCardText>
                      </CCol>
                      <CCol>
                        <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                          {store.selectedTextbook !== null
                            ? store.selectedTextbook.subject
                            : ""}
                        </CCardText>
                      </CCol>
                    </CRow>
                    <CRow className="pl-2">
                      <CCol>
                        <CCardText style={{ fontSize: 18 }}>Syllabus</CCardText>
                      </CCol>
                      <CCol>
                        <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                          {store.selectedTextbook !== null
                            ? store.selectedTextbook.syllabus
                            : ""}
                        </CCardText>
                      </CCol>
                    </CRow>
                    <CRow className="pl-2">
                      <CCol>
                        <CCardText style={{ fontSize: 18 }}>Class</CCardText>
                      </CCol>
                      <CCol>
                        <CCardText style={{ fontSize: 18, color: "#8f8f8f" }}>
                          {store.selectedTextbook !== null
                            ? store.selectedTextbook.class
                            : ""}
                        </CCardText>
                      </CCol>
                    </CRow>
                    {store.selectedTextbook !== null &&
                      store.selectedTextbook.resource_type === "external_link" ? (
                      <CRow className="pl-2">
                        <CCol>
                          <CCardText style={{ fontSize: 18 }}>Link</CCardText>
                        </CCol>
                        <CCol>
                          <CLink
                            href={store.selectedTextbook.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {store.selectedTextbook.external_link.slice(0, 20) +
                              "..."}
                          </CLink>
                        </CCol>
                      </CRow>
                    ) : store.selectedTextbook !== null &&
                      store.selectedTextbook.resource_type === "attachment" ? (
                      <CRow className="pl-2">
                        <CCol>
                          <CCardText style={{ fontSize: 18 }}>
                            Attachment
                          </CCardText>
                        </CCol>
                        <CCol>
                          <CLink
                            href={store.selectedTextbook.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {"View Attachment"}
                          </CLink>
                        </CCol>
                      </CRow>
                    ) : (
                      ""
                    )}
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
          </CRow>
        </div>
      ) : (
        <NoDataContainer module="Text Book" />
      )}

      {/* pdf Modal code  */}

      <CModal
        size="xl"
        visible={pdfVisible}
        onDismiss={() => setpdfVisible(false)}
      >
        <CModalHeader
          onDismiss={() => setpdfVisible(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Text Book PDF</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {pdflinkdata !== null ? (
            <div>
              <Document
                file={{
                  url: pdflinkdata,
                }}
                // onLoadSuccess={onDocumentLoadSuccess}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                  setRenderNavButtons(true);
                  onSuccess;
                }}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div>
          ) : (
            <div>
              <Document
                file={{
                  url: externallink,
                }}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div>
          )}

          {renderNavButtons &&
            <div className="buttonc">
              <Button
                disabled={pageNumber <= 1}
                onClick={previousPage}
                variant='primary'
              >
                Previous Page
              </Button>
              {"  "}
              <Button
                disabled={pageNumber === numPages}
                onClick={nextPage}
                variant='primary'
              >
                Next Page
              </Button>
            </div>}
        </CModalBody>
      </CModal>
    </div>
  );
};
export default ListTextBook;
