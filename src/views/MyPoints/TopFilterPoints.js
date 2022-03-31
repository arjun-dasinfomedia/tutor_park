import React, { useState } from "react";
import {
	CCard,
	CButton,
} from "@coreui/react";
import PointsContainer from "./PointsContainer";
import {
	checkAccessPermission
} from "src/utility/utils";

const TopFilterPoints = () => {

	const [transferPointID, setTransferPointID] = useState("PointsHistory");

	const showOffline = (e) => {
		setTransferPointID(e.target.id);
	};
	
	return (
		<>
			<div>
				<CCard className="course-card-list-css">
					<div className="course-header">
						<div sm={12} md={12} lg={12} xl={12}>
							<div className="textbook-title-row-css d-flex">
								<div className="text-center col-12 mt-3">
									<div className="page-header-size">My Points</div>
								</div>
							</div>
							<div className="row mt-1 mb-3">
								<div className="col-md-1 col-lg-1 col-xl-1"></div>
								<div className="text-center col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 text-center">
									<CButton
										shape="rounded-pill"
										onClick={showOffline}
										className={(transferPointID === 'PointsHistory' ? "groupbutton-active m-1" : "groupbutton m-1")}
										id="PointsHistory"
									>
										Point History
									</CButton>
									{
										(checkAccessPermission("my_points_add") || checkAccessPermission("my_points_edit")) ? 
										<CButton
											shape="rounded-pill"
											onClick={showOffline}
											className={(transferPointID === 'TransferPoints' ? "groupbutton-active m-1" : "groupbutton m-1")}
											id="TransferPoints"
										>
											Transfer Points
										</CButton> : null
									}

								</div>
								<div className="col-md-1 col-lg-1 col-xl-1"></div>
							</div>
						</div>
					</div>
				</CCard>
				<PointsContainer Data={transferPointID} />
			</div>
		</>
	);
};
export default TopFilterPoints;
