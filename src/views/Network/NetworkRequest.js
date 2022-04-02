import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faPhoneAlt,
  faIdCard,
  faBan,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import {
  CTooltip,
  CCol,
  CCard,
  CCardImage,
  CButton,
} from "@coreui/react";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
import {
  requestList,
  acceptRequest,
  rejectRequest,
  blockRequest,
  spamRequest,
} from "./NetworkAction";
import { checkAccessPermission, getUserData } from "src/utility/utils";
import { useSelector, useDispatch } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import sentIcone from "../../assets/images/myfriends/Arrow-up-right.png";
import ReceiverIcone from "../../assets/images/myfriends/Arrow-down-right.png";

const PER_PAGE = 10;

const MySwal = withReactContent(Swal);

const NetworkRequest = (props) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const friend = useSelector((state) => state.network);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const acceptFriend = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(acceptRequest({ request_id: id }));
      }
    });
  };

  const rejectFriend = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(rejectRequest({ request_id: id }));
      }
    });
  };

  const blockFriend = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Block it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(blockRequest({ request_id: id }));
      }
    });
  };

  const spamFriend = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, spam it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(spamRequest({ request_id: id }));
      }
    });
  };

  useEffect(async () => {
    showLoader();
    await dispatch(requestList({ email: getUserData().email }));
    // setRequestDataArray(dataArray);
    setLoading(false);
    hideLoader();
  }, []);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const pageCount = Math.ceil(friend.requestListData.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const loadrequestlistDynamic = friend.requestListData
    .filter((item) => {
      if (props.SearchData === "") {
        return item;
      } else if (
        item.name === null ? "" : item.name.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      } else if (
        item.city === null ? "" : item.city.toLowerCase().includes(props.SearchData.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(offset, offset + PER_PAGE)
    .map(function (item, key) {
      return (
        <div>
          {/* <CSpinner color="primary" /> */}
          <CCol lg={12} sm={12} xs={12} key={key}>
            <CCard bodyWrapper className="p-3 friendcard mt-3 mb-3">
              <div className="row user-image-center ">
                <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center">
                  <CCardImage
                    orientation="top"
                    className="rounded user-image mx-auto d-flex"
                    src={item.image}
                  />
                </div>
                <div className="myfriend-text-center col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-sm-center text-sm-center text-md-start text-lg-start text-xl-start ">
                  <div className="col">
                    {item.type === "sent" ? (
                      <CCardImage
                        className="request-icon-css mr-2"
                        src={sentIcone}
                      />
                    ) : (
                      <CCardImage
                        className="request-icon-css mr-2"
                        src={ReceiverIcone}
                      />
                    )}
                    <h5 className="d-inline card-title font-weight-bold">
                      {item.name}
                    </h5>
                    <div className="d-inline m-2 simple-normal-font">
                      {item.city}
                    </div>
                  </div>
                  <div className="col">{item.description}</div>
                  <div className="col">
                    <FontAwesomeIcon icon={faIdCard} className="phoneicon" />
                    &nbsp; {item.role}
                  </div>
                  <div className="col">
                    <FontAwesomeIcon icon={faPhoneAlt} className="phoneicon" />{" "}
                    &nbsp; {item.phone !== null ? item.phone : "N/A"}
                  </div>
                </div>
                {item.type === "received" &&
                  checkAccessPermission("network_edit") ? (
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 rounderdbutton  d-flex align-items-center justify-content-center">
                    <CTooltip content="Accept" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => acceptFriend(item.id)}
                      >
                        <FontAwesomeIcon className="" icon={faCheckCircle} />
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Reject" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => rejectFriend(item.id)}
                      >
                        <FontAwesomeIcon className="" icon={faTimesCircle} />
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Block" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => blockFriend(item.id)}
                      >
                        <FontAwesomeIcon className="" icon={faBan} />
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Spam" placement="bottom">
                      <CButton
                        className="btn rounded-circle m-1 roundshap-button"
                        onClick={() => spamFriend(item.id)}
                      >
                        <FontAwesomeIcon
                          className=""
                          icon={faExclamationTriangle}
                        />
                      </CButton>
                    </CTooltip>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </CCard>
          </CCol>
        </div>
      );
    });
  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : loadrequestlistDynamic.length !== 0 ? (
        <div>
          {loadrequestlistDynamic}
          
          {/* pagination code start */}

          {friend.requestListData.length > 2 ? (
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
        <NoDataContainer module="Request List" />
      )}
    </div>
  );
};
export default NetworkRequest;
