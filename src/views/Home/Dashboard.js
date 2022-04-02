import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { getUserRole, getUserData } from "src/utility/utils";
import CommentViewTimeLine from "../Timeline/commentViewTimeLine";
import { getAllTimeline } from "./HomeAction";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import {
  CRow,
  CCol,
  CCard,
  CButton,
  CDropdownDivider,
  CCardImage,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CLink,
  CDropdownItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
} from "@coreui/react";
import * as yup from "yup";
import {
  FormControl,
  InputLabel,
} from "@material-ui/core";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import {
  likeTimeLine,
  disLikeTimeLine,
  favouriteTimeLine,
  addCommentTimeLine,
  abuseTimeLine,
} from "./HomeAction";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field, FieldArray } from "formik";
import Swal from "sweetalert2";

let errorMessage = ""
const Dashboard = () => {

  const dispatch = useDispatch();

  // loader variable
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const timeLineState = useSelector((state) => state.HomeReducer);
  // Modal Variable
  const [viewCommentTimeLineModal, setViewCommentTimeLineModal] = useState();
  const [commentViewData, setCommentViewData] = useState();
  const [commentdata, setCommentdata] = useState()

  // Comment Code Start
  const emptysection = { comment: "" };

  const renderAbuseUnAbuseActionMenu = (abuserArray, abuseEmail, id) => {

    var abuseStatus = abuserArray.some(item => abuseEmail === item.email)
    {
      return (
        abuseStatus === true ?
          <CDropdownItem
            onClick={() => addTimeLineUnAbuse(id)}
          >
            Mark As UnAbuse
          </CDropdownItem>
          :
          <CDropdownItem
            onClick={() => addTimeLineAbuse(id)}
          >
            Mark As Abuse
          </CDropdownItem>
      )
    }
  };

  // UnAbuse Timeline Post
  const addTimeLineUnAbuse = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to UnAbuse the Post !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, UnAbuse it",
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(abuseTimeLine({ id: data }))
        }
      });
  }

  const addTimeLineAbuse = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Abuse the Post !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Abuse it",
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(abuseTimeLine({ id: data }))
        }
      });
  }

  const initialValues = {
    Addsections: [emptysection],
  }
  const validationSchema = yup.object({

    Addsections: yup
      .array().of(
        yup.object().shape({
          comment: yup.string().required("Please Enter Commments"),

        })
      ),
  });
  // Library Comment Code End

  // timeline list affect
  useEffect(async () => {
    showLoader();
    await dispatch(getAllTimeline());
    setLoading(false);
    hideLoader();
  }, []);

  // like for timeline post function
  const addTimeLineLike = (data) => {
    dispatch(likeTimeLine({ id: data }));
  };

  // dislike for timeline post function
  const addTimeLineDisLike = (data) => {
    dispatch(disLikeTimeLine({ id: data }));
  };

  // favourite for timeline post function
  const addTimeLineFavourite = (data) => {
    dispatch(favouriteTimeLine({ id: data }));
  };

  // list Comment
  const listCommentTimeLine = (id) => {
    setViewCommentTimeLineModal(true);
    setCommentViewData(id);
  };

  // Search Filter
  const loadOtherTimeLineListData = timeLineState.allTimeline.map(function (
    item,
    key
  ) {
    return (
      <div className="timelinelist" key={key}>
        <div className="timelinerow1"></div>
        <CRow>
          <CCol>
            <CCard className="friendcard p-3 ">
              <div className="d-flex align-items-center mb-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className=" col-md-1 col-lg-1 col-xl-1">
                  <CCardImage className="rounded-pill timeline-name font-weight-bold position-relative" />
                  <h5 className="position-absolute time-line-user-name">TP</h5>
                </div>
                <div className="ml-2  col-sm-10 col-md-10 col-lg-10 col-xl-10">
                  <div className="">
                    <div className="card-title d-inline font-weight-bold">
                      {item.creator}
                    </div>{" "}
                    &nbsp;
                    <div className="medium-text d-inline ">
                      {getUserRole() === "student" ? <>({item.class})</> : ""}
                      {getUserRole() === "school-student" ? (
                        <>
                          {item.linked_item !== null ? (
                            <>({item.linked_item.division_name})</>
                          ) : (
                            <>(N/A)</>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <span className="normal-font">{item.datetime}</span>
                </div>
                <div className="ml-2 ">
                  {item.total_abuse === 0 ? (
                    ""
                  ) : (
                    <div className="text-danger">
                      <ReportGmailerrorredOutlinedIcon />
                    </div>
                  )}
                  <div className="d-inline r-dot-menu position-absolute ml-4">
                    <div className="three-dot-menu position-absolute">
                      <CDropdown variant="nav-item" className="d-md-inline marker-remove-textbook-css mr-3">
                        <CDropdownToggle placement="bottom-end" className="py-0 menu-css d-inline" caret={false}>
                          <div className="tutortoggle m-1 material-icons">
                            <MoreVertIcon />
                          </div>
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0 course-action-dropdown-menu-css m-2" placement="bottom-end">
                          {item.total_abuse === 0 ?
                            (<CDropdownItem
                              onClick={() => addTimeLineAbuse(item.id)}
                            >
                              Mark As Abuse
                            </CDropdownItem>)
                            :
                            <>
                              {
                                renderAbuseUnAbuseActionMenu(item.abuseBy, getUserData().email, item.id)
                              }
                            </>
                          }

                        </CDropdownMenu>
                      </CDropdown>
                    </div>
                  </div>
                </div>
              </div>
              <CDropdownDivider className="mb-2 divider" />
              <div className="mt-1 normal-font">{item.description}</div>
              <span>
                {item.video !== null ? (
                  <>
                    <div sm={12} md={12} lg={12} xl={12} className="mt-3">
                      <video controls className="timelinevideo">
                        <source
                          src={item.video}
                          type="video/mp4"
                          className=""
                        ></source>
                      </video>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </span>
              <span>
                {item.image !== null ? (
                  <>
                    <div sm={12} md={12} lg={12} xl={12} className="mt-3">
                      <img src={item.image} className="img-fluid" />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </span>
              <span className="mt-2">
                {item.link_type === "SchoolDiary" ? (
                  <>
                    <div sm={12} md={12} lg={12} xl={12} className="mt-3">
                      1)ClassWork :- {item.linked_item.details.class_work}
                      <div>
                        <CLink
                          className="text-decoration-none timeline-attachment-css"
                          href={item.linked_item.details.class_work_attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Class Work Attachment
                        </CLink>
                      </div>
                    </div>
                    <div sm={12} md={12} lg={12} xl={12} className="mt-3">
                      1)HomeWork :- {item.linked_item.details.home_work}
                      <div>
                        <CLink
                          className="text-decoration-none timeline-attachment-css"
                          href={item.linked_item.details.home_work_attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Home Work Attachment
                        </CLink>
                      </div>
                    </div>
                    <div sm={12} md={12} lg={12} xl={12} className="mt-3">
                      1)Tomorrow Topic :-{" "}
                      {item.linked_item.details.tomorrow_topics}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </span>
              <div className="mt-2 mb-2 ">
                <CButton className="timeline-icon-button questionicon pt-0">
                  <div
                    className={
                      item.total_like === 0
                        ? "timelineicon m-1 material-icons"
                        : "timelineicon-active  m-1 material-icons"
                    }
                    onClick={() => addTimeLineLike(item.id)}
                    id="likeTimeLine"
                  >
                    <ThumbUpIcon />
                  </div>
                  <br />
                  <span className="h6">{item.total_like}</span>
                </CButton>
                <CButton className="timeline-icon-button questionicon mb-4 pt-0">
                  <div
                    className={
                      item.favouriteBy.length !== 0
                        ? "text-danger m-1 material-icons"
                        : "m-1 material-icons"
                    }
                    onClick={() => addTimeLineFavourite(item.id)}
                    id="likeTimeLine"
                  >
                    <FavoriteIcon />
                  </div>
                  <br />
                </CButton>
                <CButton className="timeline-icon-button questionicon pt-0">
                  <div
                    className={
                      item.total_dislike === 0
                        ? "timelineicon m-1 material-icons"
                        : "timelineicon-active  m-1 material-icons"
                    }
                    onClick={() => addTimeLineDisLike(item.id)}
                    id="likeTimeLine"
                  >
                    <ThumbDownIcon />
                  </div>
                  <br />
                  <span className="h6">{item.total_dislike}</span>
                </CButton>

                <CButton className="timeline-icon-button questionicon pt-0">
                  <div
                    className={
                      item.total_comments === 0
                        ? "timelineicon m-1 material-icons"
                        : "timelineicon-active  m-1 material-icons"
                    }
                    onClick={() => listCommentTimeLine(item)}
                    id="likeTimeLine"
                  >
                    <ChatBubbleIcon />
                  </div>

                  <br />
                  <span className="h6">{item.total_comments}</span>
                </CButton>
              </div>
              <div
                className="m-2 pb-1 searchcourse"
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <Formik
                  initialValues={initialValues}
                  // validationSchema={validationSchema}
                  onSubmit={async (values) => {

                    const data = values.Addsections[1].comment;

                    let formdata = new FormData();
                    formdata.append("id", item.id);
                    formdata.append("comment", data);


                    dispatch(addCommentTimeLine({ id: item.id, comment: data }));
                    errorMessage = "1"
                    values.Addsections[1].comment = ""


                  }}
                >
                  {({ values, errors, isSubmitting, isValid }) => (
                    <div className="mb-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <Form>
                        <FieldArray name="Addsections">
                          {({ push, remove }) => (
                            <React.Fragment>

                              <div className="mt-3 ">
                                <div>
                                  <FormControl variant="outlined">
                                    <InputLabel className=""></InputLabel>
                                    <Field
                                      className="comments-message-control pl-2 rounded-pill pr-5"
                                      placeholder="Write Comment"
                                      name={`Addsections.${1}.comment`}
                                      label="Add Comment"
                                      autoComplete="off"
                                      variant="outlined"
                                      
                                    >
                                    </Field>
                                  </FormControl>
                                </div>
                              </div>
                            </React.Fragment>
                          )}
                        </FieldArray>

                        
                          <div className="row mt-4">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                              <div>
                                <CButton
                                  className="library-comments-button rounded-pill position-absolute"
                                  id="commentbutton"
                                  type="submit"
                                >
                                  <FontAwesomeIcon icon={faPaperPlane} />
                                </CButton>
                              </div>
                            </div>
                          </div>

                      </Form>
                    </div>
                  )
                  }

                </Formik>
              </div>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  });

  return (
    <div>
      {isLoading ? (
        <>{loader}</>
      ) : timeLineState.allTimeline.length !== 0 ? (
        <div>
          {loadOtherTimeLineListData}
          <div className="mb-3"></div>

          <CModal
            visible={viewCommentTimeLineModal}
            size="xl"
            onDismiss={() => setViewCommentTimeLineModal(false)}
          >
            <CModalHeader
              onDismiss={() => setViewCommentTimeLineModal(false)}
              className="tutorviewmodalheader"
            >
              <CModalTitle>View Comments</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CommentViewTimeLine data={commentViewData} />
            </CModalBody>
          </CModal>
          {/* pagination code end */}
          {/* Timeline Edit Modal */}
        </div>
      ) : (
        <NoDataContainer module="Timeline" />
      )}
    </div>
  );
};

export default Dashboard;
