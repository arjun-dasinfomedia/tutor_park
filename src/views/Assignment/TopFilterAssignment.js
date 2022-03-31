import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	CCard,
	CButton,
	CFormInput,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { getUserData } from "src/utility/utils";

const TopFilterAssignment = () => {

	const [searchAssignment, setSearchAssignment] = useState("");
	const [assignmentID, setAssignmentID] = useState("");
	const showOffline = (e) => {
		setAssignmentID(e.target.id);
	};


	return (
		<>

			<CCard className="course-card-list-css page-header-size">
				<div className="course-header">
					<div className="col-12">
						<div className="row mt-3 d-flex">
							<div className="text-center col-12">
								<div className="postsearchheader">
									Assignment
									<Link to="/add-assignment" className="text-decoration-none">
										<CButton
											className="d-inline textbook-add-button-css w-auto "
										>
											Create Assignment
										</CButton></Link>
								</div>
							</div>
						</div>
						<div className="mt-2 row mb-3">
							<div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
							<div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 d-flex position-relative text-center">
								<CFormInput
									className="searchinput rounded-pill pr-5"
									placeholder="Search Assignment"
									onChange={(event) => setSearchAssignment(event.target.value)}
								></CFormInput>
								<CButton className="searchbutton position-absolute rounded-pill">
									{" "}
									<FontAwesomeIcon className="serchingicon" icon={faSearch} />
								</CButton>
							</div>
							<div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
						</div>
						<div className="row mt-1 mb-3">
							<div className="col-md-1 col-lg-1 col-xl-1"></div>
							<div className="text-center col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 text-center">
								{getUserData().role_name == "tutor" ?
									<>
										<Link to="/assignment" >
											<CButton
												className="groupbutton m-1"
												shape="rounded-pill"
												onClick={showOffline}
												className={
													assignmentID === "draftId"
														? "groupbutton-active m-1"
														: "groupbutton m-1"
												}
												id="draftId"

											>
												Draft

											</CButton>
										</Link>


										<Link to="/publish-assignment" >
											<CButton
												className="groupbutton m-1"
												shape="rounded-pill"
												onClick={showOffline}
												className={
													assignmentID === "publish"
														? "groupbutton-active m-1"
														: "groupbutton m-1"
												}
												id="publish"
											>
												Publish
											</CButton>
										</Link>
										<Link to="/question-bank">
											<CButton
												className="groupbutton m-1"
												shape="rounded-pill"
												onClick={showOffline}
												className={
													assignmentID === "Question Bank"
														? "groupbutton-active m-1"
														: "groupbutton m-1"
												}
												id="Question Bank"
											>
												Question Bank

											</CButton>
										</Link>
									</>
									: " "}
								{getUserData().role_name == "student" ?
									<>
										<Link to="/assignment" >
											<CButton
												className="groupbutton m-1"
												shape="rounded-pill"
												onClick={showOffline}
												className="groupbutton-active m-1"
												id="publish"
											>
												Assigned
											</CButton>
										</Link>
										<Link to="/attempt-student" >
											<CButton
												className="groupbutton m-1"
												shape="rounded-pill"
												onClick={showOffline}
												className="groupbutton m-1"
												id="draftId"

											>
												Attempted

											</CButton>
										</Link>
									</>
									: ""}
							</div>
						</div>
					</div>
				</div>
			</CCard>
		</>
	);
};

export default TopFilterAssignment;
