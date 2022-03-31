import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  CCol,
  CCard,
  CButton,
  CCardImage,
} from "@coreui/react";
import { getAllFeedbackList } from "./FeedBackAction";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
import { useSelector, useDispatch } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import NoDataContainer from "../NoDataContainer/noDataContainer";
const FeedBacks = (Data) => {
  const PER_PAGE = 10;

  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const FeedBackData = useSelector((state) => state.feedBack);

  useEffect(async () => {
    showLoader();
    await dispatch(getAllFeedbackList());
    setLoading(false);
    hideLoader();
  }, []);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0,0)
  }

  const pageCount = Math.ceil(FeedBackData.List.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;

  const feedbackDynamic = FeedBackData.List.filter((item) => {
    if (Data.searchData == "") {
      return item;
    } else if (
      item.given_by == null ?"" : item.given_by.toLowerCase().includes(Data.searchData.toLowerCase())
    ) {
      return item;
    } else if (
      item.feedback_for == null ? "": item.feedback_for.toLowerCase().includes(Data.searchData.toLowerCase())
    ) {
      return item;
    } else if (
      item.detailed_feedback == null ? "": item.detailed_feedback 
        .toLowerCase()
        .includes(Data.searchData.toLowerCase())
    ) {
      return item;
    }
  })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, index) {
      return (
        <>
          <CCol sm={12} md={12} lg={12} xl={12}>
            <CCard className=" card friendcard p-3 mt-3 mb-3">
              <div className="row d-flex justify-content-sm-center">
                <div className="col-xl-1 col-lg-2 col-md-3 col-sm-12 col-12">
                  <CCardImage
                    src={item.feedback_for_id_image}
                    className="feedback-user-image rounded-circle mx-auto d-flex "
                  />
                </div>
                <div className="feedback-user-profile col-xl-8 col-lg-9 col-md-11 col-sm-12 col-12 text-col-center text-sm-center text-md-center text-lg-start text-xl-start sm-mt-3 sm-mb-3">
                  <div className="d-xl-inline-flex d-lg-inline-flex d-md-inline-flex font-weight-bold card-title">
                    {item.given_by}
                  </div>
                  <div className="d-xl-inline-flex d-lg-inline-flex d-md-inline-flex ml-2">
                    {item.total_ratings == 0 ? (
                      <div>
                        <FontAwesomeIcon className="" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                      </div>
                    ) : (
                      ""
                    )}
                    {item.total_ratings == 1 ? (
                      <div>
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                      </div>
                    ) : (
                      ""
                    )}
                    {item.total_ratings == 2 ? (
                      <div>
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                      </div>
                    ) : (
                      ""
                    )}
                    {item.total_ratings == 3 ? (
                      <div>
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                      </div>
                    ) : (
                      ""
                    )}
                    {item.total_ratings == 4 ? (
                      <div>
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="" icon={faStar} />
                      </div>
                    ) : (
                      ""
                    )}
                    {item.total_ratings == 5 ? (
                      <div>
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                        <FontAwesomeIcon className="starcolor" icon={faStar} />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="normal-font">
                    {item.date}
                    <span className="mr-1 ml-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="infocircle1 m-1"
                      />
                    </span>
                    {""}
                    {item.time}
                  </div>
                  <div className="mt-2 mb-2 feedback-font-post-name font-weight-bold">
                    {item.feedback_for}
                  </div>
                  <div className="normal-font">{item.detailed_feedback}</div>
                </div>
                <div className="feedback-rounded-button col-xl-3 col-lg-12 col-md-12 col-sm-12 d-flex d-flex align-items-xl-center align-items-lg-center align-items-md-center justify-content-sm-center">
                  <CButton className="rounded-pill feedback-button">
                    View
                  </CButton>
                  <CButton className="rounded-pill feedback-button">
                    Hide
                  </CButton>
                </div>
              </div>
            </CCard>
          </CCol>
        </>
      );
    });

  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : feedbackDynamic.length !== 0 ? (
        <div>
          <>{feedbackDynamic}</>
          
          {/* pagination code start */}
          {FeedBackData.List.length > 10 ? (
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
        <NoDataContainer module="Feedbcak" />
      )}
    </>
  );
};
export default FeedBacks;
