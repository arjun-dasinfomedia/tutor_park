import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import {
  CCard,
  CButton,
  CCol,
  CCardImage,
  CRow,
  CFormInput,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faSearch } from "@fortawesome/free-solid-svg-icons";
import { getChildrenList, userImpersonate } from "./ChildrenAction";
import { getUserData } from "../../utility/utils";
import profile from "../../assets/images/myfriends/unnamed.jpg";
import "../../assets/css/pagination/paginationStyle.css";
import NoDataContainer from "../NoDataContainer/noDataContainer";

const PER_PAGE = 10;

const ChildrenList = () => {

  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const childrenState = useSelector((state) => state.Children);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const pageCount = Math.ceil(childrenState.ChildrenList.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;
  const [Childrens, setChildrens] = useState("");

  useEffect(async () => {
    showLoader();
    await dispatch(getChildrenList({ parent_id: getUserData().id }));
    setLoading(false);
    hideLoader();
  }, []);

  const handleImpersonate = async (userId) => {

    let user = JSON.parse(localStorage.getItem("userData"));
    let token = JSON.parse(localStorage.getItem("token"));
    if ((user !== "" || user !== null) && (token !== "" || token !== null)) {
      localStorage.setItem("existing_user_id", user.id);
    }
    await dispatch(userImpersonate({ id: userId }, "impersonate"));
    window.location.reload()
  };

  const SearchChildrenData = (e) => {
    setChildrens(e.target.value)
  }

  const loadMyChildrenList =
    childrenState.ChildrenList &&
    childrenState.ChildrenList.filter((item) => {
      if (Childrens === "") {
        return item;
      } else if (item.email === null ? "" : item.email.toLowerCase().includes(Childrens.toLowerCase())) {
        return item;
      } else if (
        item.first_name === null ? "" : item.first_name.toLowerCase().includes(Childrens.toLowerCase())
      ) {
        return item;
      } else if (
        item.last_name === null ? "" : item.last_name.toLowerCase().includes(Childrens.toLowerCase())
      ) {
        return item;
      }
    })
      .slice(offset, offset + PER_PAGE)
      .map(function (item, key) {
        return (
          <>
            <CCol sm={12} md={12} lg={12} xl={12}>
              <CCard className="card p-3 friendcard mb-3 mt-3">
                <div className="row ">
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 ">
                    <CCardImage
                      src={profile}
                      className="img-fluid rounded mx-auto d-flex serchcourse-image"
                    />
                  </div>
                  <div className="col-xs-12 col-sm-12 p-0 col-md-8 col-lg-8 col-xl-7 text-center text-sm-center text-md-start text-lg-start text-xl-start">
                    <div className="row mt-3">
                      <div className="medium-text">
                        <h5 className="d-inline font-weight-bold">
                          {item.first_name} {item.last_name}
                          &nbsp; (
                          {item.user_details.class_name === null
                            ? "N/A"
                            : item.user_details.class_name}
                          )
                        </h5>{" "}
                      </div>
                      <div className="normal-font text-monospace">
                        <h5 className="d-inline guardianstext">{item.email}</h5>{" "}
                      </div>
                      <div className="normal-font text-monospace mb-1">
                        <div className="">
                          <FontAwesomeIcon
                            icon={faIdCard}
                            className="phoneicon "
                          />
                          &nbsp; {item.tp_id === null ? "Not Added" : item.tp_id}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                    <div className="row">
                      <CButton
                        className="btn buynowbutton m-1 font-weight-bold text-center"
                        onClick={() => handleImpersonate(item.id)}
                      >
                        CHECK ACTIVITY
                      </CButton>
                    </div>
                  </div>
                </div>
              </CCard>
            </CCol>
          </>
        );
      });

  return (
    <>
      <div>
        {isLoading ? (
          <>{loader}</>
        ) : loadMyChildrenList.length !== 0 ? (
          <div>
            <CRow className="p-3 position-relative">
              <CCol
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className="card-title font-weight-bold text-center text-sm-center text-md-center text-lg-start text-xl-start"
              >
                Manage Children
              </CCol>
              <CCol
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className="card-title font-weight-bold"
              >
                <CFormInput
                  onChange={(event) => SearchChildrenData(event)}
                  className="childreninput rounded-pill pr-5 "
                  placeholder="Search A Children"
                />
                <CButton className="childrenbutton rounded-pill">
                  <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                </CButton>
              </CCol>
            </CRow>
            <div className="p-3 text-center">{loadMyChildrenList}</div>
            
            {/* pagination code start */}
            {childrenState.ChildrenList.length > 10 ? (
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
          </div>
        ) : (
          <NoDataContainer module="Course" />
        )}
      </div>
    </>
  );
};

export default ChildrenList;
