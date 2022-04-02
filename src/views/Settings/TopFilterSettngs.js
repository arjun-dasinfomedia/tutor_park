import React, { useState, useEffect } from "react";
import {
    CCard,
    CButton,
} from "@coreui/react";
import SettingContainer from "./SettingContainer";
import { getMyAllPointsList, getRazorPaySettings } from "./SettingAction"
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { useDispatch } from "react-redux";

const TopFilterSettings = () => {
    const [isLoading, setLoading] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const dispatch = useDispatch();
    useEffect(() => {

    }, []);
    useEffect(async () => {
        showLoader();
        await dispatch(getMyAllPointsList());
        await dispatch(getRazorPaySettings())
        setLoading(false);
        hideLoader();
    }, []);
    const [transferPointID, setTransferPointID] = useState("PointSystem");

    const showOffline = (e) => {
        setTransferPointID(e.target.id);
    };


    return (
        <>
            <div>
                <CCard className="course-card-list-css page-header-size">
                    <div className="course-header">
                        <div className="col-12">
                            <div className="row mt-3 d-flex">
                                <div className="text-center col-12">
                                    <div className="postsearchheader">
                                        General Settings
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2 mb-3">
                                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
                                <div className="text-center col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">
                                    <CButton
                                        className={(transferPointID === 'PointSystem' ? "groupbutton-active m-1" : "groupbutton m-1")}
                                        shape="rounded-pill"
                                        onClick={showOffline}
                                        id="PointSystem"
                                    >
                                        Point System
                                    </CButton>
                                    <CButton
                                        className={(transferPointID === 'OtherSetting' ? "groupbutton-active m-1" : "groupbutton m-1")}
                                        shape="rounded-pill"
                                        onClick={showOffline}
                                        id="OtherSetting"
                                    >
                                        Razorpay Setting
                                    </CButton>
                                </div>
                                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
                            </div>
                        </div>
                    </div>
                </CCard>
                <SettingContainer Data={transferPointID} />
            </div>
        </>
    )
}

export default TopFilterSettings