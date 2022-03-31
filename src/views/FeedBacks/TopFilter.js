import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { CCard, CFormInput, CButton } from "@coreui/react";
import FeedBacks from "./FeedBacks";
import { useState } from "react";
import CustomAlertControl from "../AlertMessage";
const TopFilter = () => {
  const [feedbacksearch, setFeedbackSearch] = useState("");

  const FeedbackSearchData = (e) => {
    setFeedbackSearch(e.target.value)
  }
  return (
    <>
      <CustomAlertControl />
      <div style={{ marginTop: "15px" }}>
        <CCard className="timeline-header-css">
          <div className="PostHeader mt-3">
            <div className="text-center">
              <div className="page-header-size">Feedback</div>
            </div>
          </div>
          <div className="row mt-1 mb-3">
            <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
            <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 searchcourse text-center">
              <CFormInput
                onChange={(event) => FeedbackSearchData(event)}
                className="notebooksearchcontrol rounded-pill m-2"
                placeholder="Search A Feedback"
              />
              <CButton className="notebooksearchbutton rounded-pill">
                <FontAwesomeIcon className="serchingicon" icon={faSearch} />
              </CButton>
            </div>
            <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
          </div>
        </CCard>
        <div>
          <FeedBacks searchData={feedbacksearch} />
        </div>
      </div>
    </>
  );
};
export default TopFilter;
