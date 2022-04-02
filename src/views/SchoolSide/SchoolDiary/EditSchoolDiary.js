import React, { useState } from 'react'
import {
    CCol,
    CRow,
} from "@coreui/react";
import Controls from "src/components/formControls/controls/Controls";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import { useDispatch, useSelector } from 'react-redux';
import {
    updateSchoolDiary,
} from "./SchoolDiayAction"
import { Form, useForm } from 'src/components/formControls/useForm';


const EditSchoolDiary = (data) => {


    const dispatch = new useDispatch()
    const SchoolDiary = useSelector((state) => state.SchoolDiary);
    const [editDiaryvisible, setEditDiaryVisible] = useState(false);

    // Intital value for Edit Diary
    const initialFValues = {
        id: data.data.id,
        division_subject_id: data.data.details.subject_id,
        class_work: data.data.details.class_work,
        school_home_work: "",
        school_class_work: "",
        class_work_image: "",
        home_work_image: "",
        home_work: data.data.details.home_work,
        tomorrow_topic: data.data.details.tomorrow_topics,
    };

    // validation code start
    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ("school_class_work" in fieldValues) {
            var imagePath = fieldValues.school_class_work;
            var logo = ['jpeg', 'png', 'jpg', 'svg', 'pdf', 'bmp', 'doc', 'csv', 'xlsx', 'xls', 'docx', 'ppt', 'odt', 'ods', 'odp']
            var extension = imagePath.substring(
                imagePath.lastIndexOf(".") + 1,
                imagePath.length
            );
            if (fieldValues.school_class_work) {
                if (logo.includes(extension)) {
                    temp.school_class_work = "";
                } else {
                    temp.school_class_work = "Only Jpg, png, jpg, svg, pdf, bmp, doc, csv, xlsx, xls, docx, ppt, odt, ods and odp  file is allowed.";
                }
            } else {
                temp.school_class_work = "";
            }
        }

        if ("school_home_work" in fieldValues) {
            var imagePath = fieldValues.school_home_work;
            var logo = ['jpeg', 'png', 'jpg', 'svg', 'pdf', ' bmp', 'doc', 'csv', 'xlsx', 'xls', 'docx', 'ppt', 'odt', 'ods', 'odp']
            var extension = imagePath.substring(
                imagePath.lastIndexOf(".") + 1,
                imagePath.length
            );
            if (fieldValues.school_home_work) {
                if (logo.includes(extension)) {
                    temp.school_home_work = "";
                } else {
                    temp.school_home_work = "Only Jpg, png, jpg, svg, pdf, bmp, doc, csv, xlsx, xls, docx, ppt, odt, ods and odp  file is allowed.";
                }
            } else {
                temp.school_home_work = "";
            }
        }

        if ("division_subject_id" in fieldValues)
            temp.division_subject_id = fieldValues.division_subject_id
                ? ""
                : "Please select Subject.";

        if ("tomorrow_topic" in fieldValues)
            temp.tomorrow_topic = fieldValues.tomorrow_topic ? "" : "Enter Tomorrow Topics.";

        if ("home_work" in fieldValues)
            temp.home_work = fieldValues.home_work ? "" : "Enter Home Work.";

        if ("class_work" in fieldValues)
            temp.class_work = fieldValues.class_work ? "" : "Enter Class Work.";

        setErrors({
            ...temp,
        });

        if (fieldValues = values) return Object.values(temp).every((x) => x === "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);
    // Validation Code End 

    // submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {

            let data = new FormData();
            data.append("diary_id", values.id)
            data.append("subject_id", values.division_subject_id)
            data.append("class_work", values.class_work)
            if (values.class_work_image !== "") {

                data.append("class_work_attachment", values.class_work_image)
            }
            if (values.home_work_image !== "") {

                data.append("home_work_attachment", values.home_work_image)
            }
            data.append("home_work", values.home_work);
            data.append("tomorrow_topics", values.tomorrow_topic)

            dispatch(updateSchoolDiary(data))
            setEditDiaryVisible(false)

        }
    };

    return (
        <>

            <Form onSubmit={handleSubmit}>
                <CRow>
                    <CCol xl={6} sm={6} className="mb-3">
                        <Controls.CustomTextArea
                            label="Class Work *"
                            rows={2}
                            name="class_work"
                            value={values.class_work}
                            onChange={handleInputChange}
                            error={errors.class_work}
                        />
                    </CCol>
                    <CCol xl={6} sm={6}>
                        <Controls.InputLabelShown
                            label="class Work Attachment"
                            name="school_class_work"
                            type="file"
                            value={values.school_class_work}
                            onChange={handleInputChange}
                            error={errors.school_class_work}
                        />
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xl={6} sm={6} className="mb-3">
                        <Controls.CustomTextArea
                            label="Home Work *"
                            rows={2}
                            name="home_work"
                            value={values.home_work}
                            onChange={handleInputChange}
                            error={errors.home_work}
                        />
                    </CCol>
                    <CCol xl={6} sm={6}>
                        <Controls.InputLabelShown
                            label="home Work Attachment "
                            type="file"
                            name="school_home_work"
                            value={values.school_home_work}
                            onChange={handleInputChange}
                            error={errors.school_home_work}
                        />
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xl={12} sm={12} className="mb-3">
                        <Controls.CustomTextArea
                            label="Tomorrow's Topic *"
                            rows={2}
                            name="tomorrow_topic"
                            value={values.tomorrow_topic}
                            onChange={handleInputChange}
                            error={errors.tomorrow_topic}
                        />
                    </CCol>
                </CRow>

                <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6} className="m-2">
                        <div className="p-2 d-inline">
                            <Controls.Button
                                type="submit"
                                text="Submit"
                                className="m-1"
                                onDismiss={() => setEditDiaryVisible(false)}
                            />
                        </div>
                        <div className="p-2 d-inline">
                            <Controls.Button
                                text="reset"
                                color="default"
                                onClick={resetForm}
                            />
                        </div>
                    </CCol>
                </CRow>
            </Form>
        </>
    )
}


export default EditSchoolDiary
