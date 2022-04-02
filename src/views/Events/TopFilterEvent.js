import React, { useEffect, useState } from "react";
import {
    CRow,
    CCol,
    CCard,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalTitle,
    CFormInput
} from "@coreui/react";
import EventContainer from "./EventContainer";
import Controls from 'src/components/formControls/controls/Controls'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { storeMyEvents } from "./EventsActions";
import moment from "moment";
import { libraryListData } from "../../redux/actions/dropdowns/index";
import { Form, useForm } from "../../components/formControls/useForm";
import { checkAccessPermission, currencySymbole, generateUniqueID } from "src/utility/utils";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { useSelector, useDispatch } from "react-redux";

const TopFilterEvent = () => {

    const dispatch = useDispatch();
    const DropDown = useSelector((state) => state.dropdowns);
    const [transferPointID, setTransferPointID] = useState("AllEvent");
    const [searchEvents, setSearchEvents] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [visibleLg, setVisibleLg] = useState(false);
    const [meetingID, setMeetingID] = useState(null);
    const [selectedLibrary, setSelectedLibrary] = useState('');
    const [createMeetingURL, setMreateMeetingURL] = useState(null);

    const showOffline = (e) => {
        setTransferPointID(e.target.id);
    };

    useEffect(async () => {
        setMeetingID(generateUniqueID(32))
        dispatch(libraryListData());

    }, []);

    const searchEventFunction = (e) => {
        setSearchEvents(e.target.value)
    }

    const Mode = [
        { id: "Offline", name: "Offline" },
        { id: "Online", name: "Online" }
    ];

    const Audiance = [
        { id: "Kindergarten", name: "Kindergarten" },
        { id: "Primary", name: "Primary" },
        { id: "High School", name: "High School" },
        { id: "Intermediate", name: "Intermediate" },
        { id: "Degree", name: "Degree" },
        { id: "Others", name: "Others" }
    ];

    // inittial value for add event
    const initialFValues = {
        title: "",
        topic: "",
        mode: "",
        price: "",
        target_audience: "",
        other_target_audience: "",
        from_date: moment(),
        to_date: moment(),
        from_time: new Date(),
        to_time: new Date(),
        image: "",
        image_name: "",
        description: "",
        library_id: '',

    };

    // validation code start
    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ("title" in fieldValues)
            temp.title = fieldValues.title ? "" : "Please enter title.";

        if ("topic" in fieldValues)
            temp.topic = fieldValues.topic
                ? ""
                : "Please enter event topic or subject.";

        if ("mode" in fieldValues)
            temp.mode = fieldValues.mode ? "" : "Please select mode.";

        if ("target_audience" in fieldValues)
            temp.target_audience = fieldValues.target_audience ? "" : "Please select target audience.";

        if (fieldValues.target_audience === "Others") {
            if ("other_target_audience" in fieldValues)
                temp.other_target_audience = fieldValues.other_target_audience ? "" : "Please enter target audience.";
        }


        if ("price" in fieldValues)
            temp.price = fieldValues.price ? "" : "Please enter price.";

        if ("image_name" in fieldValues) {
            var imagePath = fieldValues.image_name;
            var logo = ['jpeg', 'bmp', 'svg', 'png', 'jpg']
            var extension = imagePath.substring(
                imagePath.lastIndexOf(".") + 1,
                imagePath.length
            );
            if (fieldValues.image_name) {
                if (logo.includes(extension)) {
                    temp.image_name = "";
                } else {
                    temp.image_name = "Only Jpg, png, jpg, bmp, svg  file is allowed.";
                }
            } else {
                temp.image_name = "Please Upload Course Logo.";
            }
        }

        if ("from_date" in fieldValues)
            temp.from_date = fieldValues.from_date ? "" : "Start date is required.";

        if ("to_date" in fieldValues)
            temp.to_date = fieldValues.to_date ? "" : "End date is required.";

        if (fieldValues.to_date > fieldValues.from_date) {

            initialFValues.to_date = fieldValues.from_date
        }

        if ("from_time" in fieldValues)
            temp.from_time = fieldValues.from_time ? "" : "Start time is required.";

        if ("to_time" in fieldValues)
            temp.to_time = fieldValues.to_time ? "" : "End time is required.";

        if ("description" in fieldValues)
            temp.description = fieldValues.description
                ? ""
                : "Please add your description.";

        setErrors({
            ...temp,
        });
        if (fieldValues === values) return Object.values(temp).every((x) => x === "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);

    // handle Meeting Url
    const handeleSetBBBURL = (meetingTitle) => {

        const bbb = require('bigbluebutton-js')

        let api = bbb.api(
            'https://axisclass.com/bigbluebutton/',
            'BVoHR2z2sq2C7DdkacfmLGrs22iPcy2fdzvtSuEA'
        )
        let http = bbb.http

        let meetingCreateUrl = api.administration.create(meetingTitle, meetingID, {
            duration: 100,
            attendeePW: 'secret',
            moderatorPW: 'supersecret',
        })
        setMreateMeetingURL(meetingCreateUrl)

    }

    // Handle Submit
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (validate()) {
            setLoading(true)
            delete values.image_name
            delete values.attachment_name

            let data = new FormData();
            data.append("title", values.title);
            data.append("topic", values.topic);
            data.append("mode", values.mode);
            if (values.mode === "Online") {

                handeleSetBBBURL(values.title);
            }

            data.append("meeting_id", meetingID);
            data.append("create_meeting_url", createMeetingURL);
            data.append("price", values.price);
            data.append("price", values.price);
            data.append("from_date", moment(values.from_date).format("YYYY-MM-DD"));
            data.append("to_date", moment(values.to_date).format("YYYY-MM-DD"));
            data.append("from_time", moment(values.from_time).format("hh:mm A"));
            data.append("to_time", moment(values.to_time).format("hh:mm A"));
            { values.library_id === "" ? "" : data.append("library_id", values.library_id) }
            if (values.target_audience === "Others") {
                data.append("target_audience", values.other_target_audience);
            } else {

                data.append("target_audience", values.target_audience);
            }
            data.append("image", values.image);
            data.append("description", values.description);
            for (var pair of data.entries()) {
                // console.log(pair[0] + ', ' + pair[1]);
            }
            setLoading(true)
            showLoader();
            await dispatch(storeMyEvents(data))
            resetForm();
            setVisibleLg(false);
            setLoading(false);
            hideLoader();
        }
    };

    return (
        <>
            <CModal size="lg" visible={visibleLg} onDismiss={() => setVisibleLg(false, errors !== null ? setErrors([]) :
                resetForm())}>
                <CModalHeader className="tutorviewmodalheader" onDismiss={() => setVisibleLg(false ,errors !== null ? setErrors([]):
                    resetForm())}>
                    <CModalTitle>Create Event</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Form onSubmit={handleSubmit}>
                        <CRow>
                            <CCol xl={12} sm={12} >
                                <p className="text-primary font-weight-bold">Add Details</p>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol sm={6} md={6} lg={6} xl={6}>
                                <Controls.Input
                                    name="title"
                                    label="Title *"
                                    value={values.title}
                                    labelShow={true}
                                    onChange={handleInputChange}
                                    error={errors.title}
                                />
                            </CCol>
                            <CCol sm={6} md={6} lg={6} xl={6}>
                                <Controls.Input
                                    name="topic"
                                    label="Topic/Subject *"
                                    value={values.topic}
                                    labelShow={true}
                                    onChange={handleInputChange}
                                    error={errors.topic}
                                />
                            </CCol>
                        </CRow>

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
                            <CCol sm={6} md={6} lg={6} xl={6}>
                                {/* <Controls.Select name="target_audience" label="Select Target Audiance" options={Audiance} /> */}
                                <Controls.Select
                                    name="target_audience"
                                    label="Select Target Audience *"
                                    value={values.target_audience}
                                    onChange={handleInputChange}
                                    options={Audiance}
                                    error={errors.target_audience}
                                />
                            </CCol>
                            {
                                values.target_audience === "Others" ?
                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                        <Controls.Input
                                            name="other_target_audience"
                                            label="Other Target Audience *"
                                            value={values.other_target_audience}
                                            labelShow={true}
                                            onChange={handleInputChange}
                                            error={errors.other_target_audience}
                                        /></CCol> : ""
                            }
                            <CCol sm={6} md={6} lg={6} xl={6}>
                                {/* <Controls.Select name="target_audiance" label="Select Target Audiance" options={Audiance} /> */}
                                <Controls.Select
                                    name="mode"
                                    label="Select Mode *"
                                    value={values.mode}
                                    onChange={handleInputChange}
                                    options={Mode}
                                    error={errors.mode}
                                />
                            </CCol>

                            <CCol sm={6} md={6} lg={6} xl={6}>
                                <Controls.Input
                                    name="price"
                                    label={"Price (" + currencySymbole() + ") *"}
                                    value={values.price}
                                    labelShow={true}
                                    onChange={handleInputChange}
                                    error={errors.price}
                                />
                            </CCol>
                            <CCol sm={6} md={6} lg={6} xl={6}>

                                <Controls.InputLabelShown
                                    name="image_name"
                                    label="Event Image *"
                                    type="file"
                                    value={values.image_name}
                                    onChange={handleInputChange}
                                    error={errors.image_name}
                                />
                            </CCol>
                        </CRow>

                        <CRow>

                            <CCol sm={6} md={6} lg={6} xl={6}>
                                <Controls.Select
                                    name="library_id"
                                    label="Library Items"
                                    value={values.library_id}
                                    onChange={handleInputChange}
                                    options={DropDown.libraryList}
                                />
                            </CCol>

                        </CRow>

                        <CRow className="mt-1">
                            <CCol xl={12} sm={12} >
                                <hr className="eventheaderline"></hr>
                            </CCol>
                        </CRow>

                        <CRow >
                            <CCol xl={12} sm={12} >
                                <p className="text-primary font-weight-bold">Add Schedule</p>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol sm={6} md={6} lg={6} xl={6}>
                                <Controls.DatePicker
                                    name="from_date"
                                    label="Start Date *"
                                    value={values.from_date}
                                    onChange={handleInputChange}
                                    previousDateStatus={true}
                                />
                            </CCol>

                            <CCol sm={6} md={6} lg={6} xl={6}>
                                <Controls.DatePicker
                                    name="to_date"
                                    label="End Date *"
                                    value={values.to_date}
                                    minDate={values.from_date}
                                    onChange={handleInputChange}
                                    previousDateStatus={true}
                                />
                            </CCol>
                        </CRow>

                        <CRow >
                            <CCol sm={6} md={6} lg={6} xl={6}>
                                <Controls.TimePicker
                                    name="from_time"
                                    label="Start Time *"
                                    value={values.from_time}
                                    onChange={handleInputChange}
                                />
                            </CCol>

                            <CCol sm={6} md={6} lg={6} xl={6}>
                                <Controls.TimePicker
                                    name="to_time"
                                    label="End Time *"
                                    value={values.to_time}
                                    minTime={values.from_time}
                                    onChange={handleInputChange}
                                />
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
                                <div className="d-inline">
                                    <Controls.Button type="submit" text="Add Event" className="m-1" />
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

            <div>
                <CCard className="course-card-list-css page-header-size">
                    <div className="course-header">
                        <div className="col-12">
                            <div className="row mt-3 d-flex">
                                <div className="text-center col-12">
                                    <div className="postsearchheader">
                                        Events
                                        {
                                            checkAccessPermission("events_add") ? <CButton
                                                className="d-inline textbook-add-button-css"
                                                style={{ marginBottom: 8 }}
                                                onClick={() => setVisibleLg(!visibleLg)}
                                            >
                                                Add
                                            </CButton> : null
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                                <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 searchcourse text-center">
                                    <CFormInput
                                        onChange={(event) => searchEventFunction(event)}
                                        className="notebooksearchcontrol rounded-pill m-2 pr-5"
                                        placeholder="Search Events"
                                    />
                                    <CButton className="notebooksearchbutton rounded-pill">
                                        <FontAwesomeIcon className="serchingicon" icon={faSearch} />
                                    </CButton>
                                </div>
                                <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
                            </div>
                            <div className="row mt-2 mb-3">
                                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
                                <div className="text-center col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">
                                    <CButton
                                        className={(transferPointID === 'AllEvent' ? "groupbutton-active m-1" : "groupbutton m-1")}
                                        shape="rounded-pill"
                                        onClick={showOffline}
                                        id="AllEvent"
                                    >
                                        All
                                    </CButton>
                                    <CButton
                                        className={(transferPointID === 'UpcomingEvent' ? "groupbutton-active m-1" : "groupbutton m-1")}
                                        shape="rounded-pill"
                                        onClick={showOffline}
                                        id="UpcomingEvent"
                                    >
                                        Upcoming
                                    </CButton>
                                    <CButton
                                        className={(transferPointID === 'EventHistory' ? "groupbutton-active m-1" : "groupbutton m-1")}
                                        shape="rounded-pill"
                                        onClick={showOffline}
                                        id="EventHistory"
                                    >
                                        History
                                    </CButton>
                                </div>
                                <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2"></div>
                            </div>
                        </div>
                    </div>
                </CCard>
                <EventContainer Data={transferPointID} searchKeyword={searchEvents} />
            </div>
        </>
    );
};
export default TopFilterEvent;
