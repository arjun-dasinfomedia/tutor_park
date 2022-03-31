import {
	CCard,
	CButton,
	CFormInput,
} from '@coreui/react'
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import {
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import SessionsContainer from './SessionsContainer';
import CustomAlertControl from '../../AlertMessage';
import { checkAccessPermission } from 'src/utility/utils'
import Page403 from '../../pages/page403/Page403';

const TopFilter = () => {

	const [mysessionID, setMySessionID] = useState('Upcoming')
	const [upcomingSession, setUpcomingSession] = useState('');

	const showOffline = (e) => {
        setMySessionID(e.target.id)
    }

	return (
		
		<>
			{
				checkAccessPermission('school_sessions_view') ? 
				<>
					<CustomAlertControl />
					<CCard className="course-card-list-css">
						<div className="course-header">
							<div className="col-12">
								<div className="row mt-3 d-flex">
									<div className="text-center col-12">
										<div className="postsearchheader">
											My Sessions
											{/* <CButton
												// className="d-inline textbook-add-button-css"
											// onClick={() => setVisibleLg(!visibleLg)}
											//>*/}
												{/* Add
											</CButton> */}
										</div>
									</div>
								</div>
								<div className="mt-2 row">
									<div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
									<div
										className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 d-flex position-relative text-center"
									>
										<CFormInput
											onChange={(event) => setUpcomingSession(event.target.value)}
											className="searchinput rounded-pill pr-5"
											placeholder="Search A My Sessions"
										/>
										<CButton className="searchbutton rounded-pill">
											<FontAwesomeIcon className="serchingicon" icon={faSearch} />
										</CButton>
									</div>
									<div sm={1} md={3} lg={3} xl={3}></div>
								</div>
								<div className="row mt-2 mb-3 ">
									<div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
									<div className="text-center col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">
										<CButton className={( mysessionID === 'Upcoming' ? "groupbutton-active m-1" : "groupbutton m-1")} shape="rounded-pill" onClick={showOffline} id='Upcoming'>
											Upcoming Sessions
										</CButton>
										<CButton className={( mysessionID === 'Complete' ? "groupbutton-active m-1" : "groupbutton m-1")} shape="rounded-pill" onClick={showOffline} id='Complete'>
											Completed Sessions
										</CButton>
										<CButton className={( mysessionID === 'All' ? "groupbutton-active m-1" : "groupbutton m-1")} shape="rounded-pill" onClick={showOffline} id='All'>
											All Sessions
										</CButton>
									</div>
									<div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
								</div>
							</div>
						</div>
					</CCard>
					<SessionsContainer Data={mysessionID} SearchAll={upcomingSession} />
				</>	
				: (<><Page403 /></>)
			}
			
		</>
	)
}
export default TopFilter
