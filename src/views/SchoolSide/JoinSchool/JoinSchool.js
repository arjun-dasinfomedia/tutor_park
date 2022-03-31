import React, { useState, useEffect } from 'react'
import {
    CCard,
    CButton,
    CRow,
    CCol,
    CCardImage,
    CTooltip,
} from '@coreui/react'
import useFullPageLoader from "src/hooks/useFullPageLoader";
import Swal from "sweetalert2";
import profile2 from "../../../assets/images/FindTutor/unnamed.jpg";
import {
    getSchoolList,
    joinMySchool,
} from "./JoinSchoolAction"
import { useDispatch, useSelector } from 'react-redux';
import NoDataContainer from 'src/views/NoDataContainer/noDataContainer';
import ReactPaginate from "react-paginate";

let PER_PAGE = 10

const JoinSchool = (props) => {

    // console.log(props)
    const dispatch = new useDispatch()
    const [viewvisible, setViewVisible] = useState(false);
    const joinSchool = useSelector((state) => state.joinSchool);
    const [addVisible, setAddVisible] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [isLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
        window.scrollTo(0,0)
    }

    const JoinSchoolWithUser = (data) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to Join The School?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(joinMySchool({ school_id: data.id }));
            }
        });
    }

    useEffect(async () => {
        showLoader();
        await dispatch(getSchoolList());

        setLoading(false);
        hideLoader();
    }, []);

    const pageCount = Math.ceil(joinSchool.schoolList.length / PER_PAGE);
    const offset = currentPage * PER_PAGE;

    // Main School List
    const loadAllJoinSchoolClassListData = joinSchool.schoolList
        .filter((item) => {

            if (props.search == "") {
                return item;
            } else if (
                item.school_name == null ? "" : item.school_name.toLowerCase().includes(props.search.toLowerCase())
            ) {
                return item;
            } else if (
                item.registration_no == null ? "" : item.registration_no.toLowerCase().includes(props.search.toLowerCase())
            ) {
                return item;
            } else if (
                item.city == null ? "" : item.city.toLowerCase().includes(props.search.toLowerCase())
            ) {
                return item;
            } else if (
                item.pincode == null ? "" : item.pincode.toLowerCase().includes(props.search.toLowerCase())
            ) {
                return item;
            } else if (
                item.mobile == null ? "" : item.mobile.toLowerCase().includes(props.search.toLowerCase())
            ) {
                return item;
            } else if (
                item.email == null ? "" : item.email.toLowerCase().includes(props.search.toLowerCase())
            ) {
                return item;
            }
            else if (
                item.principal == null ? "" : item.principal.toLowerCase().includes(props.search.toLowerCase())
            ) {
                return item;
            }
            else if (
                item.vice_principal == null ? "" : item.vice_principal.toLowerCase().includes(props.search.toLowerCase())
            ) {
                return item;
            } else if (
                item.incharge == null ? "" : item.incharge.toLowerCase().includes(props.search.toLowerCase())
            ) {
                return item;
            }

        })
        .slice(offset, offset + PER_PAGE)
        .map(function (item, key) {
            return (
                <>
                    <CRow>
                        <CCol>
                            <CCard className="card p-3 assigncard mt-3 mb-3">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-2">
                                        <CCardImage
                                            src={item.image == null ? profile2 : item.image}
                                            className="img-fluid rounded mx-auto d-flex serchcourse-image"
                                        />
                                    </div>
                                    <div className=" col-12 col-sm-12 col-md-8 col-lg-8 col-xl-7">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start card-title font-weight-bold ">
                                                {item.school_name}
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                            <div className="row">
                                                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 ">
                                                    <h6 className="font-weight-bold">Registration Number</h6>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                                    <h6 >{item.registration_no}</h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 ">
                                                    <h6 className="font-weight-bold">City</h6>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                                    <h6 >{item.city}</h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 ">
                                                    <h6 className="font-weight-bold">Pin code</h6>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                                    <h6 >{item.pincode}</h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 ">
                                                    <h6 className="font-weight-bold">Mobile Number</h6>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                                    <h6>{item.mobile}</h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 ">
                                                    <h6 className="font-weight-bold">Email address</h6>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                                    <h6>{item.email}</h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 ">
                                                    <h6 className="font-weight-bold">School Principal</h6>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                                    <h6>{item.principal == null ? "N/A" : item.principal}</h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 ">
                                                    <h6 className="font-weight-bold">School Vice-Principal</h6>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                                    <h6>{item.vice_principal == null ? "N/A" : item.vice_principal}</h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 ">
                                                    <h6 className="font-weight-bold">Shool Incharge</h6>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                                    <h6>{item.incharge == null ? "N/A" : item.incharge}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 d-flex justify-content-center align-items-center">
                                        <CRow className="text-end text-col-center text-sm-center text-md-start text-lg-start text-xl-start">

                                            <CCol className="text-center text-col-center text-sm-center text-md-center text-lg-center text-xl-center" sm={12} md={12} lg={12} xl={12}>
                                                <CTooltip content="Join" placement="bottom">
                                                    <CButton className="btn rounded-pill m-1 roundshap-button mathimagebox"
                                                        onClick={() => JoinSchoolWithUser(item)}

                                                    >
                                                        Join School
                                                    </CButton>
                                                </CTooltip>
                                            </CCol>
                                        </CRow>
                                    </div>
                                </div>
                            </CCard>
                        </CCol>
                    </CRow>
                </>
            )
        })

    return (
        <>

            <div>{isLoading ? (
                <>{loader}</>
            ) :
                loadAllJoinSchoolClassListData.length !== 0 ? (

                    <div>
                       
                        {loadAllJoinSchoolClassListData}

                        {/* pagination code start */}
                        {joinSchool.schoolList.length > 10 ? (
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
                    <NoDataContainer module="For Join School" />
                )}
            </div>
        </>
    )
}

export default JoinSchool
