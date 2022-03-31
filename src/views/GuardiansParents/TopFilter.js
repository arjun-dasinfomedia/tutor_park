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
import GuardiansParents from './GuardiansParents';

const TopFilter = () => {
    
	const [guardiansData, setGuardiansData] = useState('');

const GuardiansSearchData = (e) => {
    setGuardiansData(e.target.value)
}   
	return (
		
		<>
			
            <>
                <CCard className="course-card-list-css ">
                    <div className="course-header mb-3">
                        <div className="col-12">
                            <div className="row mt-3 d-flex">
                                <div className="text-center col-12">
                                    <div className="postsearchheader">
                                        Guardians/Parents
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 row">
                                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                                <div
                                    className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 d-flex position-relative text-center"
                                >
                                    <CFormInput
                                        onChange={(event) => GuardiansSearchData(event)}
                                        className="searchinput rounded-pill pr-5"
                                        placeholder="Search A Parent and Guardian"
                                    />
                                    <CButton className="searchbutton rounded-pill">
                                        <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                                    </CButton>
                                </div>
                                <div sm={1} md={3} lg={3} xl={3}></div>
                            </div>
                            
                        </div>
                    </div>
                </CCard>
                <GuardiansParents SearchData={guardiansData} />
            </>
		</>
	)
}
export default TopFilter
