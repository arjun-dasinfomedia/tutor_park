import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCommentAlt,
  faPhoneAlt,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import {
  CCardText,
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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { getUserData } from "src/utility/utils";
import { friendList, viewUserDetails } from "./NetworkAction";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
const PER_PAGE = 10;

const NetworkTeachers = (props) => {

  const dispatch = useDispatch();
  const [viewvisible, setViewVisible] = useState(false);
  const [messagevisible, setMessageVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const friend = useSelector((state) => state.network);
  const [teacherDataArray, setTeacherDataArray] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(async () => {
    showLoader();
    await dispatch(friendList({ email: getUserData().email }));
    const dataArray = [];
    friend.friendListData.map(function (item) {
      if (item.role == "tutor") dataArray.push(item);
    });
    setTeacherDataArray(dataArray);
    setLoading(false);
    hideLoader();
  }, []);

  const RatingStar = (number) => {
    switch (number) {
      case "1":
        return (
          <>
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </>
        );
      case "2":
        return (
          <>
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </>
        );
      case "3":
        return (
          <>
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </>
        );
      case "4":
        return (
          <>
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </>
        );
      case "5":
        return (
          <>
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
            <FontAwesomeIcon className="statecolor" icon={faStar} />
          </>
        );
      default:
        return "";
        break;
    }
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const viewUserData = (email) => {
    setViewVisible(true)
    dispatch(viewUserDetails({ email: email }));
  };

  const pageCount = Math.ceil(teacherDataArray.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const loadfriendlistDynamic = teacherDataArray
    .filter((item) => {
      if (props.SearchData == "") {
        return item;
      } else if (
        item.name == null ? "" : item.name.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.city == null ? "" : item.city.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      return (
        <CCol lg={12} sm={12} xs={12} key={key}>
          <CCard bodyWrapper className="p-3 friendcard mt-3 mb-3">
            <div className="row user-image-center">
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center">
                <CCardImage
                  orientation="top"
                  className="rounded user-image mx-auto d-flex"
                  src={item.image}
                />
              </div>
              <div className="myfriend-text-center col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 text-sm-center text-sm-center text-md-start text-lg-start text-xl-start ">
                <div className="col">
                  <h5 className="d-inline card-title font-weight-bold">
                    {item.name}
                  </h5>
                  <div className="d-inline m-2 simple-normal-font">
                    {item.city}
                  </div>
                </div>
                <div className="col">{item.email}</div>
                <div className="col">{item.description}</div>
                <div className="col">
                  <FontAwesomeIcon icon={faIdCard} className="phoneicon" />
                  &nbsp; {item.role !== null ? item.role : "N/A"}
                </div>
                <div className="col">
                  <FontAwesomeIcon icon={faPhoneAlt} className="phoneicon" />{" "}
                  &nbsp; {item.phone !== null ? item.phone : "N/A"}
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 rounderdbutton  d-flex align-items-center justify-content-center">
                <CTooltip content="View" placement="bottom">
                  <CButton
                    className="btn rounded-circle m-1 roundshap-button"
                    onClick={() => viewUserData(item.email)}
                  >
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
          
          {/* pagination code start */}
          {teacherDataArray.length > 10 ? (
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
              <div className="p-2">
                <div className="row justify-content-around">
                  <div className="d-inline border-0 tuitionimage col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-2">
                    <CCardImage
                      src={friend.viewUserData.image}
                      className="border tutorviewmodalimage mb-xs-2 mb-sm-2 mb-md-2 mb-lg-0 mb-xl-0"
                    ></CCardImage>
                  </div>
                  <div className="d-inline border tuitionimage col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 p-0 text-wrap">
                    <div className="border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                      <CCardHeader
                        style={{ fontSize: 18 }}
                        className="text-dark card-title"
                      >
                        Tutor Details
                      </CCardHeader>
                    </div>
                    <div className="col-12 p-3">
                      <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                          Name
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                          {friend.viewUserData.first_name}{" "}
                          {friend.viewUserData.last_name}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                          City
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                          {friend.viewUserData.user_details !== undefined
                            ? friend.viewUserData.user_details.city
                            : ""}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                          State
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                          {friend.viewUserData.user_details !== undefined
                            ? friend.viewUserData.user_details.state
                            : ""}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                          Number
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                          {friend.viewUserData.user_details !== undefined &&
                            friend.viewUserData.user_details.phone !== null
                            ? friend.viewUserData.user_details.phone
                            : "N/A"}
                        </div>
                      </div>
                      <div className="row  ">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold">
                          Email
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
                          {friend.viewUserData.email}
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                          Languages
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                          {friend.viewUserData.user_details !== undefined &&
                            friend.viewUserData.user_details.languages !== null
                            ? friend.viewUserData.user_details.languages.toString()
                            : "N/A"}
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                          Avg Ratings
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                          {friend.viewUserData.user_details !== undefined &&
                            friend.viewUserData.user_details.avg_ratings !== null
                            ? RatingStar(
                              friend.viewUserData.user_details.avg_ratings
                            )
                            : "N/A"}
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                          TP Points
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                          {friend.viewUserData.user_details !== undefined &&
                            friend.viewUserData.user_details.tp_points_balance !==
                            null
                            ? friend.viewUserData.user_details.tp_points_balance
                            : "N/A"}
                        </div>
                      </div>
                      {friend.viewUserData.user_details !== undefined &&
                        friend.viewUserData.user_details.hide_area !== false ? (
                        <div className="row ">
                          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 medium-text font-weight-bold ">
                            Geo Tag Location
                          </div>
                          <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-wrap">
                            {friend.viewUserData.user_details.geo_location}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <CCardHeader className="card-title cardtitle text-dark font-weight-bold">
                      Education Details
                    </CCardHeader>
                    {friend.viewUserData.user_details !== undefined &&
                      friend.viewUserData.user_details.education.length !== 0 ? (
                      <CTable bordered responsive>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell
                              scope="col"
                              className="header-profile-table"
                            >
                              Degree/Standard
                            </CTableHeaderCell>
                            <CTableHeaderCell
                              scope="col"
                              className="header-profile-table"
                            >
                              College/School
                            </CTableHeaderCell>
                            <CTableHeaderCell
                              scope="col"
                              className="header-profile-table"
                            >
                              Place
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {friend.viewUserData.user_details.education.map(
                            (educationData, index) => (
                              <CTableRow key="index">
                                <CTableDataCell scope="row">
                                  {educationData.degree}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {educationData.college}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {educationData.place}
                                </CTableDataCell>
                              </CTableRow>
                            )
                          )}
                        </CTableBody>
                      </CTable>
                    ) : (
                      <CTable bordered responsive>
                        <CCardText style={{ textAlign: "center" }}>
                          N/A
                        </CCardText>
                      </CTable>
                    )}
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <CCardHeader className="card-title cardtitle fw-bold text-dark">
                      Experience Details
                    </CCardHeader>
                    {friend.viewUserData.user_details !== undefined &&
                      friend.viewUserData.user_details.experience.length !== 0 ? (
                      <CTable bordered responsive>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell
                              scope="col"
                              className="header-profile-table"
                            >
                              School/College Name
                            </CTableHeaderCell>
                            <CTableHeaderCell
                              scope="col"
                              className="header-profile-table"
                            >
                              Designation
                            </CTableHeaderCell>
                            <CTableHeaderCell
                              scope="col"
                              className="header-profile-table"
                            >
                              Experience in month
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {friend.viewUserData.user_details.experience.map(
                            (experienceData, index) => (
                              <CTableRow key="index">
                                <CTableDataCell scope="row">
                                  {experienceData.organization}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {experienceData.designation}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {experienceData.experience_month}
                                </CTableDataCell>
                              </CTableRow>
                            )
                          )}
                        </CTableBody>
                      </CTable>
                    ) : (
                      <CTable bordered responsive>
                        <CCardText style={{ textAlign: "center" }}>
                          N/A
                        </CCardText>
                      </CTable>
                    )}
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
        <NoDataContainer module="Teacher List" />
      )}
    </div>
  );
};
export default NetworkTeachers;
