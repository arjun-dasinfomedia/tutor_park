import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVihara } from "@fortawesome/free-solid-svg-icons";
import {
    CRow,
    CCol,
    CCardText,
    CDropdownDivider,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
} from "@coreui/react";
import {
    libraryListData,
    syllabusListData,
} from "../../redux/actions/dropdowns/index";
import {
    getAllTeachingMode,
    getUserData,
} from "../../utility/utils";
import { useSelector, useDispatch } from "react-redux";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import moment from "moment";
import { updateTuition } from "./TuitionActions";
import CustomAlertControl from "../AlertMessage";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { currencySymbole } from "../../utility/utils";
import Checkbox from "@mui/material/Checkbox";

// items for teaching mode radio button
const teachingTypeItems = [
    { id: "individual", title: "Individual" },
    { id: "group", title: "Group" },
];

const EditTuition = (data) => {


    const dispatch = useDispatch();
    const DropDown = useSelector((state) => state.dropdowns);
    const [visibleLg, setVisibleLg] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [schdeuleData, setSchdeuleData] = useState([]);
    const [schdeuleStatus, setSchdeuleStatus] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [startDate, setStartDate] = useState(data.data.start_date)
    const store = useSelector((state) => state.TuitionReducer);

    const schedulesToSave = [];
    data.data.availability.map((data, id) =>
        schedulesToSave.push(data.id)
    )


    const onAddingItem = (item) => {
        const isChecked = item.target.checked;
        const value = item.target.value;

        if (isChecked) {
            schedulesToSave.push(value);
            schdeuleData.push(value);

        } else {
            schedulesToSave.pop(value);
            schdeuleData.pop(value);
        }
    };
    if (schedulesToSave.length !== 0) {
        schdeuleData.map((item, key) =>
            schedulesToSave.push(item)
        )
    }



    useEffect(() => {
        // 
        dispatch(syllabusListData());
        dispatch(libraryListData());
    }, []);

    let initialFValues = ""
    if (data.data.library !== null) {
        initialFValues = {
            id: data.data.id,
            title: data.data.title,
            syllabus_id: data.data.syllabus_id,
            class_id: data.data.class_id,
            subject_id: data.data.subject_id,
            mode_of_teaching: data.data.mode_of_teaching,
            start_date: data.data.start_date,
            end_date: data.data.end_date,
            cost: data.data.cost,
            type: "individual",
            image_name: "",
            image: "",
            demo_video: "",
            demo_video_name: "",
            description: data.data.description,
            library_id: data.data.library.id,
            syallbus_other: "",
            class_other: "",
            subject_other: "",
        };
    }
    else {
        initialFValues = {
            id: data.data.id,
            title: data.data.title,
            syllabus_id: data.data.syllabus_id,
            class_id: data.data.class_id,
            subject_id: data.data.subject_id,
            mode_of_teaching: data.data.mode_of_teaching,
            start_date: data.data.start_date,
            end_date: data.data.end_date,
            cost: data.data.cost,
            type: "individual",
            image_name: "",
            image: "",
            demo_video: "",
            demo_video_name: "",
            description: data.data.description,
            library_id: "",
            syallbus_other: "",
            class_other: "",
            subject_other: "",
        };
    }


    // validation code start
    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ("title" in fieldValues)
            temp.title = fieldValues.title ? "" : "Please enter title.";

        if ("syllabus_id" in fieldValues)
            temp.syllabus_id = fieldValues.syllabus_id
                ? ""
                : "Please select syllabus.";

        if (values.syllabus_id == "other") {
            if ("syallbus_other" in fieldValues)
                temp.syallbus_other = fieldValues.syallbus_other ? "" : "Please Enter Other Syallbus.";
        }

        if (values.class_id == "other") {
            if ("class_other" in fieldValues)
                temp.class_other = fieldValues.class_other ? "" : "Please Enter Other Class.";
        }

        if (values.subject_id == "other") {
            if ("subject_other" in fieldValues)
                temp.subject_other = fieldValues.subject_other ? "" : "Please Enter Other Subject.";
        }

        if ("class_id" in fieldValues)
            temp.class_id = fieldValues.class_id ? "" : "Please select class.";

        if ("subject_id" in fieldValues)
            temp.subject_id = fieldValues.subject_id ? "" : "Please select subject.";

        if ("mode_of_teaching" in fieldValues)
            temp.mode_of_teaching = fieldValues.mode_of_teaching
                ? ""
                : "Please select mode of teaching.";

        if ("cost" in fieldValues) {
            if (fieldValues.cost < 0) {
                temp.cost = "Cost should be greater then 0";
            } else if (fieldValues.cost === "") {
                temp.cost = "Please enter cost.";
            } else {
                temp.cost = "";
            }
        }
        if ("demo_video_name" in fieldValues) {
            var imagePath = fieldValues.demo_video_name;
            var logo = ['mp4', 'mov', 'wmv', 'mkv', 'avi']
            var extension = imagePath.substring(
                imagePath.lastIndexOf(".") + 1,
                imagePath.length
            );
            if (fieldValues.demo_video_name) {
                if (logo.includes(extension)) {

                    temp.demo_video_name = "";
                } else {

                    temp.demo_video_name = "Only mp4, mov, wmv, mkv and avi  file is allowed.";
                }
            } else {
                temp.demo_video_name = "";
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert("hello1")
        if (validate()) {
            setLoading(true);
            // alert("hello")

            delete values.demo_video_name;
            delete values.image_name;

            let formData = new FormData();
            formData.append("title", values.title);

            formData.append("syllabus_id", values.syllabus_id);
            if (values.syllabus_id === "other") {
                formData.append("syallbus_other" , values.syallbus_other)
            }

            formData.append("class_id", values.class_id);
            if (values.class_id === "other") {
                formData.append("class_other", values.class_other)
            }

            formData.append("subject_id", values.subject_id);
            if (values.subject_id === "other") {
                formData.append("subject_other", values.subject_other)
            }

            formData.append("mode_of_teaching", values.mode_of_teaching);
            formData.append(
                "start_date", values.start_date
                // moment(values.start_date).format("YYYY-MM-DD")
            );
            formData.append("id", data.data.id)
            formData.append("end_date", values.end_date);
            formData.append("cost", values.cost);
            formData.append("type", values.type);

            // console.log(unique_student)

            if (values.image !== "") {
                formData.append("image", values.image);
            }
            if (values.demo_video !== "") {
                formData.append("demo_video", values.demo_video);
            }
            formData.append("description", values.description);
            {
                values.library_id === ""
                    ? ""
                    : formData.append("library_id", values.library_id);
            }

            schedulesToSave.forEach((item) => {
                formData.append("schedule_id[]", item);
            });

            if (schedulesToSave.length !== 0) {
                setSchdeuleStatus(true);

            } else {
                // console.log("in else")
                setVisibleLg(true);
                setLoading(false);
                return false;
            }
            setLoading(true);
            showLoader();
            await dispatch(updateTuition(formData))
            resetForm();

            setVisibleLg(false);
            setLoading(false);
            hideLoader();
        }
    };


    const schedule_list = Object.entries(getUserData().availability_group).map(
        (item, i) => (
            <CTableRow>
                <CTableDataCell className="tabelCellCustomDesign text-center">
                    {item[0].toUpperCase()}
                </CTableDataCell>
                <CTableDataCell>
                    {item[1].map((items, index) => (
                        <CRow>
                            <CCol sm={12} xl={6} lg={6} md={6}>
                                <div className="labelDesignScheduleMainDiv m-1">
                                    <li>
                                        <div className="checkbox checkbox-circle checkbox-color-scheme">
                                            <Checkbox
                                                name="schedulesToSave[]"
                                                value={items.id}
                                                onChange={onAddingItem}
                                                defaultChecked={schedulesToSave.includes(items.id) ? true : false}
                                            />

                                        </div>
                                    </li>
                                    <li>
                                        <a className="labelDesignScheduleStart">
                                            {items.start_time}
                                        </a>
                                    </li>
                                    <li>
                                        <a className="labelDesignScheduleEnd">{items.end_time}</a>
                                    </li>
                                </div>
                            </CCol>
                        </CRow>
                    ))}
                </CTableDataCell>
            </CTableRow>
        )
    );

    return (
        <>
            <div>
                <CustomAlertControl />
                <CRow>
                    <CCol sm={12} lg={12} md={12} xs={12}>

                        <Form onSubmit={handleSubmit}>
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
                                    <Controls.RadioGroup
                                        name="type"
                                        label="Type"
                                        value={values.type}
                                        onChange={handleInputChange}
                                        items={teachingTypeItems}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Select
                                        name="syllabus_id"
                                        label="Syllabus *"
                                        value={values.syllabus_id}
                                        onChange={handleInputChange}
                                        options={DropDown.syllabusList}
                                        error={errors.syllabus_id}
                                        other="other"
                                    />
                                </CCol>
                                {values.syllabus_id === "other" ?
                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                        <Controls.Input
                                            name="syallbus_other"
                                            label="Other Syllabus *"
                                            value={values.syallbus_other}
                                            onChange={handleInputChange}
                                            error={errors.syallbus_other}
                                        />
                                    </CCol>
                                    :
                                    errors.syallbus_other = ""
                                }
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Select
                                        name="class_id"
                                        label="Class *"
                                        value={values.class_id}
                                        onChange={handleInputChange}
                                        options={DropDown.classList}
                                        error={errors.class_id}
                                        other="other"
                                    />
                                </CCol>
                                {values.class_id === "other" ?
                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                        <Controls.Input
                                            name="class_other"
                                            label="Other Class *"
                                            value={values.class_other}
                                            onChange={handleInputChange}
                                            error={errors.class_other}
                                        />
                                    </CCol>
                                    :
                                    errors.class_other = ""
                                }
                            </CRow>
                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Select
                                        name="subject_id"
                                        label="Subject *"
                                        value={values.subject_id}
                                        onChange={handleInputChange}
                                        options={DropDown.subjectList}
                                        error={errors.subject_id}
                                        other="other"
                                    />
                                </CCol>
                                {values.subject_id === "other" ?
                                    <CCol sm={6} md={6} lg={6} xl={6}>
                                        <Controls.Input
                                            name="subject_other"
                                            label="Other subject *"
                                            value={values.subject_other}
                                            onChange={handleInputChange}
                                            error={errors.subject_other}
                                        />
                                    </CCol>
                                    :
                                    errors.subject_other = ""
                                }
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Select
                                        name="mode_of_teaching"
                                        label="Mode *"
                                        value={values.mode_of_teaching}
                                        onChange={handleInputChange}
                                        options={getAllTeachingMode()}
                                        error={errors.mode_of_teaching}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Input
                                        name="cost"
                                        label={"Cost (" + currencySymbole() + ")"}
                                        type="number"
                                        value={values.cost}
                                        onChange={handleInputChange}
                                        error={errors.cost}
                                    />
                                </CCol>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.DatePicker
                                        name="start_date"
                                        label="Start Date"
                                        value={values.start_date}
                                        onChange={handleInputChange}
                                        previousDateStatus={true}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.DatePicker
                                        name="end_date"
                                        label="End Date"
                                        minDate={values.start_date}
                                        value={values.end_date}
                                        onChange={handleInputChange}
                                        previousDateStatus={true}
                                    />
                                </CCol>

                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.InputLabelShown
                                        name="image_name"
                                        label="Image *"
                                        value={values.image_name}
                                        type="file"
                                        onChange={handleInputChange}
                                        error={errors.image_name}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.InputLabelShown
                                        name="demo_video_name"
                                        label="Demo Video"
                                        value={values.demo_video_name}
                                        type="file"
                                        onChange={handleInputChange}
                                        error={errors.demo_video_name}
                                    />
                                </CCol>

                                <CCol sm={6} md={6} lg={6} xl={6}>

                                    <Controls.Select
                                        name="library_id"
                                        label="Library Item"
                                        value={values.library_id}
                                        onChange={handleInputChange}
                                        options={DropDown.libraryList}

                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={12} md={12} lg={12} xl={12}>
                                    <Controls.CustomTextArea
                                        label="Description *"
                                        rows={5}
                                        name="description"
                                        value={values.description}
                                        onChange={handleInputChange}
                                        error={errors.description}
                                    />
                                </CCol>
                            </CRow>

                            <div className="d-flex flex-row mt-3">
                                <div className="p-2">
                                    <FontAwesomeIcon icon={faVihara} />
                                </div>
                                <div className="p-2">
                                    <CCardText className="d-inline">Schedule Details</CCardText>
                                </div>
                            </div>

                            <CDropdownDivider className="mb-4" />
                            <CRow>
                                <div>
                                    <CTable style={{ backgroundColor: "#efefef" }}>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell
                                                    width="20%"
                                                    scope="col"
                                                    className="text-center tabelCellCustomDesignHeader"
                                                >
                                                    Day
                                                </CTableHeaderCell>
                                                <CTableHeaderCell scope="col" className="text-center">
                                                    Schedule
                                                </CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>{schedule_list}</CTableBody>
                                    </CTable>
                                </div>
                            </CRow>
                            {schedulesToSave.length === 0 && !schdeuleStatus ? (
                                <>
                                    <CRow>
                                        <span className="text-danger">
                                            {" "}
                                            Please select Schedule.
                                        </span>
                                    </CRow>
                                </>
                            ) : (
                                <></>
                            )}
                            <CRow></CRow>
                            <CRow>
                                <CCol sm={12} md={12} lg={4} xl={4} className="m-2">
                                    <div className="d-inline">
                                        <Controls.Button
                                            type="submit"
                                            text="Submit"
                                            className="m-1"
                                        />
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

                    </CCol>
                </CRow>
            </div>
        </>
    );
};

export default EditTuition;
