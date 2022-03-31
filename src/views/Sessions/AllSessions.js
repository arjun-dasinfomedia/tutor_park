import React, { Component, useEffect, useState } from "react";
import { CCard, CCol, CCardImage, CBadge } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { useSelector, useDispatch } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import profile4 from "../../assets/images/My_Tuition/Teacher.png";
import { getUserRole } from "../../utility/utils";
import { allSessionList } from "./sessionsActions";
import ReactPaginate from "react-paginate";
const PER_PAGE = 10;

const CompleteSession = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const sessions = useSelector((state) => state.sessions);
  const [currentPage, setCurrentPage] = useState(0);

  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const uppercaseWords = (str) =>
    str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
  useEffect(async () => {
    showLoader();
    await dispatch(allSessionList());
    setLoading(false);
    hideLoader();
  }, []);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const pageCount = Math.ceil(sessions.allsessiondata.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;

  const loadSessionsDynamic = sessions.allsessiondata
    .filter((item) => {
      if (props.SearchData == "") {
        return item;
      } else if (
        item.tuition_title == null ? "" : item.tuition_title
          .toLowerCase()
          .includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.tutor_name == null ? "" : item.tutor_name.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      return (
        <div key={key}>
          <CCol sm={12} md={12} lg={12} xl={12}>
            <CCard className="p-3 assigncard mt-3">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-2">
                  <CCardImage
                    src={item.tuition_image}
                    className="img-fluid rounded mx-auto d-flex serchcourse-image"
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-10 text-center text-sm-center text-md-start text-lg-start text-xl-start">
                  <div className="row m-2">
                    <div className="col-12">
                      <div className="">
                        <h6 className="card-title d-inline font-weight-bold">
                          {item.tuition_title}
                        </h6>
                      </div>
                    </div>

                    <div className="col-12 ">
                      <div className="normal-font">
                        <img
                          src={profile4}
                          className="tuitionteacher normal-font mr-1"
                        />
                        {item.tutor_name}
                        <span className="mr-1 ml-1">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="infocircle1 m-1 normal-font"
                          />
                        </span>{" "}
                        {item.schedule_date}{" "}
                        <span className="mr-1 ml-1">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="infocircle1 m-1 normal-font"
                          />
                        </span>{" "}
                        {item.from_time} To {item.end_time}{" "}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="normal-font">
                        {item.total_students} Students
                        <span className="ml-1 mr-1">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="infocircle1 m-1"
                          />
                        </span>{" "}
                        {item.total_videos} Videos{" "}
                        <span className="ml-1 mr-1">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="infocircle1 m-1 d-inline"
                          />
                        </span>
                        <p className="d-inline totalassign">
                          {item.total_assignments} Assignments
                        </p>{" "}
                        {getUserRole() === "student" ? (
                          <div className="d-inline">
                            <FontAwesomeIcon
                              icon={faCircle}
                              className="infocircle1 m-1"
                            />
                            {item.attendance_status !== null ? (
                              // ? item.attendance_status
                              // : "Not Available"}
                              <CBadge color="success">Present</CBadge>
                            ) : (
                              <CBadge color="danger">Absent</CBadge>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CCard>
          </CCol>
        </div>
      );
    });
  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : loadSessionsDynamic.length !== 0 ? (
        <div>
          <div>
            {loadSessionsDynamic}
            
            {/* pagination code start */}
            {sessions.allsessiondata.length > 10 ? (
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
        </div>
      ) : (
        <NoDataContainer module="All sessions" />
      )}
    </>
  );
};
export default CompleteSession;
