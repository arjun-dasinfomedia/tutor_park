import React, { useState } from "react";
import {
    CRow,
    CCol,
    CCard,
    CFormInput,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalTitle,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { storeTimeLine } from "./TImeLineAction";
import { Form, useForm } from "../../components/formControls/useForm";
import Controls from 'src/components/formControls/controls/Controls';
import { useDispatch, useSelector } from "react-redux";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import TimeLineContainer from "./TimeLineContainer";
import { checkAccessPermission } from "src/utility/utils";

// main top header class start
const TopFilterTimeLine = () => {

    const showOffline = (e) => {
        setTransferPointID(e.target.id);
    };

    // Dropdown option for Audiance
    const Audiance = [
        { id: "Kindergarten", name: "Kindergarten" },
        { id: "Primary", name: "Primary" },
        { id: "High School", name: "High School" },
        { id: "Intermediate", name: "Intermediate" },
        { id: "Degree", name: "Degree" },
        { id: "Others", name: "Others" }
    ];
    // loader variable
    const [isLoading, setLoading] = useState(true);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [transferPointID, setTransferPointID] = useState("OtherTimeline");

    // dispatch method
    const dispatch = useDispatch();

    // Search filter variable
    const [searchTimeLine, setSearchTimeLine] = useState("");

    // Modal Variable
    const [addTimeLineModal, setAddTimeLineModal] = useState(false);

    // validation Code start
    const initialFValues = {

        audiance: "",
        other_audiance: "",
        image: "",
        image_name: "",
        description: "",
        video: "",
        video_name: "",
    };

    // validation Code Start
    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ("audiance" in fieldValues)
            temp.audiance = fieldValues.audiance ? "" : "Please select target audience.";

        if (fieldValues.audiance === "Others") {
            if ("other_audiance" in fieldValues)
                temp.other_audiance = fieldValues.other_audiance ? "" : "Please enter target audience.";
        }

        if ("description" in fieldValues)
            temp.description = fieldValues.description
                ? ""
                : "Please add your description.";

        
        if ("video_name" in fieldValues) {
            var imagePath = fieldValues.video_name;
            var logo = ['mp4','mov','wmv','mkv','avi']
            var extension = imagePath.substring(
                imagePath.lastIndexOf(".") + 1,
                imagePath.length
            );
            if (fieldValues.video_name) {
                if (logo.includes(extension)) {

                    temp.video_name = "";
                } else {

                    temp.video_name = "Only mp4, mov, wmv, mkv and avi  file is allowed.";
                }
            } else {
                temp.video_name = "";
            }
        }
        if ("image_name" in fieldValues) {
            var imagePath = fieldValues.image_name;
            var logo = ['jpeg', 'png', 'jpg']
            var extension = imagePath.substring(
                imagePath.lastIndexOf(".") + 1,
                imagePath.length
            );
            if (fieldValues.image_name) {
                if (logo.includes(extension)) {

                    temp.image_name = "";
                } else {

                    temp.image_name = "Only Jpg, png and jpg  file is allowed.";
                }
            } else {
                temp.image_name = "";
            }
        }

        setErrors({
            ...temp,
        });
        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);
    // validation code end

    // handle add form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true)
            delete values.video_name;
            delete values.image_name;

            let data = new FormData();
            if (values.audiance == "Others") {
                data.append("audiance", values.other_audiance);
            } else {
                data.append("audiance", values.audiance)
            }
            data.append("description", values.description);
            data.append("video", values.video);
            data.append("image", values.image);

            for (var pair of data.entries()) {
                // console.log(pair[0] + ', ' + pair[1]);
            }
            // return false;
            setLoading(true)
            showLoader();
            dispatch(storeTimeLine(data))
            resetForm();
            setAddTimeLineModal(false);
            setLoading(false);
            hideLoader();
        }
    }

    return (
        <>
            <CModal size="lg" visible={addTimeLineModal} onDismiss={() => setAddTimeLineModal(false)}>
                <CModalHeader className="tutorviewmodalheader" onDismiss={() => setAddTimeLineModal(false)}>
                    <CModalTitle>Create Timeline</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Form onSubmit={handleSubmit}>
                        <CRow>
                            <CCol sm={6} md={6} lg={6} xl={6}>

                                <Controls.Select
                                    name="audiance"
                                    label="Select Target Audience *"
                                    value={values.audiance}
                                    onChange={handleInputChange}
                                    options={Audiance}
                                    error={errors.audiance}
                                />
                            </CCol>
                            {
                                values.audiance == "Others" ?
                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                        <Controls.Input
                                            name="other_audiance"
                                            label="Other Target Audience *"
                                            value={values.other_audiance}
                                            labelShow={true}
                                            onChange={handleInputChange}
                                            error={errors.other_audiance}
                                        />
                                    </CCol>
                                    : ""
                            }
                            <CRow>
                                <CCol xl={12} sm={12}>
                                    <Controls.CustomTextArea
                                        label="Description *"
                                        rows={3}
                                        name="description"
                                        value={values.description}
                                        onChange={handleInputChange}
                                        error={errors.description}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xl={6} sm={6} className="">
                                    <Controls.InputLabelShown
                                        label="Timeline Image"
                                        name="image_name"
                                        type="file"
                                        value={values.image_name}
                                        onChange={handleInputChange}
                                        error={errors.image_name}
                                    />
                                </CCol>

                                <CCol xl={6} sm={6} className="">
                                    <Controls.InputLabelShown
                                        label="Timeline Video"
                                        name="video_name"
                                        type="file"
                                        value={values.video_name}
                                        onChange={handleInputChange}
                                        error={errors.video_name}
                                    />
                                </CCol>
                            </CRow>

                        </CRow>

                        <CRow>
                            <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
                                <div className="d-inline">
                                    <Controls.Button type="submit" text="Add TimeLine" className="m-1" />
                                </div>
                                <div className="d-inline">
                                    <Controls.Button
                                        className="m-1"
                                        text="Reset"
                                        color="default"
                                        onClick={resetForm}
                                    />
                                </div>
                            </CCol>
                        </CRow>
                    </Form>
                </CModalBody>
            </CModal>

            <div style={{ marginTop: "15px" }}>
                <CRow>
                    <CCol>
                        <CCard className="timeline-header-css ">
                            <div className="PostHeader">
                                <div className="mt-3 text-center">
                                    <div className="page-header-size ">
                                        Timeline
                                        {
                                            checkAccessPermission('timeline_add') ? <CButton
                                                className="d-inline textbook-add-button-css"
                                                onClick={() => setAddTimeLineModal(!addTimeLineModal)}
                                            >
                                                Add
                                            </CButton> : null
                                        }
                                    </div>
                                </div>

                                <div className="row mb-1">
                                    <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                                    <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 searchcourse text-center">
                                        <CFormInput
                                            onChange={(event) => setSearchTimeLine(event.target.value)}
                                            className="notebooksearchcontrol rounded-pill m-2 pr-5"
                                            placeholder="Search by Name, class and Description etc."
                                        />
                                        <CButton className="notebooksearchbutton rounded-pill">
                                            <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                                        </CButton>
                                    </div>
                                    <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                                </div>
                            </div>
                            <div className="row mt-2 mb-3">
                                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
                                <div className="text-center col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">

                                    <CButton
                                        className={(transferPointID === 'OtherTimeline' ? "groupbutton-active m-1" : "groupbutton m-1")}
                                        shape="rounded-pill"
                                        onClick={showOffline}
                                        id="OtherTimeline"
                                    >
                                        Timeline
                                    </CButton>

                                    <CButton
                                        className={(transferPointID === 'MyTimeline' ? "groupbutton-active m-1" : "groupbutton m-1")}
                                        shape="rounded-pill"
                                        onClick={showOffline}
                                        id="MyTimeline"
                                    >
                                        My Timeline
                                    </CButton>

                                </div>
                                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
                            </div>
                        </CCard>
                    </CCol>
                </CRow>
                <TimeLineContainer Data={transferPointID} searchData={searchTimeLine} />
            </div>
        </>
    );
};

export default TopFilterTimeLine;
