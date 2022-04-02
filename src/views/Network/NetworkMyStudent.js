import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCommentAlt,
  faPhoneAlt,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CTooltip,
  CCol,
  CCard,
  CCardImage,
  CButton,
  CCardHeader,
} from "@coreui/react";
import { NavLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import ReactPaginate from "react-paginate";
import { myStudentData, viewUserDetails } from "./NetworkAction";
import { useSelector, useDispatch } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
const PER_PAGE = 10;

const NetworkMyStudent = (props) => {

  const dispatch = useDispatch();
  const [viewvisible, setViewVisible] = useState(false);
  const [messagevisible, setMessageVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const friend = useSelector((state) => state.network);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(async () => {
    showLoader();
    await dispatch(myStudentData());
    setLoading(false);
    hideLoader();
  }, []);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const viewUserData = (email) => {
    setViewVisible(true)
    dispatch(viewUserDetails({ email: email }));
  };

  const pageCount = Math.ceil(friend.myStudent.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const loadfriendlistDynamic = friend.myStudent
    .filter((item) => {
      if (props.SearchData === "") {
        return item;
      } else if (
        item.first_name === null ? "" : item.first_name.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.last_name === null ? "" : item.last_name.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.user_details.city === null ? "" : item.user_details.city
          .toLowerCase()
          .includes(props.SearchData.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      return (
        <CCol lg={12} sm={12} xs={12} key={key}>
          <CCard bodyWrapper className="p-3 friendcard mt-3 mb-3">
            <div className="row user-image-center ">
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center">
                <CCardImage
                  orientation="top"
                  className="rounded user-image mx-auto d-flex"
                  src={item.user_details.profile}
                />
              </div>
              <div className="myfriend-text-center col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 text-sm-center text-sm-center text-md-start text-lg-start text-xl-start ">
                <div className="col">
                  <h5 className="d-inline card-title font-weight-bold">
                    {item.first_name} {item.last_name}
                  </h5>
                  <div className="d-inline m-2 simple-normal-font">
                    {item.user_details.city}
                  </div>
                </div>
                <div className="col">{item.email}</div>
                <div className="col">{item.description}</div>
                <div className="col">
                  <FontAwesomeIcon icon={faIdCard} className="phoneicon" />
                  &nbsp;{" "}
                  {item.user_details.tp_id !== null
                    ? item.user_details.tp_id
                    : "N/A"}
                </div>
                <div className="col">
                  <FontAwesomeIcon icon={faPhoneAlt} className="phoneicon" />{" "}
                  &nbsp;{" "}
                  {item.user_details.phone !== null
                    ? item.user_details.phone
                    : "N/A"}
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 rounderdbutton  d-flex align-items-center justify-content-center">
                <CTooltip content="View" placement="bottom">
                  <CButton
                    className="btn rounded-circle m-1 roundshap-button"
                    onClick={() => viewUserData(item.email)}
                  >
                    {/* {" "} */}
                    <FontAwesomeIcon className="" icon={faEye} />
                  </CButton>
                </CTooltip>
                <NavLink to="/Messages">
                  <CTooltip content="Message" placement="bottom">
                    <CButton
                      className="btn rounded-circle m-1 roundshap-button"
                    >
                      <FontAwesomeIcon className="" icon={faCommentAlt} />
                    </CButton>
                  </CTooltip>
                </NavLink>
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
      ) : loadfriendlistDynamic.length !== 0 ? (
        <div>
          {loadfriendlistDynamic}
          
          {friend.myStudent.length > 10 ? (
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

          {/* View Message Modal code  */}
          <CModal
            visible={viewvisible}
            size="xl"
            onDismiss={() => setViewVisible(false)}
          >
            <CModalHeader
              onDismiss={() => setViewVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle className="">View Network</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className="row p-3 justify-content-around text-wrap">
                <div className=" border tuitionimage col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 p-3">
                  <CCardImage
                    src={friend.viewUserData.image}
                    className="border viewcourselistmodalimage"
                  ></CCardImage>
                </div>
                <div className="border tuitionimage my-2 col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <div className="row border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                    <CCardHeader
                      style={{ fontSize: 18 }}
                      className="text-dark card-title"
                    >
                      Network Details
                    </CCardHeader>
                  </div>
                  <div className="p-3">
                    <div className="row ">
                      <div className="col-4 font-weight-bold">Name </div>
                      <div className="col-8">
                        {friend.viewUserData.first_name}{" "}
                        {friend.viewUserData.last_name}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">City</div>
                      <div className="col-8">
                        {friend.viewUserData.user_details !== undefined
                          ? friend.viewUserData.user_details.city
                          : ""}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">State</div>
                      <div className="col-8">
                        {friend.viewUserData.user_details !== undefined
                          ? friend.viewUserData.user_details.state
                          : ""}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Number</div>
                      <div className="col-8">
                        {friend.viewUserData.user_details !== undefined &&
                          friend.viewUserData.user_details.phone !== null
                          ? friend.viewUserData.user_details.phone
                          : "N/A"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 font-weight-bold">Email</div>
                      <div className="col-8">{friend.viewUserData.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CModalBody>
          </CModal>

          {/* Message Modal code  */}

          <CModal
            visible={messagevisible}
            onDismiss={() => setMessageVisible(false)}
          >
            <CModalHeader
              onDismiss={() => setMessageVisible(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle>Message</CModalTitle>
            </CModalHeader>
            <CModalBody className="ml-3 mr-3 text-center">
              <TextField
                variant="outlined"
                id="Message"
                name="Message"
                label="Message"
                placeholder="Message"
                multiline
                rows={2}
                rowsMax={4}
              />
              <Button
                variant="contained"
                className="mt-4 mb-2"
                style={{ backgroundColor: "#3f51b5", color: "#fff" }}
              >
                Send
              </Button>
            </CModalBody>
          </CModal>
        </div>
      ) : (
        <NoDataContainer module="Student" />
      )}
    </div>
  );
};
export default NetworkMyStudent;
