import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faUser,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  CCol,
  CCard,
  CCardImage,
  CTooltip,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
import { useSelector, useDispatch } from "react-redux";
import { getPostJobList, tutorDirectMessage } from "./PostSearchActions";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";

const PER_PAGE = 10;

const ListPostAndSearchJob = (prop) => {
  const dispatch = useDispatch();
  const allPostJobList = useSelector((state) => state.postSearchJob);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [messageData, setMessageData] = useState(null);
  const [messagevisible, setMessageVisible] = useState(false);

  useEffect(async () => {
    showLoader();
    await dispatch(getPostJobList());
    setLoading(false);
    hideLoader();
  }, []);

  // initial value for direct message
  const initialFValues = {
    message: "",
  };

  // validation code start
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("message" in fieldValues)
      temp.message = fieldValues.message ? "" : "Please enter message.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  // Send a Message
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      let data = new FormData();

      data.append("message", values.message);
      data.append("to", messageData);

      dispatch(tutorDirectMessage(data));
      resetForm();
      setMessageVisible(false);
    }
  };

  // Message Modal Open
  const messageView = (data) => {
    setMessageVisible(true);
    setMessageData(data);
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const pageCount = Math.ceil(allPostJobList.data.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const loadAllMyCourseListData = allPostJobList.data
    .filter((item) => {
      if (prop.searchData == "") {
        return item;
      } else if (
        item.posted_by == null ? "" : item.posted_by.toLowerCase().includes(prop.searchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.requirements == null ? "" : item.requirements.toLowerCase().includes(prop.searchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.type == null ? "" : item.type.toLowerCase().includes(prop.searchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.class == null ? "" : item.class.toLowerCase().includes(prop.searchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.syllabus == null ? "" : item.syllabus.toLowerCase().includes(prop.searchData.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      return (
        <CCol sm={12} md={12} lg={12} xl={12}>
          <CCard className="p-3 assigncard mt-3">
            <div className="row  ">
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-md-2 d-flex align-items-center">
                <CCardImage
                  className="post-serch-userimage rounded img-fluid mx-auto d-flex"
                  orientation="top"
                  src={item.image}
                />
              </div>
              <div className="serch-post-text-center col-12 col-sm-12 col-md-7 col-lg-7 col-md-7 text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                <div className="row">
                  <div className="col-12">
                    <h5 className="d-inline card-title font-weight-bold ">
                      {item.posted_by}
                    </h5>{" "}
                  </div>
                  <div className="col-12">
                    <div className="medium-text text-xs-center">
                      {item.requirements}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="normal-font text-xs-center">
                      <FontAwesomeIcon icon={faUser} /> &nbsp;
                      {item.type.charAt(0).toUpperCase() +
                        item.type.slice(1)}{" "}
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />{" "}
                      {item.class}{" "}
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />{" "}
                      {item.syllabus} - {item.start_time} to {item.end_time}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="normal-font text-xs-center">
                      {item.topic}
                    </div>
                  </div>
                </div>
              </div>
              <div className="serch-post-text-center col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
                <div className="row tutordetail">
                  <div className=" mt-4 col-12">
                    <CTooltip content="Message" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => messageView(item.posted_by_email)}
                      >
                        <FontAwesomeIcon className="" icon={faPaperPlane} />
                      </CButton>
                    </CTooltip>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div></div>
              </div>
            </div>
          </CCard>
        </CCol>
      );
    });

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : loadAllMyCourseListData.length !== 0 ? (
        <div>
          {loadAllMyCourseListData}
          
          {/* pagination code start */}
          {allPostJobList.data.length > 10 ? (
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
        </div>
      ) : (
        <NoDataContainer module="Post and Search" />
      )}
      {/* Message Modal code  */}

      <CModal
        visible={messagevisible}
        onDismiss={() => setMessageVisible(false)}
      >
        <CModalHeader
          onDismiss={() => setMessageVisible(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Direct Message</CModalTitle>
        </CModalHeader>
        <CModalBody className="ml-3 mr-3 text-center">
          <Form onSubmit={handleSubmit}>
            <Controls.CustomTextArea
              label="Message *"
              rows={5}
              name="message"
              value={values.message}
              onChange={handleInputChange}
              error={errors.message}
            />
            <div className="p-2 d-inline">
              <Controls.Button type="submit" text="Submit" />
            </div>
            <div className="p-2 d-inline">
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              />
            </div>
          </Form>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default ListPostAndSearchJob;
