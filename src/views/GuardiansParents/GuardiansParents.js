
import React, { useEffect, useState } from "react";
import {
    CCard,
    CCardImage,
} from '@coreui/react'
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import {
    faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { useDispatch } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import {
    getUserData,
} from "../../utility/utils";
import ReactPaginate from "react-paginate";

const PER_PAGE = 10;

const GuardiansParents = (props) => {

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const [loader, showLoader, hideLoader] = useFullPageLoader();

    useEffect(async () => {
        showLoader();
        setLoading(false);
        hideLoader();
    }, []);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const pageCount = Math.ceil(getUserData().parents.length / PER_PAGE);
    const offset = currentPage * PER_PAGE;

    const loadSessionsDynamic = getUserData().parents.filter((item) => {
        if (props.SearchData == "") {
            return item;
        } else if (
            item.name == null ? "" : item.name.toLowerCase().includes(props.SearchData.toLowerCase())
        ) {
            return item;
        } else if (
            item.email == null ? "" : item.email.toLowerCase().includes(props.SearchData.toLowerCase())
        ) {
            return item;
        } else if (
            item.tp_id == null ? "" : item.tp_id.toLowerCase().includes(props.SearchData.toLowerCase())
        ) {
            return item;
        }
    }).slice(offset, offset + PER_PAGE).map(function (item, key) {
        return (
            <>
                <CCard className="card p-3 friendcard mb-3 mt-3">

                    <div className="row ">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 ">
                            <CCardImage
                                src={item.profile}
                                className="img-fluid rounded mx-auto d-flex parent-guardian-image"
                            />

                        </div>
                        <div className="col-xs-12 col-sm-12 p-0 col-md-8 col-lg-8 col-xl-7 text-center text-sm-center text-md-start text-lg-start text-xl-start">
                            <div className="row m-0">

                                <div className="medium-text">
                                    <h5 className="d-inline font-weight-bold">{item.name}</h5>{" "}
                                </div>
                                <div className="normal-font text-monospace mb-1">
                                    <div className="">
                                        <FontAwesomeIcon icon={faIdCard} className="phoneicon " />
                                        &nbsp; {item.tp_id}
                                    </div>
                                </div>
                                <div className="normal-font text-monospace">
                                    <h5 className="d-inline guardianstext">{item.email}</h5>
                                </div>
                                <div className="normal-font text-monospace">
                                    <h5 className="d-inline guardianstext">Account Linked</h5>
                                </div>

                            </div>
                        </div>

                    </div>
                </CCard>

            </>
        )
    })
    return (
        <>
            {isLoading ? (<>{loader}</>) :

loadSessionsDynamic.length !== 0 ? (
                    <div>
                        <div>
                            {loadSessionsDynamic}
                            
                            {/* pagination code start */}
                            {getUserData().parents.length > 10 ? (
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
                    <NoDataContainer module="Parent/Guardian" />
                )}
        </>
    )
}
export default GuardiansParents
